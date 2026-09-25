import './style.css';
import { stages, nodes, documents, excerpt } from './content.js';
const $ = s => document.querySelector(s), colors = ['#d34635','#247794','#d68d14','#7752a4','#20836a'];
let current = null;
function button(label, action) { const b = document.createElement('button'); b.textContent = label; b.onclick = action; return b; }
function svg(tag, attrs = {}, text) { const e = document.createElementNS('http://www.w3.org/2000/svg', tag); for (const [k,v] of Object.entries(attrs)) e.setAttribute(k, v); if (text) e.textContent = text; return e; }
function wrap(text, limit) { const out = []; for (const word of text.split(' ')) { if (!out.length || out.at(-1).length + word.length > limit) out.push(word); else out[out.length - 1] += ' ' + word; } return out; }
function station(parent, node, x, y, color, hub = false) {
  const g = svg('g', { role: 'button', tabindex: '0', 'aria-label': `${node.id}. ${node.title}${node.proposed ? ' (proposed)' : ''}` });
  g.append(svg('rect', {x:x-(hub?25:14), y:y-23, width:hub?50:198, height:hub?50:65, fill:'transparent', 'pointer-events':'all'}));
  g.append(svg('circle', { cx:x, cy:y, r:hub ? 21 : 7, fill:hub ? color : '#fff', stroke:color, 'stroke-width':hub ? 0 : 4 }));
  if (hub) { const t = svg('text', { x, y:y+5, 'text-anchor':'middle', 'font-size':15, 'font-weight':'bold' }, node.id); t.style.fill='#fff'; g.append(t); }
  else {
    g.append(svg('text', { x:x+17, y:y-4, 'font-size':12, 'font-weight':'bold' }, node.id + (node.proposed ? ' ◇' : '')));
    wrap(node.title, 21).forEach((row,i) => g.append(svg('text', { x:x+17, y:y+13+i*15, 'font-size':12 }, row)));
  }
  g.addEventListener('click', () => navigate(node)); g.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') { e.preventDefault(); navigate(node); } }); parent.append(g);
}
stages.forEach((stage, i) => {
  const color = colors[i % colors.length], x = 40 + i * 217, group = svg('g');
  wrap(stage.title, 22).forEach((text,j) => group.append(svg('text',{x,y:34+j*18,'font-size':15,'font-weight':'bold'},text)));
  group.append(svg('path',{d:`M ${x+20} 118 L ${x+20} 530 Q ${x+20} 555 ${x+45} 555 L ${x+175} 555`,fill:'none',stroke:color,'stroke-width':7,'stroke-linecap':'round'}));
  station(group, stage, x+20, 114, color, true);
  stage.children.forEach((child,j) => station(group, child, x+20, 180+j*70, color));
  group.append(svg('text',{x:x+25,y:592,'font-size':10},`LINE ${stage.id} / ${stage.children.length} STATIONS`)); $('#map').append(group);
  const b = button('', () => navigate(stage)); b.style.setProperty('--line',color); const mark=document.createElement('b');mark.textContent=stage.id;const label=document.createElement('span');label.textContent=stage.title;b.append(mark,label);$('#lines').append(b);
});
function navigate(node) { history.pushState(null,'',node ? '#'+encodeURIComponent(node.key) : location.pathname); render(node,true); }
function render(node, scroll=false) {
  current=node;$('#ticket').hidden=!node;if(!node)return;
  const trail=[];for(let n=node;n;n=n.parent)trail.unshift(n);const color=colors[Math.max(0,stages.indexOf(trail[0]))%colors.length];$('#ticket').style.setProperty('--line',color);
  $('#trail').replaceChildren(button('Network',()=>navigate(null)),...trail.map(n=>button('/ '+n.id,()=>navigate(n))));
  $('#station-id').textContent=node.id;$('#station-title').textContent=node.title;$('#summary').textContent=excerpt(node);$('#status').textContent=node.proposed?'PROPOSED SUBDIVISION':'DOCUMENT STATION / '+node.id;
  $('#connections').replaceChildren(...node.children.map(n=>{const b=button('',()=>navigate(n));const id=document.createElement('b');id.textContent=n.id;const name=document.createElement('span');name.textContent=n.title+(n.proposed?' · proposed':'');b.append(id,name);return b;}));
  $('#source').onclick=()=>openDocument(node.sourcePath);$('#contract').hidden=node.path===node.sourcePath;$('#contract').onclick=()=>openDocument(node.path);
  if(scroll)$('#ticket').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
}
function openDocument(path){$('#document-path').textContent=path;$('#document-text').textContent=documents[path];$('#document').showModal();}
$('#close-document').onclick=()=>$('#document').close();$('#close-ticket').onclick=()=>{navigate(null);$('#lines').scrollIntoView();};
function fromURL(){let key='';try{key=decodeURIComponent(location.hash.slice(1));}catch{}render(nodes.get(key)||null);}
window.addEventListener('popstate',fromURL);window.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#document').open&&current)navigate(current.parent);});
if(import.meta.env.PROD){$('.home').href='#';$('.home').textContent='← NETWORK';$('.home').onclick=()=>navigate(null);}
fromURL();
