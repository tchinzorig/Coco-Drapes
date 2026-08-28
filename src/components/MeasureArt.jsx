/**
 * MeasureArt — hand-drawn SVG diagrams and icons for the Measuring Help
 * page. Same approach as StoryArt: brand palette, zero image weight.
 * Widths are drawn with orange/blue dimension arrows, heights with green,
 * so the diagrams and the numbered steps can reference each other.
 */

const TILE = { width: '100%', height: 'auto', display: 'block' };

/* ---------------- Dimension arrows (shared) ---------------- */

function DimH({ x1, x2, y, color, letter, dashed = false }) {
  const mid = (x1 + x2) / 2;
  return (
    <g>
      <line
        x1={x1 + 8} y1={y} x2={x2 - 8} y2={y}
        stroke={color} strokeWidth="2.4"
        strokeDasharray={dashed ? '4 5' : undefined}
      />
      <path d={`M${x1} ${y} l 9 -5 v 10 Z`} fill={color} />
      <path d={`M${x2} ${y} l -9 -5 v 10 Z`} fill={color} />
      {letter && (
        <>
          <circle cx={mid} cy={y} r="12" fill={color} />
          <text
            x={mid} y={y + 4.4} textAnchor="middle"
            fontFamily="'Jost', sans-serif" fontSize="13" fontWeight="600" fill="#fff"
          >
            {letter}
          </text>
        </>
      )}
    </g>
  );
}

function DimV({ x, y1, y2, color, letter, dashed = false }) {
  const mid = (y1 + y2) / 2;
  return (
    <g>
      <line
        x1={x} y1={y1 + 8} x2={x} y2={y2 - 8}
        stroke={color} strokeWidth="2.4"
        strokeDasharray={dashed ? '4 5' : undefined}
      />
      <path d={`M${x} ${y1} l -5 9 h 10 Z`} fill={color} />
      <path d={`M${x} ${y2} l -5 -9 h 10 Z`} fill={color} />
      {letter && (
        <>
          <circle cx={x} cy={mid} r="12" fill={color} />
          <text
            x={x} y={mid + 4.4} textAnchor="middle"
            fontFamily="'Jost', sans-serif" fontSize="13" fontWeight="600" fill="#fff"
          >
            {letter}
          </text>
        </>
      )}
    </g>
  );
}

/* ---------------- Drapery: rod width (A) and height (B) ---------------- */

export function DraperyMeasureArt() {
  return (
    <svg
      viewBox="0 0 460 360"
      role="img"
      aria-label="Diagram of a window with drapery: arrow A spans the rod width extending past the frame; arrow B runs from the rod down to the floor"
      style={TILE}
    >
      <rect width="460" height="360" fill="#faf8f4" />
      {/* floor */}
      <rect y="330" width="460" height="30" fill="#e0d3b8" />
      <rect y="330" width="460" height="5" fill="#cdbd9c" />

      {/* window */}
      <rect x="150" y="95" width="160" height="165" rx="3" fill="#dce8ee" stroke="#f7f3ea" strokeWidth="10" />
      <rect x="226" y="95" width="8" height="165" fill="#f7f3ea" />
      <rect x="150" y="170" width="160" height="8" fill="#f7f3ea" />
      <rect x="140" y="262" width="180" height="8" rx="2" fill="#e6e0d4" />

      {/* guides: frame edge vs rod end, so the extension reads clearly */}
      <path d="M150 90 V52 M310 90 V52" stroke="#c9c2b2" strokeWidth="1.8" strokeDasharray="3 5" />
      <path d="M104 52 V64 M356 52 V64" stroke="#c9c2b2" strokeWidth="1.8" strokeDasharray="3 5" />

      {/* rod + finials */}
      <rect x="108" y="66" width="244" height="7" rx="3.5" fill="#8a6f52" />
      <circle cx="104" cy="69.5" r="8" fill="#8a6f52" />
      <circle cx="356" cy="69.5" r="8" fill="#8a6f52" />

      {/* panels stacked mostly off the glass */}
      <path d="M118 73 Q112 180 106 322 L154 322 Q149 180 150 73 Z" fill="#b05c5c" />
      <path d="M128 73 Q125 180 122 322 M140 73 Q139 180 138 322" stroke="#8f4646" strokeWidth="2.6" fill="none" opacity="0.5" />
      <path d="M342 73 Q348 180 354 322 L306 322 Q311 180 310 73 Z" fill="#b05c5c" />
      <path d="M332 73 Q335 180 338 322 M320 73 Q321 180 322 322" stroke="#8f4646" strokeWidth="2.6" fill="none" opacity="0.5" />

      {/* A: full rod width, past the frame on both sides */}
      <DimH x1={104} x2={356} y={38} color="#4c6579" letter="A" />
      {/* B: rod height down to the floor */}
      <DimV x={404} y1={66} y2={330} color="#57644a" letter="B" />
    </svg>
  );
}

/* ---------------- Drapery: how the hem meets the floor ---------------- */

function HemBase({ children, label }) {
  return (
    <svg viewBox="0 0 160 130" role="img" aria-label={label} style={TILE}>
      <rect width="160" height="130" fill="#faf8f4" />
      <rect y="104" width="160" height="26" fill="#e0d3b8" />
      <rect y="104" width="160" height="4" fill="#cdbd9c" />
      {children}
    </svg>
  );
}

export function FloatHemArt() {
  return (
    <HemBase label="Panel hem floating about half an inch above the floor">
      <path d="M56 0 Q52 50 50 96 L112 96 Q109 50 108 0 Z" fill="#b05c5c" />
      <path d="M68 0 Q66 50 64 96 M82 0 Q81 50 81 96 M96 0 Q96 50 97 96" stroke="#8f4646" strokeWidth="2.4" fill="none" opacity="0.5" />
      <path d="M46 100 H116" stroke="#96631f" strokeWidth="1.8" strokeDasharray="3 4" />
    </HemBase>
  );
}

export function BreakHemArt() {
  return (
    <HemBase label="Panel hem breaking gently on the floor like trouser cuffs">
      <path d="M56 0 Q52 55 47 100 Q49 108 60 107 Q80 112 102 107 Q113 108 114 100 Q110 55 108 0 Z" fill="#b05c5c" />
      <path d="M68 0 Q66 55 62 104 M82 0 Q81 55 81 106 M96 0 Q97 55 100 104" stroke="#8f4646" strokeWidth="2.4" fill="none" opacity="0.5" />
    </HemBase>
  );
}

export function PuddleHemArt() {
  return (
    <HemBase label="Panel fabric pooling softly on the floor">
      <path d="M58 0 Q54 50 52 88 L110 88 Q107 50 106 0 Z" fill="#b05c5c" />
      <path d="M70 0 Q68 50 66 88 M84 0 Q83 50 83 88 M97 0 Q97 50 98 88" stroke="#8f4646" strokeWidth="2.4" fill="none" opacity="0.5" />
      <path d="M38 106 Q50 90 66 99 Q80 86 96 99 Q112 90 124 106 Q102 116 80 113 Q56 116 38 106 Z" fill="#b05c5c" />
      <path d="M52 104 Q64 98 74 104 M88 103 Q98 97 108 104" stroke="#8f4646" strokeWidth="2" fill="none" opacity="0.5" />
    </HemBase>
  );
}

/* ---------------- Roman shades: inside vs outside mount ---------------- */

export function InsideMountArt() {
  return (
    <svg
      viewBox="0 0 220 210"
      role="img"
      aria-label="Diagram of a roman shade mounted inside the window frame, with width measured at three heights and height measured at the side"
      style={TILE}
    >
      <rect width="220" height="210" fill="#faf8f4" />
      {/* casing + opening */}
      <rect x="30" y="22" width="160" height="170" rx="3" fill="#f7f3ea" />
      <rect x="46" y="38" width="128" height="138" fill="#dce8ee" />

      {/* shade tucked inside the opening */}
      <rect x="46" y="38" width="128" height="64" fill="#5e7b93" />
      <path d="M46 60 H174 M46 80 H174" stroke="#4c6579" strokeWidth="2.4" opacity="0.55" />
      <path d="M46 102 Q110 116 174 102 L174 88 Q110 100 46 88 Z" fill="#4c6579" />

      {/* width in three places — the middle one is the one you keep */}
      <DimH x1={46} x2={174} y={122} color="#96631f" dashed />
      <DimH x1={46} x2={174} y={143} color="#96631f" letter="W" />
      <DimH x1={46} x2={174} y={164} color="#96631f" dashed />
      {/* height of the opening */}
      <DimV x={62} y1={38} y2={176} color="#57644a" letter="H" />
    </svg>
  );
}

export function OutsideMountArt() {
  return (
    <svg
      viewBox="0 0 220 210"
      role="img"
      aria-label="Diagram of a roman shade mounted outside the window frame, overlapping it on every side; dashed lines show the frame hidden behind"
      style={TILE}
    >
      <rect width="220" height="210" fill="#faf8f4" />
      {/* window frame, mostly hidden behind the shade */}
      <rect x="42" y="42" width="136" height="150" rx="3" fill="#dce8ee" stroke="#f7f3ea" strokeWidth="10" />

      {/* shade overlapping the frame */}
      <rect x="18" y="26" width="184" height="9" rx="3" fill="#4c6579" />
      <rect x="22" y="35" width="176" height="118" fill="#5e7b93" />
      <path d="M22 70 H198 M22 100 H198" stroke="#4c6579" strokeWidth="2.4" opacity="0.55" />
      <path d="M22 153 Q110 168 198 153 L198 138 Q110 152 22 138 Z" fill="#4c6579" />

      {/* the frame edges behind the shade */}
      <rect x="42" y="42" width="136" height="150" rx="3" fill="none" stroke="#6d675c" strokeWidth="1.8" strokeDasharray="4 5" opacity="0.5" />

      {/* overall covered area */}
      <DimH x1={18} x2={202} y={13} color="#96631f" letter="W" />
      <DimV x={211} y1={26} y2={168} color="#57644a" letter="H" />
    </svg>
  );
}

/* ---------------- Upholstery: width, height, and depth ---------------- */

export function UpholsteryMeasureArt() {
  return (
    <svg
      viewBox="0 0 460 360"
      role="img"
      aria-label="Diagram of an armchair: arrow W spans the arms, arrow H runs floor to back, and a side view shows depth D from front to back"
      style={TILE}
    >
      <rect width="460" height="360" fill="#faf8f4" />
      {/* floor */}
      <rect y="300" width="460" height="60" fill="#e0d3b8" />
      <rect y="300" width="460" height="5" fill="#cdbd9c" />

      {/* front view: armchair */}
      <g>
        <rect x="88" y="128" width="150" height="112" rx="20" fill="#a9b49a" />
        <path d="M112 150 V225 M214 150 V225" stroke="#7d8c6e" strokeWidth="2.2" opacity="0.5" />
        <rect x="60" y="170" width="48" height="96" rx="16" fill="#a9b49a" />
        <rect x="218" y="170" width="48" height="96" rx="16" fill="#a9b49a" />
        <rect x="88" y="238" width="150" height="32" rx="10" fill="#94a385" />
        <path d="M76 268 V298 M250 268 V298" stroke="#6b5138" strokeWidth="7" strokeLinecap="round" />
      </g>
      {/* W: outside arm to outside arm */}
      <DimH x1={60} x2={266} y={98} color="#96631f" letter="W" />
      {/* H: floor to the top of the back */}
      <DimV x={302} y1={128} y2={300} color="#57644a" letter="H" />

      {/* side view silhouette */}
      <g>
        <path d="M356 150 H382 V216 H428 Q444 216 444 232 V270 H356 Z" fill="#b9c2ac" />
        <path d="M366 270 V298 M436 270 V298" stroke="#6b5138" strokeWidth="6" strokeLinecap="round" />
      </g>
      {/* D: front edge straight back */}
      <DimH x1={356} x2={444} y={324} color="#4c6579" letter="D" />
    </svg>
  );
}

/* ---------------- Small tool icons (line style, brand hues) ---------------- */

export function TapeIcon({ color = 'var(--hue-blue)', size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="9" width="21" height="19" rx="6" />
      <circle cx="15.5" cy="18.5" r="4" />
      <path d="M26 23 H36 V28 H26" />
      <path d="M36 23 V28 M31 23 V26" strokeWidth="1.6" />
    </svg>
  );
}

export function PencilIcon({ color = 'var(--hue-orange-deep)', size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M26 6 H8 V34 H30 V22" />
      <path d="M13 13 H22 M13 19 H18" strokeWidth="1.6" opacity="0.8" />
      <path d="M22 26 L34 14 L37 17 L25 29 L21 30 Z" />
    </svg>
  );
}

export function StoolIcon({ color = 'var(--hue-green)', size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="10" width="22" height="5" rx="1.5" />
      <path d="M11 15 L8 34 M29 15 L32 34" />
      <path d="M13.5 24 H26.5" />
      <path d="M10 34 H14 M26 34 H30" strokeWidth="1.6" />
    </svg>
  );
}

export function ClockIcon({ color = 'var(--hue-violet)', size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="20" cy="20" r="13" />
      <path d="M20 12.5 V20 L25.5 23.5" />
    </svg>
  );
}
