import { FABRICS } from '../data/catalog.js';

/**
 * FurniturePreview — the live visualizer for upholstery.
 * Same contract as WindowPreview: a pure function of `config` that renders
 * the selected piece (config.styleId) in the customer's fabric color
 * (config.previewFabric override first, same as the window visualizer).
 */

const W = 800;
const H = 620;

const WOOD = '#8a6f52';
const WOOD_DARK = '#6b5138';

export default function FurniturePreview({ config }) {
  const fabric = config.previewFabric
    || FABRICS.find((f) => f.id === config.fabricId)
    || FABRICS[0];

  const Piece = PIECES[config.styleId] || Armchair;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Live preview of your upholstery piece"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <defs>
        <linearGradient id="up-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#efe9dd" />
          <stop offset="100%" stopColor="#e3dccb" />
        </linearGradient>
        <linearGradient id="up-depth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.10" />
          <stop offset="55%" stopColor="#fff" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* Room */}
      <rect width={W} height={H} fill="url(#up-wall)" />
      <rect y={H - 90} width={W} height={90} fill="#cdbfa4" />
      <rect y={H - 90} width={W} height={8} fill="#b3a486" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line key={i} x1={i * 110 - 30} y1={H - 82} x2={i * 110 + 20} y2={H} stroke="#bfb093" strokeWidth="2" />
      ))}
      <rect y={H - 98} width={W} height={10} fill="#f4efe4" />

      {/* Piece shadow + piece */}
      <ellipse cx={W / 2} cy={H - 86} rx={250} ry={14} fill="#000" opacity="0.08" />
      <Piece c={fabric.swatch} a={fabric.accent} />
    </svg>
  );
}

/* Soft depth wash applied over every fabric surface */
function Depth({ x, y, w, h, rx }) {
  return <rect x={x} y={y} width={w} height={h} rx={rx} fill="url(#up-depth)" />;
}

/* ------------------------------------------------------------------ */
/*  Pieces — drawn center stage, keyed by style id                     */
/* ------------------------------------------------------------------ */

function Armchair({ c, a }) {
  return (
    <g>
      <rect x="270" y="220" width="260" height="190" rx="30" fill={c} />
      <Depth x={270} y={220} w={260} h={190} rx={30} />
      <path d="M300 250 V380 M500 250 V380" stroke={a} strokeWidth="2.5" opacity="0.35" fill="none" />
      <rect x="238" y="300" width="72" height="150" rx="24" fill={c} />
      <rect x="490" y="300" width="72" height="150" rx="24" fill={c} />
      <Depth x={238} y={300} w={72} h={150} rx={24} />
      <Depth x={490} y={300} w={72} h={150} rx={24} />
      <rect x="296" y="392" width="208" height="52" rx="16" fill={c} />
      <path d="M296 418 H504" stroke={a} strokeWidth="2.5" opacity="0.4" />
      <rect x="270" y="440" width="260" height="34" rx="10" fill={c} />
      <Depth x={270} y={440} w={260} h={34} rx={10} />
      <path d="M292 474 V528 M508 474 V528" stroke={WOOD_DARK} strokeWidth="9" strokeLinecap="round" />
    </g>
  );
}

function Sofa({ c, a }) {
  return (
    <g>
      <rect x="170" y="240" width="460" height="170" rx="26" fill={c} />
      <Depth x={170} y={240} w={460} h={170} rx={26} />
      <path d="M320 262 V380 M480 262 V380" stroke={a} strokeWidth="2.5" opacity="0.35" fill="none" />
      <rect x="142" y="300" width="70" height="150" rx="24" fill={c} />
      <rect x="588" y="300" width="70" height="150" rx="24" fill={c} />
      <Depth x={142} y={300} w={70} h={150} rx={24} />
      <Depth x={588} y={300} w={70} h={150} rx={24} />
      {/* seat deck closes the gap between back and base */}
      <rect x="190" y="392" width="420" height="52" fill={c} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={208 + i * 130} y="382" width="124" height="54" rx="15" fill={c} />
      ))}
      <path d="M334 388 V430 M466 388 V430" stroke={a} strokeWidth="2.5" opacity="0.45" />
      <rect x="170" y="436" width="460" height="34" rx="10" fill={c} />
      <Depth x={170} y={436} w={460} h={34} rx={10} />
      <path d="M196 470 V528 M604 470 V528" stroke={WOOD_DARK} strokeWidth="9" strokeLinecap="round" />
      {/* accent pillow */}
      <rect x="222" y="330" width="74" height="74" rx="16" fill={a} transform="rotate(-7 259 367)" />
    </g>
  );
}

function DiningChair({ c, a }) {
  return (
    <g>
      {/* back stiles */}
      <path d="M330 178 Q327 300 326 372 M470 178 Q473 300 474 372" stroke={WOOD} strokeWidth="11" strokeLinecap="round" fill="none" />
      {/* upholstered back pad */}
      <rect x="326" y="204" width="148" height="118" rx="14" fill={c} />
      <Depth x={326} y={204} w={148} h={118} rx={14} />
      <path d="M348 226 V300 M400 222 V304 M452 226 V300" stroke={a} strokeWidth="2" opacity="0.35" />
      {/* seat */}
      <rect x="306" y="352" width="188" height="46" rx="14" fill={c} />
      <Depth x={306} y={352} w={188} h={46} rx={14} />
      <path d="M306 384 H494" stroke={a} strokeWidth="2.5" opacity="0.4" />
      {/* apron + legs */}
      <rect x="314" y="396" width="172" height="14" rx="4" fill={WOOD} />
      <path d="M324 410 L315 528 M476 410 L485 528 M352 410 L350 522 M448 410 L450 522" stroke={WOOD_DARK} strokeWidth="9" strokeLinecap="round" />
    </g>
  );
}

function Ottoman({ c, a }) {
  return (
    <g>
      <rect x="256" y="322" width="288" height="122" rx="30" fill={c} />
      <Depth x={256} y={322} w={288} h={122} rx={30} />
      {/* tufting */}
      {[0, 1, 2].map((col) => (
        <circle key={`t${col}`} cx={322 + col * 78} cy={362} r="4" fill={a} opacity="0.7" />
      ))}
      {[0, 1].map((col) => (
        <circle key={`b${col}`} cx={361 + col * 78} cy={398} r="4" fill={a} opacity="0.7" />
      ))}
      <path d="M256 430 H544" stroke={a} strokeWidth="2.5" opacity="0.35" />
      <path d="M282 444 V528 M518 444 V528 M400 444 V528" stroke={WOOD_DARK} strokeWidth="9" strokeLinecap="round" />
    </g>
  );
}

function Headboard({ c, a }) {
  return (
    <g>
      {/* headboard with softly arched top */}
      <path d="M240 420 V240 Q240 176 304 172 L496 172 Q560 176 560 240 V420 Z" fill={c} />
      <path d="M240 420 V240 Q240 176 304 172 L496 172 Q560 176 560 240 V420 Z" fill="url(#up-depth)" />
      {/* channels */}
      <path d="M304 180 V420 M368 174 V420 M432 174 V420 M496 180 V420" stroke={a} strokeWidth="2.5" opacity="0.4" />
      {/* bed */}
      <rect x="222" y="408" width="356" height="64" rx="12" fill="#f4efe6" />
      <rect x="222" y="408" width="356" height="14" rx="7" fill="#e7dfd0" />
      <rect x="252" y="380" width="120" height="44" rx="14" fill="#faf6ec" />
      <rect x="428" y="380" width="120" height="44" rx="14" fill="#faf6ec" />
      <rect x="222" y="472" width="356" height="56" rx="6" fill="#ddd3c0" />
    </g>
  );
}

function Cushions({ c, a }) {
  return (
    <g transform="translate(0 30)">
      {/* back pillow, slightly tilted */}
      <g transform="rotate(-7 330 330)">
        <rect x="252" y="252" width="156" height="156" rx="26" fill={c} />
        <Depth x={252} y={252} w={156} h={156} rx={26} />
        <rect x="252" y="252" width="156" height="156" rx="26" fill="none" stroke={a} strokeWidth="2.5" opacity="0.5" />
      </g>
      {/* front pillow */}
      <g transform="rotate(5 470 350)">
        <rect x="392" y="272" width="156" height="156" rx="26" fill={c} />
        <Depth x={392} y={272} w={156} h={156} rx={26} />
        <rect x="392" y="272" width="156" height="156" rx="26" fill="none" stroke={a} strokeWidth="2.5" opacity="0.5" />
      </g>
      {/* lumbar in the accent shade */}
      <rect x="300" y="404" width="212" height="88" rx="22" fill={a} />
      <Depth x={300} y={404} w={212} h={88} rx={22} />
      <path d="M322 448 H490" stroke={c} strokeWidth="2.5" opacity="0.5" />
    </g>
  );
}

const PIECES = {
  'up-armchair': Armchair,
  'up-sofa': Sofa,
  'up-dining': DiningChair,
  'up-ottoman': Ottoman,
  'up-headboard': Headboard,
  'up-cushions': Cushions,
};
