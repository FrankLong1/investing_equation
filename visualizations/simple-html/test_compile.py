"""Regression checks for the Markdown/math boundary and the compiled documents."""
import importlib.util
from html.parser import HTMLParser
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location('compiler', Path(__file__).with_name('compile.py'))
compiler = importlib.util.module_from_spec(spec)
spec.loader.exec_module(compiler)


class Content(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.math = []
        self.text = []
        self.in_math = False
        self.unsupported = []
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        if tag == 'math':
            self.in_math = True
            self.math.append(dict(attrs))

    def handle_endtag(self, tag):
        if tag == 'math':
            self.in_math = False

    def handle_data(self, text):
        self.text.append(text)
        if self.in_math and '\\' in text:
            self.unsupported.append(text)


def render(text):
    return compiler.markdown.markdown(text, extensions=['fenced_code', compiler.MathExtension()])


class MathRendering(unittest.TestCase):
    def test_inline_symbols_and_currency(self):
        result = Content(render(r'**Fundamentals ($F_t$)** and $s$, with $100, $5 and $6.'))
        self.assertEqual([m['data-tex'] for m in result.math], ['F_t', 's'])
        self.assertIn('$100, $5 and $6.', ''.join(result.text))

    def test_code_is_untouched(self):
        result = Content(render('`$F_t$`\n\n```text\n$$x_t$$\n```'))
        self.assertEqual(result.math, [])
        self.assertIn('$F_t$', ''.join(result.text))
        self.assertIn('$$x_t$$', ''.join(result.text))

    def test_indented_display_and_operators(self):
        result = Content(render('  $$\n  P_t = \\arg\\max_a F_t\n  $$'))
        self.assertEqual(result.math[0]['display'], 'block')
        self.assertFalse(result.unsupported)

    def test_all_documents_typeset(self):
        paths = set(compiler.DOCS.rglob('*.md'))
        count = 0
        for path in paths:
            with self.subTest(document=path.name):
                result = Content(compiler.render_document(path, paths))
                self.assertFalse(result.unsupported)
                visible = ''.join(result.text)
                self.assertNotIn('$$', visible)
                count += len(result.math)
        self.assertGreater(count, 100)


if __name__ == '__main__':
    unittest.main()
