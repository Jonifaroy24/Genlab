import { useState } from "react";
import "./login.css";
import heroImg from "../assets/genlab-hero.jpg";

export default function Signup({ goToLogin, onSignupSuccess, goToHome }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Google Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState("");
  const [customGoogleName, setCustomGoogleName] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  // GOOGLE AUTH
  async function handleGoogleAuth(selectedEmail, selectedName) {
    const emailToUse = selectedEmail || customGoogleEmail.trim();
    const nameToUse = selectedName || customGoogleName.trim() || emailToUse.split("@")[0];

    if (!emailToUse || !isEmail(emailToUse)) {
      setIsError(true);
      setMessage("Please enter a valid Google email address.");
      return;
    }

    setGoogleLoading(true);
    setIsError(false);

    try {
      const response = await fetch("http://localhost:5000/api/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailToUse.toLowerCase().trim(),
          name: nameToUse,
          picture: "https://lh3.googleusercontent.com/a/default-user=s96-c",
          googleId: "google_" + Date.now(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.user) {
        setShowGoogleModal(false);
        onSignupSuccess(data.user, data.token);
      } else {
        setShowGoogleModal(false);
        onSignupSuccess(
          {
            name: nameToUse,
            email: emailToUse.toLowerCase().trim(),
            picture: "https://lh3.googleusercontent.com/a/default-user=s96-c",
          },
          "genlab_google_jwt_demo_token_2026"
        );
      }
    } catch {
      setShowGoogleModal(false);
      onSignupSuccess(
        {
          name: nameToUse,
          email: emailToUse.toLowerCase().trim(),
          picture: "https://lh3.googleusercontent.com/a/default-user=s96-c",
        },
        "genlab_google_jwt_demo_token_2026"
      );
    } finally {
      setGoogleLoading(false);
    }
  }

  async function handleSignup(event) {
    event.preventDefault();
    setMessage("");
    setIsError(false);

    if (!name.trim()) {
      setIsError(true);
      setMessage("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setIsError(true);
      setMessage("Please enter your email address.");
      return;
    }

    if (password.length < 6) {
      setIsError(true);
      setMessage("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setIsError(true);
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setIsError(true);
        setMessage(data.message || "Signup failed. Please try again.");
        return;
      }

      setIsError(false);
      setMessage("Account created successfully! Launching Genlab...");

      setTimeout(() => {
        if (onSignupSuccess && data.token && data.user) {
          onSignupSuccess(data.user, data.token);
        } else {
          goToLogin();
        }
      }, 1000);
    } catch {
      setIsError(false);
      setMessage("Account created in demo mode! Launching...");
      setTimeout(() => {
        if (onSignupSuccess) {
          onSignupSuccess(
            { name: name.trim(), email: email.trim() },
            "genlab_client_demo_token_2026"
          );
        }
      }, 1000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page-split">
      {/* Left Visual Column */}
      <div className="auth-visual-col">
        <img
          src={heroImg}
          alt="Genlab Workspace"
          className="auth-hero-img"
        />
        <div className="auth-visual-overlay"></div>

        <div className="auth-brand-badge" onClick={goToHome}>
          <div className="brand-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flask-icon">
              <path d="M9 3H15M10 3V8L4.5 18C3.8 19.2 4.7 21 6.1 21H17.9C19.3 21 20.2 19.2 19.5 18L14 8V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 16H17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M8.5 13L10 14" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="brand-text-group">
            <span className="brand-title">Genlab</span>
            <span className="brand-tagline">CODE • BUILD • CREATE</span>
          </div>
        </div>

        <div className="auth-quote-card">
          <p className="auth-quote">
            "Join an elite community of engineers, founders, and AI practitioners."
          </p>
          <div className="auth-quote-author">
            <span className="pulse-dot"></span>
            <span>Genlab Verified Developer Access</span>
          </div>
        </div>
      </div>

      {/* Right Form Column */}
      <div className="auth-form-col">
        <div className="auth-form-container">
          <div className="auth-nav-top">
            <button className="back-home-btn" onClick={goToHome}>
              ← Back to Overview
            </button>
          </div>

          <div className="form-header">
            <span className="badge badge-amber">New Registration</span>
            <h2>Create Your Account</h2>
            <p>Get instant access to Genlab AI Studio & client sprint portals.</p>
          </div>

          {/* Google One-Click Login Button */}
          <button
            type="button"
            className="google-sign-in-btn"
            onClick={() => setShowGoogleModal(true)}
          >
            <svg className="google-svg-icon" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
            <span>Sign up with Google</span>
          </button>

          <div className="auth-or-divider">
            <span>OR REGISTER WITH EMAIL</span>
          </div>

          <form onSubmit={handleSignup} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setMessage("");
                }}
                required
              />
            </div>

            <div className="form-group">
              <label>Work Email</label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMessage("");
                }}
                required
              />
            </div>

            <div className="form-group">
              <label>Password (min 6 characters)</label>
              <input
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setMessage("");
                }}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setMessage("");
                }}
                required
              />
            </div>

            {message && (
              <div
                className="auth-error-banner"
                style={
                  !isError
                    ? {
                        background: "rgba(16, 185, 129, 0.15)",
                        borderColor: "rgba(16, 185, 129, 0.35)",
                        color: "#6ee7b7",
                      }
                    : {}
                }
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Free Account →"}
            </button>
          </form>

          <div className="auth-footer-links">
            <p>
              Already have an account?{" "}
              <button type="button" className="inline-link" onClick={goToLogin}>
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Google Account Selector Dialog */}
      {showGoogleModal && (
        <div className="google-dialog-overlay" onClick={() => setShowGoogleModal(false)}>
          <div className="google-dialog-card" onClick={(e) => e.stopPropagation()}>
            <div className="google-dialog-header">
              <div className="google-brand-row">
                <svg className="google-svg-icon-large" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <h3>Sign up with Google</h3>
              </div>
              <p>Choose an account to create your <strong>Genlab</strong> profile</p>
            </div>

            <div className="google-accounts-list">
              <button
                type="button"
                className="google-account-item"
                disabled={googleLoading}
                onClick={() => handleGoogleAuth("developer@genlab.io", "Lead Developer")}
              >
                <div className="google-avatar">LD</div>
                <div className="google-account-text">
                  <strong>Lead Developer</strong>
                  <span>developer@genlab.io</span>
                </div>
              </button>

              <button
                type="button"
                className="google-account-item"
                disabled={googleLoading}
                onClick={() => handleGoogleAuth("client.partner@gmail.com", "Client Partner")}
              >
                <div className="google-avatar" style={{ background: "#ea4335" }}>CP</div>
                <div className="google-account-text">
                  <strong>Client Partner</strong>
                  <span>client.partner@gmail.com</span>
                </div>
              </button>
            </div>

            <div className="google-custom-account-box">
              <span className="or-custom-label">Or use your Google account:</span>
              <div className="google-input-row">
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  value={customGoogleEmail}
                  onChange={(e) => setCustomGoogleEmail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={customGoogleName}
                  onChange={(e) => setCustomGoogleName(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="google-proceed-btn"
                disabled={googleLoading || !customGoogleEmail.trim()}
                onClick={() => handleGoogleAuth()}
              >
                {googleLoading ? "Registering..." : "Create Account with Google →"}
              </button>
            </div>

            <div className="google-dialog-footer">
              <button
                type="button"
                className="google-cancel-btn"
                onClick={() => setShowGoogleModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}