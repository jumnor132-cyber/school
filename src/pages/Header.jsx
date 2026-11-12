import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname.toLowerCase();

  const isActive = (path) => {
    if (path === "/" && (pathname === "/" || pathname === "/home")) return true;
    if (path !== "/" && pathname.startsWith(path.toLowerCase())) return true;
    return false;
  };

  const handleNavClick = () => {
    setIsNavOpen(false);
  };

  return (
    <header className="uni-header sticky-top bg-white">
      {/* Topbar Start - Desktop only */}
      <div className="uni-topbar d-none d-lg-block py-2">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            {/* Left Info: Accreditation & Campuses */}
            <div className="d-flex align-items-center gap-3">
              <span className="uni-topbar-badge">
                <i className="fa fa-award me-1" /> MoEYS & ACC Accredited
              </span>
              <small className="text-white-50">
                <i className="fa fa-map-marker-alt text-warning me-1" />
                ទីតាំងទី១៖ #21, ផ្លូវ 360, បឹងកេងកង1, ភ្នំពេញ
              </small>
            </div>

            {/* Right Info: Contacts & Verification & Portal */}
            <div className="d-flex align-items-center gap-4">
              <small>
                <i className="fa fa-phone-alt text-warning me-1" />
                Hotline: <strong className="text-white">023 999 999</strong> / 012 345 678
              </small>

              <small>
                <i className="fa fa-envelope text-warning me-1" />
                info@beltei.edu.kh
              </small>

              <Link
                to="/verify"
                className="text-warning fw-semibold text-decoration-none small d-inline-flex align-items-center gap-1"
                title="ផ្ទៀងផ្ទាត់សញ្ញាបត្រ និងព័ត៌មាននិស្សិត"
              >
                <i className="fa fa-qrcode" /> ផ្ទៀងផ្ទាត់សញ្ញាបត្រ
              </Link>

              {/* Social Media Links */}
              <div className="d-flex gap-2 ms-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="text-white-50 hover-text-white"
                >
                  <i className="fab fa-facebook-f" />
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Telegram"
                  className="text-white-50 hover-text-white"
                >
                  <i className="fab fa-telegram-plane" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="text-white-50 hover-text-white"
                >
                  <i className="fab fa-youtube" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Topbar End */}

      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg uni-navbar">
        <div className="container">
          {/* University Brand Logo & Motto */}
          <Link
            to="/"
            onClick={handleNavClick}
            className="navbar-brand d-flex align-items-center gap-2 gap-sm-3 text-decoration-none py-1"
          >
            <div className="uni-crest-icon">
              <i className="fa fa-graduation-cap" />
            </div>
            <div>
              <div className="d-flex align-items-baseline gap-1 gap-sm-2">
                <span className="uni-brand-title fw-bold text-navy mb-0">
                  BELTEI
                </span>
                <span className="badge bg-warning text-dark fw-bold uni-brand-badge">
                  UNIVERSITY
                </span>
              </div>
              <div className="uni-brand-subtitle fw-bold text-muted">
                សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ
              </div>
            </div>
          </Link>

          {/* Mobile Menu Toggler with React state */}
          <button
            type="button"
            className="navbar-toggler border-0 shadow-none p-2"
            onClick={() => setIsNavOpen(!isNavOpen)}
            aria-label="Toggle navigation"
          >
            <i className={`fa ${isNavOpen ? "fa-times" : "fa-bars"} fa-lg text-dark`} />
          </button>

          {/* Nav Items */}
          <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`} id="uniNavbarCollapse">
            <div className="navbar-nav mx-auto align-items-lg-center gap-lg-1 my-3 my-lg-0">
              <Link
                to="/"
                onClick={handleNavClick}
                className={`uni-nav-link ${isActive("/") ? "active" : ""}`}
              >
                <i className="fa fa-home d-lg-none me-2 text-warning" /> ទំព័រដើម
              </Link>

              <Link
                to="/about"
                onClick={handleNavClick}
                className={`uni-nav-link ${isActive("/about") ? "active" : ""}`}
              >
                <i className="fa fa-university d-lg-none me-2 text-warning" /> អំពីសាកលវិទ្យាល័យ
              </Link>

              <Link
                to="/service"
                onClick={handleNavClick}
                className={`uni-nav-link ${isActive("/service") ? "active" : ""}`}
              >
                <i className="fa fa-book-reader d-lg-none me-2 text-warning" /> កម្មវិធីសិក្សា & សេវាកម្ម
              </Link>

              <Link
                to="/contact"
                onClick={handleNavClick}
                className={`uni-nav-link ${isActive("/contact") ? "active" : ""}`}
              >
                <i className="fa fa-envelope d-lg-none me-2 text-warning" /> ទំនាក់ទំនង
              </Link>

              <Link
                to="/verify"
                onClick={handleNavClick}
                className={`uni-nav-link d-lg-none ${isActive("/verify") ? "active" : ""}`}
              >
                <i className="fa fa-qrcode me-2 text-warning" /> ផ្ទៀងផ្ទាត់សញ្ញាបត្រ
              </Link>
            </div>

            {/* Right Action: Student Portal Login */}
            <div className="d-flex align-items-center gap-2 mt-2 mt-lg-0">
              <Link
                to="/login"
                onClick={handleNavClick}
                className="uni-btn-login w-100 w-lg-auto justify-content-center"
              >
                <i className="fa fa-user-shield" />
                <span>ប្រព័ន្ធគ្រប់គ្រង (Portal)</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}