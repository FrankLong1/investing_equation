# 006 — Naive HTML

A simple, offline diagram of the research loop and portfolio management and risk. Open [index.html](index.html) directly in a browser, or choose **Naive HTML** in the visualization gallery.

Every stage box opens its Markdown document in an embedded reader. Links between embedded documents stay in that reader. **Open Markdown source** uses a relative path to the original repository file. Escape or Close returns to the diagram.

## Rebuild

From the repository root:

```sh
python3 -m venv /tmp/investing-equation-html-venv
/tmp/investing-equation-html-venv/bin/pip install -r visualizations/006-naive-html/requirements.txt
/tmp/investing-equation-html-venv/bin/python visualizations/006-naive-html/compile.py
```

The compiler also works from any other directory when invoked by its full path. Re-run it after changing the documents.

- `compile.py` reads every Markdown file under `human-reviewed/` and renders tables, lists, links, and code blocks. Display equations remain readable LaTeX blocks; this simple version does not typeset math.
- `diagram.html` preserves the approved box layout and labels.
- `page.html` supplies the standalone page, document reader, and offline styles.
- `index.html` is the generated example saved in the repository. Edit the sources and rebuild it.

The generated page needs no server, npm build, network access, or external JavaScript libraries. It is a snapshot; the Markdown files remain the source of truth.
