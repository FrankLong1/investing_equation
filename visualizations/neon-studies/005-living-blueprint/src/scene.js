import { Vector3 } from 'three';

export const design = {
  "name": "Living blueprint",
  "slug": "005-living-blueprint",
  "number": "005",
  "accent": "#8ef0e3",
  "color": 9367779,
  "description": "An architectural study of the framework, drawn in light.",
  "box": [
    5.9,
    4,
    2.6
  ],
  "camera": [
    7,
    6,
    29
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
  return Array.from({ length: count }, (_, i) => new Vector3((i % cols - (cols - 1) / 2) * 7.5, ((rows - 1) / 2 - Math.floor(i / cols)) * 5, 0));
}
export function decorate(T, group, positions) {
  const grid = new T.GridHelper(60, 60, 0x397c7a, 0x173739); grid.position.y = -7; group.add(grid);
  positions.forEach(p => {
    for (let j = 0; j < 5; j++) {
      const geom = new T.BoxGeometry(4.8, 3.2, .035);
      const plane = new T.LineSegments(new T.EdgesGeometry(geom), new T.LineBasicMaterial({ color: design.color, transparent: true, opacity: .25 })); geom.dispose();
      plane.position.copy(p).add(new T.Vector3(0, 0, -j * .65)); group.add(plane);
    }
    line(T, group, [new T.Vector3(p.x, -7, -3), new T.Vector3(p.x, p.y, -3)], design.color, .3);
  });
  const scan = new T.Mesh(new T.PlaneGeometry(25, .018), new T.MeshBasicMaterial({ color: design.color, transparent: true, opacity: .5 })); scan.position.z = 2; group.add(scan);
  return time => { scan.position.y = Math.sin(time * .3) * 7; };
}
