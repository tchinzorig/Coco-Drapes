/**
 * Coco Drapes — Product Catalog & Pricing Model
 * ------------------------------------------------
 * MVP catalog. In production this data will be served from the backend
 * (GET /api/catalog) and inventory levels will sync from QuickBooks.
 * Keep ids stable — they are used as SKUs in cart/order payloads.
 */

/* ---------------------------------------------------------------- *
 *  TREATMENT TYPES & STYLES
 * ---------------------------------------------------------------- */

export const TREATMENTS = {
  drapery: {
    id: 'drapery',
    label: 'Custom Drapery',
    basePrice: 189, // per panel, base labor/construction
    styles: [
      {
        id: 'pinch-pleat',
        label: 'Pinch Pleat',
        description: 'Classic tailored pleats gathered by hand. Our most popular style.',
        priceModifier: 1.0,
      },
      {
        id: 'ripple-fold',
        label: 'Ripple Fold',
        description: 'Continuous soft S-curves. Modern, hotel-style drapery on a track.',
        priceModifier: 1.15,
      },
      {
        id: 'grommet',
        label: 'Grommet',
        description: 'Metal rings for a clean contemporary look that glides easily.',
        priceModifier: 0.9,
      },
      {
        id: 'rod-pocket',
        label: 'Rod Pocket',
        description: 'A sewn pocket slips over the rod for a soft, gathered heading.',
        priceModifier: 0.8,
      },
    ],
  },
  roman: {
    id: 'roman',
    label: 'Roman Shades',
    basePrice: 219, // per shade
    styles: [
      {
        id: 'flat',
        label: 'Flat Roman',
        description: 'A single smooth panel that folds into crisp, even stacks.',
        priceModifier: 1.0,
      },
      {
        id: 'relaxed',
        label: 'Relaxed Roman',
        description: 'A gentle swag at the hem for a soft, casual elegance.',
        priceModifier: 1.1,
      },
      {
        id: 'hobbled',
        label: 'Hobbled Roman',
        description: 'Cascading permanent folds for depth and dimension.',
        priceModifier: 1.25,
      },
      {
        id: 'banded',
        label: 'Flat with Banding',
        description: 'Flat roman framed with a contrast fabric border.',
        priceModifier: 1.2,
      },
    ],
  },
  upholstery: {
    id: 'upholstery',
    label: 'Custom Upholstery',
    basePrice: 249, // per piece, base labor
    styles: [
      {
        id: 'up-armchair',
        label: 'Armchair',
        description: 'Club and accent chairs, rebuilt from cushion to frame.',
        priceModifier: 1.0,
      },
      {
        id: 'up-sofa',
        label: 'Sofa',
        description: 'Two- and three-seat sofas, recovered edge to edge.',
        priceModifier: 2.2,
      },
      {
        id: 'up-dining',
        label: 'Dining Chairs',
        description: 'Seat and back recovering that revives a whole set.',
        priceModifier: 0.5,
      },
      {
        id: 'up-ottoman',
        label: 'Ottoman & Bench',
        description: 'Ottomans, benches, and stools — tailored tight or tufted.',
        priceModifier: 0.7,
      },
      {
        id: 'up-headboard',
        label: 'Headboard',
        description: 'Plain, channeled, or tufted upholstered headboards.',
        priceModifier: 1.2,
      },
      {
        id: 'up-cushions',
        label: 'Cushions & Pillows',
        description: 'New covers for loose cushions, window seats, and pillows.',
        priceModifier: 0.4,
      },
    ],
  },
};

/* ---------------------------------------------------------------- *
 *  FABRICS — “The Signature Collection”
 *  Muted, sophisticated colors — warm garnets through deep plums.
 *  `swatch` drives both the swatch chip and the live visualizer.
 * ---------------------------------------------------------------- */

export const FABRICS = [
  // Reds / warm
  { id: 'fb-garnet-velvet',  name: 'Garnet',     material: 'Cotton Velvet',  swatch: '#9A4A4A', accent: '#7E3A3A', texture: 'velvet', grade: 3, pricePerYard: 68 },
  { id: 'fb-clay-linen',     name: 'Terracotta', material: 'Belgian Linen',  swatch: '#C1745C', accent: '#A85F49', texture: 'linen',  grade: 2, pricePerYard: 52 },
  // Oranges / ochre
  { id: 'fb-ochre-weave',    name: 'Ochre',      material: 'Textured Weave', swatch: '#C9974B', accent: '#B08239', texture: 'weave',  grade: 2, pricePerYard: 48 },
  { id: 'fb-honey-silk',     name: 'Honey',      material: 'Faux Silk',      swatch: '#D8B36A', accent: '#C39D53', texture: 'silk',   grade: 3, pricePerYard: 62 },
  // Yellows / neutrals
  { id: 'fb-flax-linen',     name: 'Flax',       material: 'Belgian Linen',  swatch: '#D9C9A3', accent: '#C6B48B', texture: 'linen',  grade: 1, pricePerYard: 44 },
  { id: 'fb-ivory-cotton',   name: 'Ivory',      material: 'Cotton Sateen',  swatch: '#EFE8D8', accent: '#DED4BE', texture: 'cotton', grade: 1, pricePerYard: 38 },
  // Greens
  { id: 'fb-sage-linen',     name: 'Sage',       material: 'Linen Blend',    swatch: '#94A385', accent: '#7D8C6E', texture: 'linen',  grade: 2, pricePerYard: 50 },
  { id: 'fb-forest-velvet',  name: 'Juniper',    material: 'Cotton Velvet',  swatch: '#4E6B58', accent: '#3D5646', texture: 'velvet', grade: 3, pricePerYard: 68 },
  // Blues
  { id: 'fb-mist-sheer',     name: 'Mist',       material: 'Linen Sheer',    swatch: '#BFCBD4', accent: '#A9B8C4', texture: 'sheer',  grade: 1, pricePerYard: 40 },
  { id: 'fb-harbor-weave',   name: 'Harbor',     material: 'Textured Weave', swatch: '#5E7B93', accent: '#4C6579', texture: 'weave',  grade: 2, pricePerYard: 54 },
  { id: 'fb-indigo-cotton',  name: 'Indigo',     material: 'Cotton Twill',   swatch: '#3F4E6E', accent: '#32405C', texture: 'cotton', grade: 2, pricePerYard: 52 },
  // Violets
  { id: 'fb-thistle-linen',  name: 'Thistle',    material: 'Linen Blend',    swatch: '#9187A3', accent: '#7B7090', texture: 'linen',  grade: 2, pricePerYard: 50 },
  { id: 'fb-plum-velvet',    name: 'Plum',       material: 'Cotton Velvet',  swatch: '#6B4E63', accent: '#583F51', texture: 'velvet', grade: 3, pricePerYard: 70 },
  // Deep neutral anchor
  { id: 'fb-charcoal-weave', name: 'Charcoal',   material: 'Textured Weave', swatch: '#585552', accent: '#464442', texture: 'weave',  grade: 2, pricePerYard: 54 },
];

/* ---------------------------------------------------------------- *
 *  HARDWARE
 * ---------------------------------------------------------------- */

export const ROD_FINISHES = [
  { id: 'hw-matte-black',    label: 'Matte Black',     swatch: '#2B2B2B', price: 74 },
  { id: 'hw-brushed-nickel', label: 'Brushed Nickel',  swatch: '#A9ABAD', price: 82 },
  { id: 'hw-antique-brass',  label: 'Antique Brass',   swatch: '#A8823F', price: 96 },
  { id: 'hw-bronze',         label: 'Oil-Rubbed Bronze', swatch: '#4A3A2E', price: 88 },
];

export const FINIALS = [
  { id: 'fn-sphere',  label: 'Sphere',   price: 0 },
  { id: 'fn-endcap',  label: 'End Cap',  price: 0 },
  { id: 'fn-crystal', label: 'Crystal',  price: 24 },
];

/* Roman shade mounting + control */
export const MOUNT_TYPES = [
  { id: 'mt-inside',  label: 'Inside Mount',  description: 'Sits within the window frame for a built-in look.', price: 0 },
  { id: 'mt-outside', label: 'Outside Mount', description: 'Mounts above the frame to make windows feel larger.', price: 0 },
];

export const CONTROL_TYPES = [
  { id: 'ct-cordless',   label: 'Cordless',        description: 'Smooth lift, child-safe.', price: 45 },
  { id: 'ct-continuous', label: 'Continuous Loop', description: 'Bead-chain control, great for wide shades.', price: 25 },
  { id: 'ct-motorized',  label: 'Motorized',       description: 'Remote & app control. Rechargeable battery.', price: 210 },
];

/* ---------------------------------------------------------------- *
 *  LININGS
 * ---------------------------------------------------------------- */

export const LININGS = [
  { id: 'ln-unlined',  label: 'Unlined',        description: 'Light, airy, lets the weave show.', price: 0 },
  { id: 'ln-privacy',  label: 'Privacy Lining', description: 'Softens light, protects fabric.',   price: 32 },
  { id: 'ln-blackout', label: 'Blackout',       description: 'Blocks light for bedrooms & media rooms.', price: 58 },
  { id: 'ln-interlined', label: 'Interlined',   description: 'Flannel interlining for a fuller, luxurious drape.', price: 79 },
];

/* ---------------------------------------------------------------- *
 *  PRICING ENGINE
 *  Simple, transparent model for the MVP:
 *    fabric yards ≈ (width / 54") × fullness × (height + hems) / 36
 *    price = (base × styleModifier) + fabricCost + lining + hardware + controls
 * ---------------------------------------------------------------- */

export function estimateYards(treatmentId, widthIn, heightIn) {
  const fullness = treatmentId === 'drapery' ? 2.2 : 1.15;
  const hemAllowance = treatmentId === 'drapery' ? 16 : 10; // inches
  const widths = Math.max(1, Math.ceil((widthIn * fullness) / 54));
  const yards = (widths * (heightIn + hemAllowance)) / 36;
  return Math.round(yards * 10) / 10;
}

export function calculatePrice(config) {
  const {
    treatmentId, styleId, fabricId, liningId,
    widthIn, heightIn, panels = 1,
    rodFinishId, finialId, mountId, controlId,
  } = config;

  const treatment = TREATMENTS[treatmentId];
  if (!treatment) return null;

  const style = treatment.styles.find((s) => s.id === styleId) || treatment.styles[0];
  const fabric = FABRICS.find((f) => f.id === fabricId) || FABRICS[0];
  const lining = LININGS.find((l) => l.id === liningId) || LININGS[0];

  const yards = estimateYards(treatmentId, widthIn, heightIn);
  const construction = treatment.basePrice * style.priceModifier;
  const fabricCost = yards * fabric.pricePerYard;
  const liningCost = lining.price === 0 ? 0 : lining.price * Math.max(1, yards * 0.6);

  let hardwareCost = 0;
  const lineItems = [
    { label: `${style.label} construction`, amount: construction },
    { label: `${fabric.name} ${fabric.material} — ${yards} yd`, amount: fabricCost },
  ];
  if (lining.price > 0) lineItems.push({ label: lining.label, amount: liningCost });

  if (treatmentId === 'drapery') {
    const rod = ROD_FINISHES.find((r) => r.id === rodFinishId);
    const finial = FINIALS.find((f) => f.id === finialId);
    if (rod) { hardwareCost += rod.price; lineItems.push({ label: `${rod.label} rod`, amount: rod.price }); }
    if (finial && finial.price > 0) { hardwareCost += finial.price; lineItems.push({ label: `${finial.label} finials`, amount: finial.price }); }
  } else {
    const control = CONTROL_TYPES.find((c) => c.id === controlId);
    if (control && control.price > 0) { hardwareCost += control.price; lineItems.push({ label: `${control.label} lift`, amount: control.price }); }
    void mountId; // mount is free; kept in config for the workroom
  }

  const perUnit = construction + fabricCost + liningCost + hardwareCost;
  const subtotal = perUnit * panels;

  return {
    yards,
    perUnit: round2(perUnit),
    panels,
    subtotal: round2(subtotal),
    lineItems: lineItems.map((li) => ({ ...li, amount: round2(li.amount) })),
  };
}

function round2(n) { return Math.round(n * 100) / 100; }

export function formatUSD(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

/* Default configurations used when a customer opens the customizer */
export const DEFAULT_CONFIG = {
  drapery: {
    treatmentId: 'drapery',
    styleId: 'pinch-pleat',
    fabricId: 'fb-flax-linen',
    liningId: 'ln-privacy',
    rodFinishId: 'hw-matte-black',
    finialId: 'fn-sphere',
    widthIn: 60,
    heightIn: 96,
    panels: 2,
  },
  roman: {
    treatmentId: 'roman',
    styleId: 'flat',
    fabricId: 'fb-sage-linen',
    liningId: 'ln-privacy',
    mountId: 'mt-inside',
    controlId: 'ct-cordless',
    widthIn: 36,
    heightIn: 60,
    panels: 1,
  },
  upholstery: {
    treatmentId: 'upholstery',
    styleId: 'up-armchair',
    fabricId: 'fb-sage-linen',
    panels: 1,
  },
};
