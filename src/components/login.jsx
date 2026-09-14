import { useState } from "react";
import "./login.css";
import loginImage from "../assets/loginimage.jpg";

export default function Login({ goToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    if (email && password) {
      alert("Login successful!");
    }
  }

  return (
    <main
      className="login-page"
      style={{ backgroundImage: `url(${loginImage})` }}
    >
      <div className="dark-overlay"></div>

      <section className="login-box">
        <h1>Welcome Back</h1>
        <p>Login to access your account</p>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <button className="main-button" type="submit">
            Login
          </button>
        </form>

        <button className="forgot-password" type="button">
          Forgot password?
        </button>

        <p className="switch-text">
          Don't have an account?{" "}
          <button className="text-link" type="button" onClick={goToSignup}>
            Sign up
          </button>
        </p>
      </section>
    </main>
  );
}