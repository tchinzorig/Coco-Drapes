/**
 * Icons — small line icons shared across the site.
 * Step icons render white inside the colored step circles; service icons
 * take a color prop and render in each card's accent hue.
 */

/* ---------------- Process step icons (white, for step circles) ---------------- */

export function DesignIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="18" height="14" rx="1.5" />
      <path d="M13 4 V18 M4 11 H22" opacity="0.6" />
      <path d="M16.5 21.5 L21 17 L23 19 L18.5 23.5 L15.5 24.5 Z" fill="#fff" stroke="none" />
    </svg>
  );
}

export function MeasureIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="9" width="20" height="8" rx="1.5" />
      <path d="M7 9 V13 M11 9 V12 M15 9 V13 M19 9 V12" />
    </svg>
  );
}

export function SewIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 5 L8 18" />
      <path d="M21 5 c 1.5 1.5 1 3 -0.5 4.5" opacity="0.7" />
      <circle cx="7" cy="19" r="2.6" />
      <path d="M9 21 q 5 3 10 0 q -5 4 -12 2" strokeWidth="1.5" opacity="0.8" />
    </svg>
  );
}

export function InstallIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 6 H23" />
      <circle cx="3" cy="6" r="1.6" fill="#fff" stroke="none" />
      <circle cx="23" cy="6" r="1.6" fill="#fff" stroke="none" />
      <path d="M7 8 Q6.5 15 6 21 M11 8 Q11 15 11 21" opacity="0.85" />
      <path d="M15 15 l 3 3 l 5.5 -6" />
    </svg>
  );
}

/* ---------------- Service icons (colored, for service cards) ---------------- */

export function BlindIcon({ color }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="6" y="5" width="28" height="4" rx="1.5" fill={color} />
      <rect x="6" y="12" width="28" height="4" rx="1.5" fill={color} opacity="0.75" />
      <rect x="6" y="19" width="28" height="4" rx="1.5" fill={color} opacity="0.55" />
      <rect x="6" y="26" width="28" height="4" rx="1.5" fill={color} opacity="0.4" />
      <line x1="30" y1="30" x2="30" y2="36" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="30" cy="37" r="1.8" fill={color} />
    </svg>
  );
}

export function DraperyIcon({ color }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="4" y="5" width="32" height="3" rx="1.5" fill={color} />
      <path d="M9 8 Q7 22 5 35 L15 35 Q13 22 13 8 Z" fill={color} opacity="0.85" />
      <path d="M31 8 Q33 22 35 35 L25 35 Q27 22 27 8 Z" fill={color} opacity="0.85" />
      <path d="M11 8 Q10.5 22 10 35 M29 8 Q29.5 22 30 35" stroke="#fff" strokeWidth="1.4" opacity="0.5" />
    </svg>
  );
}

export function RomanIcon({ color }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="5" y="5" width="30" height="4" rx="1.5" fill={color} />
      <rect x="6" y="9" width="28" height="14" fill={color} opacity="0.75" />
      <path d="M6 23 Q20 28 34 23 L34 18 Q20 23 6 18 Z" fill={color} />
      <path d="M6 15 H34" stroke="#fff" strokeWidth="1.4" opacity="0.45" />
      <line x1="31" y1="26" x2="31" y2="33" stroke={color} strokeWidth="2" strokeLinecap="round" strokeDasharray="1 3" />
    </svg>
  );
}

export function GarmentIcon({ color }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {/* hanger */}
      <path d="M20 4 a2.5 2.5 0 1 1 2.5 -2.5" stroke={color} strokeWidth="2" strokeLinecap="round" transform="translate(0 3)" fill="none" />
      <path d="M20 8 L6 15 H34 Z" fill={color} opacity="0.85" />
      {/* dress */}
      <path d="M14 15 L26 15 L24.5 21 Q30 32 28 36 L12 36 Q10 32 15.5 21 Z" fill={color} />
      <path d="M17 21 Q20 23.5 23 21" stroke="#fff" strokeWidth="1.4" opacity="0.5" fill="none" />
      <path d="M16 28 Q20 30 24 28" stroke="#fff" strokeWidth="1.4" opacity="0.4" fill="none" />
      {/* stitch marks */}
      <path d="M13.5 33 H26.5" stroke="#fff" strokeWidth="1.4" strokeDasharray="2 2.5" opacity="0.6" />
    </svg>
  );
}

/* Small heart mark for the pledge band. */
export function HeartMark({ color = 'var(--hue-red)', size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" aria-hidden="true">
      <path
        d="M15 25 C 5.5 18.5 3 11 8.5 8 C 12 6.2 14.4 9 15 10.4 C 15.6 9 18 6.2 21.5 8 C 27 11 24.5 18.5 15 25 Z"
        fill={color}
      />
    </svg>
  );
}
