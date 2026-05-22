/* ── Inline outline icons (no icon dependency) ─────────────────────────────
   Stroke uses currentColor so callers control color via `style`/`className`. */

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const IcoSearch = (p) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
);

export const IcoUser = (p) => (
  <svg {...base} {...p}><path d="M20 21a8 8 0 1 0-16 0" /><circle cx="12" cy="7" r="4" /></svg>
);

export const IcoBag = (p) => (
  <svg {...base} {...p}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
);

export const IcoStar = (p) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}><path d="M12 2l2.9 6.3 6.9.7-5.1 4.7 1.4 6.8L12 17.8 5.9 20.5l1.4-6.8L2.2 9l6.9-.7Z" /></svg>
);

export const IcoChevronRight = (p) => (
  <svg {...base} {...p}><path d="m9 18 6-6-6-6" /></svg>
);

export const IcoArrowRight = (p) => (
  <svg {...base} {...p}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);

export const IcoMenu = (p) => (
  <svg {...base} {...p}><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></svg>
);

export const IcoImage = (p) => (
  <svg {...base} width={40} height={40} {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-4.5-4.5L7 20" /></svg>
);

export const IcoAlert = (p) => (
  <svg {...base} width={40} height={40} {...p}><circle cx="12" cy="12" r="10" /><path d="M12 8v5" /><path d="M12 16h.01" /></svg>
);
