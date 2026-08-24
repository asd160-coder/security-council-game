import { useEffect, useState } from 'react';

/* Delays the map's frame swap by a beat so the change reads as a deliberate
   move to a new view rather than a flicker.

   Lives here rather than beside CrisisMap because a file that exports both a
   component and a plain function loses React Fast Refresh — the whole module
   reloads on every edit instead of hot-swapping. */
export default function useDelayedFrame(active, delay = 260) {
  const [frame, setFrame] = useState(active ? 'regional' : 'hemispheric');

  useEffect(() => {
    if (!active) {
      setFrame('hemispheric');
      return undefined;
    }
    const timer = setTimeout(() => setFrame('regional'), delay);
    return () => clearTimeout(timer);
  }, [active, delay]);

  return frame;
}
