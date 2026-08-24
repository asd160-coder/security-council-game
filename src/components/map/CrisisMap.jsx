import { useEffect, useId, useMemo, useState } from 'react';
import {
  FRAMES,
  LANDMASSES,
  LAUNCH_POINT,
  MARKERS,
  RANGE_RINGS,
  project,
  rangeRing,
  ringPath,
  toPath,
} from './geography.js';
import styles from './CrisisMap.module.css';

/* The situation map.

   Two frames. The hemispheric one is the default and carries the scale of the
   crisis: Washington, New York, Moscow, and a site in Cuba, all on one field.
   Inspecting the map moves it to the Caribbean frame and draws the range
   rings — which is what turns the map from decoration into something a player
   has a reason to touch. */

export default function CrisisMap({ frame = 'hemispheric', showRings = false, compact = false }) {
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

  const land = useMemo(
    () =>
      LANDMASSES.filter((mass) => mass.frames.includes(frame)).map((mass) => ({
        ...mass,
        d: toPath(mass.points, frameSpec),
      })),
    [frame, frameSpec],
  );

  const markers = useMemo(
    () =>
      MARKERS.filter((marker) => marker.frames.includes(frame)).map((marker) => ({
        ...marker,
        ...project(marker.lon, marker.lat, frameSpec),
      })),
    [frame, frameSpec],
  );

  return (
    <svg
      className={`${styles.map} ${compact ? styles.compact : ''}`}
      viewBox={`0 0 ${frameSpec.width} ${frameSpec.height}`}
      role="img"
      aria-label={
        frame === 'caribbean'
          ? 'Schematic map of the Caribbean and eastern United States, showing Cuba, Havana, the San Cristóbal missile site, Washington and New York.'
          : 'Schematic world map showing the four centres of the crisis: Washington, the United Nations in New York, Moscow, and a missile site in Cuba.'
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
            key={mass.id}
            d={mass.d}
            className={`${styles.land} ${mass.emphasis ? styles.landEmphasis : ''}`}
          />
        ))}
      </g>

      {showRings && (
        <g className={styles.rings}>
          {rings.map((ring, index) => (
            <path
              key={ring.id}
              d={ring.path}
              className={styles.ring}
              style={{ animationDelay: `${index * 0.45}s` }}
            />
          ))}
        </g>
      )}

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
            <text
              x={marker.x + (marker.site ? 12 : 9)}
              y={marker.y - (marker.sub ? 1 : 3)}
              className={`${styles.label} ${marker.site ? styles.labelSite : ''}`}
            >
              {marker.label}
            </text>
            {marker.sub && (
              <text x={marker.x + (marker.site ? 12 : 9)} y={marker.y + 11} className={styles.sub}>
                {marker.sub}
              </text>
            )}
          </g>
        ))}
      </g>
    </svg>
  );
}

/* Ring labels live outside the SVG so they can use the interface's own type
   scale rather than SVG text metrics. */
export function RingLegend() {
  return RANGE_RINGS;
}

/* Small helper for the panel: delays the caribbean frame swap by a beat so the
   transition reads as a deliberate zoom rather than a flicker. */
export function useDelayedFrame(active, delay = 260) {
  const [frame, setFrame] = useState(active ? 'caribbean' : 'hemispheric');
  useEffect(() => {
    if (!active) {
      setFrame('hemispheric');
      return undefined;
    }
    const timer = setTimeout(() => setFrame('caribbean'), delay);
    return () => clearTimeout(timer);
  }, [active, delay]);
  return frame;
}
