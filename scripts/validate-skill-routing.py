#!/usr/bin/env python3
"""Validate the investment-process skill registry.

This checks whether every emitted disposition label occurs in ROUTING.md,
whether each routing label is emitted or listed as terminal, and whether a node
table repeats a disposition row. It does not prove per-node emission coverage
or that a destination is executable; those require fuller contract validation.

Also verifies that policy constants are referenced by name rather than inlined
as numbers in skill prose -- an inlined threshold is how the corpus drifted
into having zero declared constants in the first place.

Usage:
    python3 scripts/validate-skill-routing.py [registry_dir]

Exits non-zero on any violation.
"""

import re
import sys
from pathlib import Path

DEFAULT_REGISTRY = Path(__file__).resolve().parent.parent / "skills"

# Rows in ROUTING.md's terminal-state table are not node dispositions.
TERMINAL_KINDS = r"decision|abstention|neither|control event"


def load(registry: Path):
    routing = (registry / "ROUTING.md").read_text()
    skills = sorted(registry.glob("*/SKILL.md"))
    if not skills:
        sys.exit(f"no SKILL.md files found under {registry}")
    return routing, skills


def routed_dispositions(routing: str):
    """Disposition labels with a destination row (node identity not checked)."""
    return set(re.findall(r"^\| `([a-zA-Z_]+)` \|", routing, re.M))


def duplicate_node_rows(routing: str):
    """Repeated disposition rows within the same node table, with line numbers."""
    seen = {}
    duplicates = []
    node = None
    for lineno, line in enumerate(routing.splitlines(), 1):
        heading = re.match(r"^### ([A-Z]\d+)\b", line)
        if heading:
            node = heading.group(1)
            continue
        if line.startswith("## "):
            node = None
        if node is None:
            continue
        row = re.match(r"^\| `([a-zA-Z_]+)` \|", line)
        if not row:
            continue
        disposition = row.group(1)
        key = (node, disposition)
        if key in seen:
            duplicates.append((node, disposition, seen[key], lineno))
        else:
            seen[key] = lineno
    return duplicates


def terminal_dispositions(routing: str):
    return set(
        re.findall(rf"^\| `([a-zA-Z_]+)`[^|]*\| (?:{TERMINAL_KINDS})", routing, re.M)
    )


def emitted_dispositions(skills):
    """Dispositions declared via an `Emit: a | b | c.` line in each skill."""
    found = {}
    for path in skills:
        text = path.read_text().replace("\n", " ")  # unwrap markdown line breaks
        for clause in re.findall(r"Emit(?: per [a-z]+)?: ([^.]+)\.", text):
            for token in clause.split("|"):
                token = token.strip().strip("`").strip()
                if re.fullmatch(r"[a-zA-Z_]+", token):
                    found.setdefault(token, set()).add(path.parent.name)
    return found


# A number is only a *threshold* if it is doing gating work. Illustrative prose
# ("a thesis can be 80% likely true") is fine; a bound is not.
THRESHOLD_LANGUAGE = re.compile(
    r"\b(at least|at most|no more than|minimum|maximum|min|max|must|below|above|"
    r"exceed\w*|threshold|floor|cap(?:ped)?|limit|hurdle|within|greater|less than|"
    r"under|over)\b",
    re.I,
)


def inlined_thresholds(skills):
    """Gating numbers in skill prose that should be POLICY constant references.

    Skipped: lines already citing a POLICY.* constant (the parenthetical gloss
    pattern), headings, table rows, and numbers in purely illustrative prose.
    """
    hits = []
    for path in skills:
        for lineno, line in enumerate(path.read_text().splitlines(), 1):
            if "POLICY." in line or line.lstrip().startswith(("#", "|", "---")):
                continue
            if not THRESHOLD_LANGUAGE.search(line):
                continue
            for m in re.finditer(r"(?<![\w.-])(\d+(?:\.\d+)?)\s*(%|bps|days|months)", line):
                hits.append((path.parent.name, lineno, m.group(0), line.strip()[:80]))
    return hits


def main():
    registry = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_REGISTRY
    routing, skills = load(registry)

    routed = routed_dispositions(routing)
    terminal = terminal_dispositions(routing)
    emitted = emitted_dispositions(skills)

    failures = []

    unrouted = sorted(set(emitted) - routed)
    if unrouted:
        failures.append("dispositions emitted by a skill with no destination in ROUTING.md:")
        for d in unrouted:
            failures.append(f"    {d}  (emitted by {', '.join(sorted(emitted[d]))})")

    orphans = sorted(routed - set(emitted) - terminal)
    if orphans:
        failures.append("routing rows for dispositions no skill emits:")
        failures.extend(f"    {d}" for d in orphans)

    duplicates = duplicate_node_rows(routing)
    if duplicates:
        failures.append("duplicate disposition rows within a node table:")
        for node, disposition, first_line, repeated_line in duplicates:
            failures.append(
                f"    {node} {disposition}: ROUTING.md:{first_line} and :{repeated_line}"
            )

    missing_fm = [p.parent.name for p in skills if not p.read_text().startswith("---\n")]
    if missing_fm:
        failures.append("skills without YAML frontmatter (cannot be auto-invoked):")
        failures.extend(f"    {n}" for n in missing_fm)

    inlined = inlined_thresholds(skills)
    if inlined:
        failures.append("numeric thresholds inlined in skill prose (reference POLICY.* instead):")
        for skill, lineno, value, ctx in inlined:
            failures.append(f"    {skill}/SKILL.md:{lineno}  {value!r}  -- {ctx}")

    print(f"skills:       {len(skills)}")
    print(f"dispositions: {len(emitted)} emitted, {len(routed)} routed, {len(terminal)} terminal")

    if failures:
        print("\nFAIL")
        for line in failures:
            print(f"  {line}")
        return 1

    print("\nOK  disposition labels covered; no duplicate node rows")
    return 0


if __name__ == "__main__":
    sys.exit(main())
