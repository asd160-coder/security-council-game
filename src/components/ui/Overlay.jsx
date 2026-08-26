import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button, Eyebrow } from './index.jsx';
import { PLAY } from '../../data/copy.js';
import styles from './Overlay.module.css';

/* A full-screen panel over the board.

   Escape and a click on the scrim dismiss it; focus moves to the close control
   on open. Rendered through a portal — see the note in the stylesheet for why
   that is load-bearing rather than tidiness. */

export default function Overlay({ eyebrow, title, width, height, onClose, children }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const style = {};
  if (width) style['--overlay-width'] = `${width}px`;
  if (height) style['--overlay-height'] = `${height}px`;

  return createPortal(
    <div
      className={styles.scrim}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.panel} style={style}>
        <div className={styles.head}>
          <div className={styles.heading}>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h2 className={styles.title}>{title}</h2>
          </div>
          <Button ref={closeRef} onClick={onClose}>
            {PLAY.close}
          </Button>
        </div>

        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
