import { Link } from 'react-router-dom';
import { FABRICS, formatUSD } from '../data/catalog.js';

const GRADE_LABELS = { 1: 'Grade I', 2: 'Grade II', 3: 'Grade III' };

export default function Fabrics() {
  return (
    <div className="container">
      <div className="page-title">
        <div className="eyebrow">The Signature Collection</div>
        <h1>Fabrics</h1>
        <p style={{ color: 'var(--ink-soft)', marginTop: 12, maxWidth: '58ch' }}>
          Fourteen fabrics, chosen to work as a family. Every fabric is available on
          any drapery or roman shade, and we'll mail you free swatches of any five
          before you commit.
        </p>
        <hr className="brand-rule brand-rule--thin" />
      </div>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="fabric-cards">
          {FABRICS.map((f) => (
            <div className="fabric-card" key={f.id}>
              <div className="fc-swatch" style={{ background: f.swatch, position: 'relative' }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 40%, rgba(0,0,0,0.08) 100%)`,
                }} />
              </div>
              <div className="fc-body">
                <h3>{f.name}</h3>
                <div className="fc-mat">{f.material}</div>
                <div className="fc-meta">
                  <span className="fc-grade">{GRADE_LABELS[f.grade]}</span>
                  <span className="fc-price">{formatUSD(f.pricePerYard)} / yd</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 56 }}>
          <Link to="/customize/drapery" className="btn btn-primary">Design With These Fabrics</Link>
        </div>
      </section>
    </div>
  );
}
