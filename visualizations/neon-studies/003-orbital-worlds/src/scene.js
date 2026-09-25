import { Vector3 } from 'three';

export const design = {
  "name": "Orbital worlds",
  "labelMin": 120,
  "slug": "003-orbital-worlds",
  "number": "003",
  "accent": "#c7a5ff",
  "color": 13084159,
  "description": "The framework held in one orbit. Enter a world to discover its sections.",
  "box": [
    5.9,
    4,
    2.6
  ],
  "camera": [
    0,
    2,
    27
  ],
  "tilt": true
};

function line(T, group, points, color, opacity = .25) {
  const geometry = new T.BufferGeometry().setFromPoints(points);
  const material = new T.LineBasicMaterial({ color, transparent: true, opacity });
  const object = new T.Line(geometry, material); group.add(object); return object;
}
export function layout(count) {
  return Array.from({ length: count }, (_, i) => new Vector3(Math.cos(i / count * Math.PI * 2 + Math.PI / 6) * (count > 1 ? 8.5 : 0), Math.sin(i / count * Math.PI * 2 + Math.PI / 6) * (count > 1 ? 5.4 : 0), 0));
}
export function decorate(T, group, positions) {
  const rings = [];
  for (let j = 0; j < 3; j++) {
    const pts = Array.from({ length: 181 }, (_, i) => new T.Vector3(Math.cos(i / 180 * Math.PI * 2) * (10 + j * .5), Math.sin(i / 180 * Math.PI * 2) * (6.5 + j * .4), -2));
    const ring = line(T, group, pts, design.color, .15); rings.push(ring);
  }
  const core = new T.Mesh(new T.IcosahedronGeometry(1.1, 1), new T.MeshBasicMaterial({ color: design.color, wireframe: true, transparent: true, opacity: .25 })); group.add(core); core.position.z = -3;
  positions.forEach(p => {
    const ring = new T.Mesh(new T.TorusGeometry(2.3, .015, 4, 70), new T.MeshBasicMaterial({ color: design.color, transparent: true, opacity: .45 })); ring.position.copy(p); ring.rotation.x = .5; group.add(ring); rings.push(ring);
  });
  return time => { core.rotation.set(time * .08, time * .12, 0); rings.forEach((r, i) => { r.rotation.y = Math.sin(time * .18 + i) * .2; }); };
}
