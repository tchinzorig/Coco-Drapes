import { Link, NavLink } from 'react-router-dom';
import { COMPANY } from '../data/company.js';

export default function Header() {
  const navClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;

  return (
    <header className="site-header">
      <div className="announce-bar">
        Handcrafted in our Burlingame workroom <em>•</em>{' '}
        Free onsite measurement &amp; consultation <em>•</em>{' '}
        <a href={COMPANY.phoneHref}>{COMPANY.phoneDisplay}</a>
      </div>
      <div className="header-inner">
        <Link to="/" className="logo" aria-label="Coco Drapes home">
          <span className="logo-word">COCO <span>Drapes</span></span>
          <span className="brand-rule" />
        </Link>

        <nav className="main-nav" aria-label="Primary">
          <NavLink to="/customize/drapery" className={navClass}>Drapery</NavLink>
          <NavLink to="/customize/roman" className={navClass}>Roman Shades</NavLink>
          <NavLink to="/customize/upholstery" className={navClass}>Upholstery</NavLink>
          <NavLink to="/fabrics" className={navClass}>Fabrics</NavLink>
          <NavLink to="/services" className={navClass}>Services</NavLink>
          <NavLink to="/our-story" className={navClass}>Our Story</NavLink>
        </nav>

      </div>
    </header>
  );
}
