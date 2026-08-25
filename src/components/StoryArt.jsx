/**
 * StoryArt — hand-drawn SVG illustrations for the Our Story page.
 * Drawn in the brand palette so they feel native to the site (like the
 * WindowPreview visualizer) and add zero image-loading weight.
 */

/* A simple smiling person built from rounded shapes. */
function Person({ x, y, scale = 1, body, skin = '#e8c39e', flip = false }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      {/* body */}
      <path d="M-26 92 Q-30 30 0 26 Q30 30 26 92 Z" fill={body} />
      {/* head */}
      <circle cx="0" cy="0" r="22" fill={skin} />
      {/* smile */}
      <path d="M-7 6 Q0 11 7 6" fill="none" stroke="#5a463a" strokeWidth="2" strokeLinecap="round" />
      {/* eyes */}
      <circle cx="-7.5" cy="-3" r="2" fill="#5a463a" />
      <circle cx="7.5" cy="-3" r="2" fill="#5a463a" />
    </g>
  );
}

/**
 * Hero image: a happy family — two parents and a child holding hands —
 * in a warm room with a dressed window and afternoon sun.
 */
export function FamilyIllustration() {
  return (
    <svg
      viewBox="0 0 900 380"
      role="img"
      aria-label="Illustration of a family of three holding hands in a warm room with drapery-dressed windows"
      style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 'var(--radius)' }}
    >
      {/* room */}
      <rect width="900" height="380" fill="#f3eee3" />
      <rect y="300" width="900" height="80" fill="#e0d3b8" />
      <rect y="300" width="900" height="7" fill="#cdbd9c" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <line key={i} x1={i * 120 - 40} y1="308" x2={i * 120 - 10} y2="380" stroke="#cbbc9a" strokeWidth="2" />
      ))}

      {/* sun through the window */}
      <circle cx="205" cy="120" r="34" fill="#f0dfae" />

      {/* window with drapery, left */}
      <g>
        <rect x="120" y="58" width="170" height="180" rx="4" fill="#dce8ee" stroke="#f7f3ea" strokeWidth="10" />
        <rect x="198" y="58" width="10" height="180" fill="#f7f3ea" />
        <rect x="120" y="142" width="170" height="10" fill="#f7f3ea" />
        <path d="M120 200 Q170 175 205 195 T290 190 V238 H120 Z" fill="#cdd8be" opacity="0.9" />
        {/* rod + panels */}
        <rect x="92" y="40" width="228" height="7" rx="3.5" fill="#8a6f52" />
        <circle cx="92" cy="43" r="8" fill="#8a6f52" />
        <circle cx="320" cy="43" r="8" fill="#8a6f52" />
        <path d="M100 47 Q96 150 88 246 L136 246 Q132 150 132 47 Z" fill="#b05c5c" />
        <path d="M108 47 Q106 150 102 246" stroke="#8f4646" strokeWidth="3" fill="none" opacity="0.5" />
        <path d="M122 47 Q121 150 120 246" stroke="#8f4646" strokeWidth="3" fill="none" opacity="0.5" />
        <path d="M312 47 Q316 150 324 246 L276 246 Q280 150 280 47 Z" fill="#b05c5c" />
        <path d="M304 47 Q306 150 310 246" stroke="#8f4646" strokeWidth="3" fill="none" opacity="0.5" />
        <path d="M290 47 Q291 150 292 246" stroke="#8f4646" strokeWidth="3" fill="none" opacity="0.5" />
      </g>

      {/* window with roman shade, right */}
      <g>
        <rect x="660" y="66" width="150" height="164" rx="4" fill="#dce8ee" stroke="#f7f3ea" strokeWidth="10" />
        <rect x="728" y="66" width="10" height="164" fill="#f7f3ea" />
        <path d="M660 190 Q705 170 735 186 T810 182 V230 H660 Z" fill="#cdd8be" opacity="0.9" />
        <rect x="654" y="58" width="162" height="10" rx="3" fill="#6f7f93" />
        <rect x="658" y="66" width="154" height="78" fill="#5e7b93" />
        <path d="M658 96 H812 M658 122 H812" stroke="#4c6579" strokeWidth="3" opacity="0.55" />
        <path d="M658 144 Q735 158 812 144 L812 130 Q735 142 658 130 Z" fill="#4c6579" />
      </g>

      {/* a single quiet heart above the family */}
      <path d="M452 84 c -5.5 -7 -17 -3.1 -17 5.4 c 0 7 9.4 12.4 17 17.8 c 7.6 -5.4 17 -10.8 17 -17.8 c 0 -8.5 -11.5 -12.4 -17 -5.4 Z" fill="#b05c5c" opacity="0.65" />

      {/* the family — parent, child, parent holding hands */}
      <Person x={392} y={210} scale={1.06} body="#5e7b93" skin="#e8c39e" />
      <Person x={452} y={248} scale={0.72} body="#d4b96a" skin="#f0d0ae" />
      <Person x={514} y={206} scale={1.1} body="#7d8c6e" skin="#caa07c" />
      {/* joined hands */}
      <path d="M414 258 Q432 268 436 272" stroke="#e8c39e" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M468 272 Q480 266 490 258" stroke="#caa07c" strokeWidth="9" strokeLinecap="round" fill="none" />

      {/* rug */}
      <ellipse cx="452" cy="330" rx="200" ry="24" fill="#c9b88a" opacity="0.3" />
    </svg>
  );
}

/* ------- Pledge step illustrations (square tiles) ------- */

const TILE = { width: '100%', height: 'auto', display: 'block' };

/** Step 1 — You Design: a window being dressed, with a pencil. */
export function DesignArt() {
  return (
    <svg viewBox="0 0 200 150" role="img" aria-label="Designing a window treatment" style={TILE}>
      <rect width="200" height="150" fill="#faf8f4" />
      <rect x="56" y="26" width="88" height="96" rx="3" fill="#dce8ee" stroke="#e6e0d4" strokeWidth="6" />
      <rect x="96" y="26" width="8" height="96" fill="#f7f3ea" />
      <rect x="40" y="16" width="120" height="6" rx="3" fill="#8a6f52" />
      <circle cx="40" cy="19" r="6" fill="#8a6f52" />
      <circle cx="160" cy="19" r="6" fill="#8a6f52" />
      <path d="M48 22 Q44 75 40 122 L66 122 Q64 75 64 22 Z" fill="#b05c5c" />
      <path d="M152 22 Q156 75 160 122 L134 122 Q136 75 136 22 Z" fill="#5e7b93" />
      {/* pencil sketching the hem */}
      <g transform="translate(118 108) rotate(40)">
        <rect x="0" y="-5" width="44" height="10" rx="2" fill="#d4b96a" />
        <path d="M-10 0 L0 -5 L0 5 Z" fill="#e8c39e" />
        <path d="M-10 0 L-5 -2.5 L-5 2.5 Z" fill="#5a463a" />
        <rect x="38" y="-5" width="6" height="10" fill="#b05c5c" />
      </g>
      <path d="M70 132 Q100 140 130 132" stroke="#c9c2b2" strokeWidth="2.5" strokeDasharray="4 5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Step 2 — You Choose: hearts on a shelf, one picked with a check. */
export function ChooseArt() {
  return (
    <svg viewBox="0 0 200 150" role="img" aria-label="Choosing a foundation to support" style={TILE}>
      <rect width="200" height="150" fill="#faf8f4" />
      {[
        { x: 52, c: '#c98d4b', s: 0.8 },
        { x: 100, c: '#b05c5c', s: 1.15 },
        { x: 148, c: '#7b7090', s: 0.8 },
      ].map(({ x, c, s }, i) => (
        <g key={i} transform={`translate(${x} 66) scale(${s})`}>
          <path d="M0 26 C -28 6 -30 -22 -12 -24 C -3 -25 0 -16 0 -12 C 0 -16 3 -25 12 -24 C 30 -22 28 6 0 26 Z" fill={c} opacity={s > 1 ? 1 : 0.55} />
        </g>
      ))}
      {/* selection ring + check on the middle heart */}
      <circle cx="100" cy="64" r="42" fill="none" stroke="#7d8c6e" strokeWidth="3.5" strokeDasharray="6 7" strokeLinecap="round" />
      <circle cx="132" cy="34" r="14" fill="#7d8c6e" />
      <path d="M125 34 l 5 5.5 l 9 -10" stroke="#fff" strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 122 H160" stroke="#e6e0d4" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/** Step 3 — We Give 5%: an open hand offering a 5% coin. */
export function GiveArt() {
  return (
    <svg viewBox="0 0 200 150" role="img" aria-label="Five percent of every sale is donated" style={TILE}>
      <rect width="200" height="150" fill="#faf8f4" />
      {/* coin */}
      <circle cx="100" cy="56" r="34" fill="#d4b96a" />
      <circle cx="100" cy="56" r="27" fill="none" stroke="#b99b47" strokeWidth="2.5" />
      <text x="100" y="65" textAnchor="middle" fontFamily="Georgia, serif" fontSize="24" fontWeight="600" fill="#6d5a22">5%</text>
      {/* sparkle */}
      <path d="M146 26 l 3 7 l 7 3 l -7 3 l -3 7 l -3 -7 l -7 -3 l 7 -3 Z" fill="#c98d4b" opacity="0.8" />
      {/* hand */}
      <path d="M46 118 Q46 100 62 98 L134 92 Q150 91 152 102 Q153 112 140 114 L96 120 L142 120 Q154 121 152 130 Q150 138 138 138 L70 138 Q52 138 46 118 Z" fill="#e8c39e" />
      <path d="M62 98 Q58 108 66 112" stroke="#d3a97e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Step 4 — They Thrive: a child flying a kite under the sun. */
export function ThriveArt() {
  return (
    <svg viewBox="0 0 200 150" role="img" aria-label="A child thriving, flying a kite" style={TILE}>
      <rect width="200" height="150" fill="#faf8f4" />
      <circle cx="164" cy="28" r="16" fill="#f0dfae" />
      <path d="M20 138 Q100 118 180 138 L180 150 L20 150 Z" fill="#cdd8be" />
      {/* kite */}
      <g transform="translate(136 44) rotate(18)">
        <path d="M0 -24 L18 0 L0 24 L-18 0 Z" fill="#5e7b93" />
        <path d="M0 -24 L0 24 M-18 0 L18 0" stroke="#4c6579" strokeWidth="2" />
        <path d="M0 24 q 6 8 0 14 q -6 6 0 12" stroke="#b05c5c" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </g>
      {/* string */}
      <path d="M120 62 Q92 84 74 100" stroke="#8b857b" strokeWidth="2" fill="none" />
      {/* child */}
      <g transform="translate(62 108)">
        <path d="M-15 34 Q-17 6 0 4 Q17 6 15 34 Z" fill="#c98d4b" />
        <circle cx="0" cy="-9" r="13" fill="#f0d0ae" />
        <path d="M-5 -6 Q0 -1.5 5 -6" stroke="#5a463a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <circle cx="-4.5" cy="-11" r="1.5" fill="#5a463a" />
        <circle cx="4.5" cy="-11" r="1.5" fill="#5a463a" />
        {/* raised arm to the string */}
        <path d="M10 10 Q16 0 12 -6" stroke="#c98d4b" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>
      {/* flowers */}
      <circle cx="120" cy="132" r="3.4" fill="#b05c5c" opacity="0.7" />
    </svg>
  );
}
