/* ── Trust / benefit badges ────────────────────────────────────────────────
   Small reassurance row (free shipping / secure checkout / easy returns).
   Reveals once on scroll into view with a soft stagger.                       */

import { motion } from "framer-motion";

const IcoTruck = (p) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M14 18V6a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h1" />
    <path d="M14 9h4l3 3v5a1 1 0 0 1-1 1h-1" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" />
  </svg>
);
const IcoShield = (p) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
  </svg>
);
const IcoReturn = (p) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M3 7v6h6" /><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
  </svg>
);

const BADGES = [
  { icon: IcoTruck, title: "Free shipping", sub: "On orders over ₹999" },
  { icon: IcoShield, title: "Secure checkout", sub: "256-bit encryption" },
  { icon: IcoReturn, title: "Easy returns", sub: "7-day return policy" },
];

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function TrustBadges() {
  return (
    <motion.div
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      style={{ display: "flex", flexDirection: "column", gap: 12 }}
    >
      {BADGES.map(({ icon: Icon, title, sub }) => (
        <motion.div key={title} variants={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              width: 38,
              height: 38,
              flex: "0 0 auto",
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-accent)",
              background: "rgba(196,160,82,0.08)",
              border: "1px solid rgba(196,160,82,0.18)",
            }}
          >
            <Icon />
          </span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{title}</div>
            <div style={{ fontSize: 11.5, color: "var(--color-text-secondary)" }}>{sub}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
