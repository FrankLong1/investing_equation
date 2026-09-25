import { Vector3 } from 'three';

export const design = {
  "name": "Infinite canvas",
  "slug": "002-infinite-canvas",
  "number": "002",
  "accent": "#8dcbff",
  "color": 9292799,
  "description": "A suspended field of functions. Drag, zoom, and follow the hierarchy.",
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
  "tilt": false
};

function line(T, group, points, color, opacity = .25) {
  const geometry = new T.BufferGeometry().setFromPoints(points);
  const material = new T.LineBasicMaterial({ color, transparent: true, opacity });
  const object = new T.Line(geometry, material); group.add(object); return object;
}
export function layout(count) {
  const cols = Math.min(count > 6 ? 4 : 3, count), rows = Math.ceil(count / cols);
  return Array.from({ length: count }, (_, i) => new Vector3((i % cols - (cols - 1) / 2) * 8, ((rows - 1) / 2 - Math.floor(i / cols)) * 5, (i % 2) * -3));
}
export function decorate(T, group, positions) {
  const grid = new T.GridHelper(100, 70, 0x497799, 0x18303e); grid.rotation.x = Math.PI / 2; grid.position.z = -7; group.add(grid);
  const motes = [];
  positions.forEach((p, i) => {
    for (let j = 0; j < 10; j++) {
      const q = p.clone().add(new T.Vector3(Math.sin(j * 7.9) * 3, Math.cos(j * 5.1) * 2, -3 - j * .17));
      line(T, group, [p, q], design.color, .1);
      const mote = new T.Mesh(new T.OctahedronGeometry(.07), new T.MeshBasicMaterial({ color: design.color })); mote.position.copy(q); group.add(mote); motes.push(mote);
    }
  });
  return time => motes.forEach((m, i) => { m.scale.setScalar(1 + Math.sin(time + i) * .35); });
}
