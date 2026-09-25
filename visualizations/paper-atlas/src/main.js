import './style.css';
import { stages, nodes, documents, excerpt } from './content.js';
import { makeSculpture } from './sculpture.js';
const $ = s => document.querySelector(s);
const colors = ['#d6573b', '#6c8e79', '#e8b83e', '#5072ba', '#dba8b0'];
let current = null;
let paused = matchMedia('(prefers-reduced-motion: reduce)').matches;
function nodeButton(text, action) { const b = document.createElement('button'); b.textContent = text; b.onclick = action; return b; }
function navigate(node, scroll = true) {
  const hash = node ? encodeURIComponent(node.key) : '';
  history.pushState(null, '', hash ? '#' + hash : location.pathname);
  render(node, scroll);
}
const sculpture = makeSculpture($('#sculpture'), stages, colors, node => navigate(node), () => { $('#error').textContent = 'The sculpture is unavailable in this browser. All chapters are still available below.'; });
function syncMotion() { $('#motion').textContent = paused ? 'Resume movement' : 'Pause movement'; $('#motion').setAttribute('aria-pressed', String(paused)); sculpture.pause(paused); }
$('#motion').onclick = () => { paused = !paused; syncMotion(); }; syncMotion();
$('#chapter-list').style.setProperty('--count', stages.length);
const chapterButtons = stages.map((stage, i) => {
  const button = nodeButton('', () => navigate(stage)); button.className = 'chapter'; button.style.setProperty('--color', colors[i % colors.length]); button.setAttribute('aria-expanded', 'false');
  const dot = document.createElement('span'); dot.className = 'dot'; dot.setAttribute('aria-hidden', 'true');
  const number = document.createElement('span'); number.className = 'number'; number.textContent = `CHAPTER ${stage.id}`;
  const title = document.createElement('span'); title.className = 'name'; title.textContent = stage.title;
  const arrow = document.createElement('span'); arrow.className = 'arrow'; arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true');
  const count = document.createElement('span'); count.className = 'count'; count.textContent = `${stage.children.length} SECTIONS`;
  button.append(dot, number, title, arrow, count); $('#chapter-list').append(button); return button;
});
function openSource(path) { $('#source-path').textContent = path; $('#source-text').textContent = documents[path] || 'This document is unavailable.'; $('#document').showModal(); }
$('#close-document').onclick = () => $('#document').close();
$('#close-reading').onclick = () => { navigate(null, false); $('#chapters').scrollIntoView({ behavior: paused ? 'instant' : 'smooth' }); };
function render(node, scroll) {
  current = node; $('#reading').hidden = !node;
  const trail = []; for (let p = node; p; p = p.parent) trail.unshift(p);
  const stageIndex = stages.indexOf(trail[0]); sculpture.select(stageIndex);
  chapterButtons.forEach((b, i) => b.setAttribute('aria-expanded', String(i === stageIndex)));
  if (!node) { if (scroll) $('#chapters').scrollIntoView({ behavior: paused ? 'instant' : 'smooth' }); return; }
  $('#trail').replaceChildren(nodeButton('Contents', () => navigate(null)), ...trail.map(p => nodeButton(` / ${p.id}`, () => navigate(p))));
  $('#chapter-mark').textContent = node.id; $('#chapter-mark').style.color = colors[Math.max(0, stageIndex) % colors.length];
  $('#reading-title').textContent = node.title; $('#reading-intro').textContent = excerpt(node);
  $('#status').textContent = node.proposed ? 'PROPOSED SUBDIVISION\nFrom the function contracts.' : node.children.length ? `${node.children.length} sections to explore.` : 'At the source. Read the original document below.';
  $('#children').replaceChildren();
  for (const child of node.children) {
    const b = nodeButton('', () => navigate(child)); b.className = 'child';
    const id = document.createElement('b'); id.textContent = child.id;
    const name = document.createElement('span'); name.textContent = child.title;
    const cue = document.createElement('small'); cue.textContent = child.proposed ? 'PROPOSED ↗' : '↗'; b.append(id, name, cue); $('#children').append(b);
  }
  if (!node.children.length) { const p = document.createElement('p'); p.className = 'empty'; p.textContent = 'This is the deepest level currently described here. The source retains the full detail.'; $('#children').append(p); }
  $('#source').onclick = () => openSource(node.sourcePath);
  $('#contract').hidden = node.path === node.sourcePath; $('#contract').onclick = () => openSource(node.path);
  if (scroll) requestAnimationFrame(() => $('#reading').scrollIntoView({ behavior: paused ? 'instant' : 'smooth', block: 'start' }));
}
function fromURL(scroll = false) {
  let key; try { key = decodeURIComponent(location.hash.slice(1)); } catch { key = ''; }
  render(nodes.get(key) || null, scroll);
}
window.addEventListener('popstate', () => fromURL(true));
window.addEventListener('hashchange', () => fromURL(false));
window.addEventListener('keydown', event => { if (event.key === 'Escape' && !$('#document').open && current) navigate(current.parent); });
if (import.meta.env.PROD) { $('#home').href = '#chapters'; $('#home').textContent = '← Back to contents'; }
fromURL(!!location.hash && location.hash !== '#chapters');
