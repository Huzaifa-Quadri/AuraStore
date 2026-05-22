/* ── Profile Settings — Instagram-style view + inline edit ───────────────── *
 *  Reads the authenticated user from Redux and lets the seller update        *
 *  fullname + contact. Email is read-only by design.                         *
 * ─────────────────────────────────────────────────────────────────────────── */

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../../auth/hook/useAuth.hook';
import useProduct from '../../hooks/useProduct.hook';

/* ── Small inline edit / save / cancel icons ── */
const IcoPencil = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
  </svg>
);
const IcoCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IcoX = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IcoMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" />
  </svg>
);
const IcoPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
  </svg>
);
const IcoBadge = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

/* ── Card primitive scoped to profile (matches dashboard surface style) ── */
function Surface({ children, style = {} }) {
  return (
    <div style={{ background: '#0f1522', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: '22px 24px', ...style }}>
      {children}
    </div>
  );
}

/* ── Single editable / read-only field row ── */
function FieldRow({ icon, label, value, editing, readOnly, onChange, type = 'text' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.45)', flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.32)', letterSpacing: '1.2px', marginBottom: 4 }}>{label}</div>
        {editing && !readOnly ? (
          <input
            type={type}
            value={value ?? ''}
            onChange={e => onChange(e.target.value)}
            style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,107,53,0.35)', borderRadius: 8, color: '#fff', padding: '6px 10px', fontSize: 13, outline: 'none', fontFamily: 'Inter,sans-serif' }}
          />
        ) : (
          <div style={{ fontSize: 14, color: readOnly ? 'rgba(255,255,255,0.5)' : '#fff', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {value || <span style={{ color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>not set</span>}
          </div>
        )}
      </div>
      {readOnly && (
        <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.5px', background: 'rgba(255,255,255,0.04)', padding: '3px 8px', borderRadius: 6 }}>
          READ ONLY
        </span>
      )}
    </div>
  );
}

export default function ProfilePage() {
  const user            = useSelector(s => s.auth.user);
  const sellerProducts  = useSelector(s => s.product.sellerProducts);
  const { handleUpdateProfile } = useAuth();
  const { handleGetAllSellerProducts } = useProduct();

  /* Fetch products if not already loaded so the count is accurate */
  useEffect(() => {
    if (!sellerProducts?.length) handleGetAllSellerProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [editing, setEditing] = useState(false);
  const [saving,  setSaving]  = useState(false);
  const [feedback, setFeedback] = useState(null); // { type, message }
  const [form, setForm] = useState({ fullname: '', contact: '' });

  /* Hydrate the edit form from Redux user whenever the source changes */
  useEffect(() => {
    if (user) setForm({ fullname: user.fullname || '', contact: user.contact || '' });
  }, [user]);

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', color: 'rgba(255,255,255,0.4)' }}>
        Loading profile…
      </div>
    );
  }

  const initial = (user.fullname || user.email || '?').trim().charAt(0).toUpperCase();
  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : '—';

  async function onSave() {
    setSaving(true);
    setFeedback(null);
    const res = await handleUpdateProfile({ fullname: form.fullname, contact: form.contact });
    setSaving(false);
    if (res?.success) {
      setFeedback({ type: 'ok', message: 'Profile updated.' });
      setEditing(false);
    } else {
      setFeedback({ type: 'err', message: res?.message || 'Update failed.' });
    }
  }

  function onCancel() {
    setForm({ fullname: user.fullname || '', contact: user.contact || '' });
    setEditing(false);
    setFeedback(null);
  }

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Header: avatar ring + identity + actions ── */}
      <Surface style={{ padding: '32px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>

          {/* Instagram-style gradient avatar ring */}
          <div style={{ padding: 4, borderRadius: '50%', background: 'linear-gradient(135deg, #ff6b35, #a855f7 60%, #60a5fa)', flexShrink: 0 }}>
            <div style={{ width: 110, height: 110, borderRadius: '50%', background: '#0f1522', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, fontWeight: 800, color: '#fff', letterSpacing: '-1px' }}>
              {initial}
            </div>
          </div>

          {/* Identity block */}
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 8 }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>
                {user.fullname || 'Unnamed Seller'}
              </span>
              {user.isVerified && (
                <span title="Verified" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(96,165,250,0.15)', color: '#60a5fa', padding: '3px 8px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
                  <IcoBadge /> Verified
                </span>
              )}
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#ff6b35', background: 'rgba(255,107,53,0.12)', padding: '4px 10px', borderRadius: 20, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                {user.role || 'seller'}
              </span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                Member since {memberSince}
              </span>
            </div>

            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'linear-gradient(135deg, #ff6b35, #a855f7)', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}
              >
                <IcoPencil /> Edit Profile
              </button>
            ) : (
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={onSave}
                  disabled={saving}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.35)', color: '#4ade80', padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: saving ? 'wait' : 'pointer', fontFamily: 'Inter,sans-serif', opacity: saving ? 0.6 : 1 }}
                >
                  <IcoCheck /> {saving ? 'Saving…' : 'Save'}
                </button>
                <button
                  onClick={onCancel}
                  disabled={saving}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}
                >
                  <IcoX /> Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Feedback banner */}
        {feedback && (
          <div style={{
            marginTop: 18,
            padding: '10px 14px',
            borderRadius: 10,
            fontSize: 12,
            fontWeight: 600,
            background: feedback.type === 'ok' ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)',
            color:      feedback.type === 'ok' ? '#4ade80' : '#f87171',
            border:     `1px solid ${feedback.type === 'ok' ? 'rgba(74,222,128,0.25)' : 'rgba(248,113,113,0.25)'}`,
          }}>
            {feedback.message}
          </div>
        )}
      </Surface>

      {/* ── Stats strip (Instagram-style numbers row) ── */}
      <Surface style={{ padding: '20px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>{sellerProducts?.length ?? '—'}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2, letterSpacing: '0.5px' }}>Products</div>
          </div>
          <div style={{ borderLeft: '1px solid rgba(255,255,255,0.06)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>—</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2, letterSpacing: '0.5px' }}>Orders</div>
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: user.isActive ? '#4ade80' : '#f87171' }}>
              {user.isActive ? 'Active' : 'Inactive'}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2, letterSpacing: '0.5px' }}>Status</div>
          </div>
        </div>
      </Surface>

      {/* ── Editable details ── */}
      <Surface>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Account Details</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>
          Update your personal information. Email cannot be changed.
        </div>

        <FieldRow
          icon={<IcoPencil />}
          label="FULL NAME"
          value={editing ? form.fullname : user.fullname}
          editing={editing}
          onChange={v => setForm(f => ({ ...f, fullname: v }))}
        />
        <FieldRow
          icon={<IcoMail />}
          label="EMAIL"
          value={user.email}
          editing={editing}
          readOnly
        />
        <FieldRow
          icon={<IcoPhone />}
          label="CONTACT"
          value={editing ? form.contact : user.contact}
          editing={editing}
          onChange={v => setForm(f => ({ ...f, contact: v }))}
          type="tel"
        />
      </Surface>

    </div>
  );
}
