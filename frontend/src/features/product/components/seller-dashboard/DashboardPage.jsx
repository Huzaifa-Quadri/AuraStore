/* ── Dashboard widget components ──────────────────────────────────────────── *
 *  Exported individually so SellerDashboard.jsx can render them inline.       *
 * ─────────────────────────────────────────────────────────────────────────── */

import { Card } from './Card';
import SalesChart from './SalesChart';
import StatusBadge from './StatusBadge';
import { IcoBag, IcoDollar, IcoTrending } from './Icons';

/* Rank badge colors for the Top-3 products card */
const RANK_COLOR = ['#ff6b35', '#a855f7', '#60a5fa'];
const RANK_BG    = ['rgba(255,107,53,0.14)', 'rgba(168,85,247,0.14)', 'rgba(96,165,250,0.14)'];

/* ── Stat card for a single KPI metric ── */
export function StatCard({ icon, iconBg, iconColor, badge, value, label }) {
  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: iconColor }}>
          {icon}
        </div>
        {badge && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: '#4ade80', background: 'rgba(74,222,128,0.1)', padding: '3px 8px', borderRadius: 8 }}>
            <IcoTrending />{badge}
          </span>
        )}
      </div>
      <div style={{ fontSize: 34, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', marginTop: 7, fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 3 }}>vs. last month</div>
    </Card>
  );
}

/* ── Top-3 most-sold products card ── */
export function TopProductsCard({ products }) {
  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.2px' }}>Most Sold Products</div>
        <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.22)', letterSpacing: '1.2px' }}>TOP 3</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {products.map((p, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: RANK_BG[i], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: RANK_COLOR[i], flexShrink: 0 }}>
              {p.rank}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>${p.price} &middot; {p.units} units</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ── Sales line-chart card ── */
export function SalesChartCard({ data }) {
  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Sales Over Time</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', marginTop: 3 }}>Units sold per day — last 10 days</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 24, height: 3, borderRadius: 4, background: 'linear-gradient(90deg, #ff6b35, #c084fc)', display: 'inline-block' }} />
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)' }}>Units Sold</span>
        </div>
      </div>
      <div style={{ height: 190, marginTop: 10 }}>
        <SalesChart data={data} />
      </div>
    </Card>
  );
}

/* ── Live feed of the 8 most-recent orders ── */
export function LatestOrdersCard({ orders }) {
  return (
    <Card style={{ padding: '22px 18px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexShrink: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Latest Orders</div>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#4ade80', background: 'rgba(74,222,128,0.1)', padding: '3px 10px', borderRadius: 8, letterSpacing: '0.5px' }}>● LIVE</div>
      </div>
      <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 310 }}>
        {orders.map((o, i) => (
          <div key={i} style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#ff6b35' }}>{o.id}</span>
              <StatusBadge status={o.status} />
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.product}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{o.customer}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>${o.amount}</span>
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', marginTop: 3 }}>{o.time}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

