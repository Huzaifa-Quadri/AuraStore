/* ── Status badge used in the Latest Orders list ──────────────────────────── */

const STATUS_STYLES = {
  new:        ['rgba(255,107,53,0.15)',  '#ff6b35'],
  processing: ['rgba(168,85,247,0.15)',  '#c084fc'],
  shipped:    ['rgba(96,165,250,0.15)',  '#60a5fa'],
  delivered:  ['rgba(74,222,128,0.15)',  '#4ade80'],
};

export default function StatusBadge({ status }) {
  const [bg, color] = STATUS_STYLES[status] ?? ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.4)'];
  return (
    <span style={{ background: bg, color, padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap' }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: color, flexShrink: 0 }} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
