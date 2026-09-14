import { useState } from "react";
import Login from "./components/login";
import Signup from "./components/signup";

export default function App() {
  const [currentPage, setCurrentPage] = useState("login");

  if (currentPage === "login") {
    return <Login goToSignup={() => setCurrentPage("signup")} />;
  }

  return <Signup goToLogin={() => setCurrentPage("login")} />;
}