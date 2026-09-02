import { useState } from 'react';
import { BlindIcon, DraperyIcon, RomanIcon, GarmentIcon } from '../components/Icons.jsx';
import { COMPANY } from '../data/company.js';
import { sendFormEmail } from '../utils/sendForm.js';

/**
 * Services — cleaning, repair & clothing alterations.
 * Coco Drapes cleans and repairs all types of blinds, draperies of different
 * fabrics, and roman shades, and alters clothing from haute couture to
 * everyday denim. Below the service overview is an intake form:
 * first/last name, email, and phone are required (red asterisks), at least
 * one service checkbox is required, and an optional details textbox.
 */

const SERVICES = [
  {
    hue: 'var(--hue-red)',
    Icon: BlindIcon,
    title: 'Blind Cleaning & Repair',
    text: 'Venetian, vertical, wood, and cellular blinds, deep-cleaned, with tilt, cord, and slat repairs.',
  },
  {
    hue: 'var(--hue-orange)',
    Icon: DraperyIcon,
    title: 'Drapery Cleaning & Repair',
    text: 'Gentle cleaning for every fabric from linen to silk, plus hem, pleat, lining, and hardware repairs.',
  },
  {
    hue: 'var(--hue-blue)',
    Icon: RomanIcon,
    title: 'Roman Shade Cleaning & Repair',
    text: 'Gentle cleaning, re-stringing, and fold restoration so shades raise evenly again.',
  },
  {
    hue: 'var(--hue-violet)',
    Icon: GarmentIcon,
    title: 'Clothing Alterations',
    text: 'Hemming, resizing, and careful repairs for everything from haute couture to everyday denim.',
  },
];

const SERVICE_OPTIONS = [
  { id: 'blind-cleaning', label: 'Blind cleaning' },
  { id: 'blind-repair', label: 'Blind repair' },
  { id: 'drapery-cleaning', label: 'Drapery cleaning' },
  { id: 'drapery-repair', label: 'Drapery repair' },
  { id: 'roman-cleaning', label: 'Roman shade cleaning' },
  { id: 'roman-repair', label: 'Roman shade repair' },
  { id: 'clothing-alteration', label: 'Clothing alterations' },
];

const REQ_STAR = (
  <span style={{ color: 'var(--hue-red)', fontWeight: 600 }} aria-hidden="true"> *</span>
);

export default function Services() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', details: '',
  });
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const setField = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggleService = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError('Please enter your first and last name.');
      return;
    }
    if (!form.email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!form.phone.trim()) {
      setError('Please enter your phone number.');
      return;
    }
    if (selected.length === 0) {
      setError('Please select at least one service you are interested in.');
      return;
    }

    const serviceLabels = SERVICE_OPTIONS
      .filter((opt) => selected.includes(opt.id))
      .map((opt) => opt.label)
      .join(', ');

    setSending(true);
    try {
      await sendFormEmail(
        `Service request from ${form.firstName} ${form.lastName}`,
        {
          'Request Type': 'Cleaning & Repair',
          'Services': serviceLabels,
          ...(form.details.trim() ? { 'Details': form.details } : {}),
          'First Name': form.firstName,
          'Last Name': form.lastName,
          'Email': form.email,
          'Phone': form.phone,
          _replyto: form.email,
        }
      );
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError(
        `We couldn’t send your request just now. Please try again in a moment, or call us at ${COMPANY.phoneDisplay}.`
      );
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="confirmation">
        <div className="check-mark" aria-hidden="true">✓</div>
        <h1>Thank you, {form.firstName}!</h1>
        <p>
          Your service request has been received. Our associate will contact you
          within the next 6 hours to discuss your{' '}
          {selected.length === 1 ? 'service' : 'services'} and schedule a visit.
        </p>
        <p style={{ fontSize: 14, color: 'var(--ink-faint)' }}>
          A confirmation is headed to {form.email}.
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setSubmitted(false);
            setForm({ firstName: '', lastName: '', email: '', phone: '', details: '' });
            setSelected([]);
          }}
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Page header */}
      <div className="container">
        <div className="page-title">
          <div className="eyebrow">Care &amp; Restoration</div>
          <h1>Services</h1>
          <p style={{ color: 'var(--ink-soft)', marginTop: 12, maxWidth: '58ch' }}>
            Beyond making new window treatments, we keep the things you already
            love beautiful. We clean and repair blinds, draperies, and roman
            shades, and our tailors alter clothing of every kind, from haute
            couture to your favorite jeans. Everything happens in our own
            workroom, by the same hands that sew our custom pieces.
          </p>
          <hr className="brand-rule brand-rule--thin" />
        </div>
      </div>

      {/* Service cards */}
      <section className="section" style={{ paddingTop: 48, paddingBottom: 64 }}>
        <div className="container">
          <div className="category-grid">
            {SERVICES.map((s) => (
              <div className="category-card" key={s.title}>
                <div className="card-body" style={{ paddingTop: 30 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                    <div style={{
                      width: 58, height: 58, borderRadius: 'var(--radius)',
                      background: 'var(--paper-warm)', border: '1px solid var(--line)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <s.Icon color={s.hue} />
                    </div>
                    <div style={{ width: 34, height: 3, borderRadius: 2, background: s.hue, opacity: 0.7 }} />
                  </div>
                  <h3 style={{ fontSize: 24, fontWeight: 600 }}>{s.title}</h3>
                  <p style={{ marginBottom: 0 }}>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intake form */}
      <section className="section section--warm" id="request">
        <div className="container" style={{ maxWidth: 720 }}>
          <div className="section-head" style={{ marginBottom: 40 }}>
            <div className="eyebrow">Request Service</div>
            <h2>Tell us what needs care</h2>
            <p>
              Fill out the form below and our associate will contact you within
              the next 6 hours. Prefer to talk? Call{' '}
              <a href={COMPANY.phoneHref} style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>
                {COMPANY.phoneDisplay}
              </a>{' '}
              or visit us at {COMPANY.address}. Fields marked with{' '}
              <span style={{ color: 'var(--hue-red)', fontWeight: 600 }}>*</span> are required.
            </p>
            <hr className="brand-rule brand-rule--thin" />
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            style={{
              background: 'var(--card)',
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-soft)',
              padding: 30,
            }}
          >
            <div className="form-grid">
              <div className="field">
                <label htmlFor="sv-fn">First name{REQ_STAR}</label>
                <input
                  id="sv-fn"
                  required
                  value={form.firstName}
                  onChange={setField('firstName')}
                  autoComplete="given-name"
                />
              </div>
              <div className="field">
                <label htmlFor="sv-ln">Last name{REQ_STAR}</label>
                <input
                  id="sv-ln"
                  required
                  value={form.lastName}
                  onChange={setField('lastName')}
                  autoComplete="family-name"
                />
              </div>
              <div className="field">
                <label htmlFor="sv-email">Email{REQ_STAR}</label>
                <input
                  id="sv-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={setField('email')}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
              <div className="field">
                <label htmlFor="sv-phone">Phone number{REQ_STAR}</label>
                <input
                  id="sv-phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={setField('phone')}
                  placeholder="(555) 555-5555"
                  inputMode="tel"
                  autoComplete="tel"
                />
              </div>
            </div>

            <fieldset style={{ border: 'none', margin: '26px 0 0', padding: 0 }}>
              <legend style={{
                fontSize: 12.5, letterSpacing: '0.08em',
                color: 'var(--ink-faint)', marginBottom: 12,
              }}>
                Services you&rsquo;re interested in{REQ_STAR}
                <span style={{ marginLeft: 6 }}>(select all that apply)</span>
              </legend>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 10,
              }}>
                {SERVICE_OPTIONS.map((opt) => {
                  const checked = selected.includes(opt.id);
                  return (
                    <label
                      key={opt.id}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '11px 14px',
                        border: `1px solid ${checked ? 'var(--ink)' : 'var(--line)'}`,
                        borderRadius: 'var(--radius)',
                        background: checked ? 'var(--paper-warm)' : '#fff',
                        cursor: 'pointer',
                        fontSize: 14.5,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleService(opt.id)}
                        style={{ width: 16, height: 16, accentColor: 'var(--ink)' }}
                      />
                      {opt.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="field" style={{ marginTop: 26 }}>
              <label htmlFor="sv-details">Details (optional)</label>
              <textarea
                id="sv-details"
                rows={3}
                value={form.details}
                onChange={setField('details')}
                placeholder="Tell us a little about your blinds, draperies, or shades: how many, fabric type, what needs attention."
                style={{
                  width: '100%', padding: '12px 14px',
                  border: '1px solid var(--line)', borderRadius: 'var(--radius)',
                  fontSize: 15, background: '#fff', fontFamily: 'inherit',
                  color: 'var(--ink)', resize: 'vertical',
                }}
              />
            </div>

            {error && <p className="checkout-error" role="alert">{error}</p>}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 24 }} disabled={sending}>
              {sending ? 'Sending…' : 'Request Service'}
            </button>
            <p className="price-note" style={{ marginTop: 14 }}>
              Our associate will contact you within the next 6 hours.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
