import { PLAY } from '../../data/copy.js';
import styles from './RoleAnchor.module.css';

/* You, still in the room.

   The player's portrait appeared at seat selection and then vanished for five
   days, which left the person making the decisions oddly absent from them.
   This puts them back — beside their own utterances, so the options read as
   things this particular person could say rather than as a menu.

   Deliberately inert. No expressions, no reaction states, no scaling on
   choice. It is an anchor of identity, not an acting system: the moment a
   portrait starts performing, the interface is telling the student how to
   feel about a decision it has no business having an opinion on.

   `alt` carries the illustration marker for anyone who cannot see the image;
   the visible marker sits on the establishing card, where there is room for
   it, rather than being repeated at 40px. */

export default function RoleAnchor({ role, size = 'small', label }) {
  if (!role) return null;

  return (
    <div className={`${styles.anchor} ${size === 'large' ? styles.anchorLarge : ''}`}>
      <span className={styles.frame}>
        <img
          className={styles.portrait}
          src={`portraits/${role.portrait}`}
          style={{ objectPosition: role.portraitFocus }}
          alt={`${role.name} — ${PLAY.illustration.toLowerCase()}`}
          loading="eager"
        />
      </span>
      {label && (
        <span className={styles.identity}>
          <span className={styles.name}>{role.name}</span>
          <span className={styles.title}>{role.delegation}</span>
        </span>
      )}
    </div>
  );
}
