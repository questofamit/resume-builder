/**
 * Reusable UI primitives
 * Input, Textarea, Button, Badge, IconButton
 */
import React from "react";

/* ── Input ─────────────────────────────────────────────────────── */
export function Input({ label, id, hint, error, className = "", ...props }) {
  return (
    <div className={`field ${className}`} style={styles.field}>
      {label && (
        <label htmlFor={id} style={styles.label}>
          {label}
        </label>
      )}
      <input
        id={id}
        style={{ ...styles.input, ...(error ? styles.inputError : {}) }}
        {...props}
      />
      {hint  && <span style={styles.hint}>{hint}</span>}
      {error && <span style={styles.error}>{error}</span>}
    </div>
  );
}

/* ── Textarea ──────────────────────────────────────────────────── */
export function Textarea({ label, id, hint, rows = 3, className = "", ...props }) {
  return (
    <div className={`field ${className}`} style={styles.field}>
      {label && (
        <label htmlFor={id} style={styles.label}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        style={{ ...styles.input, resize: "vertical", lineHeight: 1.6 }}
        {...props}
      />
      {hint && <span style={styles.hint}>{hint}</span>}
    </div>
  );
}

/* ── Button ────────────────────────────────────────────────────── */
export function Button({ children, variant = "primary", size = "md", loading, disabled, icon, style: propStyle, ...props }) {
  const base     = styles.btn;
  const varStyle = styles[`btn_${variant}`] || {};
  const szStyle  = styles[`btn_${size}`]    || {};

  return (
    <button
      disabled={disabled || loading}
      style={{ ...base, ...varStyle, ...szStyle, ...propStyle, ...(disabled || loading ? styles.btn_disabled : {}) }}
      {...props}
    >
      {loading ? (
        <span style={styles.spinner} aria-label="Loading" />
      ) : icon ? (
        <span style={styles.btnIcon}>{icon}</span>
      ) : null}
      {children}
    </button>
  );
}

/* ── Badge ─────────────────────────────────────────────────────── */
export function Badge({ children, onRemove }) {
  return (
    <span style={styles.badge}>
      {children}
      {onRemove && (
        <button type="button" onClick={onRemove} style={styles.badgeX} aria-label={`Remove ${children}`}>
          ×
        </button>
      )}
    </span>
  );
}

/* ── SectionCard ───────────────────────────────────────────────── */
export function SectionCard({ title, icon, children, action }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <div style={styles.cardTitle}>
          {icon && <span style={styles.cardIcon}>{icon}</span>}
          <h3 style={styles.cardTitleText}>{title}</h3>
        </div>
        {action}
      </div>
      <div style={styles.cardBody}>{children}</div>
    </div>
  );
}

/* ── EntryCard (education/experience/project items) ────────────── */
export function EntryCard({ children, onRemove, index }) {
  return (
    <div style={styles.entry}>
      <div style={styles.entryIndex}>{index + 1}</div>
      <div style={styles.entryContent}>{children}</div>
      {onRemove && (
        <button type="button" onClick={onRemove} style={styles.entryRemove} aria-label="Remove entry">
          ×
        </button>
      )}
    </div>
  );
}

/* ── Divider ───────────────────────────────────────────────────── */
export function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid var(--gray-200)", margin: "12px 0" }} />;
}

/* ── Styles ─────────────────────────────────────────────────────── */
const styles = {
  field:       { display: "flex", flexDirection: "column", gap: 5 },
  label:       { fontSize: 12, fontWeight: 600, color: "var(--gray-600)", letterSpacing: ".4px", textTransform: "uppercase" },
  input: {
    width: "100%", padding: "9px 12px",
    border: "1.5px solid var(--gray-200)", borderRadius: "var(--r-md)",
    fontSize: 14, fontFamily: "var(--font-ui)", color: "var(--ink)",
    background: "var(--white)", outline: "none", transition: "border-color var(--dur) var(--ease)",
    lineHeight: 1.5,
  },
  inputError:  { borderColor: "var(--red)" },
  hint:        { fontSize: 11, color: "var(--gray-400)" },
  error:       { fontSize: 11, color: "var(--red)", fontWeight: 500 },

  btn: {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7,
    fontFamily: "var(--font-ui)", fontWeight: 600, letterSpacing: ".2px",
    border: "none", borderRadius: "var(--r-md)", cursor: "pointer",
    transition: "all var(--dur) var(--ease)", whiteSpace: "nowrap",
  },
  btn_primary:  { background: "var(--ink-2)", color: "var(--white)" },
  btn_blue:     { background: "var(--blue)", color: "var(--white)" },
  btn_outline:  { background: "transparent", color: "var(--ink)", border: "1.5px solid var(--gray-200)" },
  btn_ghost:    { background: "transparent", color: "var(--blue)", padding: 0 },
  btn_danger:   { background: "var(--red)", color: "var(--white)" },
  btn_sm:       { padding: "7px 14px", fontSize: 13 },
  btn_md:       { padding: "10px 18px", fontSize: 14 },
  btn_lg:       { padding: "13px 24px", fontSize: 15 },
  btn_disabled: { opacity: .5, cursor: "not-allowed" },
  btnIcon:      { display: "flex", alignItems: "center" },

  spinner: {
    display: "inline-block", width: 14, height: 14,
    border: "2px solid rgba(255,255,255,.3)", borderTopColor: "white",
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
  },

  badge: {
    display: "inline-flex", alignItems: "center", gap: 5,
    padding: "4px 10px", background: "var(--blue-muted)", color: "var(--blue)",
    borderRadius: "var(--r-full)", fontSize: 12, fontWeight: 600,
  },
  badgeX: {
    background: "none", border: "none", cursor: "pointer",
    color: "var(--blue)", fontSize: 15, lineHeight: 1, padding: 0,
    display: "flex", alignItems: "center",
  },

  card: {
    background: "var(--white)", borderRadius: "var(--r-lg)",
    border: "1.5px solid var(--gray-200)", overflow: "hidden",
    boxShadow: "var(--shadow-sm)",
  },
  cardHeader: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "14px 18px", borderBottom: "1px solid var(--gray-100)",
    background: "var(--gray-50)",
  },
  cardTitle:     { display: "flex", alignItems: "center", gap: 8 },
  cardIcon:      { fontSize: 16 },
  cardTitleText: { fontSize: 14, fontWeight: 700, color: "var(--ink-2)" },
  cardBody:      { padding: "16px 18px", display: "flex", flexDirection: "column", gap: 14 },

  entry: {
    display: "flex", gap: 12, padding: 14,
    background: "var(--gray-50)", borderRadius: "var(--r-md)",
    border: "1px solid var(--gray-200)", position: "relative",
  },
  entryIndex: {
    flexShrink: 0, width: 22, height: 22,
    background: "var(--ink-2)", color: "var(--white)",
    borderRadius: "50%", display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: 11, fontWeight: 700, marginTop: 2,
  },
  entryContent:  { flex: 1, display: "flex", flexDirection: "column", gap: 10 },
  entryRemove: {
    position: "absolute", top: 10, right: 10,
    width: 22, height: 22, display: "flex", alignItems: "center",
    justifyContent: "center", border: "none", borderRadius: "50%",
    background: "var(--gray-200)", color: "var(--gray-600)",
    cursor: "pointer", fontSize: 16, fontWeight: 700, flexShrink: 0,
    transition: "background var(--dur)",
  },
};

// Inject keyframes for spinner
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes spin { to { transform: rotate(360deg); } }
    input:focus, textarea:focus {
      border-color: var(--blue) !important;
      box-shadow: 0 0 0 3px rgba(46,118,181,.12);
    }
    button:not(:disabled):hover { filter: brightness(0.93); }
  `;
  document.head.appendChild(style);
}
