import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar({ currentPage, setCurrentPage, user, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "Overview" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Case Studies" },
    { id: "studio", label: "AI Studio", badge: "⚡" },
    { id: "about", label: "About" },
    { id: "pricing", label: "Pricing" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className={`genlab-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <div className="navbar-brand" onClick={() => handleNavClick("home")}>
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

        {/* Desktop Navigation Links */}
        <nav className="navbar-links">
          {navLinks.map((link) => (
            <button
              key={link.id}
              className={`nav-link ${currentPage === link.id ? "active" : ""}`}
              onClick={() => handleNavClick(link.id)}
            >
              {link.label}
              {link.badge && <span className="nav-badge">{link.badge}</span>}
            </button>
          ))}
        </nav>

        {/* Right Action / Auth Area */}
        <div className="navbar-actions">
          <div className="system-pill" title="Genlab Cloud Clusters Operational">
            <span className="pulse-dot"></span>
            <span className="pill-text">Operational</span>
          </div>

          {user ? (
            <div className="user-profile-menu">
              <button
                className="user-pill-btn"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <div className="user-avatar-circle">
                  {(user.name || user.email || "U").charAt(0).toUpperCase()}
                </div>
                <span className="user-name-label">{user.name || user.email}</span>
                <span className="dropdown-arrow">▾</span>
              </button>

              {userDropdownOpen && (
                <div className="user-dropdown-card">
                  <div className="dropdown-user-header">
                    <p className="dropdown-user-name">{user.name || "Client"}</p>
                    <p className="dropdown-user-email">{user.email}</p>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button
                    className="dropdown-item"
                    onClick={() => handleNavClick("dashboard")}
                  >
                    📊 Client Portal & Dashboard
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => handleNavClick("studio")}
                  >
                    ⚡ AI Generator Workbench
                  </button>
                  <div className="dropdown-divider"></div>
                  <button
                    className="dropdown-item logout-item"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onLogout();
                    }}
                  >
                    🚪 Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-btn-group">
              <button
                className="btn-text"
                onClick={() => handleNavClick("login")}
              >
                Sign In
              </button>
              <button
                className="btn-primary-action"
                onClick={() => handleNavClick("contact")}
              >
                <span>Hire Genlab</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button
            className={`hamburger-btn ${mobileMenuOpen ? "open" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <div className="mobile-nav-links">
            {navLinks.map((link) => (
              <button
                key={link.id}
                className={`mobile-nav-link ${currentPage === link.id ? "active" : ""}`}
                onClick={() => handleNavClick(link.id)}
              >
                <span>{link.label}</span>
                {link.badge && <span className="nav-badge">{link.badge}</span>}
              </button>
            ))}
            {user ? (
              <button
                className="mobile-nav-link"
                onClick={() => handleNavClick("dashboard")}
              >
                <span>📊 Client Dashboard</span>
              </button>
            ) : null}
          </div>

          <div className="mobile-drawer-footer">
            {user ? (
              <button
                className="mobile-logout-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
              >
                Sign Out ({user.name || user.email})
              </button>
            ) : (
              <div className="mobile-auth-row">
                <button
                  className="mobile-login-btn"
                  onClick={() => handleNavClick("login")}
                >
                  Sign In
                </button>
                <button
                  className="mobile-cta-btn"
                  onClick={() => handleNavClick("contact")}
                >
                  Start a Project →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
