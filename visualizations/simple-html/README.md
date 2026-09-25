# Simple HTML

A simple, offline diagram of the research loop and portfolio management and risk. Open [001_simple.html](001_simple.html) directly in a browser. This version is independent of Paper Atlas, Neon Studies, and the other sibling experiments; it does not navigate through their gallery or load their code.

Every stage box opens its Markdown document in an embedded reader. Links between embedded documents stay in that reader. **Open Markdown source** uses a relative path to the original repository file. Escape or Close returns to the diagram.

## Rebuild

From the repository root:

```sh
python3 -m venv /tmp/investing-equation-html-venv
/tmp/investing-equation-html-venv/bin/pip install -r visualizations/simple-html/requirements.txt
/tmp/investing-equation-html-venv/bin/python visualizations/simple-html/compile.py
```

The compiler also works from any other directory when invoked by its full path. Re-run it after changing the documents.

- `compile.py` reads every Markdown file under `human-reviewed/` and renders tables, lists, links, and code blocks. Inline and display equations compile to native MathML, including indented equations inside lists. Currency amounts and code blocks are preserved. No math scripts, fonts, or CDN access are needed at runtime.
- `diagram.html` preserves the approved box layout and labels.
- `page.html` supplies the standalone page, document reader, and offline styles.
- `001_simple.html` is the generated example saved in the repository. Edit the sources and rebuild it.

The generated page needs no server, npm build, network access, or external JavaScript libraries. It is a snapshot; the Markdown files remain the source of truth.

## Rendering checks

Using the same Python environment, run `python visualizations/simple-html/test_compile.py` from the repository root. It checks inline and display math, currency, code preservation, and unsupported notation across every embedded document. The compiler emits MathML at build time; current browsers typeset it without additional downloads.
