/* Schematic geography for the situation map.

   These outlines are coarse on purpose. The map's job is to show the four
   poles of the crisis and the distance between them — not to be an atlas. It
   is labelled as schematic in the legend so a student is never invited to
   measure anything off it.

   The range rings, by contrast, ARE accurate: they are computed by walking a
   true great-circle bearing around the launch point, so their shape reflects
   the real projected footprint rather than a drawn ellipse. The distances a
   student might carry away from this screen are the ones worth getting right. */

/* Equirectangular projection. Simple, and honest about being a projection. */
export const project = (lon, lat, frame) => ({
  x: ((lon - frame.lon0) / (frame.lon1 - frame.lon0)) * frame.width,
  y: ((frame.lat1 - lat) / (frame.lat1 - frame.lat0)) * frame.height,
});

export const FRAMES = {
  hemispheric: { lon0: -128, lon1: 52, lat0: -6, lat1: 74, width: 1000, height: 520 },
  caribbean: { lon0: -94, lon1: -58, lat0: 14, lat1: 44, width: 1000, height: 520 },
  /* The frame the range rings are drawn in. A 1,290-mile radius is roughly 19
     degrees of arc, which overflows the Caribbean frame entirely and renders
     as a wash of colour rather than as a ring. This frame is sized so the
     MRBM ring sits inside it and the IRBM ring runs off the edge — which is
     itself the point worth seeing. */
  regional: { lon0: -122, lon1: -42, lat0: -4, lat1: 60, width: 1000, height: 520 },
};

const NORTH_AMERICA = [
  [-125, 49], [-124, 40], [-120, 34], [-117, 32], [-114, 31], [-108, 31], [-103, 29],
  [-97, 26], [-97, 21], [-94, 18], [-91, 18], [-88, 21], [-84, 22], [-83, 25], [-81, 25],
  [-80, 27], [-81, 31], [-79, 33], [-76, 35], [-75, 38], [-74, 40], [-71, 42], [-70, 43],
  [-67, 45], [-65, 44], [-60, 47], [-55, 52], [-60, 55], [-65, 60], [-70, 62], [-80, 63],
  [-90, 62], [-100, 60], [-112, 60], [-122, 58], [-125, 55],
];

const CUBA = [
  [-84.9, 21.9], [-84.0, 22.1], [-82.8, 23.0], [-81.5, 23.2], [-80.3, 23.1], [-79.3, 22.6],
  [-77.7, 21.8], [-76.5, 21.3], [-75.6, 21.1], [-74.1, 20.3], [-75.2, 19.9], [-76.8, 19.9],
  [-78.2, 20.2], [-79.6, 20.8], [-81.0, 21.5], [-82.4, 21.7], [-83.6, 22.0],
];

const HISPANIOLA = [
  [-74.4, 20.0], [-71.7, 19.9], [-69.0, 19.3], [-68.3, 18.6], [-70.0, 18.2], [-72.0, 18.2],
  [-73.4, 18.2], [-74.5, 18.6],
];

const FLORIDA_KEYS = [
  [-82.9, 24.6], [-81.4, 24.5], [-80.3, 25.1], [-80.9, 25.2],
];

const SOUTH_AMERICA_N = [
  [-78, 8], [-75, 10], [-71, 12], [-66, 10], [-62, 10], [-60, 8], [-56, 5], [-52, 4],
  [-50, 0], [-48, -6], [-52, -6], [-58, -4], [-64, -4], [-70, -2], [-76, 0], [-79, 2],
];

const EURASIA = [
  [-10, 36], [-9, 43], [-2, 43], [-1, 46], [-4, 48], [2, 51], [7, 53], [10, 57],
  [13, 54], [19, 54], [24, 57], [30, 60], [26, 65], [21, 70], [28, 71], [40, 68],
  [52, 70], [52, 60], [50, 50], [48, 44], [40, 42], [36, 36], [28, 36], [24, 38],
  [18, 40], [14, 38], [12, 44], [8, 44], [3, 42], [-2, 36],
];

const AFRICA_N = [
  [-17, 21], [-16, 14], [-13, 9], [-8, 5], [-2, 5], [4, 6], [9, 4], [14, -4],
  [18, -6], [24, -6], [32, -3], [40, -3], [43, 5], [51, 12], [43, 12], [38, 16],
  [35, 24], [33, 31], [25, 32], [18, 30], [11, 34], [3, 36], [-6, 36], [-13, 28],
];

export const LANDMASSES = [
  { id: 'north-america', points: NORTH_AMERICA, frames: ['hemispheric', 'caribbean', 'regional'] },
  { id: 'cuba', points: CUBA, frames: ['hemispheric', 'caribbean', 'regional'], emphasis: true },
  { id: 'hispaniola', points: HISPANIOLA, frames: ['hemispheric', 'caribbean', 'regional'] },
  { id: 'florida-keys', points: FLORIDA_KEYS, frames: ['caribbean', 'regional'] },
  { id: 'south-america', points: SOUTH_AMERICA_N, frames: ['hemispheric', 'caribbean', 'regional'] },
  { id: 'eurasia', points: EURASIA, frames: ['hemispheric'] },
  { id: 'africa', points: AFRICA_N, frames: ['hemispheric'] },
];

/* The four poles of the crisis. */
export const MARKERS = [
  { id: 'washington', label: 'Washington', lon: -77.04, lat: 38.9, anchor: 'end', frames: ['hemispheric', 'caribbean', 'regional'] },
  { id: 'new-york', label: 'United Nations', sub: 'New York', lon: -73.97, lat: 40.75, frames: ['hemispheric', 'caribbean', 'regional'] },
  { id: 'moscow', label: 'Moscow', lon: 37.62, lat: 55.75, frames: ['hemispheric'] },
  { id: 'havana', label: 'Havana', lon: -82.38, lat: 23.13, frames: ['caribbean'] },
  { id: 'san-cristobal', label: 'San Cristóbal', sub: 'Missile site', lon: -83.05, lat: 22.72, site: true, frames: ['hemispheric', 'caribbean', 'regional'] },
];

const EARTH_RADIUS_MI = 3958.8;
const toRad = (deg) => (deg * Math.PI) / 180;
const toDeg = (rad) => (rad * 180) / Math.PI;

/* Destination point at a given great-circle distance and bearing. */
function destination(lon, lat, distanceMi, bearingDeg) {
  const delta = distanceMi / EARTH_RADIUS_MI;
  const theta = toRad(bearingDeg);
  const phi1 = toRad(lat);
  const lambda1 = toRad(lon);

  const phi2 = Math.asin(
    Math.sin(phi1) * Math.cos(delta) + Math.cos(phi1) * Math.sin(delta) * Math.cos(theta),
  );
  const lambda2 =
    lambda1 +
    Math.atan2(
      Math.sin(theta) * Math.sin(delta) * Math.cos(phi1),
      Math.cos(delta) - Math.sin(phi1) * Math.sin(phi2),
    );

  return { lon: toDeg(lambda2), lat: toDeg(phi2) };
}

/* A true range ring, as a projected polygon. */
export function rangeRing(lon, lat, distanceMi, frame, steps = 180) {
  const points = [];
  for (let i = 0; i <= steps; i += 1) {
    const bearing = (i / steps) * 360;
    const point = destination(lon, lat, distanceMi, bearing);
    points.push(project(point.lon, point.lat, frame));
  }
  return points;
}

/* The two missile types emplaced or en route in October 1962.

   A note on the numbers, because they are the figures most likely to be
   remembered from this screen. The 1962 briefing charts marked their arcs at
   1,020 and 2,200 NAUTICAL miles. Those same numbers are widely repeated as
   statute miles, which is wrong by a wide enough margin to matter: Washington
   lies 1,173 statute miles from San Cristóbal, so a 1,100-statute-mile arc
   would place the capital outside MRBM range and invert the entire point of
   the map. The values below are the missiles' published ranges in kilometres,
   converted. */
export const RANGE_RINGS = [
  {
    id: 'mrbm',
    label: 'SS-4 MRBM',
    detail: 'R-12',
    distanceMi: 1292, // 2,080 km
    note: '2,080 km · approx. 1,290 miles',
  },
  {
    id: 'irbm',
    label: 'SS-5 IRBM',
    detail: 'R-14',
    distanceMi: 2796, // 4,500 km
    note: '4,500 km · approx. 2,800 miles',
  },
];

export const LAUNCH_POINT = { lon: -83.05, lat: 22.72 };

export const toPath = (points, frame) => {
  const projected = points.map(([lon, lat]) => project(lon, lat, frame));
  return `M ${projected.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L ')} Z`;
};

export const ringPath = (points) =>
  `M ${points.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L ')} Z`;
