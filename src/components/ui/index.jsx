import styles from './ui.module.css';

/* Shared primitives. Kept in one file because each is a handful of lines and
   splitting them across five files would obscure how consistent they are. */

export function Eyebrow({ children, className = '' }) {
  return <span className={`eyebrow ${className}`}>{children}</span>;
}

const PAPER_FORMAT = {
  cable: 'paperCable',
  memo: 'paperMemo',
};

/* `format` is the kind of paper this is — a cable arrives in the teleprinter
   register and carries a received stamp; a memo carries a clip — and it is
   data, declared on the card, never inferred from its words.

   `titleAs` sets the heading level, because the right level depends on where
   the card sits rather than on what a card is. Inside a day the paper is the
   step's own heading and belongs directly under the day's h1, so those pass
   'h2'; a card in a rail or a dialog sits below something else and keeps the
   h3 default. Getting this wrong is not cosmetic — a screen-reader user moving
   by heading reads the outline as the structure of the page. */
export function Paper({
  eyebrow,
  title,
  titleAs: Title = 'h3',
  aged = false,
  format,
  stamp,
  className = '',
  children,
}) {
  const formatClass = PAPER_FORMAT[format] ? styles[PAPER_FORMAT[format]] : '';
  return (
    <article className={`${styles.paper} ${aged ? styles.paperAged : ''} ${formatClass} ${className}`}>
      {stamp && (
        <span className={styles.paperStamp} aria-hidden="true">
          {stamp}
        </span>
      )}
      {eyebrow && <span className={styles.paperEyebrow}>{eyebrow}</span>}
      {title && <Title className={styles.paperTitle}>{title}</Title>}
      {children}
    </article>
  );
}

export function PaperBody({ paragraphs = [], children }) {
  return (
    <div className={styles.paperBody}>
      {paragraphs.map((text) => (
        <p key={text.slice(0, 40)}>{text}</p>
      ))}
      {children}
    </div>
  );
}

export function Field({ label, children }) {
  return (
    <div className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <p className={styles.fieldValue}>{children}</p>
    </div>
  );
}

export function SourceLine({ source, rights, onBoard = false }) {
  return (
    <p className={`${styles.source} ${onBoard ? styles.sourceOnBoard : ''}`}>
      <span className={styles.sourceKey}>Source</span> {source}
      {rights && (
        <>
          {' · '}
          <span className={styles.sourceKey}>Rights</span> {rights}
        </>
      )}
    </p>
  );
}

export function Button({ variant = 'default', className = '', ...props }) {
  const variantClass =
    variant === 'primary' ? styles.buttonPrimary : variant === 'quiet' ? styles.buttonQuiet : '';
  return <button type="button" className={`${styles.button} ${variantClass} ${className}`} {...props} />;
}

export function Reveal({ delay = 0, className = '', children }) {
  return (
    <div className={`${styles.reveal} ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
