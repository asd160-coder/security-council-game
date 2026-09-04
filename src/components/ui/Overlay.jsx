import { createPortal } from 'react-dom';
import { Button, Eyebrow } from './index.jsx';
import useDialog from './useDialog.js';
import { PLAY } from '../../data/copy.js';
import styles from './Overlay.module.css';

/* A full-screen panel over the board.

   Escape and a click on the scrim dismiss it. Focus is managed by useDialog:
   it moves inside on open, cannot leave by Tab while it is open, and returns
   to whatever opened the panel on close. Before that hook existed this said
   `aria-modal="true"` and let Tab walk straight out into the board behind it.

   Rendered through a portal — see the note in the stylesheet for why that is
   load-bearing rather than tidiness. */

export default function Overlay({ eyebrow, title, width, height, onClose, children }) {
  const dialogRef = useDialog(onClose);

  const style = {};
  if (width) style['--overlay-width'] = `${width}px`;
  if (height) style['--overlay-height'] = `${height}px`;

  return createPortal(
    <div
      ref={dialogRef}
      tabIndex={-1}
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
          <Button onClick={onClose}>{PLAY.close}</Button>
        </div>

        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
