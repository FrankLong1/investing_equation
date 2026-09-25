#!/usr/bin/env python3
"""Compile the diagram and repository Markdown into one offline HTML file.

Run from any directory: python3 visualizations/simple-html/compile.py
Install the adjacent requirements.txt first. The output needs no server or JS libraries.
"""
from pathlib import Path
from html import escape
from urllib.parse import unquote, urlsplit
import os
import re

try:
    import markdown
    from markdown.extensions import Extension
    from markdown.preprocessors import Preprocessor
    from latex2mathml.converter import convert
except ImportError:
    raise SystemExit('Install the renderer: python3 -m pip install -r ' + str(Path(__file__).with_name('requirements.txt')))

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
DOCS = ROOT / 'human-reviewed'
STAGES = {
    '1A': '1a_stock_drivers.md',
    '1B': '1b_gather-relevant-context.md',
    '2A': '2a_identify-key-debates.md',
    '2B': '2b_understand-market-pricing.md',
    '2C': '2c_form-a-variant-view.md',
    '2D': '2d_model_price_impact.md',
    '2E': '2e_calculate_expected_returns.md',
    '3': '3_internal-context.md',
    '4a': '4a_selection.md',
    '4b': '4b_sizing.md',
    '4c': '4c_timing.md',
    '5': '5_state-update-and-learning.md',
}


def doc_id(path):
    return 'doc-' + path.relative_to(DOCS).with_suffix('').as_posix().replace('/', '--')


class MathPreprocessor(Preprocessor):
    # Fenced code is already stashed by Markdown. Leave inline code untouched,
    # distinguish $variable$ from currency, and handle indented display formulas.
    pattern = re.compile(
        r"(?P<code>`+[^`]*`+)"
        r"|(?P<block>(?<!\\)\$\$(?P<display>.*?)\$\$)"
        r"|(?P<inline>(?<![\\$])\$(?![\s\d$])(?P<tex>[^$\n]*?\S)(?<!\\)\$(?!\d))",
        re.S,
    )

    def run(self, lines):
        def typeset(match):
            if match['code']:
                return match[0]
            block = match['block'] is not None
            tex = (match['display'] if block else match['tex']).strip()
            # latex2mathml lacks the standard arg operator alias.
            normalized = re.sub(r'\\arg\b', lambda _: r'\operatorname{arg}', tex)
            math = convert(normalized, display='block' if block else 'inline')
            # Keep source in an attribute for inspection, never as visible code.
            math = math.replace('<math ', '<math data-tex="' + escape(tex, quote=True) + '" ', 1)
            if block:
                math = '<div class="math-display">' + math + '</div>'
            return self.md.htmlStash.store(math)
        return self.pattern.sub(typeset, '\n'.join(lines)).split('\n')


class MathExtension(Extension):
    def extendMarkdown(self, md):
        md.preprocessors.register(MathPreprocessor(md), 'typeset_math', 24)


def render_document(path, embedded):
    source = path.read_text()
    rendered = markdown.markdown(source, extensions=[
        'tables', 'fenced_code', 'sane_lists', MathExtension(),
    ])

    def link(match):
        value = match[1]
        url = urlsplit(value)
        if url.scheme or url.netloc or value.startswith('#'):
            return match[0]
        target = (path.parent / unquote(url.path)).resolve()
        if target in embedded:
            return 'href="#' + doc_id(target) + '"'
        # Retain a relative source link for resources outside the embedded documents.
        relative = Path(os.path.relpath(target, HERE)).as_posix()
        return 'href="' + escape(relative + ('#' + url.fragment if url.fragment else ''), quote=True) + '"'

    rendered = re.sub(r'href="([^"]+)"', link, rendered)
    source_link = Path(os.path.relpath(path, HERE)).as_posix()
    return (f'<article id="{doc_id(path)}" hidden>\n'
            f'<a class="source-link" href="{escape(source_link)}" target="_blank" rel="noopener">Open Markdown source ↗</a>\n'
            f'{rendered}\n</article>')


def compile_html():
    paths = sorted(DOCS.rglob('*.md'))
    embedded = set(p.resolve() for p in paths)
    diagram = (HERE / 'diagram.html').read_text()
    linked = []

    def node(match):
        number = match[3]
        path = DOCS / STAGES[number]
        if not path.is_file():
            raise FileNotFoundError(path)
        linked.append(number)
        return f'<a class="{match[1]}" href="#{doc_id(path)}">{match[2]}</a>'

    diagram = re.sub(r'<div class="(node[^"]*)">((?:<span class="number">)([^<]+)</span>.*?)</div>',
                     node, diagram)
    if set(linked) != set(STAGES) or len(linked) != len(STAGES):
        raise ValueError(f'Expected exactly one box for each stage; found {linked}')
    documents = '\n'.join(render_document(p, embedded) for p in paths)
    template = (HERE / 'page.html').read_text()
    output = template.replace('<!-- DIAGRAM -->', diagram).replace('<!-- DOCUMENTS -->', documents)
    (HERE / '001_simple.html').write_text(output)
    print(f'Compiled {len(linked)} linked boxes and {len(paths)} embedded documents → {HERE / "001_simple.html"}')


if __name__ == '__main__':
    compile_html()
