import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import WindowPreview from '../components/WindowPreview.jsx';
import FurniturePreview from '../components/FurniturePreview.jsx';
import { TapeIcon } from '../components/MeasureArt.jsx';
import { HASH_ROUTING } from '../utils/routing.js';
import { COMPANY } from '../data/company.js';
import { sendFormEmail } from '../utils/sendForm.js';
import {
  TREATMENTS, ROD_FINISHES, FINIALS,
  MOUNT_TYPES, CONTROL_TYPES, LININGS,
  DEFAULT_CONFIG,
} from '../data/catalog.js';

/**
 * Fabric color interests. The final fabric collection is still being
 * curated, so instead of committing customers to specific fabrics we ask
 * which colors they're drawn to (multi-select, or "I'm not sure").
 * Each swatch drives the live preview via config.previewFabric.
 */
const COLOR_OPTIONS = [
  { id: 'ivory',      label: 'Ivory',       swatch: '#f1ece0' },
  { id: 'cream',      label: 'Cream',       swatch: '#e9dcc0' },
  { id: 'blush',      label: 'Blush',       swatch: '#e3c1bb' },
  { id: 'terracotta', label: 'Terracotta',  swatch: '#c0755c' },
  { id: 'gold',       label: 'Gold',        swatch: '#d4b96a' },
  { id: 'sage',       label: 'Sage',        swatch: '#a9b49a' },
  { id: 'forest',     label: 'Forest',      swatch: '#7d8c6e' },
  { id: 'sky',        label: 'Sky',         swatch: '#b9cbd8' },
  { id: 'slate',      label: 'Slate Blue',  swatch: '#5e7b93' },
  { id: 'lavender',   label: 'Lavender',    swatch: '#b9aec9' },
  { id: 'stone',      label: 'Stone Gray',  swatch: '#b5b0a8' },
  { id: 'charcoal',   label: 'Charcoal',    swatch: '#55514a' },
];

const WINDOW_COUNT_OPTIONS = ['1–5', '5–10', '10+'];

const REQ_STAR = (
  <span style={{ color: 'var(--hue-red)', fontWeight: 600 }} aria-hidden="true"> *</span>
);

/** Darken a hex color to derive a fold/accent shade for the preview. */
function shade(hex, amt = 0.16) {
  const n = parseInt(hex.slice(1), 16);
  const f = (v) => Math.max(0, Math.round(v * (1 - amt)));
  const r = f((n >> 16) & 255), g = f((n >> 8) & 255), b = f(n & 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

/**
 * The live customizer. Left: sticky preview that re-renders with every
 * option change. Right: option groups. All state lives in `config`,
 * which is exactly the object stored in the cart / sent to the backend.
 */
export default function Customizer() {
  const { treatmentId: param } = useParams();
  const treatmentId = param === 'roman' || param === 'upholstery' ? param : 'drapery';
  const treatment = TREATMENTS[treatmentId];
  const isUpholstery = treatmentId === 'upholstery';

  const [config, setConfig] = useState(DEFAULT_CONFIG[treatmentId]);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [contact, setContact] = useState({ firstName: '', lastName: '', email: '', phone: '', city: '' });
  const [windowCount, setWindowCount] = useState('');
  const [consult, setConsult] = useState('');        // 'yes' | 'no'
  const [measurements, setMeasurements] = useState('');
  const [formError, setFormError] = useState('');
  const [sending, setSending] = useState(false);

  // Reset when switching between drapery <-> roman via nav.
  // This must happen DURING render (not in an effect): otherwise the first
  // render after the route change pairs the new treatment with the old
  // treatment's config and style lookups fail (blank page).
  // Official React pattern: https://react.dev/reference/react/useState#storing-information-from-previous-renders
  if (config.treatmentId !== treatmentId) {
    setConfig(DEFAULT_CONFIG[treatmentId]);
    return null; // re-render is scheduled immediately with the right config
  }

  const set = (key) => (value) => setConfig((c) => ({ ...c, [key]: value }));

  // Defensive fallbacks: never let a stale/unknown id blank the page.
  const style = treatment.styles.find((s) => s.id === config.styleId) || treatment.styles[0];
  const colors = config.fabricColors || [];
  const notSure = !!config.fabricNotSure;

  const toggleColor = (opt) => {
    setConfig((c) => {
      const cur = c.fabricColors || [];
      const next = cur.includes(opt.label)
        ? cur.filter((l) => l !== opt.label)
        : [...cur, opt.label];
      const first = COLOR_OPTIONS.find((o) => next.includes(o.label));
      return {
        ...c,
        fabricColors: next,
        fabricNotSure: false,
        previewFabric: first
          ? { swatch: first.swatch, accent: shade(first.swatch), texture: 'linen' }
          : undefined,
      };
    });
  };

  const chooseNotSure = () => {
    setConfig((c) => ({ ...c, fabricColors: [], fabricNotSure: true, previewFabric: undefined }));
  };

  const handleQuoteSubmit = async () => {
    setFormError('');
    if (!contact.firstName.trim() || !contact.lastName.trim()) {
      setFormError('Please enter your first and last name.');
      return;
    }
    if (!contact.email.trim()) {
      setFormError('Please enter your email address.');
      return;
    }
    if (!contact.phone.trim()) {
      setFormError('Please enter your phone number.');
      return;
    }
    if (!contact.city.trim()) {
      setFormError('Please tell us which Bay Area city you’re in.');
      return;
    }
    if (!windowCount) {
      setFormError(isUpholstery
        ? 'Please tell us how many pieces you\u2019d like upholstered.'
        : 'Please tell us how many windows you\u2019d like covered.');
      return;
    }
    if (!consult) {
      setFormError('Please tell us whether you\u2019d like a free onsite measurement and consultation.');
      return;
    }
    if (consult === 'no' && !measurements.trim()) {
      setFormError(isUpholstery
        ? 'Please describe each piece and its approximate measurements.'
        : 'Please list the width \u00d7 height measurements for each of your windows.');
      return;
    }
    if (colors.length === 0 && !notSure) {
      setFormError('Please select the fabric colors you\u2019re interested in, or choose \u201cI\u2019m not sure\u201d.');
      return;
    }

    // Everything the customer picked, in the order the form presents it.
    const details = {
      'Treatment': treatment.label,
      [isUpholstery ? 'Piece' : 'Style']: style.label,
      'Fabric Colors': notSure ? 'Not sure yet' : colors.join(', '),
      ...(!isUpholstery ? { 'Lining': LININGS.find((l) => l.id === config.liningId)?.label } : {}),
      ...(treatmentId === 'drapery'
        ? {
            'Rod Finish': ROD_FINISHES.find((r) => r.id === config.rodFinishId)?.label,
            'Finials': FINIALS.find((f) => f.id === config.finialId)?.label,
          }
        : treatmentId === 'roman'
          ? {
              'Mount': MOUNT_TYPES.find((m) => m.id === config.mountId)?.label,
              'Lift Control': CONTROL_TYPES.find((c) => c.id === config.controlId)?.label,
            }
          : {}),
      'Free Onsite Measurement': consult === 'yes'
        ? `Yes \u2014 wants onsite ${isUpholstery ? 'assessment' : 'measurement'} & consultation`
        : 'No \u2014 provided own measurements',
      ...(consult === 'no' ? { 'Measurements': measurements } : {}),
      [isUpholstery ? 'Piece Count' : 'Window Count']: windowCount,
      'First Name': contact.firstName,
      'Last Name': contact.lastName,
      'Email': contact.email,
      'Phone': contact.phone,
      'City': contact.city,
      _replyto: contact.email,
    };

    setSending(true);
    try {
      await sendFormEmail(
        `Quote request \u2014 ${treatment.label} \u2014 ${contact.firstName} ${contact.lastName} (${contact.city})`,
        details
      );
      setQuoteOpen(true);
    } catch {
      setFormError(
        `We couldn\u2019t send your request just now. Please try again in a moment, or call us at ${COMPANY.phoneDisplay}.`
      );
    } finally {
      setSending(false);
    }
  };


  return (
    <div className="container">
      <div className="customizer">
        {/* ---------------- Live preview ---------------- */}
        <div className="customizer-preview">
          <div className="preview-stage">
            {isUpholstery ? <FurniturePreview config={config} /> : <WindowPreview config={config} />}
          </div>
          <div className="preview-caption">
            <strong>
              {style.label}
              {colors.length > 0 ? ` · ${colors[0]}${colors.length > 1 ? ` +${colors.length - 1}` : ''}` : ''}
            </strong>
            <span>Live preview updates as you design</span>
          </div>
        </div>

        {/* ---------------- Options ---------------- */}
        <div className="customizer-panel">
          <div className="eyebrow">Design Studio</div>
          <h1>{treatment.label}</h1>
          <p className="sub">
            {treatmentId === 'drapery' && 'Made-to-measure panels, sewn to the quarter inch.'}
            {treatmentId === 'roman' && 'Clean-folding shades, built for your exact window.'}
            {isUpholstery && 'Furniture you love, reborn in fabric you choose.'}
          </p>

          {/* Treatment switcher */}
          <div className="opt-group">
            <div className="opt-label"><span>Treatment</span></div>
            <div className="pill-row">
              <Link to="/customize/drapery" className={`pill${treatmentId === 'drapery' ? ' selected' : ''}`}>Drapery</Link>
              <Link to="/customize/roman" className={`pill${treatmentId === 'roman' ? ' selected' : ''}`}>Roman Shade</Link>
              <Link to="/customize/upholstery" className={`pill${isUpholstery ? ' selected' : ''}`}>Upholstery</Link>
            </div>
          </div>

          {/* Style / piece */}
          <div className="opt-group">
            <div className="opt-label">
              <span>{isUpholstery ? 'Piece' : 'Style'}</span>
              <span className="opt-selected">{style.label}</span>
            </div>
            <div className="style-grid">
              {treatment.styles.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`style-card${config.styleId === s.id ? ' selected' : ''}`}
                  onClick={() => set('styleId')(s.id)}
                >
                  <strong>{s.label}</strong>
                  <span>{s.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Fabric colors — collection still being curated */}
          <div className="opt-group">
            <div className="opt-label">
              <span>Fabric Colors</span>
              <span className="opt-selected">
                {notSure ? 'Not sure yet' : colors.length > 0 ? `${colors.length} selected` : 'select any'}
              </span>
            </div>
            <p style={{ fontSize: 13.5, color: 'var(--ink-faint)', margin: '-4px 0 14px' }}>
              We’re still curating our final fabric collection. Tell us which
              colors you’re interested in and we’ll match you with the best
              options. Select as many as you like.
            </p>
            <div className="fabric-grid">
              {COLOR_OPTIONS.map((o) => {
                const selected = colors.includes(o.label);
                return (
                  <button
                    key={o.id}
                    type="button"
                    className={`fabric-swatch${selected ? ' selected' : ''}`}
                    onClick={() => toggleColor(o)}
                    title={o.label}
                    aria-pressed={selected}
                  >
                    <span className="chip" style={{ background: o.swatch }} />
                    <span className="fname">{o.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="pill-row" style={{ marginTop: 14 }}>
              <button
                type="button"
                className={`pill${notSure ? ' selected' : ''}`}
                onClick={chooseNotSure}
              >
                I’m not sure
              </button>
            </div>
          </div>

          {/* Lining — window treatments only */}
          {!isUpholstery && (
            <div className="opt-group">
              <div className="opt-label"><span>Lining</span></div>
              <div className="pill-row">
                {LININGS.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    className={`pill${config.liningId === l.id ? ' selected' : ''}`}
                    onClick={() => set('liningId')(l.id)}
                    title={l.description}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Hardware — drapery */}
          {treatmentId === 'drapery' && (
            <>
              <div className="opt-group">
                <div className="opt-label">
                  <span>Rod Finish</span>
                  <span className="opt-selected">{ROD_FINISHES.find((r) => r.id === config.rodFinishId)?.label}</span>
                </div>
                <div className="pill-row">
                  {ROD_FINISHES.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      className={`pill${config.rodFinishId === r.id ? ' selected' : ''}`}
                      onClick={() => set('rodFinishId')(r.id)}
                    >
                      <span style={{
                        display: 'inline-block', width: 13, height: 13, borderRadius: '50%',
                        background: r.swatch, marginRight: 8, verticalAlign: '-2px',
                        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.35)',
                      }} />
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="opt-group">
                <div className="opt-label"><span>Finials</span></div>
                <div className="pill-row">
                  {FINIALS.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      className={`pill${config.finialId === f.id ? ' selected' : ''}`}
                      onClick={() => set('finialId')(f.id)}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Hardware — roman */}
          {treatmentId === 'roman' && (
            <>
              <div className="opt-group">
                <div className="opt-label"><span>Mount</span></div>
                <div className="style-grid">
                  {MOUNT_TYPES.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      className={`style-card${config.mountId === m.id ? ' selected' : ''}`}
                      onClick={() => set('mountId')(m.id)}
                    >
                      <strong>{m.label}</strong>
                      <span>{m.description}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="opt-group">
                <div className="opt-label"><span>Lift Control</span></div>
                <div className="pill-row">
                  {CONTROL_TYPES.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className={`pill${config.controlId === c.id ? ' selected' : ''}`}
                      onClick={() => set('controlId')(c.id)}
                      title={c.description}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Measurement & consultation */}
          <div className="opt-group">
            <div className="opt-label">
              <span>Measurement</span>
            </div>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', margin: '-4px 0 14px' }}>
              {isUpholstery
                ? 'Would you like a free onsite assessment and sales consultation?'
                : 'Would you like a free onsite measurement and sales consultation?'}
            </p>
            <div className="pill-row">
              <button
                type="button"
                className={`pill${consult === 'yes' ? ' selected' : ''}`}
                onClick={() => setConsult('yes')}
              >
                Yes
              </button>
              <button
                type="button"
                className={`pill${consult === 'no' ? ' selected' : ''}`}
                onClick={() => setConsult('no')}
              >
                No, I’m confident with my measurements
              </button>
            </div>
            {/* Target _blank keeps the in-progress design alive in this tab.
                Under the MemoryRouter fallback (sandboxed previews) a _blank
                href can't resolve, so navigate in-app there instead. */}
            <div className="measure-helper">
              <TapeIcon size={28} />
              <p>
                <strong>New to measuring?</strong> Our illustrated guide shows
                exactly where to run the tape — most measuring takes about ten minutes.
              </p>
              <Link
                to={`/measuring-help#${treatmentId}`}
                {...(HASH_ROUTING ? { target: '_blank', rel: 'noopener' } : {})}
              >
                Open the guide
                {HASH_ROUTING && (
                  <>
                    {' '}
                    <span aria-hidden="true">↗</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </>
                )}
              </Link>
            </div>
            {consult === 'no' && (
              <div style={{
                marginTop: 16, padding: '18px 20px',
                background: 'var(--paper-warm)', borderRadius: 'var(--radius)',
                border: '1px solid var(--line)',
              }}>
                <label htmlFor="dim-list" style={{
                  display: 'block', fontSize: 13.5, color: 'var(--ink)',
                  marginBottom: 10, fontWeight: 500,
                }}>
                  {isUpholstery
                    ? 'For each piece, tell us what it is and its approximate width × depth × height.'
                    : 'For each of your windows, please specify the width × height measurements.'}
                </label>
                <textarea
                  id="dim-list"
                  rows={3}
                  value={measurements}
                  onChange={(e) => setMeasurements(e.target.value)}
                  placeholder={isUpholstery
                    ? 'Armchair: 34″W × 36″D × 32″H\nDining chairs (4): seats 19″W × 18″D\n…'
                    : 'Window 1: 48″ × 72″\nWindow 2: 36″ × 60″\n…'}
                  style={{
                    width: '100%', padding: '12px 14px',
                    border: '1px solid var(--line)', borderRadius: 'var(--radius)',
                    fontSize: 15, background: '#fff', fontFamily: 'inherit',
                    color: 'var(--ink)', resize: 'vertical',
                  }}
                />
                <p style={{ fontSize: 12.5, color: 'var(--ink-faint)', marginTop: 10 }}>
                  Our associate will contact you to discuss your project within the next 12 hours.
                </p>
              </div>
            )}
          </div>

          {/* About you — required so our associate can reach out with a quote */}
          <div className="opt-group">
            <div className="opt-label"><span>About You</span></div>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="ct-fn">First name{REQ_STAR}</label>
                <input id="ct-fn" required value={contact.firstName}
                  onChange={(e) => setContact((c) => ({ ...c, firstName: e.target.value }))}
                  autoComplete="given-name" />
              </div>
              <div className="field">
                <label htmlFor="ct-ln">Last name{REQ_STAR}</label>
                <input id="ct-ln" required value={contact.lastName}
                  onChange={(e) => setContact((c) => ({ ...c, lastName: e.target.value }))}
                  autoComplete="family-name" />
              </div>
              <div className="field">
                <label htmlFor="ct-email">Email address{REQ_STAR}</label>
                <input id="ct-email" type="email" required value={contact.email}
                  onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                  placeholder="you@example.com" autoComplete="email" />
              </div>
              <div className="field">
                <label htmlFor="ct-phone">Phone number{REQ_STAR}</label>
                <input id="ct-phone" type="tel" required value={contact.phone}
                  onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                  placeholder="(555) 555-5555" inputMode="tel" autoComplete="tel" />
              </div>
              <div className="field full">
                <label htmlFor="ct-city">Your city (Bay Area){REQ_STAR}</label>
                <input id="ct-city" required value={contact.city}
                  onChange={(e) => setContact((c) => ({ ...c, city: e.target.value }))}
                  placeholder="e.g. Burlingame" autoComplete="address-level2" />
                <p style={{ fontSize: 12.5, color: 'var(--ink-faint)', margin: '6px 0 0' }}>
                  City only — we don’t need your street address to prepare a quote.
                </p>
              </div>
            </div>
            <div style={{ marginTop: 18 }}>
              <label style={{
                display: 'block', fontSize: 12.5, letterSpacing: '0.08em',
                color: 'var(--ink-faint)', marginBottom: 8,
              }}>
                {isUpholstery
                  ? 'How many pieces would you like upholstered?'
                  : 'How many windows would you like covered?'}{REQ_STAR}
              </label>
              <div className="pill-row">
                {WINDOW_COUNT_OPTIONS.map((w) => (
                  <button
                    key={w}
                    type="button"
                    className={`pill${windowCount === w ? ' selected' : ''}`}
                    onClick={() => setWindowCount(w)}
                  >
                    {w} {isUpholstery ? 'pieces' : 'windows'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quote request — pricing is provided personally by our associates */}
          <div className="price-summary">
            <p style={{ fontSize: 14.5, color: 'var(--ink-soft)', marginBottom: 16 }}>
              Happy with your design? Submit it to us and our associate will
              prepare a personalized quote for your exact {isUpholstery ? 'pieces' : 'windows'}.
            </p>
            {formError && (
              <p className="checkout-error" role="alert" style={{ marginTop: 0, marginBottom: 12 }}>{formError}</p>
            )}
            <button type="button" className="btn btn-primary" onClick={handleQuoteSubmit} disabled={sending}>
              {sending ? 'Sending…' : 'Submit the form'}
            </button>
            <p className="price-note">
              {isUpholstery
                ? 'Fit guarantee · Handcrafted to order · Personal follow-up on every request'
                : 'Free shipping · Fit guarantee · Handcrafted to order'}
            </p>
          </div>
        </div>
      </div>

      {quoteOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-title"
          onClick={() => setQuoteOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 300,
            background: 'rgba(44,42,39,0.45)', backdropFilter: 'blur(3px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--card)', borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-lift)', maxWidth: 460, width: '100%',
              padding: '40px 36px', textAlign: 'center',
            }}
          >
            <div className="check-mark" aria-hidden="true" style={{
              width: 60, height: 60, margin: '0 auto 20px', borderRadius: '50%',
              background: 'var(--hue-green)', color: '#fff', fontSize: 28,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>✓</div>
            <h2 id="quote-title" style={{ fontSize: 26, marginBottom: 12 }}>Thank you{contact.firstName ? `, ${contact.firstName}` : ''}!</h2>
            <p style={{ color: 'var(--ink-soft)', marginBottom: 8 }}>
              Your design has been submitted. Our associate will contact you at{' '}
              {contact.email || 'your email'} within the next 12 hours to provide
              the quote or to reach out for more details.
            </p>
            <p style={{ fontSize: 13.5, color: 'var(--ink-faint)', marginBottom: 24 }}>
              We appreciate you choosing Coco Drapes. Questions in the meantime?
              Call us at{' '}
              <a href={COMPANY.phoneHref} style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>
                {COMPANY.phoneDisplay}
              </a>.
            </p>
            <button type="button" className="btn btn-primary" onClick={() => setQuoteOpen(false)}>
              Continue Designing
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
