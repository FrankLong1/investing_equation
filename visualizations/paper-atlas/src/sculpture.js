import * as T from 'three';

// A paper pinwheel: solid extruded sectors, soft shadows, printed chapter numbers.
// This is an index into the documents, not a diagram of execution dependencies.
export function makeSculpture(host, stages, colors, openChapter, onError) {
  let renderer;
  try { renderer = new T.WebGLRenderer({ antialias: true, alpha: true }); }
  catch { onError(); return { pause() {}, select() {} }; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFShadowMap;
  renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.2;
  host.append(renderer.domElement);
  const scene = new T.Scene(), camera = new T.PerspectiveCamera(38, 1, .1, 80);
  camera.position.set(0, -4.3, 10.7); camera.lookAt(0, 0, 0);
  scene.add(new T.HemisphereLight(0xffffff, 0xc2b9a0, 2.7));
  const sun = new T.DirectionalLight(0xfff7e7, 3.1); sun.position.set(-3, 5, 9); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6, near: .5, far: 25 }); sun.shadow.normalBias = .03; sun.shadow.bias = -.0001; sun.shadow.radius = 5; scene.add(sun);
  const floor = new T.Mesh(new T.PlaneGeometry(100, 100), new T.ShadowMaterial({ opacity: .13 })); floor.position.z = -.7; floor.receiveShadow = true; scene.add(floor);
  const assembly = new T.Group(); assembly.rotation.z = -.22; scene.add(assembly);
  const pieces = [], pickable = [];
  stages.forEach((stage, i) => {
    const start = i / stages.length * Math.PI * 2 + .045, end = (i + 1) / stages.length * Math.PI * 2 - .045, mid = (start + end) / 2;
    const shape = new T.Shape(); shape.absarc(0, 0, 3.25, start, end, false); shape.absarc(0, 0, .78, end, start, true); shape.closePath();
    const geo = new T.ExtrudeGeometry(shape, { depth: .14, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: .045, bevelThickness: .035, curveSegments: 48 });
    const material = new T.MeshStandardMaterial({ color: colors[i % colors.length], roughness: .96, metalness: 0 });
    const piece = new T.Group(), mesh = new T.Mesh(geo, material); mesh.castShadow = true; mesh.receiveShadow = true; mesh.userData.index = i; piece.add(mesh); pickable.push(mesh);
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 256;
    const context = canvas.getContext('2d'); context.fillStyle = '#262e30'; context.textAlign = 'center'; context.textBaseline = 'middle'; context.font = 'italic 125px Georgia'; context.fillText(stage.id, 128, 137);
    const texture = new T.CanvasTexture(canvas); texture.colorSpace = T.SRGBColorSpace;
    const ink = new T.Mesh(new T.PlaneGeometry(.85, .85), new T.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1 }));
    ink.position.set(Math.cos(mid) * 2.1, Math.sin(mid) * 2.1, .185); ink.rotation.z = .22; piece.add(ink);
    piece.userData = { mid, index: i }; piece.position.z = (i % 3) * .085; assembly.add(piece); pieces.push(piece);
  });
  const pin = new T.Mesh(new T.CylinderGeometry(.46, .46, .21, 64), new T.MeshStandardMaterial({ color: 0xeee6d2, roughness: .9 })); pin.rotation.x = Math.PI / 2; pin.position.z = .08; pin.castShadow = true; assembly.add(pin);
  let selected = -1, hover = -1, paused = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let time = 0, last = performance.now(), angle = -.22, down = null, frame, moved = false;
  const raycaster = new T.Raycaster();
  function hit(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    raycaster.setFromCamera(new T.Vector2((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1), camera);
    return raycaster.intersectObjects(pickable)[0]?.object.userData.index ?? -1;
  }
  renderer.domElement.addEventListener('pointerdown', event => { down = { x: event.clientX, y: event.clientY, angle }; moved = false; });
  renderer.domElement.addEventListener('pointermove', event => {
    hover = hit(event); host.style.cursor = hover >= 0 ? 'pointer' : 'grab';
    if (down && event.buttons) { const delta = event.clientX - down.x; moved ||= Math.hypot(delta, event.clientY - down.y) > 6; if (moved) angle = down.angle + delta * .006; }
  });
  renderer.domElement.addEventListener('pointerup', event => { if (down && !moved) { const index = hit(event); if (index >= 0) openChapter(stages[index]); } down = null; });
  renderer.domElement.addEventListener('pointerleave', () => { hover = -1; down = null; });
  renderer.domElement.addEventListener('pointercancel', () => { down = null; });
  function resize() { const { width, height } = host.getBoundingClientRect(); renderer.setSize(width, height); camera.aspect = width / height; camera.position.z = Math.max(10.7, 10 / camera.aspect); camera.updateProjectionMatrix(); }
  new ResizeObserver(resize).observe(host); resize();
  function animate(now) {
    const dt = Math.min((now - last) / 1000, .05); last = now; if (!paused) time += dt;
    assembly.rotation.z = angle + Math.sin(time * .22) * .06;
    pieces.forEach((p, i) => {
      const active = i === hover || i === selected, amount = active ? .23 : .015;
      const target = new T.Vector3(Math.cos(p.userData.mid) * amount, Math.sin(p.userData.mid) * amount, (i % 3) * .085 + (active ? .25 : Math.sin(time * .7 + i) * .035));
      p.position.lerp(target, paused ? 1 : 1 - Math.exp(-dt * 7));
    });
    renderer.render(scene, camera); frame = requestAnimationFrame(animate);
  }
  frame = requestAnimationFrame(animate);
  renderer.domElement.addEventListener('webglcontextlost', e => { e.preventDefault(); cancelAnimationFrame(frame); onError(); });
  return { pause(value) { paused = value; }, select(index) { selected = index; } };
}
