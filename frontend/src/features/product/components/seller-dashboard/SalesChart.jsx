/* ── SVG line chart for "Sales Over Time" ─────────────────────────────────── */

const W = 700, H = 185;
const PAD = { t: 14, r: 16, b: 46, l: 46 };
const Y_STEPS = 4;

export default function SalesChart({ data }) {
  const cW = W - PAD.l - PAD.r;
  const cH = H - PAD.t - PAD.b;
  const max = Math.max(...data.map(d => d.qty));

  const pts = data.map((d, i) => ({
    x: PAD.l + (i / (data.length - 1)) * cW,
    y: PAD.t + (1 - d.qty / max) * cH,
    ...d,
  }));

  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const lastPt   = pts[pts.length - 1];
  /* Close the area fill back to the x-axis baseline */
  const fillPath = `${linePath} L${lastPt.x.toFixed(1)},${(PAD.t + cH).toFixed(1)} L${pts[0].x.toFixed(1)},${(PAD.t + cH).toFixed(1)}Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="cfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#ff6b35" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ff6b35" stopOpacity="0"   />
        </linearGradient>
        <linearGradient id="cline" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#ff6b35" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
      </defs>

      {/* Horizontal grid lines + Y-axis labels */}
      {Array.from({ length: Y_STEPS + 1 }, (_, i) => {
        const y = PAD.t + (i / Y_STEPS) * cH;
        const v = Math.round(max * (1 - i / Y_STEPS));
        return (
          <g key={i}>
            <line x1={PAD.l} y1={y} x2={PAD.l + cW} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray={i > 0 ? '4,5' : undefined} />
            <text x={PAD.l - 8} y={y + 4} textAnchor="end" fontSize="10" fill="rgba(255,255,255,0.28)" fontFamily="Inter,sans-serif">{v}</text>
          </g>
        );
      })}

      <path d={fillPath} fill="url(#cfill)" />
      <path d={linePath} fill="none" stroke="url(#cline)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Data-point dots + X-axis date labels (every other point to avoid crowding) */}
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4.5" fill="#ff6b35" stroke="#101522" strokeWidth="2.5" />
          {(i === 0 || i % 2 === 1 || i === pts.length - 1) && (
            <text x={p.x} y={PAD.t + cH + 28} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.28)" fontFamily="Inter,sans-serif">
              {p.date}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}
