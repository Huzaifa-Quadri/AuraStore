/* ── Sticky top navigation for the buyer storefront ────────────────────────
   Logic left blank: search submit and cart open are placeholders. The account
   icon receives `onAccountClick` from Home (auth-gated → login or profile).   */

import { Link } from "react-router-dom";
import { IcoSearch, IcoUser, IcoBag, IcoMenu } from "./Icons";

const NAV_LINKS = ["New", "Apparel", "Footwear", "Accessories", "Sale"];

export default function BuyerNavbar({ onAccountClick, cartCount = 0 }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(16px, 4vw, 48px)",
        background: "var(--color-bg-elevated)",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      {/* Left: mobile menu + nav links */}
      <div style={{ display: "flex", alignItems: "center", gap: 24, flex: 1 }}>
        <button
          aria-label="Menu"
          style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", display: "none" }}
          className="aura-nav-menu"
        >
          <IcoMenu />
        </button>
        <nav style={{ display: "flex", gap: 24 }} className="aura-nav-links">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href="#"
              style={{
                fontSize: 13,
                color: "var(--color-text-secondary)",
                textDecoration: "none",
                letterSpacing: "0.05em",
                transition: "color var(--transition-fast)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
            >
              {l}
            </a>
          ))}
        </nav>
      </div>

      {/* Center: logo */}
      <Link
        to="/"
        className="font-display"
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "0.04em",
          textDecoration: "none",
          flex: "0 0 auto",
        }}
      >
        AuraStore
      </Link>

      {/* Right: icons */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, color: "#fff", flex: 1, justifyContent: "flex-end" }}>
        <button aria-label="Search" style={iconBtn}>
          <IcoSearch />
        </button>
        <button aria-label="Account" style={iconBtn} onClick={onAccountClick}>
          <IcoUser />
        </button>
        <button aria-label="Cart" style={{ ...iconBtn, position: "relative" }}>
          <IcoBag />
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: -6,
                right: -8,
                background: "var(--color-accent)",
                color: "#0C0C0E",
                fontSize: 10,
                fontWeight: 700,
                minWidth: 16,
                height: 16,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 4px",
              }}
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

const iconBtn = {
  background: "none",
  border: "none",
  color: "inherit",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  padding: 0,
};
