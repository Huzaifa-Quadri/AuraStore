/* ── Sticky top header showing current section title + date ──────────────── */

export default function Header({ currentNav }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });

  return (
    <header style={{
      padding: '18px 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      background: 'rgba(7,9,15,0.88)',
      backdropFilter: 'blur(16px)',
      position: 'sticky', top: 0, zIndex: 30,
      flexShrink: 0,
    }}>
      <div>
        <div style={{ fontSize: 19, fontWeight: 700, color: '#fff', letterSpacing: '-0.2px' }}>
          {currentNav?.label}
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.26)', marginTop: 2 }}>{today}</div>
      </div>

      {/* Seller avatar placeholder — replace with real user avatar when auth is wired */}
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #ff6b35, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800 }}>
        S
      </div>
    </header>
  );
}
