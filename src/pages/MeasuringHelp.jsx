import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  DraperyMeasureArt, FloatHemArt, BreakHemArt, PuddleHemArt,
  InsideMountArt, OutsideMountArt,
  TapeIcon, PencilIcon, StoolIcon, ClockIcon,
} from '../components/MeasureArt.jsx';

/**
 * Measuring Help — a confidence-building guide for first-time measurers.
 * Deliberately NOT in the main nav: customers reach it from the design
 * studio's measurement step (/measuring-help#drapery or #roman) and from
 * the footer. Keep the tone warm; the goal is "I can do this."
 */

const TOOLS = [
  {
    Icon: TapeIcon,
    title: 'Steel tape measure',
    text: 'A metal tape stays straight and true. Cloth tapes stretch.',
  },
  {
    Icon: PencilIcon,
    title: 'Pencil & paper',
    text: 'Write each number down the moment you read it.',
  },
  {
    Icon: StoolIcon,
    title: 'Step stool',
    text: 'So you can reach the top of the frame safely.',
  },
  {
    Icon: ClockIcon,
    title: 'Ten quiet minutes',
    text: 'Unhurried measuring is accurate measuring.',
  },
];

const GOLDEN_RULES = [
  {
    hue: 'var(--hue-red)',
    title: 'Width first, then height.',
    text: 'Always record measurements as width × height — it’s the order our workroom (and our design form) expects.',
  },
  {
    hue: 'var(--hue-orange-deep)',
    title: 'Measure to the nearest ⅛ inch.',
    text: 'Custom means custom. Read the tape carefully and keep the fraction — never round to “close enough.”',
  },
  {
    hue: 'var(--hue-green-deep)',
    title: 'Measure every window.',
    text: 'Even windows that look like twins can differ by half an inch. Give each one its own line on your paper.',
  },
  {
    hue: 'var(--accent-dark)',
    title: 'Don’t subtract anything.',
    text: 'Give us the exact numbers off the tape. Our workroom makes every clearance and fullness allowance for you.',
  },
  {
    hue: 'var(--hue-violet)',
    title: 'When in doubt, ask.',
    text: 'Onsite measurement is free — choose “Yes” at the measurement step in the design studio and we’ll handle it all.',
  },
];

const DRAPERY_STEPS = [
  {
    hue: '#4c6579',
    badge: 'A',
    title: 'Width — measure the rod, not just the window.',
    text: 'Measure your window’s width including the trim, then plan for the rod to extend 4–8″ past the frame on each side. That lets the open panels stack against the wall instead of the glass, so you keep your light — and the window looks larger. Record the full rod width, end to end.',
  },
  {
    hue: '#57644a',
    badge: 'B',
    title: 'Height — from the rod down to the floor.',
    text: 'Rods usually sit 4–6″ above the frame (or higher for extra drama — halfway to the ceiling is lovely). Measure from where the rod will hang straight down to the floor, in two or three spots. Floors are rarely perfectly level, so keep the smallest number — that way panels never drag.',
  },
  {
    hue: '#96631f',
    badge: 'C',
    title: 'Choose how the hem meets the floor.',
    text: 'This is taste, not math. Float is the easiest to live with; break is tailored; puddle is romantic. Jot your favorite next to your measurements — “48⅛″ × 72″ — break” — or simply tell your associate when they call: every submission gets a personal follow-up.',
  },
];

const HEM_OPTIONS = [
  { Art: FloatHemArt, title: 'Float', text: '½″ above the floor' },
  { Art: BreakHemArt, title: 'Break', text: 'touches with a soft fold' },
  { Art: PuddleHemArt, title: 'Puddle', text: '2–3″ pooled fabric' },
];

const REASSURE = [
  { hue: 'var(--hue-green)', title: 'Fit guarantee', text: 'If it doesn’t fit, we remake it free. Your tape measure carries no risk.' },
  { hue: 'var(--hue-blue)', title: 'We double-check', text: 'An associate reviews every measurement you send before anything is cut.' },
  { hue: 'var(--hue-red)', title: 'Free onsite option', text: 'Prefer not to measure at all? Choose “Yes” in the design studio and we’ll come to you.' },
];

export default function MeasuringHelp() {
  const { hash } = useLocation();

  // The design studio links land on #drapery / #roman — scroll to that section.
  useEffect(() => {
    if (hash === '#drapery' || hash === '#roman') {
      const t = setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
      return () => clearTimeout(t);
    }
  }, [hash]);

  return (
    <>
      {/* Page header */}
      <div className="container">
        <div className="page-title">
          <div className="eyebrow">You’ve Got This</div>
          <h1>Measuring Help</h1>
          <hr className="brand-rule brand-rule--thin" />
        </div>
      </div>

      {/* Intro + tools + golden rules */}
      <section className="section" style={{ paddingTop: 40, paddingBottom: 72 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(22px, 2.6vw, 28px)',
            lineHeight: 1.45,
            marginBottom: 18,
          }}>
            Measuring for custom window treatments sounds intimidating.
            <em style={{ fontWeight: 400 }}> It isn’t.</em> If you can read a
            tape measure, you can do this.
          </p>
          <p style={{ color: 'var(--ink-soft)', marginBottom: 40 }}>
            Most windows take about ten minutes, and this guide shows you exactly
            where to run the tape. And remember: every order is covered by our fit
            guarantee, so a nervous first-timer and a seasoned pro end up in the
            same place — with treatments that fit beautifully.
          </p>

          <div className="opt-label" style={{ marginBottom: 16 }}><span>What you’ll need</span></div>
          <div className="measure-tools" style={{ marginBottom: 48 }}>
            {TOOLS.map((t) => (
              <div className="tool-tile" key={t.title}>
                <t.Icon />
                <strong>{t.title}</strong>
                <span>{t.text}</span>
              </div>
            ))}
          </div>

          <div className="opt-label" style={{ marginBottom: 16 }}><span>Five golden rules</span></div>
          <ul className="golden-rules">
            {GOLDEN_RULES.map((r, i) => (
              <li key={r.title}>
                <span className="rule-dot" style={{ background: r.hue }}>{i + 1}</span>
                <span><strong>{r.title}</strong> {r.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Drapery ---------------- */}
      <section className="section section--warm" id="drapery" style={{ scrollMarginTop: 110 }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Custom Drapery</div>
            <h2>Two numbers and a look you love</h2>
            <p>
              Drapery is the forgiving one: panels hang in front of the wall, so
              there’s no tight fit to worry about. You’re really deciding
              how generous you want the window to feel.
            </p>
            <hr className="brand-rule brand-rule--thin" />
          </div>

          <div className="measure-duo">
            <div className="art-card"><DraperyMeasureArt /></div>
            <ol className="mstep-list">
              {DRAPERY_STEPS.map((s) => (
                <li key={s.badge}>
                  <span className="mstep-badge" style={{ background: s.hue }}>{s.badge}</span>
                  <div>
                    <strong>{s.title}</strong>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="hem-trio" style={{ maxWidth: 640, margin: '44px auto 0' }}>
            {HEM_OPTIONS.map((h) => (
              <div className="hem-tile" key={h.title}>
                <h.Art />
                <div className="hem-caption">
                  <strong>{h.title}</strong>
                  <span>{h.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Roman shades ---------------- */}
      <section className="section" id="roman" style={{ scrollMarginTop: 110 }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Roman Shades</div>
            <h2>First, pick where the shade will live</h2>
            <p>
              Roman shades mount one of two ways, and each is measured a little
              differently. Neither is harder — they’re just different tapes
              to run.
            </p>
            <hr className="brand-rule brand-rule--thin" />
          </div>

          <div className="mount-grid">
            <div className="mount-card">
              <div className="mc-art"><InsideMountArt /></div>
              <h3>Inside Mount</h3>
              <div className="mc-tag">Sits inside the window frame</div>
              <p style={{ fontSize: 14.5, color: 'var(--ink-soft)', marginBottom: 16 }}>
                A clean, built-in look that shows off pretty trim. It needs about
                2″ of flat depth inside the frame for the shade to tuck into.
              </p>
              <ol className="mstep-list mstep-list--tight">
                <li>
                  <span className="mstep-badge" style={{ background: '#96631f' }}>W</span>
                  <div>
                    <strong>Width, in three places.</strong>
                    <p>Measure the exact opening at the top, middle, and bottom. Keep the <em>smallest</em> number — openings are rarely perfect rectangles.</p>
                  </div>
                </li>
                <li>
                  <span className="mstep-badge" style={{ background: '#57644a' }}>H</span>
                  <div>
                    <strong>Height, in three places.</strong>
                    <p>Measure left, center, and right, from the top of the opening to the sill. Keep the <em>tallest</em> number.</p>
                  </div>
                </li>
                <li>
                  <span className="mstep-badge" style={{ background: '#4c6579' }}>✓</span>
                  <div>
                    <strong>That’s it — no subtracting.</strong>
                    <p>Send the exact opening size. Our workroom makes the small clearance allowance so the shade glides without rubbing.</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="mount-card">
              <div className="mc-art"><OutsideMountArt /></div>
              <h3>Outside Mount</h3>
              <div className="mc-tag">Mounts on the wall or trim</div>
              <p style={{ fontSize: 14.5, color: 'var(--ink-soft)', marginBottom: 16 }}>
                The shade overlaps the frame, blocking more light and making a
                small window feel grander. No depth needed — great for shallow
                frames.
              </p>
              <ol className="mstep-list mstep-list--tight">
                <li>
                  <span className="mstep-badge" style={{ background: '#96631f' }}>W</span>
                  <div>
                    <strong>Width of the area to cover.</strong>
                    <p>Measure the frame’s outside width, then add at least 1½–2″ on each side so light doesn’t sneak around the edges.</p>
                  </div>
                </li>
                <li>
                  <span className="mstep-badge" style={{ background: '#57644a' }}>H</span>
                  <div>
                    <strong>Height of the area to cover.</strong>
                    <p>Start 3–4″ above the opening (where the headrail will sit) and measure down to the sill — or below it, if you’d like fuller coverage.</p>
                  </div>
                </li>
                <li>
                  <span className="mstep-badge" style={{ background: '#4c6579' }}>✓</span>
                  <div>
                    <strong>Record that overall W × H.</strong>
                    <p>The shade will be made exactly the size you give us — the whole covered area, frame and all.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          <p style={{
            maxWidth: 640, margin: '36px auto 0', textAlign: 'center',
            fontSize: 14.5, color: 'var(--ink-faint)',
          }}>
            Torn between the two? Deep frame and lovely trim: go inside. Shallow
            frame, small window, or maximum light block: go outside. Or simply
            pick the one that looks right in the design studio — an associate
            follows up on every submission, so you can ask for advice then.
            Nothing is cut until we’ve confirmed together.
          </p>
        </div>
      </section>

      {/* ---------------- Writing it down ---------------- */}
      <section className="section section--warm" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <div className="section-head" style={{ marginBottom: 32 }}>
            <div className="eyebrow">The Last Step</div>
            <h2>Write it down like this</h2>
            <hr className="brand-rule brand-rule--thin" />
          </div>
          <div className="notation-card">
            Living room — Window 1: 48⅛″ × 72″ — break hem<br />
            Living room — Window 2: 47⅞″ × 72¼″<br />
            Bedroom — Window 3: 36″ × 60″
          </div>
          <p style={{ fontSize: 14, color: 'var(--ink-faint)', textAlign: 'center', marginTop: 16 }}>
            Width first, then height — exactly the format the design studio asks
            for. Naming the room helps you (and us) keep multi-window orders straight.
          </p>
        </div>
      </section>

      {/* ---------------- Reassurance + back into the flow ---------------- */}
      <section className="section section--ink">
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="section-head" style={{ marginBottom: 44 }}>
            <h2>Whatever you measure, you’re covered</h2>
            <p>There’s no way to get this wrong that we can’t make right.</p>
          </div>
          <div className="steps-grid" style={{ marginBottom: 48 }}>
            {REASSURE.map((r) => (
              <div className="step" key={r.title}>
                <div style={{ width: 44, height: 4, borderRadius: 2, background: r.hue, margin: '0 auto 16px' }} />
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/customize/drapery" className="btn btn-light">Design Drapery</Link>
            <Link to="/customize/roman" className="btn btn-light">Design Roman Shades</Link>
          </div>
          <p style={{
            textAlign: 'center', fontSize: 13, marginTop: 22,
            color: 'rgba(250,248,244,0.6)',
          }}>
            Opened this guide from the design studio? Your design is waiting
            safely in the other tab.
          </p>
        </div>
      </section>
    </>
  );
}
