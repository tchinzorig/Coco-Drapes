/**
 * StoryArt — SVG illustrations for the Our Story page.
 * Elegant, editorial style: flat muted shapes and thin line work in the
 * brand palette. No image-loading weight, no cartoon figures.
 */

/**
 * Hero image: a calm living room — drapery and a roman shade dressing
 * two windows, an armchair and a plant in soft afternoon light.
 */
export function FamilyIllustration() {
  return (
    <svg
      viewBox="0 0 900 380"
      role="img"
      aria-label="Illustration of a calm living room: drapery and a roman shade dressing two windows, an armchair and a plant in soft afternoon light"
      style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 'var(--radius)' }}
    >
      {/* room */}
      <rect width="900" height="380" fill="#f6f1e8" />
      <rect y="302" width="900" height="78" fill="#e6dabf" />
      <rect y="302" width="900" height="4" fill="#d6c7a4" />

      {/* soft light falling from the left window */}
      <polygon points="140,252 300,252 380,332 80,332" fill="#f7ecd4" opacity="0.4" />

      {/* left window with drapery */}
      <g>
        <rect x="110" y="60" width="200" height="190" rx="3" fill="#e4edf2" stroke="#f7f3ea" strokeWidth="10" />
        <rect x="206" y="60" width="8" height="190" fill="#f7f3ea" />
        <rect x="110" y="151" width="200" height="8" fill="#f7f3ea" />
        <circle cx="170" cy="112" r="26" fill="#f0e0b0" opacity="0.85" />
        <rect x="80" y="44" width="260" height="6" rx="3" fill="#8a6f52" />
        <circle cx="76" cy="47" r="7" fill="#8a6f52" />
        <circle cx="344" cy="47" r="7" fill="#8a6f52" />
        <path d="M92 50 Q86 160 82 296 L128 296 Q124 160 124 50 Z" fill="#5e7b93" />
        <path d="M102 50 Q99 160 96 296 M114 50 Q113 160 112 296" stroke="#4c6579" strokeWidth="2.4" fill="none" opacity="0.45" />
        <path d="M328 50 Q334 160 338 296 L292 296 Q296 160 296 50 Z" fill="#5e7b93" />
        <path d="M318 50 Q321 160 324 296 M306 50 Q307 160 308 296" stroke="#4c6579" strokeWidth="2.4" fill="none" opacity="0.45" />
      </g>

      {/* right window with roman shade */}
      <g>
        <rect x="610" y="70" width="180" height="175" rx="3" fill="#e4edf2" stroke="#f7f3ea" strokeWidth="10" />
        <rect x="696" y="70" width="8" height="175" fill="#f7f3ea" />
        <rect x="602" y="56" width="196" height="8" rx="3" fill="#6f7f93" />
        <rect x="606" y="64" width="188" height="70" fill="#a9b49a" />
        <path d="M606 90 H794 M606 112 H794" stroke="#7d8c6e" strokeWidth="2.4" opacity="0.5" />
        <path d="M606 134 Q700 148 794 134 L794 120 Q700 132 606 120 Z" fill="#7d8c6e" />
      </g>

      {/* armchair */}
      <g>
        <path d="M430 234 Q428 172 466 166 L514 166 Q550 172 548 234 Z" fill="#55514a" />
        <rect x="418" y="228" width="142" height="50" rx="16" fill="#55514a" />
        <rect x="434" y="212" width="110" height="26" rx="11" fill="#6d675c" />
        <path d="M432 278 V294 M546 278 V294" stroke="#3a3733" strokeWidth="5" strokeLinecap="round" />
      </g>

      {/* potted plant */}
      <g>
        <path d="M596 268 H628 L623 298 H601 Z" fill="#a86a4e" />
        <path d="M612 268 Q610 236 604 214 M612 268 Q616 234 624 216 M612 268 Q612 240 612 222" stroke="#7d8c6e" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <ellipse cx="602" cy="210" rx="9" ry="5" fill="#a9b49a" transform="rotate(-32 602 210)" />
        <ellipse cx="626" cy="212" rx="9" ry="5" fill="#7d8c6e" transform="rotate(28 626 212)" />
        <ellipse cx="612" cy="216" rx="9" ry="5" fill="#a9b49a" transform="rotate(-6 612 216)" />
      </g>

      {/* rug */}
      <ellipse cx="486" cy="320" rx="160" ry="17" fill="#d9c9a8" opacity="0.5" />
    </svg>
  );
}

/* ------- Pledge step illustrations (landscape tiles) ------- */

const TILE = { width: '100%', height: 'auto', display: 'block' };

/** Step 1 — You Design: a drafted window elevation with dimension lines. */
export function DesignArt() {
  return (
    <svg viewBox="0 0 200 150" role="img" aria-label="A drafting sketch of a window with dimension lines and a pencil" style={TILE}>
      <rect width="200" height="150" fill="#faf8f4" />
      <rect x="62" y="32" width="76" height="86" fill="none" stroke="#2c2a27" strokeWidth="2" />
      <path d="M100 32 V118 M62 66 H138" stroke="#2c2a27" strokeWidth="1.5" opacity="0.6" />
      {/* dimension lines */}
      <path d="M62 18 H138 M62 13 V23 M138 13 V23" stroke="#5e7b93" strokeWidth="1.8" />
      <path d="M48 32 V118 M43 32 H53 M43 118 H53" stroke="#5e7b93" strokeWidth="1.8" />
      {/* sketched hem line */}
      <path d="M68 128 Q100 134 132 128" stroke="#c9c2b2" strokeWidth="2" strokeDasharray="4 5" fill="none" strokeLinecap="round" />
      {/* pencil */}
      <g transform="translate(126 112) rotate(35)">
        <rect x="0" y="-4.5" width="38" height="9" fill="#faf8f4" stroke="#2c2a27" strokeWidth="1.8" />
        <path d="M-9 0 L0 -4.5 L0 4.5 Z" fill="#faf8f4" stroke="#2c2a27" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M-9 0 L-5 -2 L-5 2 Z" fill="#2c2a27" />
        <path d="M0 -1.5 H38 M0 1.5 H38" stroke="#2c2a27" strokeWidth="0.8" opacity="0.4" />
      </g>
    </svg>
  );
}

/** Step 2 — You Choose: three medallions; the chosen one carries a ribbon. */
export function ChooseArt() {
  return (
    <svg viewBox="0 0 200 150" role="img" aria-label="Three heart medallions, the chosen one marked with an award ribbon" style={TILE}>
      <rect width="200" height="150" fill="#faf8f4" />
      <path d="M30 122 H170" stroke="#e6e0d4" strokeWidth="3" strokeLinecap="round" />
      {/* side medallions */}
      <circle cx="52" cy="72" r="19" fill="#fff" stroke="#2c2a27" strokeWidth="1.8" />
      <path d="M52 80 C 45 74.5 43.5 69 46.5 66.5 C 49 64.7 51.5 66.6 52 68 C 52.5 66.6 55 64.7 57.5 66.5 C 60.5 69 59 74.5 52 80 Z" fill="none" stroke="#b05c5c" strokeWidth="1.7" />
      <circle cx="148" cy="72" r="19" fill="#fff" stroke="#2c2a27" strokeWidth="1.8" />
      <path d="M148 80 C 141 74.5 139.5 69 142.5 66.5 C 145 64.7 147.5 66.6 148 68 C 148.5 66.6 151 64.7 153.5 66.5 C 156.5 69 155 74.5 148 80 Z" fill="none" stroke="#b05c5c" strokeWidth="1.7" />
      {/* chosen medallion with ribbon */}
      <path d="M92 88 L92 114 L100 106 L108 114 L108 88 Z" fill="#b05c5c" opacity="0.85" />
      <circle cx="100" cy="66" r="25" fill="#fff" stroke="#2c2a27" strokeWidth="2" />
      <path d="M100 77 C 90 69.5 88 61.5 92.5 58 C 96 55.4 99.3 58.2 100 60 C 100.7 58.2 104 55.4 107.5 58 C 112 61.5 110 69.5 100 77 Z" fill="#b05c5c" />
    </svg>
  );
}

/** Step 3 — We Give 5%: a seal with laurel sprigs. */
export function GiveArt() {
  return (
    <svg viewBox="0 0 200 150" role="img" aria-label="A five percent seal framed by laurel sprigs" style={TILE}>
      <rect width="200" height="150" fill="#faf8f4" />
      <circle cx="100" cy="70" r="40" fill="#fff" stroke="#2c2a27" strokeWidth="2" />
      <circle cx="100" cy="70" r="33" fill="none" stroke="#b99b47" strokeWidth="1.5" />
      <text
        x="100" y="80" textAnchor="middle"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="30" fontWeight="600" fill="#2c2a27"
      >
        5%
      </text>
      {/* laurel sprigs */}
      <path d="M58 96 Q72 114 96 119" stroke="#7d8c6e" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="64" cy="101" rx="7" ry="3.5" fill="#a9b49a" transform="rotate(48 64 101)" />
      <ellipse cx="74" cy="110" rx="7" ry="3.5" fill="#7d8c6e" transform="rotate(32 74 110)" />
      <ellipse cx="86" cy="116" rx="7" ry="3.5" fill="#a9b49a" transform="rotate(14 86 116)" />
      <path d="M142 96 Q128 114 104 119" stroke="#7d8c6e" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="136" cy="101" rx="7" ry="3.5" fill="#a9b49a" transform="rotate(-48 136 101)" />
      <ellipse cx="126" cy="110" rx="7" ry="3.5" fill="#7d8c6e" transform="rotate(-32 126 110)" />
      <ellipse cx="114" cy="116" rx="7" ry="3.5" fill="#a9b49a" transform="rotate(-14 114 116)" />
      <circle cx="150" cy="36" r="2" fill="#d4b96a" />
      <circle cx="52" cy="42" r="2" fill="#d4b96a" />
    </svg>
  );
}

/** Step 4 — They Thrive: a young sapling growing toward the sun. */
export function ThriveArt() {
  return (
    <svg viewBox="0 0 200 150" role="img" aria-label="A young sapling growing toward the sun" style={TILE}>
      <rect width="200" height="150" fill="#faf8f4" />
      <circle cx="160" cy="32" r="12" fill="#f0dfae" />
      <circle cx="160" cy="32" r="17" fill="none" stroke="#d4b96a" strokeWidth="1.5" opacity="0.6" />
      <path d="M24 124 Q100 112 176 124" stroke="#cdbd9c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* sapling */}
      <path d="M100 121 Q98 92 102 68 Q104 54 100 42" stroke="#7d8c6e" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M101 92 Q114 84 121 72" stroke="#7d8c6e" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M100 76 Q88 70 81 58" stroke="#7d8c6e" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="123" cy="68" rx="9" ry="4.5" fill="#7d8c6e" transform="rotate(-38 123 68)" />
      <ellipse cx="79" cy="54" rx="9" ry="4.5" fill="#a9b49a" transform="rotate(42 79 54)" />
      <ellipse cx="99" cy="36" rx="9" ry="4.5" fill="#7d8c6e" transform="rotate(-78 99 36)" />
      <ellipse cx="110" cy="84" rx="6" ry="3" fill="#a9b49a" transform="rotate(-30 110 84)" />
      <ellipse cx="91" cy="68" rx="6" ry="3" fill="#a9b49a" transform="rotate(35 91 68)" />
    </svg>
  );
}
