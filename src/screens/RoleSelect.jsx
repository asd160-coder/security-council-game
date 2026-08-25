import { ROLES } from '../data/roles.js';
import { PLAY, ROLE_SELECT } from '../data/copy.js';
import { Reveal } from '../components/ui/index.jsx';
import styles from './RoleSelect.module.css';

const SEAT_CLASS = {
  rfk: styles.seatUs,
  dobrynin: styles.seatUssr,
  uthant: styles.seatUn,
};

export default function RoleSelect({ onSelect }) {
  return (
    <div className={styles.screen}>
      <Reveal className={styles.head}>
        <span className="eyebrow">{ROLE_SELECT.eyebrow}</span>
        <h1 className={styles.title}>{ROLE_SELECT.title}</h1>
        <p className={styles.standfirst}>{ROLE_SELECT.standfirst}</p>
      </Reveal>

      <div className={styles.grid}>
        {ROLES.map((role, index) => (
          <Reveal key={role.id} delay={120 + index * 110}>
            <button
              type="button"
              className={`${styles.card} ${SEAT_CLASS[role.id]}`}
              onClick={() => onSelect(role.id)}
              /* The card's own text would make an accessible name several
                 sentences long. This says what the control does. */
              aria-label={`${ROLE_SELECT.choose}: ${role.name}, ${role.title}`}
              style={{ height: '100%' }}
            >
              <span className={styles.portraitFrame}>
                <img
                  className={styles.portrait}
                  src={`portraits/${role.portrait}`}
                  style={{ objectPosition: role.portraitFocus }}
                  alt=""
                  loading="eager"
                />
                <span className={styles.illustrationMark}>{PLAY.illustration}</span>
              </span>

              <span className={styles.cardBody}>
                <span className={styles.delegation}>{role.delegation}</span>
                <span className={styles.name}>{role.name}</span>
                <span className={styles.role}>{role.title}</span>
                <span className={styles.standfirstCard}>{role.standfirst}</span>

                <span className={styles.fields}>
                  <span className={styles.field}>
                    <span className={styles.fieldLabel}>{ROLE_SELECT.emphasis}</span>
                    <span className={styles.fieldValue}>{role.emphasis}</span>
                  </span>
                  <span className={styles.field}>
                    <span className={styles.fieldLabel}>{ROLE_SELECT.tension}</span>
                    <span className={styles.fieldValue}>{role.tension}</span>
                  </span>
                </span>
              </span>

              <span className={styles.take}>{ROLE_SELECT.choose}</span>
            </button>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
