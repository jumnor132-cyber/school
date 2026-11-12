import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Newsletter / Admission Inquiry Banner */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #071e3d 0%, #087f8c 100%)",
          color: "#ffffff",
        }}
      >
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <span className="badge bg-warning text-dark px-3 py-2 fw-bold mb-2">
                🎓 ADMISSION 2026–2027
              </span>
              <h2 className="fw-bold mb-2 text-white">
                ចុះឈ្មោះ និងទទួលព័ត៌មានអាហារូបករណ៍
              </h2>
              <p className="mb-0 text-white-50">
                ទទួលបានការប្រឹក្សាអំពីមុខជំនាញ អាហារូបករណ៍ ៣០% - ៥០% និងកាលបរិច្ឆេទចូលរៀនវគ្គថ្មីពី BELTEI។
              </p>
            </div>

            <div className="col-lg-5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("សូមអរគុណ! យើងខ្ញុំបានទទួលអ៊ីមែលរបស់អ្នករួចរាល់ហើយ។ ក្រុមការងារនឹងទាក់ទងមកលោកអ្នកក្នុងពេលឆាប់ៗ។");
                  e.target.reset();
                }}
                className="d-flex flex-column flex-sm-row gap-2"
              >
                <input
                  type="email"
                  required
                  className="form-control rounded-pill px-4 border-0 shadow-sm"
                  placeholder="បញ្ចូលអ៊ីមែល ឬលេខទូរស័ព្ទ..."
                  style={{ height: "50px", fontSize: "14px" }}
                />
                <button
                  type="submit"
                  className="btn btn-warning rounded-pill px-4 fw-bold shadow-sm text-nowrap d-inline-flex align-items-center gap-2"
                  style={{ height: "50px" }}
                >
                  <span>ចុះឈ្មោះ</span>
                  <i className="fa fa-paper-plane" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="uni-footer pt-5">
        <div className="container pb-5">
          <div className="row g-4 g-lg-5">
            {/* University Brand & About */}
            <div className="col-lg-4 col-md-6">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="uni-crest-icon">
                  <i className="fa fa-graduation-cap" />
                </div>
                <div>
                  <h4 className="fw-bold text-white mb-0" style={{ letterSpacing: "1px" }}>
                    BELTEI
                  </h4>
                  <small className="text-warning fw-semibold">
                    សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ
                  </small>
                </div>
              </div>

              <p className="text-white-50 mb-3" style={{ fontSize: "13.5px", lineHeight: "1.8" }}>
                សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ
                ជាគ្រឹះស្ថានឧត្តមសិក្សាឈានមុខគេ ដែលផ្តល់ការអប់រំកម្រិតខ្ពស់
                ស្របតាមស្តង់ដារជាតិ និងអន្តរជាតិ
                ដើម្បីបណ្តុះបណ្តាលធនធានមនុស្សសម្រាប់អនាគត។
              </p>

              <div className="p-3 rounded-3 mb-3" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <small className="text-warning fw-bold d-block mb-1">
                  បាវចនាសាកលវិទ្យាល័យ៖
                </small>
                <small className="text-white">
                  គុណភាព • ប្រសិទ្ធភាព • ឧត្តមភាព • សីលធម៌ • គុណធម៌
                </small>
              </div>

              {/* Social Media */}
              <div className="d-flex mt-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="uni-footer-social-btn"
                >
                  <i className="fab fa-facebook-f" />
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Telegram"
                  className="uni-footer-social-btn"
                >
                  <i className="fab fa-telegram-plane" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="uni-footer-social-btn"
                >
                  <i className="fab fa-youtube" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="uni-footer-social-btn"
                >
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </div>

            {/* Key Faculties */}
            <div className="col-lg-3 col-md-6">
              <h5>មហាវិទ្យាល័យទាំង១៣</h5>
              <ul className="list-unstyled d-flex flex-column gap-2 mb-0" style={{ fontSize: "13.5px" }}>
                <li>
                  <Link to="/service" className="text-white-50">
                    <i className="fa fa-angle-right text-warning me-2" />
                    ព័ត៌មានវិទ្យា និងវិទ្យាសាស្ត្រ (IT)
                  </Link>
                </li>
                <li>
                  <Link to="/service" className="text-white-50">
                    <i className="fa fa-angle-right text-warning me-2" />
                    គ្រប់គ្រងពាណិជ្ជកម្ម (Business)
                  </Link>
                </li>
                <li>
                  <Link to="/service" className="text-white-50">
                    <i className="fa fa-angle-right text-warning me-2" />
                    ហិរញ្ញវត្ថុ និងធនាគារ (Banking)
                  </Link>
                </li>
                <li>
                  <Link to="/service" className="text-white-50">
                    <i className="fa fa-angle-right text-warning me-2" />
                    ច្បាប់ និងវិទ្យាសាស្ត្រនយោបាយ
                  </Link>
                </li>
                <li>
                  <Link to="/service" className="text-white-50">
                    <i className="fa fa-angle-right text-warning me-2" />
                    ភាសាបរទេស (English / Chinese)
                  </Link>
                </li>
                <li>
                  <Link to="/service" className="text-white-50">
                    <i className="fa fa-angle-right text-warning me-2" />
                    វិស្វកម្មសំណង់ស៊ីវិល
                  </Link>
                </li>
                <li>
                  <Link to="/service" className="text-white-50">
                    <i className="fa fa-angle-right text-warning me-2" />
                    ទេសចរណ៍ និងបដិសណ្ឋារកិច្ច
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6">
              <h5>តំណភ្ជាប់រហ័ស</h5>
              <ul className="list-unstyled d-flex flex-column gap-2 mb-0" style={{ fontSize: "13.5px" }}>
                <li>
                  <Link to="/" className="text-white-50">
                    <i className="fa fa-chevron-right text-warning me-2" />
                    ទំព័រដើម (Home)
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-white-50">
                    <i className="fa fa-chevron-right text-warning me-2" />
                    អំពីសាកលវិទ្យាល័យ
                  </Link>
                </li>
                <li>
                  <Link to="/service" className="text-white-50">
                    <i className="fa fa-chevron-right text-warning me-2" />
                    កម្មវិធីសិក្សា
                  </Link>
                </li>
                <li>
                  <Link to="/verify" className="text-white-50">
                    <i className="fa fa-chevron-right text-warning me-2" />
                    ផ្ទៀងផ្ទាត់សញ្ញាបត្រ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-white-50">
                    <i className="fa fa-chevron-right text-warning me-2" />
                    ទំនាក់ទំនងសាលា
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-white-50">
                    <i className="fa fa-chevron-right text-warning me-2" />
                    ប្រព័ន្ធគ្រប់គ្រងនិស្សិត
                  </Link>
                </li>
              </ul>
            </div>

            {/* Campus & Contact Info */}
            <div className="col-lg-3 col-md-6">
              <h5>ទីតាំង និងទំនាក់ទំនង</h5>
              <div className="d-flex flex-column gap-3" style={{ fontSize: "13.5px" }}>
                <div className="d-flex align-items-start gap-2">
                  <i className="fa fa-map-marker-alt text-warning mt-1" />
                  <div>
                    <strong className="text-white d-block">ទីតាំងទី១ (ទួលស្លែង)៖</strong>
                    <span className="text-white-50">#21, ផ្លូវ 360, សង្កាត់បឹងកេងកង1, ភ្នំពេញ</span>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-2">
                  <i className="fa fa-university text-warning mt-1" />
                  <div>
                    <strong className="text-white d-block">ទីតាំងទី២ (ចោមចៅ)៖</strong>
                    <span className="text-white-50">ផ្លូវជាតិលេខ3, សង្កាត់ចោមចៅ, ភ្នំពេញ</span>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <i className="fa fa-phone-alt text-warning" />
                  <span className="text-white">Hotline: 023 999 999 / 012 345 678</span>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <i className="fa fa-envelope text-warning" />
                  <span className="text-white">info@beltei.edu.kh</span>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <i className="fa fa-clock text-warning" />
                  <span className="text-white-50">ចន្ទ - អាទិត្យ៖ 07:00 AM - 05:30 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-footer copyright */}
        <div className="uni-sub-footer">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
                <small>
                  © {new Date().getFullYear()} សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ (BELTEI International University).
                  រក្សាសិទ្ធិគ្រប់យ៉ាង។
                </small>
              </div>

              <div className="col-md-6 text-center text-md-end">
                <small className="text-warning">
                  គុណភាព • ប្រសិទ្ធភាព • ឧត្តមភាព • សីលធម៌ • គុណធម៌
                </small>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Back To Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className="btn btn-warning rounded-circle position-fixed shadow-lg d-flex align-items-center justify-content-center"
        aria-label="Back to top"
        style={{
          width: "48px",
          height: "48px",
          right: "22px",
          bottom: "22px",
          zIndex: 1050,
          border: "2px solid #ffffff",
        }}
      >
        <i className="fa fa-arrow-up text-dark" />
      </button>
    </>
  );
}
