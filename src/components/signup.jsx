import { useState } from "react";
import "./signup.css";
import loginImage from "../assets/loginimage.jpg";

export default function Signup({ goToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignup(event) {
    event.preventDefault();

    if (name && email && password) {
      alert("Account created successfully!");
      goToLogin();
    }
  }

  return (
    <main
      className="signup-page"
      style={{ backgroundImage: `url(${loginImage})` }}
    >
      <div className="dark-overlay"></div>

      <section className="signup-box">
        <h1>Create Account</h1>
        <p>Sign up to get started</p>

        <form onSubmit={handleSignup}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

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
            placeholder="Create a password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <button className="main-button" type="submit">
            Create Account
          </button>
        </form>

        <p className="switch-text">
          Already have an account?{" "}
          <button className="text-link" type="button" onClick={goToLogin}>
            Login
          </button>
        </p>
      </section>
    </main>
  );
}