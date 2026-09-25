// Read the repository itself. No copied framework or shared visualization model.
const contracts = import.meta.glob('../../../functions/**/*.md', { query: '?raw', import: 'default', eager: true });
const reviewed = import.meta.glob('../../../human-reviewed/**/*.md', { query: '?raw', import: 'default', eager: true });
export const documents = Object.fromEntries(Object.entries({ ...contracts, ...reviewed }).map(([path, body]) => [path.replace('../../../', ''), body]));
const heading = text => text.match(/^#\s+(.+)$/m)?.[1] || 'Untitled';
const clean = text => text.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, '');
const byPath = new Map();
for (const [path, body] of Object.entries(documents)) {
  if (!path.startsWith('functions/') || path === 'functions/README.md') continue;
  const folder = path.endsWith('/README.md');
  const key = folder ? path.slice(0, -10) : path.slice(0, -3);
  const title = clean(heading(body));
  const match = title.match(/^(\d[A-Ea-e]?|[A-Z]+\d*|SVC)[.\s—:-]+(.*)/);
  const source = body.match(/^Source:.*?\]\(([^)]+)\)/m)?.[1];
  const sourcePath = source ? new URL(source, 'https://repo.local/' + path).pathname.slice(1) : path;
  byPath.set(key, { key, id: match?.[1].toUpperCase() || 'ƒ', title: match?.[2] || title, path, body, sourcePath, proposed: /Status: Proposed/.test(body), children: [], parent: null });
}
export const stages = [];
for (const node of byPath.values()) {
  const parentKey = node.key.slice(0, node.key.lastIndexOf('/'));
  const parent = byPath.get(parentKey);
  if (parent) { parent.children.push(node); node.parent = parent; }
  else stages.push(node);
}
// Reconcile top-level groups with the reviewed outline. Lettered folders may
// live at the contracts root while belonging inside a numbered paper section.
const overviewPath = 'human-reviewed/hedge-fund-as-a-function-v4.md';
const overview = documents[overviewPath] || '';
const sections = [...overview.matchAll(/^## (\d+)\. (.+)$/gm)];
for (let i = 0; i < sections.length; i++) {
  const match = sections[i], id = match[1], rawTitle = match[2];
  const sectionBody = overview.slice(match.index, sections[i + 1]?.index ?? overview.length);
  const sourceLink = rawTitle.match(/\]\(([^)]+)\)/)?.[1];
  let parent = stages.find(n => n.id === id);
  const children = stages.filter(n => new RegExp(`^${id}[A-Z]$`).test(n.id));
  if (!parent && !children.length) continue;
  if (!parent) {
    parent = { key: `outline/${id}`, id, title: clean(rawTitle), path: overviewPath, sourcePath: overviewPath, body: sectionBody, proposed: false, children: [], parent: null };
    byPath.set(parent.key, parent); stages.push(parent);
  }
  parent.title = clean(rawTitle);
  parent.summaryBody = sectionBody;
  if (sourceLink) parent.sourcePath = new URL(sourceLink, 'https://repo.local/' + overviewPath).pathname.slice(1);
  else parent.sourcePath = overviewPath;
  for (const child of children) {
    stages.splice(stages.indexOf(child), 1); child.parent = parent; parent.children.push(child);
  }
}
function sort(nodes) { nodes.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }) || a.key.localeCompare(b.key)); nodes.forEach(n => sort(n.children)); }
sort(stages);
export const nodes = byPath;
export function excerpt(node) {
  const body = node.summaryBody || documents[node.sourcePath] || node.body;
  return clean(body.split('\n\n').find(p => !/^(#|\[|\$|Status:|Source:|-)/.test(p.trim()) && p.trim().length > 45) || 'Explore the source document and the functions assigned to this section.').replace(/\s+/g, ' ');
}
