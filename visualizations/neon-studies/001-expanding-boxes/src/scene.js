import { Vector3 } from 'three';

export const design = {
  "name": "Expanding boxes",
  "slug": "001-expanding-boxes",
  "number": "001",
  "accent": "#98f5ce",
  "color": 10024398,
  "description": "A box for every stage. Click into a stage and unfold the framework inside.",
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
  const cols = Math.min(count, count > 6 ? 4 : 3), rows = Math.ceil(count / cols);
  return Array.from({ length: count }, (_, i) => new Vector3((i % cols - (cols - 1) / 2) * 7, ((rows - 1) / 2 - Math.floor(i / cols)) * 5, 0));
}
export function decorate(T, group, positions) {
  const shells = positions.map(p => {
    const g = new T.Group(); g.position.copy(p); group.add(g);
    for (let i = 0; i < 3; i++) {
      const geom = new T.BoxGeometry(4.6 + i * .25, 3 + i * .25, 2.2 + i * .3);
      g.add(new T.LineSegments(new T.EdgesGeometry(geom), new T.LineBasicMaterial({ color: design.color, transparent: true, opacity: .12 - i * .025 }))); geom.dispose();
    }
    return g;
  });
  return time => shells.forEach((g, i) => { g.rotation.y = Math.sin(time * .22 + i) * .08; });
}
