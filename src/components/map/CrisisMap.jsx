import { useId, useMemo } from 'react';
import {
  FRAMES,
  LAUNCH_POINT,
  MARKERS,
  RANGE_RINGS,
  SEA_MARKERS,
  landFor,
  lakesFor,
  project,
  quarantineArc,
  rangeRing,
  ringPath,
  shipAt,
} from './geography.js';
import styles from './CrisisMap.module.css';

/* The situation map.

   Two frames. The hemispheric one is the default and carries the scale of the
   crisis: Washington, New York, Moscow, and a site in Cuba, all on one field.
   Inspecting the map moves it to the Caribbean frame and draws the range
   rings — which is what turns the map from decoration into something a player
   has a reason to touch. */

/* Labels hang to the right of their dot by default. A marker can set
   `anchor: 'end'` to hang left instead, which is how two places close enough
   to collide — Washington and the UN — keep their own space. */
const labelX = (marker) => {
  const offset = marker.site ? 12 : 9;
  return marker.anchor === 'end' ? marker.x - offset : marker.x + offset;
};

export default function CrisisMap({
  frame = 'hemispheric',
  showRings = false,
  compact = false,
  /* Backdrop use: no place names, and fill the box without distorting the
     projection. Labels behind a headline compete with it and lose. */
  labels = true,
  cover = false,
  /* From Day 2 the line at sea is drawn; ships appear by day; on the small
     map one of them makes for the line as the day goes on. */
  day = 1,
  progress = 0,
}) {
  const gradientId = useId();
  const frameSpec = FRAMES[frame] ?? FRAMES.hemispheric;

  /* The rings are drawn once per frame and animated by dash offset, so the
     line appears to be traced rather than faded in. */
  const rings = useMemo(
    () =>
      RANGE_RINGS.map((ring) => ({
        ...ring,
        path: ringPath(rangeRing(LAUNCH_POINT.lon, LAUNCH_POINT.lat, ring.distanceMi, frameSpec)),
      })),
    [frameSpec],
  );

  /* Which rings belong to a frame is decided by their bounding boxes rather
     than by a hand-kept list, so adding a frame needs no bookkeeping. */
  const land = useMemo(() => landFor(frameSpec), [frameSpec]);
  const arc = useMemo(() => (day >= 2 ? ringPath(quarantineArc(frameSpec)) : null), [frameSpec, day]);
  const ships = useMemo(
    () =>
      SEA_MARKERS.filter((s) => s.days.includes(day) && s.frames.includes(frame)).map((s) => ({
        ...s,
        ...project(s.lon, s.lat, frameSpec),
      })),
    [frame, frameSpec, day],
  );
  const underway = !labels && (day === 2 || day === 3) ? shipAt(progress, frameSpec) : null;
  const lakes = useMemo(() => lakesFor(frameSpec), [frameSpec]);

  const markers = useMemo(
    () =>
      MARKERS.filter((marker) => marker.frames.includes(frame) && (!marker.fromDay || day >= marker.fromDay)).map((marker) => ({
        ...marker,
        ...project(marker.lon, marker.lat, frameSpec),
      })),
    [frame, frameSpec, day],
  );

  return (
    <svg
      className={`${styles.map} ${compact ? styles.compact : ''}`}
      viewBox={`0 0 ${frameSpec.width} ${frameSpec.height}`}
      preserveAspectRatio={cover ? 'xMidYMid slice' : 'xMidYMid meet'}
      role={labels ? 'img' : 'presentation'}
      aria-hidden={labels ? undefined : 'true'}
      aria-label={
        frame === 'caribbean'
          ? 'Map of the Caribbean and eastern United States, showing Cuba, Havana, the San Cristóbal missile site, Washington and New York.'
          : frame === 'regional'
          ? 'Map of North America and the Caribbean, showing missile range rings drawn from the San Cristóbal site: an inner ring at approximately 1,290 miles and an outer ring at approximately 2,800 miles.'
          : 'World map showing the four centres of the crisis: Washington, the United Nations in New York, Moscow, and a missile site in Cuba.'
      }
    >
      <defs>
        <radialGradient id={`${gradientId}-water`} cx="50%" cy="30%" r="80%">
          <stop offset="0%" stopColor="var(--map-water-lit)" />
          <stop offset="100%" stopColor="var(--map-water)" />
        </radialGradient>
      </defs>

      <rect width={frameSpec.width} height={frameSpec.height} fill={`url(#${gradientId}-water)`} />

      {/* Graticule. Faint, and present mostly so the projection is visible as a
          projection rather than passing itself off as a photograph. */}
      <g className={styles.graticule}>
        {Array.from({ length: 9 }, (_, i) => {
          const y = (frameSpec.height / 8) * i;
          return <line key={`h${i}`} x1={0} y1={y} x2={frameSpec.width} y2={y} />;
        })}
        {Array.from({ length: 13 }, (_, i) => {
          const x = (frameSpec.width / 12) * i;
          return <line key={`v${i}`} x1={x} y1={0} x2={x} y2={frameSpec.height} />;
        })}
      </g>

      <g>
        {land.map((mass) => (
          <path
            key={mass.key}
            d={mass.d}
            className={`${styles.land} ${mass.id === 'cuba' ? styles.landEmphasis : ''}`}
          />
        ))}
        {/* Inland water painted back over the land. Cheaper and steadier than
            interior rings with an even-odd fill, and it lets the lakes take
            the water colour exactly. */}
        {lakes.map((lake) => (
          <path key={lake.key} d={lake.d} className={styles.lake} />
        ))}
      </g>

      {showRings && (
        <g className={styles.rings}>
          {rings.map((ring, index) => (
            <path
              key={ring.id}
              d={ring.path}
              className={`${styles.ring} ${index === 0 ? styles.ringInner : ''}`}
              style={{ animationDelay: `${index * 0.45}s` }}
            />
          ))}
        </g>
      )}

      {arc && <path d={arc} className={styles.arc} />}

      {ships.length > 0 && (
        <g>
          {ships.map((ship) => (
            <g key={ship.id} className={styles.ship}>
              <rect x={ship.x - 4} y={ship.y - 2} width="8" height="4" className={styles.shipMark} />
              {labels && (
                <>
                  <text x={ship.x + 8} y={ship.y - 1} className={styles.label}>
                    {ship.label}
                  </text>
                  <text x={ship.x + 8} y={ship.y + 11} className={styles.sub}>
                    {ship.sub}
                  </text>
                </>
              )}
            </g>
          ))}
        </g>
      )}

      {underway && <circle cx={underway.x} cy={underway.y} r="2.6" className={styles.underway} />}

      <g>
        {markers.map((marker) => (
          <g key={marker.id} className={styles.marker}>
            {marker.site ? (
              <>
                <path
                  d={`M ${marker.x} ${marker.y - 7} L ${marker.x + 6} ${marker.y + 4} L ${marker.x - 6} ${marker.y + 4} Z`}
                  className={styles.siteMark}
                />
                <circle cx={marker.x} cy={marker.y} r={13} className={styles.siteHalo} />
              </>
            ) : (
              <circle cx={marker.x} cy={marker.y} r={3.5} className={styles.dot} />
            )}
            {labels && (
              <>
                <text
                  x={labelX(marker)}
                  y={marker.y - (marker.sub ? 1 : 3)}
                  textAnchor={marker.anchor ?? 'start'}
                  className={`${styles.label} ${marker.site ? styles.labelSite : ''}`}
                >
                  {marker.label}
                </text>
                {marker.sub && (
                  <text
                    x={labelX(marker)}
                    y={marker.y + 11}
                    textAnchor={marker.anchor ?? 'start'}
                    className={styles.sub}
                  >
                    {marker.sub}
                  </text>
                )}
              </>
            )}
          </g>
        ))}
      </g>
    </svg>
  );
}
