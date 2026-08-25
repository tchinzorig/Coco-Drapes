import { FABRICS, ROD_FINISHES, FINIALS } from '../data/catalog.js';

/**
 * WindowPreview — the live visualizer.
 * Renders a stylized room scene as SVG and draws the customer's current
 * configuration (treatment, style, fabric, hardware) over a model window.
 *
 * Pure function of `config` — no internal state — so it re-renders
 * instantly as the customer changes options.
 */

const W = 800;
const H = 620;

// Model window geometry (shared by both treatments)
const WIN = { x: 250, y: 130, w: 300, h: 330 };

export default function WindowPreview({ config }) {
  // previewFabric lets the customizer drive the preview from a chosen color
  // (while the final fabric collection is still being curated).
  const fabric = config.previewFabric
    || FABRICS.find((f) => f.id === config.fabricId)
    || FABRICS[0];
  const isSheer = fabric.texture === 'sheer';

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Live preview of your window treatment"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <defs>
        <TextureDefs fabric={fabric} />
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#efe9dd" />
          <stop offset="100%" stopColor="#e3dccb" />
        </linearGradient>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dce8ee" />
          <stop offset="70%" stopColor="#eef2ea" />
          <stop offset="100%" stopColor="#e5ecdc" />
        </linearGradient>
      </defs>

      {/* Room */}
      <rect width={W} height={H} fill="url(#wall)" />
      <rect y={H - 90} width={W} height={90} fill="#cdbfa4" />
      <rect y={H - 90} width={W} height={8} fill="#b3a486" />
      {/* floorboards */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line key={i} x1={i * 110 - 30} y1={H - 82} x2={i * 110 + 20} y2={H} stroke="#bfb093" strokeWidth="2" />
      ))}
      <rect y={H - 98} width={W} height={10} fill="#f4efe4" />

      {/* Window */}
      <WindowFrame />

      {/* Treatment */}
      {config.treatmentId === 'roman' ? (
        <RomanShade config={config} fabric={fabric} isSheer={isSheer} />
      ) : (
        <Drapery config={config} fabric={fabric} isSheer={isSheer} />
      )}

      {/* Soft floor shadow anchors the scene */}
      <ellipse cx={W / 2} cy={H - 86} rx={260} ry={14} fill="#000" opacity="0.06" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Fabric texture pattern defs                                        */
/* ------------------------------------------------------------------ */
function TextureDefs({ fabric }) {
  return (
    <>
      {/* Linen: fine crosshatch */}
      <pattern id="tex-linen" width="6" height="6" patternUnits="userSpaceOnUse">
        <rect width="6" height="6" fill="none" />
        <path d="M0 3 H6" stroke="#000" strokeOpacity="0.05" strokeWidth="1" />
        <path d="M3 0 V6" stroke="#fff" strokeOpacity="0.06" strokeWidth="1" />
      </pattern>
      {/* Weave: dotted basket texture */}
      <pattern id="tex-weave" width="8" height="8" patternUnits="userSpaceOnUse">
        <rect width="8" height="8" fill="none" />
        <circle cx="2" cy="2" r="1" fill="#000" opacity="0.05" />
        <circle cx="6" cy="6" r="1" fill="#fff" opacity="0.07" />
      </pattern>
      {/* Cotton: very subtle grain */}
      <pattern id="tex-cotton" width="5" height="5" patternUnits="userSpaceOnUse">
        <rect width="5" height="5" fill="none" />
        <path d="M0 2.5 H5" stroke="#fff" strokeOpacity="0.04" strokeWidth="1" />
      </pattern>
      {/* Velvet: vertical sheen */}
      <linearGradient id="tex-velvet" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.12" />
        <stop offset="35%" stopColor="#fff" stopOpacity="0" />
        <stop offset="65%" stopColor="#000" stopOpacity="0.10" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0.06" />
      </linearGradient>
      {/* Silk: diagonal sheen bands */}
      <linearGradient id="tex-silk" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.16" />
        <stop offset="45%" stopColor="#fff" stopOpacity="0" />
        <stop offset="70%" stopColor="#fff" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      {/* Fold shading used on every fabric */}
      <linearGradient id="fold-shade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#000" stopOpacity="0.13" />
        <stop offset="50%" stopColor="#fff" stopOpacity="0.10" />
        <stop offset="100%" stopColor="#000" stopOpacity="0.13" />
      </linearGradient>
      <linearGradient id="shade-depth" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#000" stopOpacity="0.08" />
        <stop offset="15%" stopColor="#000" stopOpacity="0" />
        <stop offset="100%" stopColor="#000" stopOpacity="0.05" />
      </linearGradient>
      {void fabric}
    </>
  );
}

function textureFill(texture) {
  switch (texture) {
    case 'linen': return 'url(#tex-linen)';
    case 'weave': return 'url(#tex-weave)';
    case 'cotton': return 'url(#tex-cotton)';
    case 'velvet': return 'url(#tex-velvet)';
    case 'silk': return 'url(#tex-silk)';
    default: return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Window                                                             */
/* ------------------------------------------------------------------ */
function WindowFrame() {
  const { x, y, w, h } = WIN;
  const paneW = (w - 36) / 2;
  const paneH = (h - 48) / 3;
  return (
    <g>
      {/* outer casing */}
      <rect x={x - 14} y={y - 14} width={w + 28} height={h + 28} rx="3" fill="#f7f3ea" stroke="#d8d0bd" strokeWidth="2" />
      {/* glass */}
      <rect x={x} y={y} width={w} height={h} fill="url(#sky)" />
      {/* view hint: distant hills + sun */}
      <circle cx={x + w * 0.72} cy={y + h * 0.28} r="26" fill="#f3ead0" opacity="0.9" />
      <path d={`M${x} ${y + h * 0.78} Q ${x + w * 0.3} ${y + h * 0.62}, ${x + w * 0.55} ${y + h * 0.76} T ${x + w} ${y + h * 0.72} V ${y + h} H ${x} Z`} fill="#cdd8be" opacity="0.85" />
      <path d={`M${x} ${y + h * 0.88} Q ${x + w * 0.45} ${y + h * 0.76}, ${x + w} ${y + h * 0.85} V ${y + h} H ${x} Z`} fill="#b9c8a8" opacity="0.9" />
      {/* muntins */}
      <g fill="#f7f3ea">
        <rect x={x + 12 + paneW} y={y} width="12" height={h} />
        <rect x={x} y={y + 12 + paneH} width={w} height="12" />
        <rect x={x} y={y + 24 + paneH * 2} width={w} height="12" />
        <rect x={x} y={y} width={w} height="6" />
        <rect x={x} y={y + h - 6} width={w} height="6" />
        <rect x={x} y={y} width="6" height={h} />
        <rect x={x + w - 6} y={y} width="6" height={h} />
      </g>
      {/* sill */}
      <rect x={x - 24} y={y + h + 14} width={w + 48} height="12" rx="2" fill="#efe9db" stroke="#d8d0bd" strokeWidth="1.5" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  DRAPERY                                                            */
/* ------------------------------------------------------------------ */
function Drapery({ config, fabric, isSheer }) {
  const finish = ROD_FINISHES.find((r) => r.id === config.rodFinishId) || ROD_FINISHES[0];
  const finial = FINIALS.find((f) => f.id === config.finialId) || FINIALS[0];
  const style = config.styleId;

  const rodY = WIN.y - 42;
  const rodX1 = WIN.x - 78;
  const rodX2 = WIN.x + WIN.w + 78;
  const panelTop = style === 'rod-pocket' ? rodY - 8 : rodY + (style === 'grommet' ? -14 : 6);
  const panelBottom = H - 96;
  const panelW = config.panels === 1 ? 150 : 132;
  const tex = textureFill(fabric.texture);
  const opacity = isSheer ? 0.62 : 1;

  const leftX = rodX1 + 26;
  const rightX = rodX2 - 26 - panelW;

  return (
    <g>
      {/* Panels first (behind rod for grommet/rod-pocket look handled below) */}
      <g opacity={opacity}>
        <Panel x={leftX} top={panelTop} bottom={panelBottom} w={panelW} fabric={fabric} tex={tex} style={style} finish={finish} />
        {config.panels !== 1 && (
          <Panel x={rightX} top={panelTop} bottom={panelBottom} w={panelW} fabric={fabric} tex={tex} style={style} finish={finish} mirror />
        )}
      </g>

      {/* Rod & finials (track for ripple fold) */}
      {style === 'ripple-fold' ? (
        <rect x={rodX1} y={rodY - 4} width={rodX2 - rodX1} height="10" rx="2" fill={finish.swatch} />
      ) : (
        <g>
          <rect x={rodX1} y={rodY} width={rodX2 - rodX1} height="8" rx="4" fill={finish.swatch} />
          <rect x={rodX1} y={rodY + 1.5} width={rodX2 - rodX1} height="2.5" rx="1" fill="#fff" opacity="0.22" />
          <Finial x={rodX1} y={rodY + 4} type={finial.id} color={finish.swatch} side="left" />
          <Finial x={rodX2} y={rodY + 4} type={finial.id} color={finish.swatch} side="right" />
          {/* brackets */}
          <rect x={WIN.x + 20} y={rodY + 6} width="6" height="16" fill={finish.swatch} opacity="0.85" />
          <rect x={WIN.x + WIN.w - 26} y={rodY + 6} width="6" height="16" fill={finish.swatch} opacity="0.85" />
        </g>
      )}
    </g>
  );
}

function Finial({ x, y, type, color, side }) {
  const dir = side === 'left' ? -1 : 1;
  if (type === 'fn-endcap') {
    return <rect x={side === 'left' ? x - 10 : x} y={y - 7} width="10" height="14" rx="2" fill={color} />;
  }
  if (type === 'fn-crystal') {
    return (
      <g>
        <rect x={side === 'left' ? x - 6 : x} y={y - 3} width="6" height="6" fill={color} />
        <path
          d={`M${x + dir * 6} ${y} l ${dir * 9} -10 l ${dir * 9} 10 l ${-dir * 9} 10 Z`}
          fill="#e9f0f4" stroke="#b9c6ce" strokeWidth="1.5"
        />
      </g>
    );
  }
  // sphere
  return (
    <g>
      <rect x={side === 'left' ? x - 6 : x} y={y - 3} width="6" height="6" fill={color} />
      <circle cx={x + dir * 13} cy={y} r="9" fill={color} />
      <circle cx={x + dir * 10} cy={y - 3} r="3" fill="#fff" opacity="0.3" />
    </g>
  );
}

function Panel({ x, top, bottom, w, fabric, tex, style, finish, mirror }) {
  const hFull = bottom - top;
  const foldCount = 7;
  const foldW = w / foldCount;
  const folds = [];

  for (let i = 0; i < foldCount; i++) {
    const fx = x + i * foldW;
    // alternate light/dark to suggest depth
    const shade = i % 2 === 0 ? fabric.swatch : fabric.accent;
    if (style === 'ripple-fold') {
      // smooth S-curves: draw as wave columns
      folds.push(
        <path
          key={i}
          d={`M${fx} ${top} Q ${fx + foldW / 2} ${top + 8}, ${fx + foldW} ${top}
              L ${fx + foldW} ${bottom} Q ${fx + foldW / 2} ${bottom - 6}, ${fx} ${bottom} Z`}
          fill={shade}
        />
      );
    } else {
      folds.push(<rect key={i} x={fx} y={top} width={foldW + 0.6} height={hFull} fill={shade} />);
    }
  }

  return (
    <g>
      {folds}
      {/* texture + fold shading overlays */}
      {tex && <rect x={x} y={top} width={w} height={hFull} fill={tex} />}
      {Array.from({ length: foldCount }, (_, i) => (
        <rect key={i} x={x + i * foldW} y={top} width={foldW} height={hFull} fill="url(#fold-shade)" />
      ))}

      {/* Heading treatments */}
      {style === 'pinch-pleat' && (
        <g>
          {Array.from({ length: foldCount }, (_, i) => (
            <path
              key={i}
              d={`M${x + i * foldW + 2} ${top} L ${x + i * foldW + foldW / 2} ${top + 22} L ${x + (i + 1) * foldW - 2} ${top} Z`}
              fill="#000" opacity="0.10"
            />
          ))}
          <rect x={x} y={top} width={w} height="4" fill="#000" opacity="0.10" />
        </g>
      )}
      {style === 'grommet' && (
        <g>
          {Array.from({ length: Math.floor(foldCount / 2) + 1 }, (_, i) => (
            <circle key={i} cx={x + foldW / 2 + i * foldW * 2} cy={top + 12} r="7"
              fill="none" stroke={finish.swatch} strokeWidth="4.5" />
          ))}
        </g>
      )}
      {style === 'rod-pocket' && (
        <g>
          <rect x={x} y={top} width={w} height="16" rx="8" fill={fabric.accent} />
          {tex && <rect x={x} y={top} width={w} height="16" rx="8" fill={tex} />}
          <rect x={x} y={top + 18} width={w} height="3" fill="#000" opacity="0.08" />
        </g>
      )}

      {/* Hem shadow + slight flare at floor */}
      <rect x={x} y={bottom - 8} width={w} height="8" fill="#000" opacity="0.08" />
      <ellipse cx={x + w / 2} cy={bottom} rx={w / 2 + (mirror ? 4 : 6)} ry="5" fill="#000" opacity="0.07" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  ROMAN SHADES                                                       */
/* ------------------------------------------------------------------ */
function RomanShade({ config, fabric, isSheer }) {
  const inside = config.mountId !== 'mt-outside';
  const style = config.styleId;
  const tex = textureFill(fabric.texture);

  const x = inside ? WIN.x + 8 : WIN.x - 26;
  const w = inside ? WIN.w - 16 : WIN.w + 52;
  const top = inside ? WIN.y + 6 : WIN.y - 34;
  // shade drawn ~2/3 lowered so the customer sees folds AND the window
  const dropH = (WIN.y + WIN.h * 0.72) - top;
  const bottom = top + dropH;
  const opacity = isSheer ? 0.68 : 1;

  return (
    <g opacity={opacity}>
      {/* headrail */}
      <rect x={x - 3} y={top - 10} width={w + 6} height="12" rx="2" fill={fabric.accent} />

      {/* main body */}
      <rect x={x} y={top} width={w} height={dropH} fill={fabric.swatch} />
      {tex && <rect x={x} y={top} width={w} height={dropH} fill={tex} />}
      <rect x={x} y={top} width={w} height={dropH} fill="url(#shade-depth)" />

      {style === 'flat' && <FlatFolds x={x} w={w} top={top} bottom={bottom} fabric={fabric} />}
      {style === 'relaxed' && <RelaxedHem x={x} w={w} top={top} bottom={bottom} fabric={fabric} tex={tex} />}
      {style === 'hobbled' && <HobbledFolds x={x} w={w} top={top} bottom={bottom} fabric={fabric} tex={tex} />}
      {style === 'banded' && <Banding x={x} w={w} top={top} bottom={bottom} />}

      {/* bottom stack shadow */}
      {style !== 'relaxed' && (
        <>
          <rect x={x} y={bottom - 26} width={w} height="13" fill={fabric.accent} opacity="0.9" />
          <rect x={x} y={bottom - 13} width={w} height="13" fill={fabric.swatch} />
          {tex && <rect x={x} y={bottom - 26} width={w} height="26" fill={tex} />}
          <rect x={x} y={bottom - 26} width={w} height="3" fill="#000" opacity="0.12" />
          <rect x={x} y={bottom - 1} width={w} height="4" fill="#000" opacity="0.14" />
        </>
      )}

      {/* control hint */}
      {config.controlId === 'ct-continuous' && (
        <line x1={x + w - 8} y1={top} x2={x + w - 8} y2={bottom + 40} stroke="#8b857b" strokeWidth="2" strokeDasharray="1 5" />
      )}
      {config.controlId === 'ct-motorized' && (
        <g>
          <rect x={x + w - 26} y={top - 8} width="20" height="8" rx="2" fill="#5a564f" />
          <circle cx={x + w - 16} cy={top - 4} r="1.6" fill="#9fd0a8" />
        </g>
      )}
    </g>
  );
}

function FlatFolds({ x, w, top, bottom, fabric }) {
  const lines = [];
  const gap = (bottom - top - 26) / 4;
  for (let i = 1; i <= 3; i++) {
    const y = top + i * gap;
    lines.push(
      <g key={i}>
        <line x1={x} y1={y} x2={x + w} y2={y} stroke="#000" strokeOpacity="0.09" strokeWidth="2" />
        <line x1={x} y1={y + 2} x2={x + w} y2={y + 2} stroke="#fff" strokeOpacity="0.12" strokeWidth="2" />
      </g>
    );
  }
  return <g>{lines}{void fabric}</g>;
}

function RelaxedHem({ x, w, top, bottom, fabric, tex }) {
  return (
    <g>
      {/* soft fold lines */}
      {[0.3, 0.55].map((t, i) => (
        <path key={i}
          d={`M${x} ${top + (bottom - top) * t} Q ${x + w / 2} ${top + (bottom - top) * t + 10}, ${x + w} ${top + (bottom - top) * t}`}
          fill="none" stroke="#000" strokeOpacity="0.08" strokeWidth="2" />
      ))}
      {/* swagged hem: curve rises in the middle */}
      <path
        d={`M${x} ${bottom - 34} L ${x} ${bottom} Q ${x + w / 2} ${bottom - 44}, ${x + w} ${bottom} L ${x + w} ${bottom - 34}
            Q ${x + w / 2} ${bottom - 66}, ${x} ${bottom - 34} Z`}
        fill={fabric.accent}
      />
      {tex && (
        <path
          d={`M${x} ${bottom - 34} L ${x} ${bottom} Q ${x + w / 2} ${bottom - 44}, ${x + w} ${bottom} L ${x + w} ${bottom - 34}
              Q ${x + w / 2} ${bottom - 66}, ${x} ${bottom - 34} Z`}
          fill={tex}
        />
      )}
      <path d={`M${x} ${bottom} Q ${x + w / 2} ${bottom - 44}, ${x + w} ${bottom}`} fill="none" stroke="#000" strokeOpacity="0.14" strokeWidth="2.5" />
    </g>
  );
}

function HobbledFolds({ x, w, top, bottom, fabric, tex }) {
  const folds = [];
  const foldH = 34;
  const count = Math.floor((bottom - top) / foldH);
  for (let i = 0; i < count; i++) {
    const y = top + i * foldH;
    folds.push(
      <g key={i}>
        <path
          d={`M${x} ${y + foldH} Q ${x + w / 2} ${y + foldH + 14}, ${x + w} ${y + foldH} L ${x + w} ${y} L ${x} ${y} Z`}
          fill={i % 2 === 0 ? fabric.swatch : fabric.accent}
        />
        {tex && (
          <path
            d={`M${x} ${y + foldH} Q ${x + w / 2} ${y + foldH + 14}, ${x + w} ${y + foldH} L ${x + w} ${y} L ${x} ${y} Z`}
            fill={tex}
          />
        )}
        <path
          d={`M${x} ${y + foldH} Q ${x + w / 2} ${y + foldH + 14}, ${x + w} ${y + foldH}`}
          fill="none" stroke="#000" strokeOpacity="0.13" strokeWidth="2"
        />
      </g>
    );
  }
  return <g>{folds}</g>;
}

function Banding({ x, w, top, bottom }) {
  const inset = 14;
  return (
    <g>
      <rect
        x={x + inset} y={top + inset}
        width={w - inset * 2} height={bottom - top - inset * 2 - 26}
        fill="none" stroke="#3f3c38" strokeOpacity="0.55" strokeWidth="7"
      />
      {/* fold lines like flat */}
      {[1, 2].map((i) => {
        const y = top + i * ((bottom - top - 26) / 3);
        return <line key={i} x1={x} y1={y} x2={x + w} y2={y} stroke="#000" strokeOpacity="0.08" strokeWidth="2" />;
      })}
    </g>
  );
}
