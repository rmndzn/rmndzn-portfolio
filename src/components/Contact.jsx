import { useState } from 'react';
import './Contact.css';

const socialLinks = [
  {
    name: 'GitHub',
    handle: '@rmndzn',
    href: 'https://github.com/rmndzn',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    color: '#ffffff',
  },
  {
    name: 'LinkedIn',
    handle: 'in/rmndzn',
    href: 'https://www.linkedin.com/in/arman-dizon-944a50174/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: '#0077b5',
  },
  {
    name: 'Email',
    handle: 'armandizon33@gmail.com',
    href: 'armandizon33@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    color: '#00b4ff',
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'sent' | 'error'

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    await new Promise(r => setTimeout(r, 1500));
    setStatus('sent');
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus(null), 4000);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="contact-bg-accent" />
      <div className="contact-bg-accent-2" />

      <div className="container">
        {/* Header */}
        <div className="contact-header fade-in">
          <p className="section-label">Contact</p>
          <h2 className="section-title">Let's Build Something<br />Together</h2>
          <p className="section-subtitle">Have a project in mind? I'd love to hear about it. Drop me a message and I'll get back to you within 24 hours.</p>
        </div>

        <div className="contact-grid">
          {/* Left — info + socials */}
          <div className="contact-info fade-in delay-1">
            <div className="glass-card info-card">
              <h3 className="info-heading">Get In Touch</h3>

              <div className="info-items">
                {[
                  { icon: '📧', label: 'Email', value: 'armandizon33@gmail.com' },
                  { icon: '🌍', label: 'Location', value: 'Cavite, Philippines' },
                  { icon: '⏱️', label: 'Response Time', value: 'Within 24 hours' },
                  { icon: '💬', label: 'Availability', value: 'Open to Side Projects' },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="info-row">
                    <div className="info-icon">{icon}</div>
                    <div>
                      <div className="info-label">{label}</div>
                      <div className="info-value">{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="social-divider">
                <span>Find me on</span>
              </div>

              <div className="social-links">
                {socialLinks.map(({ name, handle, href, icon, color }) => (
                  <a
                    key={name}
                    href={href}
                    className="social-link"
                    style={{ '--social-color': color }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="social-icon">{icon}</div>
                    <div className="social-info">
                      <span className="social-name">{name}</span>
                      <span className="social-handle">{handle}</span>
                    </div>
                    <div className="social-arrow">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="contact-form-wrap slide-right delay-2">
            <div className="glass-card form-card">
              <h3 className="form-heading">Send a Message</h3>

              {status === 'sent' ? (
                <div className="success-message">
                  <div className="success-icon">✓</div>
                  <h4>Message Sent!</h4>
                  <p>Thank you for reaching out. I'll get back to you shortly.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      className="form-input form-textarea"
                      rows={5}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary submit-btn" disabled={status === 'sending'}>
                    {status === 'sending' ? (
                      <>
                        <span className="spinner" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-logo">
            <span className="logo-text">RMNDZN</span>
            <span className="logo-dot" />
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} RMNDZN. Crafted with passion & precision.</p>
          <div className="footer-links">
            {['Home', 'About', 'Portfolio', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="footer-link"
                onClick={(e) => { e.preventDefault(); document.querySelector(`#${item.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' }); }}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </section>
  );
}
