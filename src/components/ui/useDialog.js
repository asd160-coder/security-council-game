import { useCallback, useEffect, useRef } from 'react';

/* What `aria-modal="true"` promises, and what has to be true for it to be
   honest.

   Four things in this game declare themselves modal — the credits panel, the
   shared Overlay behind the archive and the map, the dossier viewer, and the
   epigraph. All four said `role="dialog" aria-modal="true"`, and none of them
   did the two things that attribute is a promise about. An accessibility pass
   found both:

   1. FOCUS ESCAPED. Nothing trapped Tab, and the page behind stayed
      interactive, so tabbing out of a dialog landed on the controls it was
      covering. Because every one of these portals to the end of `<body>`,
      their controls sort LAST in the document's focus order — so on the title
      screen, one Tab from the credits panel's Close button wrapped round to
      "Begin briefing" behind the modal, which starts a run.

   2. FOCUS WAS LOST ON CLOSE. Nothing remembered what opened the dialog, so
      closing it dropped focus to `<body>` and a keyboard user was returned to
      the top of the document to tab their way back.

   This hook fixes both for anything that uses it. It remembers the opener,
   moves focus inside, marks the app root `inert` so the background is neither
   clickable nor reachable by assistive technology, cycles Tab and Shift+Tab
   within the dialog, and puts focus back where it came from on unmount.

   `inert` is what makes the aria-modal claim true rather than merely stated:
   it removes the whole subtree from the focus order and the accessibility
   tree in one attribute, which is exactly the thing being claimed.

   Returns a ref to put on the dialog container. Give that container
   `tabIndex={-1}` so focus has somewhere to land when a dialog holds no
   focusable control of its own. */

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'video[controls]',
  'audio[controls]',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export default function useDialog(onClose, { closeOnEscape = true } = {}) {
  const ref = useRef(null);

  /* Held in a ref so a caller passing an inline arrow does not tear the whole
     dialog down and re-run focus on every render. */
  const close = useRef(onClose);
  close.current = onClose;

  const visible = useCallback((element) => {
    if (element.closest('[aria-hidden="true"]')) return false;
    const style = window.getComputedStyle(element);
    if (style.visibility === 'hidden' || style.display === 'none') return false;
    return element.offsetParent !== null || style.position === 'fixed';
  }, []);

  useEffect(() => {
    const container = ref.current;
    if (!container) return undefined;

    /* Whatever had focus when the dialog opened is where focus is owed back.
       Captured before anything is moved. */
    const opener = document.activeElement;
    const root = document.getElementById('root');

    /* The background stops existing for the keyboard and for assistive
       technology while this is open. Guarded because `inert` is a recent
       addition and an older browser should simply behave as it did before
       rather than throw on the way in. */
    if (root && 'inert' in root) root.inert = true;

    const focusable = () => [...container.querySelectorAll(FOCUSABLE)].filter(visible);

    const first = focusable()[0];
    (first ?? container).focus();

    const onKey = (event) => {
      if (closeOnEscape && event.key === 'Escape') {
        event.stopPropagation();
        close.current();
        return;
      }
      if (event.key !== 'Tab') return;

      const list = focusable();
      if (!list.length) {
        /* Nothing to move to, so Tab does nothing rather than leaving. */
        event.preventDefault();
        return;
      }

      const edge = event.shiftKey ? list[0] : list[list.length - 1];
      const wrapTo = event.shiftKey ? list[list.length - 1] : list[0];

      /* Wrap at the edge, and also catch the case where focus has already
         drifted outside — a click on the scrim, say — so Tab pulls it back in
         rather than continuing through the page behind. */
      if (document.activeElement === edge || !container.contains(document.activeElement)) {
        event.preventDefault();
        wrapTo.focus();
      }
    };

    /* Capture phase, so the trap sees Tab before any handler that might act on
       it or stop it propagating. */
    document.addEventListener('keydown', onKey, true);

    return () => {
      document.removeEventListener('keydown', onKey, true);
      if (root && 'inert' in root) root.inert = false;

      /* Only if it is still in the document — the control that opened this may
         have been unmounted by the same action that closed it. */
      if (opener instanceof HTMLElement && document.contains(opener)) opener.focus();
    };
  }, [closeOnEscape, visible]);

  return ref;
}
