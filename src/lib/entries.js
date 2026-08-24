import { getCard } from '../data/cards.js';
import { getDossier } from '../data/dossiers.js';

/* Resolves an unlock id against both content sets, so callers do not need to
   know whether an id names a perspective card or an intelligence note. */
export function resolveEntry(id) {
  const card = getCard(id);
  if (card) return { ...card, type: 'card' };
  const dossier = getDossier(id);
  if (dossier) return { ...dossier, type: 'dossier' };
  return null;
}

export const KIND_LABEL = {
  country: 'Country',
  actor: 'Actor',
  intelligence: 'Intel',
  channel: 'Channel',
  procedure: 'Procedure',
  geography: 'Geography',
  memo: 'Memo',
};
