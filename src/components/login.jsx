import { useEffect, useRef, useState } from "react";
import "./login.css";
import loginImage from "../assets/loginimage.jpg";

export default function Login({ goToSignup }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [generatedOtp, setGeneratedOtp] = useState("");

  const [step, setStep] = useState("details");
  const [timeLeft, setTimeLeft] = useState(60);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const otpRefs = useRef([]);

  // OTP timer
  useEffect(() => {
    if (step !== "otp" || timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [step, timeLeft]);

  // Check whether input is Gmail
  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  // Check whether input is phone number
  function isPhone(value) {
    return /^[0-9+\-\s]{10,15}$/.test(value);
  }

  // Generate demo OTP
  function createOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Get OTP
  function handleGetOtp(event) {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!contact.trim()) {
      setError("Please enter your Gmail or phone number.");
      return;
    }

    if (!isEmail(contact) && !isPhone(contact)) {
      setError("Please enter a valid Gmail or phone number.");
      return;
    }

    setLoading(true);

    /*
      TEMPORARY OTP TEST

      Later we will replace this with:
      Gmail → Node.js backend → Email OTP
      Phone → Firebase → SMS OTP
    */
    setTimeout(() => {
      const newOtp = createOtp();

      setGeneratedOtp(newOtp);
      setOtp(["", "", "", "", "", ""]);
      setTimeLeft(60);
      setStep("otp");

      // TEMPORARY: shows OTP for testing
      alert(`Your OTP is: ${newOtp}`);

      console.log("Demo OTP:", newOtp);

      setLoading(false);

      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 100);
    }, 800);
  }

  // OTP input
  function handleOtpChange(index, value) {
    if (!/^\d?$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  }

  // Backspace
  function handleKeyDown(index, event) {
    if (
      event.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      otpRefs.current[index - 1]?.focus();
    }
  }

  // Paste OTP
  function handlePaste(event) {
    event.preventDefault();

    const pastedText = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedText) {
      return;
    }

    const newOtp = ["", "", "", "", "", ""];

    pastedText.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);
    setError("");

    const nextIndex = Math.min(pastedText.length, 5);

    setTimeout(() => {
      otpRefs.current[nextIndex]?.focus();
    }, 50);
  }

  // Verify OTP
  function handleLogin(event) {
    event.preventDefault();

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setError("Please enter the complete OTP.");
      return;
    }

    if (timeLeft <= 0) {
      setError("OTP expired. Please request a new one.");
      return;
    }

    if (enteredOtp !== generatedOtp) {
      setError("Incorrect OTP. Please try again.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep("success");
    }, 1000);
  }

  // Resend OTP
  function resendOtp() {
    const newOtp = createOtp();

    setGeneratedOtp(newOtp);
    setOtp(["", "", "", "", "", ""]);
    setTimeLeft(60);
    setError("");

    alert(`Your new OTP is: ${newOtp}`);

    console.log("New Demo OTP:", newOtp);

    setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 100);
  }

  // Change details
  function changeDetails() {
    setStep("details");
    setOtp(["", "", "", "", "", ""]);
    setGeneratedOtp("");
    setError("");
    setTimeLeft(60);
  }

  // Google login
  function handleGoogleLogin() {
    alert("Google Login clicked!");
  }

  return (
    <main
      className="login-page"
      style={{
        backgroundImage: `url(${loginImage})`,
      }}
    >
      <div className="dark-overlay"></div>

      <section className="login-box">

        {/* DETAILS STEP */}
        {step === "details" && (
          <>
            <div className="brand-icon">✦</div>

            <h1>Welcome Back</h1>

            <p className="subtitle">
              Enter your details to continue
            </p>

            <form onSubmit={handleGetOtp}>

              {/* NAME */}
              <label>Your Name</label>

              <div className="input-wrapper">
                <span>👤</span>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setError("");
                  }}
                  required
                />
              </div>

              {/* GMAIL OR PHONE */}
              <label>Gmail or Phone Number</label>

              <div className="input-wrapper">
                <span>📱</span>

                <input
                  type="text"
                  placeholder="Enter Gmail or phone number"
                  value={contact}
                  onChange={(event) => {
                    setContact(event.target.value);
                    setError("");
                  }}
                  required
                />
              </div>

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <button
                className="main-button"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="loader"></span>
                ) : (
                  <>
                    Get OTP <span>→</span>
                  </>
                )}
              </button>

            </form>

            {/* OR */}
            <div className="divider">
              <span>OR</span>
            </div>

            {/* GOOGLE */}
            <button
              className="google-button"
              type="button"
              onClick={handleGoogleLogin}
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="google-logo"
              />

              <span>Continue with Google</span>
            </button>
          </>
        )}

        {/* OTP STEP */}
        {step === "otp" && (
          <>
            <div className="brand-icon">🔐</div>

            <h1>Verify OTP</h1>

            <p className="subtitle">
              Enter the 6-digit OTP sent to you
            </p>

            <div className="user-display">
              <span>👤</span>

              <strong>{name}</strong>

              <button
                type="button"
                onClick={changeDetails}
              >
                Change
              </button>
            </div>

            <div className="user-display">
              <span>📱</span>

              <strong>{contact}</strong>
            </div>

            <form onSubmit={handleLogin}>

              <label>Enter OTP</label>

              <div
                className="otp-container"
                onPaste={handlePaste}
              >
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      otpRefs.current[index] = element;
                    }}
                    className="otp-box"
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(event) =>
                      handleOtpChange(
                        index,
                        event.target.value
                      )
                    }
                    onKeyDown={(event) =>
                      handleKeyDown(index, event)
                    }
                  />
                ))}
              </div>

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <div className="timer">
                {timeLeft > 0 ? (
                  <>
                    OTP expires in{" "}
                    <strong>
                      00:{String(timeLeft).padStart(2, "0")}
                    </strong>
                  </>
                ) : (
                  <span className="expired">
                    OTP expired
                  </span>
                )}
              </div>

              <button
                className="main-button"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="loader"></span>
                ) : (
                  <>
                    Verify & Login <span>→</span>
                  </>
                )}
              </button>

              <div className="resend-section">
                Didn't receive the OTP?

                <button
                  className="resend-button"
                  type="button"
                  onClick={resendOtp}
                  disabled={timeLeft > 0}
                >
                  Resend OTP
                </button>
              </div>

            </form>
          </>
        )}

        {/* SUCCESS */}
        {step === "success" && (
          <div className="success-screen">

            <div className="success-icon">
              ✓
            </div>

            <h1>You're In!</h1>

            <p className="subtitle">
              Welcome back, <strong>{name}</strong>
            </p>

            <div className="success-card">
              <span>✓</span>
              Login verified successfully
            </div>

            <button
              className="main-button"
              type="button"
              onClick={() => setStep("details")}
            >
              Continue <span>→</span>
            </button>

          </div>
        )}

        {/* SIGN UP */}
        {step !== "success" && (
          <p className="switch-text">
            Don't have an account?{" "}

            <button
              className="text-link"
              type="button"
              onClick={goToSignup}
            >
              Sign up
            </button>
          </p>
        )}

      </section>
    </main>
  );
}