import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import VerifyStudent from "./pages/VerifyStudent";

function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname.toLowerCase() === "/login";
  const isVerifyPage = location.pathname.toLowerCase().startsWith("/verify");
  const hideHeaderFooter = isLoginPage || isVerifyPage;

  return (
    <>
      {!hideHeaderFooter && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<VerifyStudent />} />
        <Route path="/verify/:id" element={<VerifyStudent />} />
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
