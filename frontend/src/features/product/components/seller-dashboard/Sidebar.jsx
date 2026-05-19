/* ── Collapsible sidebar with navigation ─────────────────────────────────── */

import { NAV } from './data';
import { IcoDashboard, IcoProducts, IcoOrders, IcoProfile, IcoPlus } from './Icons';

/* Map nav IDs to their icon components */
const ICON_MAP = {
  dashboard:      IcoDashboard,
  products:       IcoProducts,
  'create-product': IcoPlus,
  orders:         IcoOrders,
  profile:        IcoProfile,
};

export default function Sidebar({ page, setPage, expanded, setExpanded }) {
  const SBW = expanded ? 252 : 70;

  return (
    <aside style={{
      position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50,
      width: SBW,
      background: '#0b0e1a',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>

      {/* Brand logo */}
      <div style={{ padding: '22px 18px 18px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(255,255,255,0.05)', minHeight: 78, flexShrink: 0 }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, background: 'linear-gradient(135deg, #ff6b35, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 900, color: '#fff', flexShrink: 0, boxShadow: '0 4px 16px rgba(255,107,53,0.3)' }}>
          S
        </div>
        {expanded && (
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: '3px', color: '#fff' }}>SNITCH</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)', letterSpacing: '1px', marginTop: 1 }}>Seller Portal</div>
          </div>
        )}
      </div>

      {/* Navigation links */}
      <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto', overflowX: 'hidden' }}>
        {expanded && (
          <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.2)', letterSpacing: '1.5px', padding: '4px 8px 10px' }}>MAIN MENU</div>
        )}
        {NAV.map(({ id, label }) => {
          const Icon = ICON_MAP[id];
          return (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`nav-btn${page === id ? ' active-nav' : ''}`}
              style={{
                width: '100%',
                display: 'flex', alignItems: 'center', gap: 12,
                padding: expanded ? '11px 12px' : '11px 0',
                justifyContent: expanded ? 'flex-start' : 'center',
                background: 'transparent', border: 'none', borderRadius: 11,
                color: page === id ? '#ff6b35' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer', marginBottom: 2,
              }}
            >
              <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}><Icon /></span>
              {expanded && (
                <>
                  <span style={{ fontSize: 13.5, fontWeight: page === id ? 600 : 400, flex: 1, textAlign: 'left' }}>{label}</span>
                  {page === id && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff6b35', flexShrink: 0 }} />}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse / expand toggle */}
      <button
        onClick={() => setExpanded(x => !x)}
        className="toggle-btn"
        style={{ margin: '8px 10px 18px', padding: '10px', borderRadius: 11, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.32)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', flexShrink: 0, fontFamily: 'Inter,sans-serif' }}
        title={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: expanded ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.3s' }}>
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

    </aside>
  );
}
