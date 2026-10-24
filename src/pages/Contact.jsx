import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      alert("សូមអរគុណ! សាររបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ។ ក្រុមការងារយើងខ្ញុំនឹងទាក់ទងត្រឡប់ទៅវិញក្នុងពេលឆាប់ៗ។");
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
      setSubmitted(false);
    }, 400);
  }

  const contactCards = [
    {
      icon: "fa-map-marker-alt",
      title: "ទីតាំងទី១ (ទួលស្លែង)",
      details: "#21, ផ្លូវ 360, សង្កាត់បឹងកេងកង1, ខណ្ឌបឹងកេងកង, ភ្នំពេញ",
      color: "#087f8c",
      bg: "#e5f8fa",
    },
    {
      icon: "fa-university",
      title: "ទីតាំងទី២ (ចោមចៅ)",
      details: "ផ្លូវជាតិលេខ3, សង្កាត់ចោមចៅ, ខណ្ឌពោធិ៍សែនជ័យ, ភ្នំពេញ",
      color: "#f0a500",
      bg: "#fef7e6",
    },
    {
      icon: "fa-phone-alt",
      title: "លេខទូរស័ព្ទទំនាក់ទំនង",
      details: "+855 (0)12 345 67890\n+855 (0)23 999 999",
      color: "#2563eb",
      bg: "#eff6ff",
    },
    {
      icon: "fa-envelope",
      title: "អ៊ីមែលផ្លូវការ",
      details: "info@beltei.edu.kh\nBeltei@gmail.com",
      color: "#7c3aed",
      bg: "#f5f3ff",
    },
  ];

  return (
    <div style={{ background: "#f8fafc", color: "#17212b", minHeight: "100vh" }}>
      {/* ================= HERO HEADER ================= */}
      <section
        className="position-relative text-white py-5"
        style={{
          background: "linear-gradient(135deg, #061c2b 0%, #087f8c 100%)",
        }}
      >
        <div className="container py-4 text-center">
          <span
            className="badge rounded-pill px-3 py-2 mb-3 text-uppercase fw-semibold"
            style={{ background: "rgba(255, 255, 255, 0.15)", letterSpacing: "1px" }}
          >
            🎓 BELTEI International University
          </span>
          <h1 className="display-5 fw-bold mb-3">ទាក់ទងមកកាន់យើងខ្ញុំ</h1>
          <p className="lead text-white-50 mx-auto" style={{ maxWidth: "650px" }}>
            សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ រីករាយស្វាគមន៍រាល់ការសាកសួរព័ត៌មាន
            ការចុះឈ្មោះចូលរៀន និងការប្រឹក្សាយោបល់ផ្សេងៗ។
          </p>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0 mt-3">
              <li className="breadcrumb-item">
                <Link to="/" className="text-white text-decoration-none">
                  ទំព័រដើម
                </Link>
              </li>
              <li className="breadcrumb-item active text-info" aria-current="page">
                ទាក់ទងសាលា
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* ================= CONTACT CARDS ================= */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {contactCards.map((card, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <div
                  className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center transition-card"
                  style={{ background: "#ffffff" }}
                >
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                    style={{
                      width: "65px",
                      height: "65px",
                      background: card.bg,
                      color: card.color,
                      fontSize: "24px",
                    }}
                  >
                    <i className={`fas ${card.icon}`} />
                  </div>
                  <h5 className="fw-bold mb-2" style={{ color: "#1e293b", fontSize: "17px" }}>
                    {card.title}
                  </h5>
                  <p
                    className="text-muted small mb-0"
                    style={{ whiteSpace: "pre-line", lineHeight: "1.6" }}
                  >
                    {card.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FORM & MAP SECTION ================= */}
      <section className="pb-5">
        <div className="container">
          <div className="row g-4">
            {/* Contact Form */}
            <div className="col-lg-7">
              <div
                className="card border-0 shadow-sm rounded-4 p-4 p-md-5"
                style={{ background: "#ffffff" }}
              >
                <div className="mb-4">
                  <span className="text-info fw-bold text-uppercase small">
                    ផ្ញើសារមកកាន់យើងខ្ញុំ
                  </span>
                  <h2 className="fw-bold mt-1" style={{ color: "#061c2b" }}>
                    ផ្ញើសារសាកសួរព័ត៌មាន
                  </h2>
                  <p className="text-muted">
                    សូមបំពេញទម្រង់បែបបទខាងក្រោម ក្រុមការងារយើងខ្ញុំនឹងឆ្លើយតបយ៉ាងលឿនបំផុត។
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold text-dark small">
                        ឈ្មោះរបស់អ្នក <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control rounded-3 py-2 px-3 border-light-subtle"
                        placeholder="ឧ. សុខ វាសនា"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold text-dark small">
                        លេខទូរស័ព្ទ <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-control rounded-3 py-2 px-3 border-light-subtle"
                        placeholder="012 345 678"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold text-dark small">
                        អ៊ីមែល (Email)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control rounded-3 py-2 px-3 border-light-subtle"
                        placeholder="yourname@gmail.com"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold text-dark small">
                        ប្រធានបទ <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="form-control rounded-3 py-2 px-3 border-light-subtle"
                        placeholder="សាកសួរអាហារូបករណ៍ ឬ វគ្គសិក្សា"
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold text-dark small">
                        សារ ឬសំណួររបស់អ្នក <span className="text-danger">*</span>
                      </label>
                      <textarea
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className="form-control rounded-3 py-2 px-3 border-light-subtle"
                        placeholder="សូមសរសេរសារ ឬសំណួររបស់អ្នកនៅទីនេះ..."
                        required
                      />
                    </div>

                    <div className="col-12 mt-4">
                      <button
                        type="submit"
                        disabled={submitted}
                        className="btn btn-info text-white fw-bold px-4 py-2 rounded-pill shadow-sm"
                        style={{ minWidth: "160px" }}
                      >
                        {submitted ? (
                          <>
                            <i className="fa fa-spinner fa-spin me-2" /> កំពុងផ្ញើ...
                          </>
                        ) : (
                          <>
                            <i className="fa fa-paper-plane me-2" /> ផ្ញើសារឥឡូវនេះ
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* University Working Hours & Map */}
            <div className="col-lg-5">
              <div className="d-flex flex-column gap-4 h-100">
                {/* Working hours card */}
                <div
                  className="card border-0 shadow-sm rounded-4 p-4 text-white"
                  style={{ background: "linear-gradient(135deg, #087f8c 0%, #066874 100%)" }}
                >
                  <h4 className="fw-bold mb-3">
                    <i className="far fa-clock me-2" /> ម៉ោងបម្រើការងារ
                  </h4>
                  <p className="text-white-50 mb-3 small">
                    សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ បើកទទួលស្វាគមន៍រៀងរាល់ថ្ងៃ
                  </p>

                  <div className="d-flex justify-content-between border-bottom border-light border-opacity-25 py-2">
                    <span>ចន្ទ - សុក្រ (Mon - Fri)</span>
                    <strong className="text-warning">07:00 AM - 05:30 PM</strong>
                  </div>
                  <div className="d-flex justify-content-between border-bottom border-light border-opacity-25 py-2">
                    <span>សៅរ៍ (Saturday)</span>
                    <strong className="text-warning">07:00 AM - 05:30 PM</strong>
                  </div>
                  <div className="d-flex justify-content-between py-2">
                    <span>អាទិត្យ (Sunday)</span>
                    <strong className="text-warning">07:00 AM - 05:30 PM</strong>
                  </div>
                </div>

                {/* Map card */}
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden flex-grow-1">
                  <iframe
                    title="BELTEI Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909.013972230784!2d104.91890317584149!3d11.55086034442656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513e9a594ef3%3A0x7d9765f04b2a60bf!2sBELTEI%20International%20University%20(Campus%201%2C%20Tuol%20Sleng)!5e0!3m2!1sen!2skh!4v1700000000000!5m2!1sen!2skh"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: "260px" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
