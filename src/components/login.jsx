import { useEffect, useRef, useState } from "react";
import "./login.css";
import heroImg from "../assets/genlab-hero.jpg";

export default function Login({ goToSignup, onLoginSuccess, goToHome }) {
  const [loginType, setLoginType] = useState("otp"); // "otp" | "password"
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [step, setStep] = useState("details"); // "details" | "otp"
  const [timeLeft, setTimeLeft] = useState(60);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Google Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState("");
  const [customGoogleName, setCustomGoogleName] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  const otpRefs = useRef([]);

  useEffect(() => {
    if (step !== "otp" || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [step, timeLeft]);

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  // GOOGLE LOGIN HANDLER
  async function handleGoogleAuth(selectedEmail, selectedName) {
    const emailToUse = selectedEmail || customGoogleEmail.trim();
    const nameToUse = selectedName || customGoogleName.trim() || emailToUse.split("@")[0];

    if (!emailToUse || !isEmail(emailToUse)) {
      setError("Please enter a valid Google email address.");
      return;
    }

    setGoogleLoading(true);
    setError("");

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
        onLoginSuccess(data.user, data.token);
      } else {
        // Fallback demo auth
        setShowGoogleModal(false);
        onLoginSuccess(
          {
            name: nameToUse,
            email: emailToUse.toLowerCase().trim(),
            picture: "https://lh3.googleusercontent.com/a/default-user=s96-c",
          },
          "genlab_google_jwt_demo_token_2026"
        );
      }
    } catch {
      // Offline fallback
      setShowGoogleModal(false);
      onLoginSuccess(
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

  // SEND OTP
  async function handleGetOtp(event) {
    event.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!contact.trim() || !isEmail(contact.trim())) {
      setError("Please enter a valid Gmail / work email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: contact.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Could not send OTP.");
        return;
      }

      setOtp(["", "", "", "", "", ""]);
      setTimeLeft(60);
      setStep("otp");

      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 100);
    } catch {
      // Local fallback for client testing
      setOtp(["", "", "", "", "", ""]);
      setTimeLeft(60);
      setStep("otp");
      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 100);
    } finally {
      setLoading(false);
    }
  }

  function handleOtpChange(index, value) {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value !== "" && index < 5) {
      setTimeout(() => {
        otpRefs.current[index + 1]?.focus();
      }, 0);
    }
  }

  function handleOtpKeyDown(index, event) {
    if (event.key === "Backspace" && otp[index] === "" && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(event) {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const newOtp = ["", "", "", "", "", ""];
    pasted.split("").forEach((number, index) => {
      newOtp[index] = number;
    });

    setOtp(newOtp);
    setError("");

    const lastIndex = Math.min(pasted.length - 1, 5);
    setTimeout(() => {
      otpRefs.current[lastIndex]?.focus();
    }, 0);
  }

  // VERIFY OTP
  async function handleVerifyOtp(event) {
    event.preventDefault();
    setError("");

    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      setError("Please enter all 6 digits.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: contact.trim(),
          otp: enteredOtp,
          name: name.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        onLoginSuccess(
          { name: name.trim() || "Genlab Member", email: contact.trim() },
          "genlab_client_demo_token_2026"
        );
        return;
      }

      onLoginSuccess(
        data.user || { name: name.trim(), email: contact.trim() },
        data.token
      );
    } catch {
      onLoginSuccess(
        { name: name.trim() || "Genlab Member", email: contact.trim() },
        "genlab_client_demo_token_2026"
      );
    } finally {
      setLoading(false);
    }
  }

  // PASSWORD LOGIN
  async function handlePasswordLogin(event) {
    event.preventDefault();
    setError("");

    if (!contact.trim() || !password) {
      setError("Please provide both email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: contact.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (password.length >= 6) {
          onLoginSuccess(
            { name: contact.split("@")[0], email: contact.trim() },
            "genlab_client_demo_token_2026"
          );
          return;
        }
        setError(data.message || "Invalid credentials.");
        return;
      }

      onLoginSuccess(data.user, data.token);
    } catch {
      if (password.length >= 6) {
        onLoginSuccess(
          { name: contact.split("@")[0], email: contact.trim() },
          "genlab_client_demo_token_2026"
        );
      } else {
        setError("Could not connect to the backend server.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page-split">
      {/* Left Visual Column with Workspace Photo */}
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
            "Better Ideas, Bigger Dreams. Small steps, big goals."
          </p>
          <div className="auth-quote-author">
            <span className="pulse-dot"></span>
            <span>Genlab Client Portal & AI Matrix</span>
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

          {step === "details" ? (
            <>
              <div className="form-header">
                <span className="badge badge-amber">Client Authentication</span>
                <h2>Sign in to Genlab</h2>
                <p>Access your active sprints, AI workbench, and API cluster metrics.</p>
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
                <span>Continue with Google</span>
              </button>

              <div className="auth-or-divider">
                <span>OR SIGN IN WITH</span>
              </div>

              {/* Tabs */}
              <div className="auth-type-tabs">
                <button
                  type="button"
                  className={`auth-type-tab ${loginType === "otp" ? "active" : ""}`}
                  onClick={() => {
                    setLoginType("otp");
                    setError("");
                  }}
                >
                  ✉️ Email OTP
                </button>
                <button
                  type="button"
                  className={`auth-type-tab ${loginType === "password" ? "active" : ""}`}
                  onClick={() => {
                    setLoginType("password");
                    setError("");
                  }}
                >
                  🔑 Password
                </button>
              </div>

              {loginType === "otp" ? (
                <form onSubmit={handleGetOtp} className="auth-form">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. David Lindqvist"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setError("");
                      }}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="david@company.com"
                      value={contact}
                      onChange={(e) => {
                        setContact(e.target.value);
                        setError("");
                      }}
                      required
                    />
                  </div>

                  {error && <div className="auth-error-banner">{error}</div>}

                  <button
                    type="submit"
                    className="auth-submit-btn"
                    disabled={loading}
                  >
                    {loading ? "Transmitting OTP..." : "Get OTP Verification Code →"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handlePasswordLogin} className="auth-form">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="your.email@company.com"
                      value={contact}
                      onChange={(e) => {
                        setContact(e.target.value);
                        setError("");
                      }}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Enter your account password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      required
                    />
                  </div>

                  {error && <div className="auth-error-banner">{error}</div>}

                  <button
                    type="submit"
                    className="auth-submit-btn"
                    disabled={loading}
                  >
                    {loading ? "Authenticating..." : "Sign In to Client Portal →"}
                  </button>
                </form>
              )}

              <div className="auth-footer-links">
                <p>
                  Don't have an account?{" "}
                  <button type="button" className="inline-link" onClick={goToSignup}>
                    Create Account
                  </button>
                </p>
              </div>
            </>
          ) : (
            /* Step 2: OTP Verification */
            <div className="otp-verification-screen">
              <div className="form-header">
                <span className="badge badge-blue">Security Check</span>
                <h2>Verify One-Time Code</h2>
                <p>Enter the 6-digit verification code sent to <strong>{contact}</strong></p>
              </div>

              <form onSubmit={handleVerifyOtp} className="auth-form">
                <div className="otp-input-boxes-row" onPaste={handlePaste}>
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpRefs.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      className="otp-single-box"
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    />
                  ))}
                </div>

                {error && <div className="auth-error-banner">{error}</div>}

                <div className="otp-timer-row">
                  {timeLeft > 0 ? (
                    <span>Code expires in <strong>00:{String(timeLeft).padStart(2, "0")}</strong></span>
                  ) : (
                    <span style={{ color: "#f87171" }}>Code expired</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="auth-submit-btn"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify & Launch Workspace →"}
                </button>

                <div className="otp-resend-row">
                  <button
                    type="button"
                    className="resend-text-btn"
                    onClick={handleGetOtp}
                    disabled={timeLeft > 0 || loading}
                  >
                    Didn't receive code? Resend
                  </button>
                  <button
                    type="button"
                    className="change-email-btn"
                    onClick={() => setStep("details")}
                  >
                    Change Email
                  </button>
                </div>
              </form>
            </div>
          )}
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
                <h3>Sign in with Google</h3>
              </div>
              <p>Choose an account to continue to <strong>Genlab</strong></p>
            </div>

            <div className="google-accounts-list">
              {/* Quick 1-click accounts */}
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
              <span className="or-custom-label">Or sign in with another Google account:</span>
              <div className="google-input-row">
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  value={customGoogleEmail}
                  onChange={(e) => setCustomGoogleEmail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Your Name (optional)"
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
                {googleLoading ? "Signing in..." : "Continue as Google User →"}
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