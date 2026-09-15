import { useEffect, useRef, useState } from "react";
import "./login.css";
import loginImage from "../assets/loginimage.jpg";

export default function Login({ goToSignup }) {
  const [name, setName] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [step, setStep] = useState("name");
  const [timeLeft, setTimeLeft] = useState(30);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const otpRefs = useRef([]);

  useEffect(() => {
    if (step !== "otp" || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [step, timeLeft]);

  function createOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  function sendOtp() {
    const newOtp = createOtp();

    setGeneratedOtp(newOtp);
    setOtp(["", "", "", "", "", ""]);
    setTimeLeft(30);
    setError("");
    setStep("otp");

    // Demo OTP
    console.log("Demo OTP:", newOtp);

    setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 100);
  }

  function handleGetOtp(event) {
    event.preventDefault();

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      sendOtp();
      setLoading(false);
    }, 800);
  }

  function handleOtpChange(index, value) {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index, event) {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(event) {
    event.preventDefault();

    const pastedText = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedText) return;

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

  function resendOtp() {
    sendOtp();
  }

  function changeName() {
    setStep("name");
    setOtp(["", "", "", "", "", ""]);
    setGeneratedOtp("");
    setError("");
    setTimeLeft(30);
  }

  return (
    <main
      className="login-page"
      style={{ backgroundImage: `url(${loginImage})` }}
    >
      <div className="dark-overlay"></div>

      <section className="login-box">

        {step === "name" && (
          <>
            <div className="brand-icon">✦</div>

            <h1>Welcome Back</h1>

            <p className="subtitle">
              Enter your name to continue
            </p>

            <form onSubmit={handleGetOtp}>
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
          </>
        )}

        {step === "otp" && (
          <>
            <div className="brand-icon">🔐</div>

            <h1>Verify OTP</h1>

            <p className="subtitle">
              We've generated a 6-digit OTP for you
            </p>

            <div className="user-display">
              <span>👤</span>
              <strong>{name}</strong>

              <button type="button" onClick={changeName}>
                Change
              </button>
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
                    <strong>00:{String(timeLeft).padStart(2, "0")}</strong>
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
              onClick={() => setStep("name")}
            >
              Continue <span>→</span>
            </button>
          </div>
        )}

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