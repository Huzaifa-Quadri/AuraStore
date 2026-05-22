/* ── Shared card primitives ───────────────────────────────────────────────── */

/** Dark surface container used across all dashboard sections. */
export function Card({ children, style = {} }) {
  return (
    <div style={{ background: '#0f1522', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: '22px 24px', ...style }}>
      {children}
    </div>
  );
}

/** Placeholder shown for pages that are not yet implemented. */
export function ComingSoon({ label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 420, gap: 16 }}>
      <div style={{ width: 72, height: 72, borderRadius: 20, background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{label}</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>This section is coming soon.</div>
      </div>
    </div>
  );
}
