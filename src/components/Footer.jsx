import { Link } from 'react-router-dom';
import { COMPANY } from '../data/company.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="brand-rule" />
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="logo-word">COCO <span style={{ fontWeight: 400, fontStyle: 'italic' }}>Drapes</span></span>
          <p>
            Custom drapery and roman shades, handcrafted with care.
            Every window is different. Celebrate yours.
          </p>
          <div className="footer-contact">
            <a href={COMPANY.mapsUrl} target="_blank" rel="noopener noreferrer">
              {COMPANY.address}
            </a>
            <a href={COMPANY.phoneHref}>{COMPANY.phoneDisplay}</a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          <Link to="/customize/drapery">Custom Drapery</Link>
          <Link to="/customize/roman">Roman Shades</Link>
          <Link to="/fabrics">Fabric Collection</Link>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <Link to="/services">Cleaning &amp; Repair</Link>
          <Link to="/measuring-help">Measuring Help</Link>
          <a href={COMPANY.phoneHref}>Call {COMPANY.phoneDisplay}</a>
          <a href={`mailto:${COMPANY.email}`}>Contact Us</a>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <Link to="/our-story">Our Story</Link>
          <a href={`mailto:${COMPANY.email}`}>Trade Program</a>
          <Link to="/our-story#careers">Careers</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Coco Drapes. All rights reserved.</span>
        <span>Terms · Privacy</span>
      </div>
    </footer>
  );
}
