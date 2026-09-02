import { Link } from 'react-router-dom';
import WindowPreview from '../components/WindowPreview.jsx';
import FurniturePreview from '../components/FurniturePreview.jsx';
import {
  DesignIcon, MeasureIcon, SewIcon, InstallIcon,
  BlindIcon, DraperyIcon, RomanIcon, GarmentIcon, HeartMark,
} from '../components/Icons.jsx';

const HERO_CONFIG = {
  treatmentId: 'drapery',
  styleId: 'pinch-pleat',
  fabricId: 'fb-harbor-weave',
  liningId: 'ln-privacy',
  rodFinishId: 'hw-antique-brass',
  finialId: 'fn-sphere',
  widthIn: 60, heightIn: 96, panels: 2,
};

const CARD_CONFIGS = {
  drapery: {
    treatmentId: 'drapery', styleId: 'ripple-fold', fabricId: 'fb-flax-linen',
    liningId: 'ln-privacy', rodFinishId: 'hw-matte-black', finialId: 'fn-endcap',
    widthIn: 60, heightIn: 96, panels: 2,
  },
  roman: {
    treatmentId: 'roman', styleId: 'relaxed', fabricId: 'fb-sage-linen',
    liningId: 'ln-privacy', mountId: 'mt-inside', controlId: 'ct-cordless',
    widthIn: 36, heightIn: 60, panels: 1,
  },
  upholstery: {
    treatmentId: 'upholstery', styleId: 'up-armchair', fabricId: 'fb-clay-linen',
    panels: 1,
  },
};

const STEPS = [
  {
    Icon: DesignIcon,
    title: 'Design Online',
    text: 'Pick your treatment, colors, and hardware in our live visualizer and see it on a model window as you go.',
  },
  {
    Icon: MeasureIcon,
    title: 'Get Measured',
    text: 'Request a free onsite measurement and consultation, or share your own dimensions if you already have them.',
  },
  {
    Icon: SewIcon,
    title: 'We Sew',
    text: 'Your order is handcrafted by our workroom and quality checked twice before it ships.',
  },
  {
    Icon: InstallIcon,
    title: 'Hang & Admire',
    text: 'Everything arrives ready to install, with hardware and instructions included.',
  },
];

const HOME_SERVICES = [
  {
    hue: 'var(--hue-red)',
    Icon: BlindIcon,
    title: 'Blind Cleaning & Repair',
    text: 'Venetian, vertical, wood, and cellular blinds, cleaned and restored.',
  },
  {
    hue: 'var(--hue-orange)',
    Icon: DraperyIcon,
    title: 'Drapery Cleaning & Repair',
    text: 'Careful, fabric-appropriate cleaning and repair for every drapery.',
  },
  {
    hue: 'var(--hue-blue)',
    Icon: RomanIcon,
    title: 'Roman Shade Cleaning & Repair',
    text: 'Gentle cleaning, re-stringing, and fold restoration for roman shades.',
  },
  {
    hue: 'var(--hue-violet)',
    Icon: GarmentIcon,
    title: 'Clothing Alterations',
    text: 'Hemming, tailoring, and repairs, from couture gowns to your favorite jeans.',
  },
];

export default function Home() {
  return (
    <>
      {/* ------------------------------ HERO ------------------------------ */}
      <section className="hero">
        <div className="hero-art" aria-hidden="true">
          <div style={{
            position: 'absolute', right: '-4%', top: '50%', transform: 'translateY(-50%)',
            width: 'min(52vw, 720px)', opacity: 0.98,
          }}>
            <WindowPreview config={HERO_CONFIG} />
          </div>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, var(--paper-warm) 44%, rgba(243,239,231,0.75) 58%, rgba(243,239,231,0) 76%)',
          }} />
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="eyebrow">Custom Window Treatments &amp; Upholstery</div>
            <h1>Every window is <em>different.</em> Celebrate yours.</h1>
            <p className="lede">
              Design custom drapery, roman shades, and upholstery in minutes.
              Choose your style and colors, then watch your design come to life
              before you order.
            </p>
            <div className="hero-ctas">
              <Link to="/customize/drapery" className="btn btn-primary">Design Drapery</Link>
              <Link to="/customize/roman" className="btn btn-outline">Design Roman Shades</Link>
              <Link to="/customize/upholstery" className="btn btn-outline">Design Upholstery</Link>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------- VALUE STRIP --------------------------- */}
      <div className="value-strip">
        <div><strong>Handcrafted</strong><span>Sewn to order in our workroom</span></div>
        <div><strong>Free Shipping</strong><span>On every custom order</span></div>
        <div><strong>10-Day Turnaround</strong><span>From order to your door</span></div>
        <div><strong>Fit Guarantee</strong><span>Remade free if it doesn't fit</span></div>
      </div>

      {/* ---------------------------- CATEGORIES --------------------------- */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">What We Make</div>
            <h2>Tailored for your home</h2>
            <p>Start with a style, then make it entirely yours.</p>
            <hr className="brand-rule brand-rule--thin" />
          </div>
          <div className="category-grid">
            <Link to="/customize/drapery" className="category-card">
              <div className="card-art"><WindowPreview config={CARD_CONFIGS.drapery} /></div>
              <div className="card-body">
                <h3>Custom Drapery</h3>
                <p>
                  Pinch pleat, ripple fold, grommet, or rod pocket. Floor-length
                  panels cut to the quarter inch and tailored to your home.
                </p>
                <span className="card-link">Start Designing</span>
              </div>
            </Link>
            <Link to="/customize/roman" className="category-card">
              <div className="card-art"><WindowPreview config={CARD_CONFIGS.roman} /></div>
              <div className="card-body">
                <h3>Roman Shades</h3>
                <p>
                  Flat, relaxed, hobbled, or banded. Clean-folding shades with
                  cordless, continuous-loop, or motorized lift.
                </p>
                <span className="card-link">Start Designing</span>
              </div>
            </Link>
            <Link to="/customize/upholstery" className="category-card">
              <div className="card-art"><FurniturePreview config={CARD_CONFIGS.upholstery} /></div>
              <div className="card-body">
                <h3>Custom Upholstery</h3>
                <p>
                  Sofas, chairs, ottomans, headboards, and cushions, recovered
                  in fabrics that match your windows.
                </p>
                <span className="card-link">Start Designing</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------- 5% PLEDGE ----------------------------- */}
      <section className="section section--warm" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 680 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
            <HeartMark />
          </div>
          <div className="eyebrow">The 5% Pledge</div>
          <h2 style={{ fontSize: 'clamp(28px, 3.2vw, 38px)', marginBottom: 14 }}>
            Every sale supports the autism community
          </h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: 17, marginBottom: 26 }}>
            Coco Drapes was built in direct support of people and kids with autism.
            5% of the revenue from every sale goes to an autism foundation of your choice.
          </p>
          <Link to="/our-story" className="btn btn-outline">Read Our Story</Link>
        </div>
      </section>

      {/* ------------------------------ STEPS ------------------------------ */}
      <section className="section" id="how">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">How It Works</div>
            <h2>From your screen to your window</h2>
            <p>Four easy steps, start to finish.</p>
            <hr className="brand-rule brand-rule--thin" />
          </div>
          <div className="steps-grid">
            {STEPS.map((step) => (
              <div className="step" key={step.title}>
                <div className="step-num"><step.Icon /></div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- SERVICES ---------------------------- */}
      <section className="section section--warm">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Care &amp; Restoration</div>
            <h2>We also clean, repair &amp; alter</h2>
            <p>
              Already have things you love? We service all types of blinds,
              draperies, and roman shades, and we alter clothing from haute
              couture to everyday denim.
            </p>
            <hr className="brand-rule brand-rule--thin" />
          </div>
          <div className="category-grid">
            {HOME_SERVICES.map((s) => (
              <Link to="/services" className="category-card" key={s.title}>
                <div className="card-body" style={{ paddingTop: 30 }}>
                  <div style={{
                    width: 58, height: 58, borderRadius: 'var(--radius)',
                    background: 'var(--paper-warm)', border: '1px solid var(--line)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 16,
                  }}>
                    <s.Icon color={s.hue} />
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 600 }}>{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="card-link">Request Service</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------- CTA ------------------------------- */}
      <section className="section section--ink">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-head" style={{ marginBottom: 36 }}>
            <h2>Ready when you are</h2>
            <p>Design your first window in under five minutes. No account needed.</p>
          </div>
          <Link to="/customize/drapery" className="btn btn-light">Start Designing</Link>
        </div>
      </section>
    </>
  );
}
