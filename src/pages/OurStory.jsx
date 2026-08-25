import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FamilyIllustration, DesignArt, ChooseArt, GiveArt, ThriveArt } from '../components/StoryArt.jsx';

/**
 * Our Story — the heart of the brand.
 * Coco Drapes is built in direct support of people and kids with autism.
 * 5% of the revenue from every sale goes to an autism foundation that the
 * customer picks at checkout. The page ends with a Careers section
 * (#careers) for people who want to join the team in sales and management.
 */

const PLEDGE_STEPS = [
  {
    title: 'You Design',
    text: 'You create a custom drapery or roman shade you love, made to your window and your style.',
    Art: DesignArt,
  },
  {
    title: 'You Choose',
    text: 'At checkout, you pick the autism foundation you want your order to support. Your order, your choice.',
    Art: ChooseArt,
  },
  {
    title: 'We Give 5%',
    text: 'Five percent of the revenue from your sale goes directly to the foundation you selected. Every order. No exceptions.',
    Art: GiveArt,
  },
  {
    title: 'They Thrive',
    text: 'Your contribution funds therapy access, family support, and inclusive education for autistic people.',
    Art: ThriveArt,
  },
];

const VALUES = [
  {
    hue: 'var(--hue-red)',
    title: 'Built With Purpose',
    text: 'Coco Drapes exists in direct support of people and kids with autism. It is not a side program. It is why the company was founded.',
  },
  {
    hue: 'var(--hue-orange)',
    title: 'Sensory-Aware Craft',
    text: 'Soft light, gentle textures, and quiet rooms matter, especially for people with sensory sensitivities. We design our treatments with that comfort in mind.',
  },
  {
    hue: 'var(--hue-green)',
    title: 'You Direct the Giving',
    text: 'We don\u2019t pick for you. Every customer chooses which autism foundation their 5% supports, so the impact reflects the causes closest to your heart.',
  },
  {
    hue: 'var(--hue-blue)',
    title: 'Transparent, Always',
    text: 'The pledge is simple math: 5% of each sale\u2019s revenue. We report our giving openly, so you always know your order made a difference.',
  },
];

const ROLE_OPTIONS = ['Sales', 'Management', 'Either / Open'];

const REQ_STAR = (
  <span style={{ color: 'var(--hue-red)', fontWeight: 600 }} aria-hidden="true"> *</span>
);

export default function OurStory() {
  const { hash } = useLocation();

  // Footer "Careers" link lands on /our-story#careers — scroll to the section.
  useEffect(() => {
    if (hash === '#careers') {
      const t = setTimeout(() => {
        document.getElementById('careers')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
      return () => clearTimeout(t);
    }
  }, [hash]);

  return (
    <>
      {/* Page header */}
      <div className="container">
        <div className="page-title">
          <div className="eyebrow">Why We Exist</div>
          <h1>Our Story</h1>
          <hr className="brand-rule brand-rule--thin" />
        </div>
      </div>

      {/* Mission statement */}
      <section className="section" style={{ paddingTop: 48, paddingBottom: 72 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(24px, 3vw, 32px)',
            lineHeight: 1.4,
            color: 'var(--ink)',
            marginBottom: 28,
          }}>
            Coco Drapes was built in direct support of people and kids with autism.
            <em style={{ fontWeight: 400 }}> Every window we dress helps a family, a classroom, a future.</em>
          </p>

          {/* Family illustration */}
          <div style={{
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-soft)',
            marginBottom: 12,
          }}>
            <FamilyIllustration />
          </div>
          <p style={{
            fontSize: 13, color: 'var(--ink-faint)', textAlign: 'center',
            marginBottom: 32, letterSpacing: '0.04em',
          }}>
            Every home deserves calm, comfort, and joy. That&rsquo;s who we sew for.
          </p>

          <p style={{ color: 'var(--ink-soft)', marginBottom: 18 }}>
            For many autistic children and adults, home is more than a place. It&rsquo;s a
            sanctuary. The right room can calm an overwhelming day: soft, filtered light
            instead of harsh glare; gentle fabric instead of hard edges; a quiet,
            comfortable space that feels safe. That belief in the power of a calm home is
            where Coco Drapes began, and it&rsquo;s who we sew for.
          </p>
          <p style={{ color: 'var(--ink-soft)' }}>
            So we made giving part of the product itself. <strong style={{ fontWeight: 500, color: 'var(--ink)' }}>
            5% of the revenue from every sale goes to an autism foundation, and you, the
            customer, pick which one.</strong> When you order from us, you&rsquo;re not just
            dressing a window. You&rsquo;re funding therapy hours, family resources,
            inclusive classrooms, and brighter futures for autistic people.
          </p>
        </div>
      </section>

      {/* The 5% pledge — ink band */}
      <section className="section section--ink">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow" style={{ color: 'rgba(250,248,244,0.55)' }}>The 5% Pledge</div>
            <h2>Every sale gives back. You choose where.</h2>
            <p>
              Five percent of each sale&rsquo;s revenue goes to an autism foundation
              selected by you at checkout. Here&rsquo;s how it works.
            </p>
            <hr className="brand-rule brand-rule--thin" />
          </div>
          <div className="steps-grid">
            {PLEDGE_STEPS.map((step, i) => (
              <div className="step" key={step.title}>
                <div className="step-num">{i + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <div style={{
                  marginTop: 18,
                  borderRadius: 'var(--radius)',
                  overflow: 'hidden',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.28)',
                  border: '1px solid rgba(250,248,244,0.14)',
                }}>
                  <step.Art />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we stand for */}
      <section className="section section--warm">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">What We Stand For</div>
            <h2>Beautiful windows, meaningful impact</h2>
            <hr className="brand-rule brand-rule--thin" />
          </div>
          <div className="category-grid">
            {VALUES.map((v) => (
              <div className="category-card" key={v.title} style={{ overflow: 'visible' }}>
                <div className="card-body" style={{ paddingTop: 32 }}>
                  <div style={{
                    width: 44, height: 4, borderRadius: 2,
                    background: v.hue, marginBottom: 18,
                  }} />
                  <h3 style={{ fontSize: 23 }}>{v.title}</h3>
                  <p style={{ marginBottom: 0 }}>{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center', maxWidth: 640 }}>
          <div className="eyebrow">Join Us</div>
          <h2 style={{ fontSize: 'clamp(30px, 3.4vw, 40px)', marginBottom: 16 }}>
            Dress a window. Change a story.
          </h2>
          <p style={{ color: 'var(--ink-soft)', marginBottom: 32 }}>
            Design your custom drapery or roman shade today. 5% of your order&rsquo;s
            revenue goes to the autism foundation of your choice.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/customize/drapery" className="btn btn-primary">Start Designing</Link>
            <Link to="/services" className="btn btn-outline">Explore Our Services</Link>
          </div>
        </div>
      </section>

      {/* Careers */}
      <CareersSection />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Careers — join the team in sales and management                    */
/* ------------------------------------------------------------------ */
function CareersSection() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', message: '',
  });
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const setField = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
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
    if (!role) {
      setError('Please select the area you\u2019re interested in.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <section className="section section--warm" id="careers" style={{ scrollMarginTop: 110 }}>
      <div className="container" style={{ maxWidth: 720 }}>
        <div className="section-head" style={{ marginBottom: 40 }}>
          <div className="eyebrow">Careers</div>
          <h2>Work with purpose. Join our team.</h2>
          <p>
            Coco Drapes is more than a window treatment company. It&rsquo;s a mission.
            If you want your work in sales or management to directly support people and
            kids with autism, we&rsquo;d love to hear from you.
          </p>
          <hr className="brand-rule brand-rule--thin" />
        </div>

        {submitted ? (
          <div style={{
            background: 'var(--card)', borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow-soft)', padding: '48px 36px', textAlign: 'center',
          }}>
            <div style={{
              width: 60, height: 60, margin: '0 auto 20px', borderRadius: '50%',
              background: 'var(--hue-green)', color: '#fff', fontSize: 28,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }} aria-hidden="true">✓</div>
            <h3 style={{ fontSize: 26, marginBottom: 12 }}>Thank you, {form.firstName}!</h3>
            <p style={{ color: 'var(--ink-soft)', marginBottom: 8 }}>
              Your interest means a lot. Our team will review your note and reach out
              to {form.email} about {role.toLowerCase()} opportunities.
            </p>
            <button
              type="button"
              className="btn btn-outline"
              style={{ marginTop: 20 }}
              onClick={() => {
                setSubmitted(false);
                setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
                setRole('');
              }}
            >
              Submit Another Application
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            style={{
              background: 'var(--card)', borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-soft)', padding: 30,
            }}
          >
            <div className="form-grid">
              <div className="field">
                <label htmlFor="ca-fn">First name{REQ_STAR}</label>
                <input id="ca-fn" required value={form.firstName} onChange={setField('firstName')} autoComplete="given-name" />
              </div>
              <div className="field">
                <label htmlFor="ca-ln">Last name{REQ_STAR}</label>
                <input id="ca-ln" required value={form.lastName} onChange={setField('lastName')} autoComplete="family-name" />
              </div>
              <div className="field">
                <label htmlFor="ca-email">Email{REQ_STAR}</label>
                <input id="ca-email" type="email" required value={form.email} onChange={setField('email')} placeholder="you@example.com" autoComplete="email" />
              </div>
              <div className="field">
                <label htmlFor="ca-phone">Phone number (optional)</label>
                <input id="ca-phone" type="tel" value={form.phone} onChange={setField('phone')} placeholder="(555) 555-5555" inputMode="tel" autoComplete="tel" />
              </div>
            </div>

            <fieldset style={{ border: 'none', margin: '26px 0 0', padding: 0 }}>
              <legend style={{
                fontSize: 12.5, letterSpacing: '0.08em',
                color: 'var(--ink-faint)', marginBottom: 12,
              }}>
                I&rsquo;m interested in{REQ_STAR}
              </legend>
              <div className="pill-row">
                {ROLE_OPTIONS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    className={`pill${role === r ? ' selected' : ''}`}
                    onClick={() => setRole(r)}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="field" style={{ marginTop: 26 }}>
              <label htmlFor="ca-msg">Why do you want to join? (optional)</label>
              <textarea
                id="ca-msg"
                rows={3}
                value={form.message}
                onChange={setField('message')}
                placeholder="Tell us a little about yourself and what draws you to our mission."
                style={{
                  width: '100%', padding: '12px 14px',
                  border: '1px solid var(--line)', borderRadius: 'var(--radius)',
                  fontSize: 15, background: '#fff', fontFamily: 'inherit',
                  color: 'var(--ink)', resize: 'vertical',
                }}
              />
            </div>

            {error && <p className="checkout-error" role="alert">{error}</p>}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 24 }}>
              Express Interest
            </button>
            <p className="price-note" style={{ marginTop: 14 }}>
              We review every application personally and reply to all of them.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
