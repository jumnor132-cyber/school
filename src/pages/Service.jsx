import React from "react";

export default function Service() {
  const services = [
    {
      icon: "fas fa-graduation-cap",
      title: "កម្មវិធីសិក្សាអន្តរជាតិ",
      text: "ផ្តល់ជូននូវកម្មវិធីសិក្សាជាភាសាជាតិ និងអន្តរជាតិ ស្របតាមស្តង់ដារអប់រំកម្រិតខ្ពស់ មាន ១៣ មហាវិទ្យាល័យ និង ៤៥ ជំនាញ",
      color: "#2563eb",
      bg: "#eff6ff",
    },
    {
      icon: "fas fa-chalkboard-teacher",
      title: "សាស្ត្រាចារ្យមានបទពិសោធន៍",
      text: "បង្រៀនដោយលោកគ្រូ អ្នកគ្រូ និងសាស្ត្រាចារ្យដែលមានកម្រិតវប្បធម៌ខ្ពស់ ព្រមទាំងមានបទពិសោធន៍បង្រៀនជាច្រើនឆ្នាំ",
      color: "#7c3aed",
      bg: "#f5f3ff",
    },
    {
      icon: "fas fa-building",
      title: "សម្ភារសិក្សាទំនើប",
      text: "បំពាក់ដោយម៉ាស៊ីនត្រជាក់ បណ្ណាល័យធំទូលាយ បន្ទប់ពិសោធន៍កុំព្យូទ័រ និងសាលសន្និសីទទំនើបៗ",
      color: "#ea580c",
      bg: "#fff7ed",
    },
    {
      icon: "fas fa-award",
      title: "អាហារូបករណ៍ និងសីលធម៌",
      text: "មានការផ្តល់ជូនអាហារូបករណ៍ពិសេស និងការបណ្តុះបណ្តាលសិស្ស-និស្សិតឱ្យមានសីលធម៌ និងគុណធម៌ខ្ពស់ក្នុងសង្គម",
      color: "#0891b2",
      bg: "#ecfeff",
    },
  ];

 const testimonials = [
  {
        image: "/img/student1.jpeg",
    name: "ជា សុខា",
    major: "និស្សិតជំនាញ ព័ត៌មានវិទ្យា (IT)",
    text: "ការសិក្សានៅសាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ ផ្តល់នូវកម្មវិធីសិក្សាច្បាស់លាស់",
  },
  {
    image: "/img/student2.jpeg",
    name: "អ៊ឹម ចាន់ថឿន",
    major: "និស្សិតជំនាញ ភាសាអង់គ្លេសពាណិជ្ជកម្ម",
    text: "បរិយាកាសសិក្សានៅទីនេះល្អខ្លាំងណាស់",
  },
  {
    image: "/img/student3.jpeg",
    name: "លី ម៉េងហួរ",
    major: "អតីតនិស្សិត ជំនាញគ្រប់គ្រងធុរកិច្ច",
    text: "សាកលវិទ្យាល័យផ្តល់ទាំងទ្រឹស្តី និងជំនាញអនុវត្តជាក់ស្តែង",
  },
  {
    image: "/img/student4.jpeg",
    name: "ម៉េង ហុង",
    major: "អតីតនិស្សិត ជំនាញគ្រប់គ្រងធុរកិច្ច",
    text: "ការសិក្សានៅ BELTEI បានជួយបង្កើនចំណេះដឹង និងជំនាញរបស់ខ្ញុំ",
  },
];
  return (
    <>
      {/* ================= HEADER ================= */}
      <section
        className="container-fluid py-5"
        style={{
          background:
            "linear-gradient(120deg, #0f172a, #1e40af, #0891b2)",
        }}
      >
        <div className="container py-5 text-center">
          <span
            className="badge px-4 py-2 mb-3"
            style={{
              background: "#f59e0b",
              borderRadius: "50px",
            }}
          >
            BELTEI INTERNATIONAL UNIVERSITY
          </span>

          <h1 className="display-3 fw-bold text-white text-uppercase mb-3">
            Our Services
          </h1>

          <p className="text-white-50 fs-5 mb-0">
            ចំណេះដឹង • ជំនាញ • បទពិសោធន៍ • អនាគត
          </p>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="container-fluid py-5">
        <div className="container py-4">

          <div className="text-center mb-5">
            <span className="fw-bold text-primary">
              WHAT WE PROVIDE
            </span>

            <h1 className="display-6 fw-bold mt-2">
              សេវាកម្ម និងអត្ថប្រយោជន៍សម្រាប់និស្សិត
            </h1>

            <p className="text-secondary mx-auto" style={{ maxWidth: 700 }}>
              បរិយាកាសសិក្សាដែលផ្តល់ឱកាសឱ្យនិស្សិត
              អភិវឌ្ឍទាំងចំណេះដឹង ជំនាញ និងបទពិសោធន៍។
            </p>
          </div>

          <div className="row g-4">
            {services.map((item, index) => (
              <div className="col-md-6" key={index}>
                <div
                  className="h-100 p-4"
                  style={{
                    borderRadius: "25px",
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
                  }}
                >
                  <div className="d-flex">

                    <div
                      className="flex-shrink-0 d-flex align-items-center justify-content-center"
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: "20px",
                        background: item.bg,
                        color: item.color,
                        fontSize: 27,
                      }}
                    >
                      <i className={item.icon} />
                    </div>

                    <div className="ms-4">
                      <small
                        className="fw-bold"
                        style={{ color: item.color }}
                      >
                        0{index + 1} / SERVICE
                      </small>

                      <h4 className="fw-bold mt-2 mb-3">
                        {item.title}
                      </h4>

                      <p className="text-secondary lh-lg mb-0">
                        {item.text}
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= REGISTRATION NEW DESIGN ================= */}
      <section
        className="container-fluid py-5"
        style={{
          background:
            "linear-gradient(135deg, #eff6ff 0%, #f8fafc 50%, #ecfeff 100%)",
        }}
      >
        <div className="container py-5">

          <div className="row g-5 align-items-stretch">

            {/* LEFT INFORMATION */}
            <div className="col-lg-5">
              <div
                className="h-100 p-4 p-lg-5 text-white"
                style={{
                  borderRadius: "30px",
                  background:
                    "linear-gradient(145deg, #1d4ed8, #0891b2)",
                }}
              >

                <span className="badge bg-white text-primary px-3 py-2 mb-4">
                  JOIN US
                </span>

                <h1 className="display-6 fw-bold mb-4">
                  ចាប់ផ្តើមជំហានថ្មី
                  <br />
                  ជាមួយ BELTEI
                </h1>

                <p className="text-white-50 fs-5 lh-lg">
                  ជ្រើសរើសជំនាញដែលអ្នកស្រឡាញ់
                  និងចាប់ផ្តើមកសាងអនាគតរបស់អ្នក
                  ជាមួយបរិយាកាសសិក្សាប្រកបដោយគុណភាព។
                </p>

                <hr className="my-4 border-white opacity-50" />

                <div className="d-flex align-items-center mb-4">
                  <div
                    className="d-flex align-items-center justify-content-center bg-white text-primary"
                    style={{
                      width: 55,
                      height: 55,
                      borderRadius: "15px",
                    }}
                  >
                    <i className="bi bi-geo-alt fs-4" />
                  </div>

                  <div className="ms-3">
                    <small className="text-white-50">
                      LOCATION
                    </small>
                    <p className="mb-0">
                      #21, Street 360, Phnom Penh
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: 55,
                      height: 55,
                      borderRadius: "15px",
                      background: "#f59e0b",
                    }}
                  >
                    <i className="bi bi-clock fs-4 text-white" />
                  </div>

                  <div className="ms-3">
                    <small className="text-white-50">
                      OPENING HOURS
                    </small>
                    <p className="mb-0">
                      ៧:៣០ ព្រឹក - ៥:៣០ ល្ងាច
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* FORM */}
            <div className="col-lg-7">
              <div
                className="bg-white p-4 p-lg-5 h-100"
                style={{
                  borderRadius: "30px",
                  boxShadow: "0 15px 45px rgba(15,23,42,0.10)",
                }}
              >

                <div className="mb-4">
                  <span className="text-primary fw-bold">
                    ONLINE REGISTRATION
                  </span>

                  <h2 className="fw-bold mt-2">
                    ចុះឈ្មោះសិក្សា
                  </h2>

                  <p className="text-secondary">
                    សូមបំពេញព័ត៌មានខាងក្រោម
                    ដើម្បីទាក់ទងទៅកាន់សាកលវិទ្យាល័យ។
                  </p>
                </div>

                <div className="row g-3">

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      ឈ្មោះ
                    </label>

                    <input
                      type="text"
                      className="form-control form-control-lg bg-light border-0"
                      placeholder="បញ្ចូលឈ្មោះរបស់អ្នក"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Email
                    </label>

                    <input
                      type="email"
                      className="form-control form-control-lg bg-light border-0"
                      placeholder="example@gmail.com"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      លេខទូរស័ព្ទ
                    </label>

                    <input
                      type="text"
                      className="form-control form-control-lg bg-light border-0"
                      placeholder="012 345 678"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      ជ្រើសរើសជំនាញ
                    </label>

                    <select
                      className="form-select form-select-lg bg-light border-0"
                      defaultValue="it"
                    >
                      <option value="it">
                        ព័ត៌មានវិទ្យា
                      </option>
                      <option value="business">
                        គ្រប់គ្រងពាណិជ្ជកម្ម
                      </option>
                      <option value="economics">
                        សេដ្ឋកិច្ច
                      </option>
                      <option value="law">
                        ច្បាប់
                      </option>
                      <option value="engineering">
                        វិស្វកម្ម
                      </option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      សាររបស់អ្នក
                    </label>

                    <textarea
                      className="form-control bg-light border-0"
                      rows="4"
                      placeholder="សរសេរសាររបស់អ្នក..."
                    />
                  </div>

                  <div className="col-12">
                    <button
                      className="btn btn-primary btn-lg w-100 py-3 fw-bold"
                      style={{
                        borderRadius: "15px",
                      }}
                    >
                      ដាក់ពាក្យចុះឈ្មោះ
                      <i className="bi bi-arrow-right ms-2" />
                    </button>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= STUDENT EXPERIENCE ================= */}
      <section className="container-fluid py-5 bg-white">
        <div className="container py-5">

          <div className="text-center mb-5">
            <span className="text-primary fw-bold">
              STUDENT EXPERIENCE
            </span>

            <h1 className="display-6 fw-bold mt-2">
              និស្សិតនិយាយអ្វីខ្លះ?
            </h1>

            <p className="text-secondary">
              បទពិសោធន៍ និងមតិយោបល់ពីនិស្សិតរបស់យើង
            </p>
          </div>

          <div className="row g-4">

            {testimonials.map((student, index) => (
              <div className="col-md-6 col-lg-3" key={index}>

                <div
                  className="h-100 p-4 text-center"
                  style={{
                    borderRadius: "25px",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    transition: "0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-10px)";
                    e.currentTarget.style.boxShadow =
                      "0 15px 35px rgba(0,0,0,0.10)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "none";
                  }}
                >

                  <img
                    src={student.image}
                    alt={student.name}
                    className="rounded-circle mb-3"
                    style={{
                      width: 90,
                      height: 90,
                      objectFit: "cover",
                      border: "5px solid #dbeafe",
                    }}
                  />

                  <div className="text-warning mb-3">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                  </div>

                  <h5 className="fw-bold mb-1">
                    {student.name}
                  </h5>

                  <small className="text-primary">
                    {student.major}
                  </small>

                  <div
                    className="my-3 mx-auto"
                    style={{
                      width: 45,
                      height: 3,
                      background: "#2563eb",
                      borderRadius: 10,
                    }}
                  />

                  <p className="text-secondary lh-lg mb-0">
                    {student.text}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= BOTTOM CTA ================= */}
      <section
        className="container-fluid py-5"
        style={{
          background:
            "linear-gradient(135deg, #172554, #1d4ed8)",
        }}
      >
        <div className="container py-4 text-center">

          <span className="text-warning fw-bold">
            YOUR FUTURE STARTS HERE
          </span>

          <h2 className="display-6 fw-bold text-white mt-2 mb-3">
            ត្រៀមខ្លួនសម្រាប់អនាគតរបស់អ្នកហើយឬនៅ?
          </h2>

          <p className="text-white-50 mb-4">
            ចូលរួមជាមួយ BELTEI និងបង្កើនចំណេះដឹង
            ជំនាញ និងបទពិសោធន៍របស់អ្នក។
          </p>

          <button
            className="btn btn-warning btn-lg px-5 py-3 fw-bold"
            style={{
              borderRadius: "50px",
            }}
          >
            ចុះឈ្មោះឥឡូវនេះ
            <i className="bi bi-arrow-right ms-2" />
          </button>

        </div>
      </section>
    </>
  );
}
