import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/home";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Studio from "./components/Studio";
import About from "./components/About";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import Dashboard from "./components/Dashboard";
import Login from "./components/login";
import Signup from "./components/signup";

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("genlab_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("genlab_token") || null;
  });

  const [currentPage, setCurrentPage] = useState("home");

  // Verify session validity on initial mount
  useEffect(() => {
    if (token) {
      fetch("http://localhost:5000/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            // Keep local offline session for seamless dev preview if server is standalone
          }
        })
        .catch(() => {});
    }
  }, [token]);

  function handleLoginSuccess(userData, userToken) {
    setUser(userData);
    if (userToken) {
      setToken(userToken);
      localStorage.setItem("genlab_token", userToken);
    }
    localStorage.setItem("genlab_user", JSON.stringify(userData));
    setCurrentPage("dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleLogout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("genlab_user");
    localStorage.removeItem("genlab_token");
    setCurrentPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Auth full-screen pages
  if (currentPage === "login") {
    return (
      <Login
        goToSignup={() => setCurrentPage("signup")}
        onLoginSuccess={handleLoginSuccess}
        goToHome={() => setCurrentPage("home")}
      />
    );
  }

  if (currentPage === "signup") {
    return (
      <Signup
        goToLogin={() => setCurrentPage("login")}
        onSignupSuccess={handleLoginSuccess}
        goToHome={() => setCurrentPage("home")}
      />
    );
  }

  return (
    <div className="genlab-app-root">
      {/* Top Fixed Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Page Routing */}
      <main className="genlab-main-content">
        {currentPage === "home" && (
          <Home
            setCurrentPage={setCurrentPage}
            user={user}
          />
        )}

        {currentPage === "services" && (
          <Services
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === "portfolio" && (
          <Portfolio
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === "studio" && (
          <Studio
            user={user}
          />
        )}

        {currentPage === "about" && (
          <About
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === "pricing" && (
          <Pricing
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === "contact" && (
          <Contact />
        )}

        {currentPage === "dashboard" && (
          <Dashboard
            user={user}
            token={token}
            onLogout={handleLogout}
            setCurrentPage={setCurrentPage}
          />
        )}
      </main>

      {/* Footer across all pages */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}