import { Vector3 } from 'three';

export const design = {
  "name": "Information reactor",
  "slug": "004-information-reactor",
  "number": "004",
  "accent": "#ffc88c",
  "color": 16763020,
  "description": "A luminous chamber for each stage, surrounded by moving information.",
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
  const cols = Math.min(count > 6 ? 4 : 3, count), rows = Math.ceil(count / cols);
  return Array.from({ length: count }, (_, i) => new Vector3((i % cols - (cols - 1) / 2) * 7.5, ((rows - 1) / 2 - Math.floor(i / cols)) * 5.5, 0));
}
export function decorate(T, group, positions) {
  const rings = [];
  positions.forEach(p => {
    for (let j = 0; j < 3; j++) {
      const ring = new T.Mesh(new T.TorusGeometry(2.6 + j * .17, .018, 5, 90), new T.MeshBasicMaterial({ color: design.color, transparent: true, opacity: .3 }));
      ring.position.copy(p); ring.rotation.set(.4 * j, .5 * j, .3 * j); group.add(ring); rings.push(ring);
    }
  });
  const points = new Float32Array(1500 * 3), geometry = new T.BufferGeometry(); geometry.setAttribute('position', new T.BufferAttribute(points, 3));
  group.add(new T.Points(geometry, new T.PointsMaterial({ color: design.color, size: .045, transparent: true, opacity: .8, blending: T.AdditiveBlending, depthWrite: false })));
  return time => {
    rings.forEach((r, i) => { r.rotation.y = time * .12 + i * .3; r.rotation.x = time * .08 + i * .2; });
    for (let i = 0; i < 1500; i++) {
      const p = positions[i % positions.length], a = i * 2.399 + time * .35, radius = 2.8 + (i % 17) * .045;
      points[i * 3] = p.x + Math.cos(a) * radius; points[i * 3 + 1] = p.y + Math.sin(a) * radius; points[i * 3 + 2] = Math.sin(a * 2 + time) * 1.8;
    }
    geometry.attributes.position.needsUpdate = true;
  };
}
