import { useState } from "react";
import "./Footer.css";

export default function Footer({ setCurrentPage }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 2500);
  };

  const navTo = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="genlab-footer">
      {/* Newsletter / CTA Banner */}
      <div className="footer-newsletter-banner">
        <div className="container">
          <div className="newsletter-card">
            <div className="newsletter-text">
              <span className="badge badge-amber">⚡ Stay Ahead of the Curve</span>
              <h3>Get the Genlab Engineering Dispatch</h3>
              <p>Weekly deep-dives into AI architecture, full-stack scaling patterns, and cloud optimization.</p>
            </div>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              {subscribed ? (
                <div className="subscribed-success">
                  <span>✓ Subscribed to Genlab Dispatch! Check your inbox.</span>
                </div>
              ) : (
                <div className="input-inline-group">
                  <input
                    type="email"
                    placeholder="Enter your work email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="newsletter-btn">
                    Subscribe
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="footer-main-content">
        <div className="container">
          <div className="footer-grid">
            {/* Column 1: Brand & Ethos */}
            <div className="footer-brand-col">
              <div className="footer-brand-header" onClick={() => navTo("home")}>
                <div className="brand-logo-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flask-icon">
                    <path d="M9 3H15M10 3V8L4.5 18C3.8 19.2 4.7 21 6.1 21H17.9C19.3 21 20.2 19.2 19.5 18L14 8V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 16H17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M8.5 13L10 14" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="14" cy="14" r="1" fill="#f59e0b"/>
                  </svg>
                </div>
                <div className="brand-text-group">
                  <span className="brand-title">Genlab</span>
                  <span className="brand-tagline">CODE • BUILD • CREATE</span>
                </div>
              </div>

              <p className="footer-bio">
                Genlab is a boutique technology studio engineering enterprise web platforms, custom AI/ML pipelines, and resilient cloud architectures.
              </p>

              <div className="philosophy-tags">
                <span className="quote-tag">"Better Ideas, Bigger Dreams"</span>
                <span className="quote-tag">"Progress Not Perfection"</span>
              </div>
            </div>

            {/* Column 2: Core Disciplines */}
            <div className="footer-links-col">
              <h4>Disciplines</h4>
              <ul>
                <li><button onClick={() => navTo("services")}>Web Development</button></li>
                <li><button onClick={() => navTo("services")}>Data Science & Analytics</button></li>
                <li><button onClick={() => navTo("services")}>Machine Learning & LLMs</button></li>
                <li><button onClick={() => navTo("services")}>Cloud Computing & DevOps</button></li>
                <li><button onClick={() => navTo("services")}>Architecture Auditing</button></li>
              </ul>
            </div>

            {/* Column 3: Platform */}
            <div className="footer-links-col">
              <h4>Platform</h4>
              <ul>
                <li><button onClick={() => navTo("studio")}>⚡ AI Studio Workbench</button></li>
                <li><button onClick={() => navTo("portfolio")}>Client Case Studies</button></li>
                <li><button onClick={() => navTo("pricing")}>Engagement Models</button></li>
                <li><button onClick={() => navTo("dashboard")}>Client Portal</button></li>
                <li><button onClick={() => navTo("contact")}>Project Estimator</button></li>
              </ul>
            </div>

            {/* Column 4: Company & Trust */}
            <div className="footer-links-col">
              <h4>Company & Trust</h4>
              <ul>
                <li><button onClick={() => navTo("about")}>About Genlab</button></li>
                <li><button onClick={() => navTo("about")}>Studio Culture</button></li>
                <li><button onClick={() => navTo("contact")}>Contact & Consultation</button></li>
                <li><a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Genlab Privacy: Zero third-party data tracking, full GDPR and SOC2 compliance."); }}>Privacy Policy</a></li>
                <li><a href="#terms" onClick={(e) => { e.preventDefault(); alert("Genlab Terms: Enterprise IP assignments are 100% client-owned."); }}>Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div className="footer-status">
              <span className="pulse-dot"></span>
              <span>All Systems Operational • SLA 99.99%</span>
            </div>

            <div className="footer-copyright">
              © {new Date().getFullYear()} Genlab Innovation Studio. All rights reserved.
            </div>

            <div className="footer-social-links">
              <span className="social-pill">GitHub</span>
              <span className="social-pill">LinkedIn</span>
              <span className="social-pill">Twitter / X</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
