import React from "react";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header>
      {/* Topbar Start */}
      <div
        className="container-fluid bg-info text-white d-none d-lg-flex wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-3">
          <div className="d-flex align-items-center">
            <Link to="/" className="text-decoration-none">
              <h2 className="text-white fw-bold m-0">BELTEI</h2>
            </Link>
            <div className="ms-auto d-flex align-items-center">
              <small className="ms-4">
                <i className="fa fa-map-marker-alt me-3" />
                #21, street 360, Phnom Penh, Cambodia
              </small>

              <small className="ms-4">
                <i className="fa fa-envelope me-3" />
                Beltei@gmail.com
              </small>

              <small className="ms-4">
                <i className="fa fa-phone-alt me-3" />
                +012 345 67890
              </small>

              {/* Social Media */}
              <div className="ms-3 d-flex">
                <a
                  className="btn btn-sm-square btn-light text-primary ms-2"
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f" />
                </a>

                <a
                  className="btn btn-sm-square btn-light text-primary ms-2"
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
                >
                  <i className="fab fa-twitter" />
                </a>

                <a
                  className="btn btn-sm-square btn-light text-primary ms-2"
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Topbar End */}

      {/* Navbar Start */}
      <div
        className="container-fluid bg-white sticky-top wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <nav className="navbar navbar-expand-lg bg-white navbar-light p-lg-0">
            {/* Mobile Logo */}
            <Link to="/" className="navbar-brand d-lg-none">
              <h1 className="fw-bold m-0">BELTEI</h1>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="navbar-toggler me-0"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            {/* Navigation */}
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav">
                <Link to="/" className="nav-item nav-link">
                  Home
                </Link>

                <Link to="/About" className="nav-item nav-link">
                  About
                </Link>

                <Link to="/service" className="nav-item nav-link">
                  Services
                </Link>

                <Link to="/contact" className="nav-item nav-link">
                  Contact
                </Link>

                <Link to="/login" className="nav-item nav-link">
                  Login
                </Link>
              </div>

              {/* Login Button */}
              <div className="ms-auto d-none d-lg-block">
                <Link to="/login" className="btn btn-info text-white py-2 px-3">
                  <i className="fa fa-sign-in-alt me-1" /> Login
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* Navbar End */}
    </header>
  );
}