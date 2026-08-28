import styles from './rooms.module.css';

/* The parts every room is built from.

   Five rooms, one vocabulary. A room component's job is to arrange these and
   nothing else — if a room needs a shape that is not here, the shape belongs
   here first. That is what keeps the library from turning into five drawings
   that happen to share a folder.

   Everything is drawn in a 1000 x 620 field with the horizon at y=250. Colour
   comes from the CSS module, never from a fill attribute, so the whole set
   re-themes off the tokens the way the map does.

   No shadows: this project reserves those for paper and modal panels. Depth
   here is the ground/raised/inset ladder plus gradients, which is the house
   convention. */

export const FIELD = { w: 1000, h: 620, horizon: 250 };

/* ------------------------------------------------------------- Structure */

/* The back wall and the floor meeting at the horizon. Every room starts here. */
export function Shell({ horizon = FIELD.horizon }) {
  return (
    <>
      <rect x="0" y="0" width={FIELD.w} height={horizon} className={styles.wall} />
      <rect x="0" y={horizon} width={FIELD.w} height={FIELD.h - horizon} className={styles.floor} />
      <line x1="0" y1={horizon} x2={FIELD.w} y2={horizon} className={styles.horizon} />
    </>
  );
}

/* Sparse ruled hairlines. This is the project's existing texture idiom — the
   map's graticule at stroke-width 0.5 — rather than a noise filter, which
   would be a new rendering technique for the sake of grain nobody asked for.
   It reads as drawn, which is the register we want. */
export function Hatching({ y = 0, height = FIELD.horizon, step = 26, vertical = true }) {
  const lines = [];
  if (vertical) {
    for (let x = step; x < FIELD.w; x += step) {
      lines.push(<line key={x} x1={x} y1={y} x2={x} y2={y + height} />);
    }
  } else {
    for (let i = y + step; i < y + height; i += step) {
      lines.push(<line key={i} x1="0" y1={i} x2={FIELD.w} y2={i} />);
    }
  }
  return <g className={styles.hatching}>{lines}</g>;
}

/* A tall window. `blinds` draws slats across it — the cabinet room's are
   always half-drawn, which is most of why that room reads as institutional. */
export function Window({ x, width = 150, top = 34, bottom = 210, blinds = false, lit = false }) {
  const slats = [];
  if (blinds) {
    for (let y = top + 12; y < bottom - 8; y += 15) {
      slats.push(<line key={y} x1={x + 5} y1={y} x2={x + width - 5} y2={y} />);
    }
  }
  return (
    <g>
      <rect
        x={x}
        y={top}
        width={width}
        height={bottom - top}
        className={lit ? styles.windowLit : styles.window}
      />
      <rect x={x} y={top} width={width} height={bottom - top} className={styles.windowFrame} />
      {blinds && <g className={styles.blinds}>{slats}</g>}
    </g>
  );
}

/* A doorway: the corridor's whole reason for existing. Light from somewhere
   you are not. */
export function Doorway({ x, width = 108, top = 60, bottom = FIELD.horizon, open = true }) {
  return (
    <g>
      <rect
        x={x}
        y={top}
        width={width}
        height={bottom - top}
        className={open ? styles.doorOpen : styles.door}
      />
      <rect x={x} y={top} width={width} height={bottom - top} className={styles.doorFrame} />
    </g>
  );
}

/* Walls running away from the viewer. Two trapezoids converging on a
   vanishing point, which is the only perspective trick in the whole set. */
export function Receding({ inset = 250, horizon = FIELD.horizon }) {
  return (
    <g className={styles.receding}>
      <path d={`M 0 0 L ${inset} ${horizon - 90} L ${inset} ${horizon} L 0 ${horizon + 150} Z`} />
      <path
        d={`M ${FIELD.w} 0 L ${FIELD.w - inset} ${horizon - 90} L ${FIELD.w - inset} ${horizon} L ${FIELD.w} ${horizon + 150} Z`}
      />
    </g>
  );
}

/* -------------------------------------------------------------- Furniture */

/* The near edge of a table, sweeping across the lower field. This is the
   single most important part in the set: it is the thing the two presences
   sit on opposite sides of, so its height is what makes them read as facing
   each other rather than floating. */
export function TableEdge({ y = 430, curve = 60, inset = 40 }) {
  const left = inset;
  const right = FIELD.w - inset;
  return (
    <g>
      <path
        d={`M ${left} ${y} Q ${FIELD.w / 2} ${y + curve} ${right} ${y} L ${right} ${FIELD.h} L ${left} ${FIELD.h} Z`}
        className={styles.table}
      />
      <path
        d={`M ${left} ${y} Q ${FIELD.w / 2} ${y + curve} ${right} ${y}`}
        className={styles.tableEdge}
      />
    </g>
  );
}

/* A rank of chair backs behind the table. `count` and `pushedIn` are what
   `occupancy` actually changes — an empty room has fewer chairs and they are
   squared up; an argued-out one has more and they are not. */
export function ChairRank({ y = 300, count = 7, height = 74, pushedIn = true, spread = 880 }) {
  const chairs = [];
  const gap = spread / count;
  const start = (FIELD.w - spread) / 2 + gap / 2;
  for (let i = 0; i < count; i += 1) {
    const x = start + i * gap;
    /* A deterministic wobble rather than Math.random: the same room must draw
       identically on every render, and a chair that jitters on re-render is
       worse than one that never moves. */
    const skew = pushedIn ? 0 : ((i * 37) % 11) - 5;
    const h = height - (i % 3) * 4;
    chairs.push(
      <g key={i} transform={`translate(${x} ${y}) rotate(${skew * 0.35})`}>
        <rect x={-22} y={-h} width={44} height={h} rx="3" className={styles.chair} />
        <line x1={-22} y1={-h + 12} x2={22} y2={-h + 12} className={styles.chairRail} />
      </g>,
    );
  }
  return <g>{chairs}</g>;
}

/* Name cards along a table. The UN chamber runs on these. */
export function PlacardRow({ y = 396, count = 6, spread = 820 }) {
  const cards = [];
  const gap = spread / count;
  const start = (FIELD.w - spread) / 2 + gap / 2;
  for (let i = 0; i < count; i += 1) {
    const x = start + i * gap;
    cards.push(
      <g key={i}>
        <rect x={x - 34} y={y} width={68} height={19} className={styles.placard} />
        <line x1={x - 26} y1={y + 10} x2={x + 26} y2={y + 10} className={styles.placardRule} />
      </g>,
    );
  }
  return <g>{cards}</g>;
}

/* Microphone stalks. Institutional, and the clearest single signal that what
   is said here is on the record. */
export function MicBank({ y = 396, count = 6, spread = 820, height = 46 }) {
  const mics = [];
  const gap = spread / count;
  const start = (FIELD.w - spread) / 2 + gap / 2;
  for (let i = 0; i < count; i += 1) {
    const x = start + i * gap;
    mics.push(
      <g key={i} className={styles.mic}>
        <path d={`M ${x} ${y} L ${x + 13} ${y - height}`} />
        <circle cx={x + 13} cy={y - height} r="5" />
      </g>,
    );
  }
  return <g>{mics}</g>;
}

/* A desk, seen from slightly above and to one side. */
export function Desk({ x = 520, y = 400, width = 420, depth = 150 }) {
  return (
    <g>
      <path
        d={`M ${x} ${y} L ${x + width} ${y + 26} L ${x + width} ${y + depth} L ${x} ${y + depth - 20} Z`}
        className={styles.desk}
      />
      <path d={`M ${x} ${y} L ${x + width} ${y + 26}`} className={styles.deskEdge} />
    </g>
  );
}

/* The one warm thing in the whole set. Rationed deliberately: a lamp is what
   makes a room private, and if every room had one none of them would be. */
export function DeskLamp({ x = 760, y = 392 }) {
  /* The glow is four stacked circles rather than one disc or a blur filter.
     A single flat circle read as an orb hanging in the room, and a blur would
     be the project's first SVG filter — four rings of falling opacity get the
     same falloff out of geometry, which is what everything else here is made
     of. */
  const glow = [1, 0.62, 0.36, 0.18];

  return (
    <g>
      {glow.map((step, i) => (
        <circle
          key={i}
          cx={x}
          cy={y - 74}
          r={34 + i * 26}
          className={styles.lampGlow}
          style={{ opacity: step * 0.5 }}
        />
      ))}
      <path d={`M ${x - 26} ${y} L ${x + 26} ${y} L ${x + 14} ${y - 8} L ${x - 14} ${y - 8} Z`} className={styles.lampBase} />
      <line x1={x} y1={y - 8} x2={x - 6} y2={y - 52} className={styles.lampStem} />
      <path d={`M ${x - 34} ${y - 52} L ${x + 20} ${y - 52} L ${x + 8} ${y - 78} L ${x - 22} ${y - 78} Z`} className={styles.lampShade} />
    </g>
  );
}

/* A telephone. Day 5's embassy "has arranged itself around" one. */
export function Telephone({ x = 300, y = 432 }) {
  return (
    <g className={styles.phone}>
      <rect x={x} y={y} width={62} height={22} rx="3" />
      <path d={`M ${x + 4} ${y - 9} L ${x + 58} ${y - 9} L ${x + 50} ${y} L ${x + 12} ${y} Z`} />
    </g>
  );
}

/* Loose papers. Reads as work in progress without depicting any document —
   which matters, because a legible document on the board side would collide
   with the paper register. */
export function Papers({ x = 240, y = 436, count = 3 }) {
  const sheets = [];
  for (let i = 0; i < count; i += 1) {
    sheets.push(
      <rect
        key={i}
        x={x + i * 9}
        y={y - i * 5}
        width={78}
        height={54}
        rx="1"
        transform={`rotate(${(i % 2 ? 3 : -4)} ${x + 39} ${y + 27})`}
        className={styles.paper}
      />,
    );
  }
  return <g>{sheets}</g>;
}

/* An institutional emblem, abstracted to a disc and a ring. Not the UN
   emblem — an invented mark standing in for one, because reproducing a real
   organisation's insignia is a provenance question this project does not
   need to have. */
export function Emblem({ x = 500, y = 132, r = 62 }) {
  return (
    <g className={styles.emblem}>
      <circle cx={x} cy={y} r={r} />
      <circle cx={x} cy={y} r={r * 0.66} />
      <line x1={x - r} y1={y} x2={x + r} y2={y} />
    </g>
  );
}

/* A wall clock. The corridor and the cabinet room both have one, because in
   both of those scenes the clock is the antagonist. */
export function Clock({ x = 500, y = 96, r = 34 }) {
  return (
    <g className={styles.clock}>
      <circle cx={x} cy={y} r={r} />
      <line x1={x} y1={y} x2={x} y2={y - r * 0.6} />
      <line x1={x} y1={y} x2={x + r * 0.45} y2={y + r * 0.2} />
    </g>
  );
}
