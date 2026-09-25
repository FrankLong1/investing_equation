import './style.css';
import * as T from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { stages, nodes, documents, excerpt } from './content.js';
import { design, layout, decorate } from './scene.js';

const $ = s => document.querySelector(s);
document.title = `${design.name} · Investing Equation`;
document.documentElement.style.setProperty('--accent', design.accent);
$('#version-name').textContent = design.name;
$('#edition').textContent = `EXPERIMENT ${design.number} / THREE.JS STUDIES`;
$('#subtitle').textContent = design.description;
$('#version').value = design.slug;
if (import.meta.env.PROD) { $('#version').disabled = true; $('.brand').href = '#'; }
$('#version').onchange = event => { location.href = `../${event.target.value}/`; };
let current = null, shown = stages, cards = [], meshes = [], renderer, composer, scene, camera, controls, world, decoration;
let paused = matchMedia('(prefers-reduced-motion: reduce)').matches, elapsed = 0, last = performance.now(), frame, introProgress = 0;
const motionButton = $('#motion');
function syncMotion() { motionButton.textContent = paused ? 'Resume motion' : 'Pause motion'; motionButton.setAttribute('aria-pressed', String(paused)); }
syncMotion(); motionButton.onclick = () => { paused = !paused; syncMotion(); };
$('#full').onclick = async () => { try { if (document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen(); } catch { $('#error').textContent = 'Fullscreen is unavailable in this browser.'; } };
function navigate(node) { location.hash = node ? encodeURIComponent(node.key) : ''; }
function button(text, action, className = '') { const b = document.createElement('button'); b.textContent = text; b.className = className; b.onclick = action; return b; }
function showDocument(path) {
  $('#document-title').textContent = path;
  $('#document-body').textContent = documents[path] || 'Document unavailable.';
  $('#document').showModal();
}
$('#close-document').onclick = () => $('#document').close();
$('.stage-nav').style.setProperty('--stage-count', stages.length);
for (const stage of stages) {
  const b = button('', () => navigate(stage)); b.dataset.stage = stage.key;
  const id = document.createElement('strong'); id.textContent = stage.id;
  const title = document.createElement('span'); title.textContent = stage.title;
  b.append(id, title); $('.stage-nav').append(b);
}
function disposeGroup(group) {
  group.traverse(object => { object.geometry?.dispose(); if (Array.isArray(object.material)) object.material.forEach(m => m.dispose()); else object.material?.dispose(); });
}
function renderNavigation() {
  try { current = nodes.get(decodeURIComponent(location.hash.slice(1))) || null; } catch { current = null; }
  shown = current ? (current.children.length ? current.children : [current]) : stages;
  document.body.classList.toggle('focused', !!current);
  $('#title').textContent = current ? `${current.id}. ${current.title}` : 'A world inside every box.';
  $('#subtitle').textContent = current ? (current.children.length ? 'Choose a section to keep exploring.' : 'Read the source behind this section.') : design.description;
  const ancestry = []; for (let n = current; n; n = n.parent) ancestry.unshift(n);
  $('#breadcrumbs').replaceChildren(button('Overview', () => navigate(null)), ...ancestry.map(n => button(` / ${n.id}`, () => navigate(n))));
  for (const b of $('.stage-nav').children) b.setAttribute('aria-current', String(ancestry[0]?.key === b.dataset.stage));
  $('#detail').hidden = !current;
  if (current) {
    $('#detail-title').textContent = current.title;
    $('#detail-text').textContent = excerpt(current);
    $('#detail-meta').textContent = current.proposed ? 'PROPOSED SUBDIVISION · from function contracts' : current.children.length ? `${current.children.length} SECTIONS / FUNCTIONS` : 'SOURCE DOCUMENT · no further assigned functions';
    $('#read-source').onclick = () => showDocument(current.sourcePath);
    $('#read-contract').onclick = () => showDocument(current.path);
    $('#read-contract').hidden = current.path === current.sourcePath;
  }
  $('#labels').replaceChildren();
  cards = shown.map(n => {
    const b = button('', () => n === current && !n.children.length ? showDocument(n.sourcePath) : navigate(n), 'node-label');
    b.setAttribute('aria-label', `${n.id}. ${n.title}${n.proposed ? ' (proposed)' : ''}`);
    const id = document.createElement('b'); id.textContent = n.id;
    const name = document.createElement('span'); name.textContent = n.title; b.append(id, name);
    if (n.proposed) { const small = document.createElement('small'); small.textContent = 'PROPOSED'; b.append(small); }
    $('#labels').append(b); return b;
  });
  if (!renderer) {
    $('#labels').classList.add('fallback');
    return;
  }
  if (world) { scene.remove(world); disposeGroup(world); }
  world = new T.Group(); scene.add(world); meshes = []; introProgress = paused ? 1 : 0;
  const positions = layout(shown.length);
  shown.forEach((n, i) => {
    const group = new T.Group(); group.position.copy(positions[i]); group.userData.rest = positions[i].clone();
    const geometry = new T.BoxGeometry(...design.box);
    const face = new T.Mesh(geometry, new T.MeshBasicMaterial({ color: design.color, transparent: true, opacity: .065, depthWrite: false }));
    const edges = new T.LineSegments(new T.EdgesGeometry(geometry), new T.LineBasicMaterial({ color: design.color, transparent: true, opacity: .8 }));
    group.add(face, edges); face.userData.node = n; meshes.push(face); world.add(group);
  });
  decoration = decorate(T, world, positions);
  controls.target.set(0, 0, 0); camera.position.set(...design.camera); controls.update(); resize();
}
function resize() {
  if (!renderer) return;
  const { width, height } = $('#viewport').getBoundingClientRect();
  camera.aspect = width / Math.max(height, 1); camera.updateProjectionMatrix();
  renderer.setSize(width, height); composer.setSize(width, height);
  // Fit the complete study on narrow or short screens.
  const positions = layout(shown.length);
  const halfWidth = Math.max(...positions.map(p => Math.abs(p.x))) + design.box[0] / 2;
  const halfHeight = Math.max(...positions.map(p => Math.abs(p.y))) + design.box[1] / 2;
  const distance = Math.max(halfHeight, halfWidth / camera.aspect) / Math.tan(camera.fov * Math.PI / 360) * 1.2 + 3;
  controls.minDistance = 8; controls.maxDistance = 100;
  if (!controls.userDataMoved) { camera.position.set(design.camera[0], design.camera[1], distance); camera.lookAt(0, 0, 0); }
}
try {
  renderer = new T.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5)); renderer.setClearColor(0x070d11); renderer.toneMapping = T.ACESFilmicToneMapping;
  $('#viewport').prepend(renderer.domElement);
  renderer.domElement.setAttribute('aria-label', 'Interactive 3D framework. Use labeled buttons to explore.');
  scene = new T.Scene(); scene.background = new T.Color('#070d11'); camera = new T.PerspectiveCamera(43, 1, .1, 200);
  controls = new OrbitControls(camera, renderer.domElement); controls.enableDamping = true; controls.enablePan = true;
  controls.addEventListener('start', () => { controls.userDataMoved = true; });
  composer = new EffectComposer(renderer); composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new UnrealBloomPass(new T.Vector2(800, 500), .75, .55, .65)); composer.addPass(new OutputPass());
  const stars = []; for (let i = 0; i < 650; i++) stars.push(Math.sin(i * 4.37) * 36, Math.cos(i * 8.13) * 21, -12 - (i % 40));
  const sky = new T.BufferGeometry(); sky.setAttribute('position', new T.Float32BufferAttribute(stars, 3));
  scene.add(new T.Points(sky, new T.PointsMaterial({ color: design.color, size: .025, transparent: true, opacity: .35 })));
  let down;
  renderer.domElement.addEventListener('pointerdown', event => { down = [event.clientX, event.clientY]; });
  renderer.domElement.addEventListener('pointerup', event => {
    if (!down || Math.hypot(event.clientX - down[0], event.clientY - down[1]) > 5) return;
    const rect = renderer.domElement.getBoundingClientRect(), ray = new T.Raycaster();
    ray.setFromCamera(new T.Vector2((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1), camera);
    const hit = ray.intersectObjects(meshes)[0];
    if (hit) { const n = hit.object.userData.node; if (n === current && !n.children.length) showDocument(n.sourcePath); else navigate(n); }
  });
  renderer.domElement.addEventListener('webglcontextlost', event => { event.preventDefault(); cancelAnimationFrame(frame); $('#error').textContent = '3D context was interrupted. Reload to restore it; the section buttons still work.'; });
  new ResizeObserver(resize).observe($('#viewport'));
} catch (error) { renderer = null; $('#error').textContent = '3D is unavailable here. You can still explore every section using the navigation below.'; }
function animate(now) {
  const dt = Math.min((now - last) / 1000, .05); last = now;
  if (!paused) { elapsed += dt; introProgress = Math.min(1, introProgress + dt * 2.5); }
  controls.update();
  const ease = 1 - (1 - introProgress) ** 3;
  meshes.forEach((mesh, i) => {
    const group = mesh.parent; group.scale.setScalar(.3 + ease * .7);
    group.position.y = group.userData.rest.y + (paused ? 0 : Math.sin(elapsed * .6 + i) * .12);
    group.rotation.y = design.tilt ? Math.sin(elapsed * .3 + i) * .13 : 0;
  });
  decoration?.(elapsed);
  composer.render();
  const rect = $('#viewport').getBoundingClientRect();
  meshes.forEach((mesh, i) => {
    const position = new T.Vector3(); mesh.getWorldPosition(position); position.project(camera);
    const b = cards[i];
    const pixelsPerUnit = rect.height / (2 * Math.tan(camera.fov * Math.PI / 360) * camera.position.distanceTo(mesh.parent.position));
    b.style.width = `${Math.max(design.labelMin || 85, Math.min(150, design.box[0] * pixelsPerUnit * .86))}px`;
    b.style.left = `${(position.x + 1) * rect.width / 2}px`; b.style.top = `${(-position.y + 1) * rect.height / 2}px`;
    b.style.visibility = position.z > 1 || position.z < -1 ? 'hidden' : 'visible';
  });
  frame = requestAnimationFrame(animate);
}
window.addEventListener('hashchange', () => { if (controls) controls.userDataMoved = false; renderNavigation(); });
window.addEventListener('keydown', event => { if (event.key === 'Escape' && !$('#document').open) navigate(current?.parent || null); });
renderNavigation();
if (renderer) frame = requestAnimationFrame(animate);
else $('#labels').classList.add('fallback');
