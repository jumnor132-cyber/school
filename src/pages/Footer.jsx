import React from "react";

export default function Footer() {
return (
<>
{/* Newsletter */}
<section
className="py-5"
style={{
background: "#f5fafb",
}}
>
<div className="container">
<div
className="p-4 p-lg-5 rounded-4"
style={{
background: "linear-gradient(135deg, #087f8c, #0dcaf0)",
}}
>
<div className="row align-items-center g-4">
<div className="col-lg-7 text-white">
<h2 className="fw-bold mb-2">
ទទួលព័ត៌មានថ្មីៗ
</h2>

            <p className="mb-0 text-white-50">
              ទទួលបានព័ត៌មានអំពីអាហារូបករណ៍
              វគ្គសិក្សា និងព្រឹត្តិការណ៍ថ្មីៗពី BELTEI។
            </p>
          </div>

          <div className="col-lg-5">
            <div className="d-flex gap-2">
              <input
                type="email"
                className="form-control rounded-pill border-0"
                placeholder="អ៊ីមែលរបស់អ្នក"
              />

              <button
                type="button"
                className="btn btn-light text-info rounded-pill px-4 fw-bold"
              >
                ចុះឈ្មោះ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* Footer */}
  <footer
    className="text-white pt-5"
    style={{
      background: "#003f4a",
    }}
  >
    <div className="container pb-5">
      <div className="row g-5">

        {/* About */}
        <div className="col-lg-4 col-md-6">
          <h3 className="fw-bold mb-3">
            BELTEI
          </h3>

          <p className="text-white-50">
            សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ
            ផ្តល់ការអប់រំប្រកបដោយគុណភាព
            ដើម្បីអភិវឌ្ឍចំណេះដឹង ជំនាញ
            និងសីលធម៌សម្រាប់អនាគត។
          </p>

          <div className="d-flex gap-2 mt-4">
            <a
              href="#"
              className="btn btn-light rounded-circle"
              style={{
                width: "42px",
                height: "42px",
              }}
            >
              <i className="fab fa-facebook-f text-info" />
            </a>

            <a
              href="#"
              className="btn btn-light rounded-circle"
              style={{
                width: "42px",
                height: "42px",
              }}
            >
              <i className="fab fa-youtube text-info" />
            </a>

            <a
              href="#"
              className="btn btn-light rounded-circle"
              style={{
                width: "42px",
                height: "42px",
              }}
            >
              <i className="fab fa-telegram text-info" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="col-lg-2 col-md-6">
          <h5 className="fw-bold mb-4">
            តំណភ្ជាប់រហ័ស
          </h5>

          <div className="d-flex flex-column gap-3">
            <a
              href="/"
              className="text-white-50 text-decoration-none"
            >
              ទំព័រដើម
            </a>

            <a
              href="#about"
              className="text-white-50 text-decoration-none"
            >
              អំពីសាលា
            </a>

            <a
              href="#programs"
              className="text-white-50 text-decoration-none"
            >
              ជំនាញសិក្សា
            </a>

            <a
              href="/contact"
              className="text-white-50 text-decoration-none"
            >
              ទាក់ទងសាលា
            </a>

            <a
              href="/login"
              className="text-white-50 text-decoration-none"
            >
              ចូលប្រព័ន្ធ (Login)
            </a>
          </div>
        </div>

        {/* Contact */}
        <div className="col-lg-3 col-md-6">
          <h5 className="fw-bold mb-4">
            ទាក់ទងសាលា
          </h5>

          <p className="text-white-50">
            <i className="fa fa-map-marker-alt text-info me-3" />
            #21, Street 360, Phnom Penh, Cambodia
          </p>

          <p className="text-white-50">
            <i className="fa fa-phone text-info me-3" />
            +012 345 67890
          </p>

          <p className="text-white-50">
            <i className="fa fa-envelope text-info me-3" />
            info@beltei.edu.kh
          </p>
        </div>

        {/* Working Hours */}
        <div className="col-lg-3 col-md-6">
          <h5 className="fw-bold mb-4">
            ម៉ោងធ្វើការ
          </h5>

          <div className="text-white-50">
            <p className="mb-2">
              <strong className="text-white">
                ចន្ទ - សុក្រ
              </strong>
              <br />
              ០៧:០០ ព្រឹក - ០៥:៣០ ល្ងាច
            </p>

            <p className="mb-2">
              <strong className="text-white">
                សៅរ៍
              </strong>
              <br />
              ០៩:០០ ព្រឹក - ១២:០០ ល្ងាច
            </p>

            <p className="mb-0">
              <strong className="text-white">
                អាទិត្យ
              </strong>
              <br />
              ០៧:០០ ព្រឹក - ០៥:៣០ ល្ងាច
            </p>
          </div>
        </div>

      </div>
    </div>

    {/* Copyright */}
    <div
      className="py-3"
      style={{
        background: "#002f38",
      }}
    >
      <div className="container">
        <div className="row align-items-center">

          <div className="col-md-6 text-center text-md-start">
            <small className="text-white-50">
              © 2026 BELTEI International University
            </small>
          </div>

          <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
            <small className="text-white-50">
              គុណភាព • ប្រសិទ្ធភាព • ឧត្តមភាព • សីលធម៌ • គុណធម៌
            </small>
          </div>

        </div>
      </div>
    </div>
  </footer>

  {/* Back To Top */}
  <a
    href="#"
    className="btn btn-info rounded-circle position-fixed"
    style={{
      width: "50px",
      height: "50px",
      right: "20px",
      bottom: "20px",
      zIndex: 999,
    }}
  >
    <i className="fa fa-arrow-up text-white" />
  </a>
</>

);
}
