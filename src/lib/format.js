/* A delta is written the way a photo interpreter would mark a print: an arrow
   and a number, nothing else. */
export const formatDelta = (value) => `${value > 0 ? '▲' : '▼'} ${value > 0 ? '+' : ''}${value}`;

export const formatValue = (value) => (value > 0 ? `+${value}` : `${value}`);

/* Danger indicators rising, and institutional indicators falling, both deserve
   the wax red. This returns which palette register a *movement* belongs to,
   which is not always the tracker's own register — trust falling is a warning
   even though trust is a brass variable. */
export function deltaRegister(trackerRegister, delta) {
  if (trackerRegister === 'danger') return delta > 0 ? 'danger' : 'calm';
  if (trackerRegister === 'legitimacy') return delta > 0 ? 'legitimacy' : 'danger';
  return 'neutral';
}
