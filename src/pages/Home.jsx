import React from "react";

export default function Home() {
  const image = (filename) => `${process.env.PUBLIC_URL}/img/${filename}`;

  const programs = [
    {
      icon: "fa-laptop-code",
      title: "ព័ត៌មានវិទ្យា",
      en: "Information Technology",
      color: "#18a6b8",
    },

    {
      icon: "fa-chart-line",
      title: "គ្រប់គ្រងពាណិជ្ជកម្ម",
      en: "Business Administration",
      color: "#f0a500",
    },
    {
      icon: "fa-language",
      title: "ភាសាអង់គ្លេស",
      en: "English",
      color: "#7357d9",
    },
    {
      icon: "fa-calculator",
      title: "គណនេយ្យ",
      en: "Accounting",
      color: "#e85d75",
    },
  ];

  const stats = [
    { number: "20+", text: "ឆ្នាំបទពិសោធន៍" },
    { number: "13+", text: "មហាវិទ្យាល័យ" },
    { number: "45+", text: "ជំនាញសិក្សា" },
    { number: "10K+", text: "និស្សិត" },
  ];

  return (
    <div
      style={{
        overflow: "hidden",
        background: "#f8fafc",
        color: "#17212b",
      }}
    >
      {/* ================= HERO ================= */}
      <section
        className="position-relative"
        style={{
          minHeight: "760px",
          background: "#061c2b",
        }}
      >
        {/* Background image */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: `linear-gradient(90deg, rgba(6,28,43,.98) 0%, rgba(6,28,43,.88) 45%, rgba(6,28,43,.25) 100%), url('${image(
              "BIT3.jpg"
            )}') center/cover`,
          }}
        />

        {/* Decorative circles */}
        <div
          className="position-absolute rounded-circle"
          style={{
            width: "420px",
            height: "420px",
            right: "-180px",
            top: "-130px",
            border: "1px solid rgba(255,255,255,.12)",
          }}
        />

        <div
          className="position-absolute rounded-circle"
          style={{
            width: "600px",
            height: "600px",
            right: "-270px",
            top: "-220px",
            border: "1px solid rgba(255,255,255,.08)",
          }}
        />

        <div className="container position-relative">
          <div
            className="row align-items-center"
            style={{ minHeight: "760px" }}
          >
            <div className="col-lg-7 text-white">
              <div
                className="d-inline-flex align-items-center gap-2 mb-4 px-3 py-2 rounded-pill"
                style={{
                  background: "rgba(24,166,184,.15)",
                  border: "1px solid rgba(24,166,184,.4)",
                }}
              >
                <span
                  className="rounded-circle"
                  style={{
                    width: "8px",
                    height: "8px",
                    background: "#18d1e5",
                  }}
                />

                <span
                  className="small fw-semibold"
                  style={{ letterSpacing: "1px" }}
                >
                  BELTEI INTERNATIONAL UNIVERSITY
                </span>
              </div>

              <h1
                className="fw-bold mb-4"
                style={{
                  fontSize: "clamp(45px, 7vw, 82px)",
                  lineHeight: "1.08",
                }}
              >
                អនាគតរបស់អ្នក
                <br />
                <span style={{ color: "#18d1e5" }}>
                  ចាប់ផ្តើមថ្ងៃនេះ
                </span>
              </h1>

              <p
                className="text-white-50 mb-5"
                style={{
                  maxWidth: "620px",
                  fontSize: "18px",
                  lineHeight: "1.9",
                }}
              >
                បង្កើតចំណេះដឹង បង្កើនសមត្ថភាព
                និងត្រៀមខ្លួនសម្រាប់ទីផ្សារការងារ
                ជាមួយការអប់រំប្រកបដោយគុណភាព
                នៅសាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ។
              </p>

              <div className="d-flex flex-wrap gap-3">
                <a
                  href="#programs"
                  className="btn btn-lg rounded-pill px-5 fw-bold text-white"
                  style={{
                    background: "#18a6b8",
                    border: "none",
                  }}
                >
                  ចាប់ផ្តើមសិក្សា
                  <i className="fa fa-arrow-right ms-2" />
                </a>

                <a
                  href="#about"
                  className="btn btn-lg rounded-pill px-5 text-white"
                  style={{
                    border: "1px solid rgba(255,255,255,.4)",
                    background: "rgba(255,255,255,.05)",
                  }}
                >
                  អំពីសាកលវិទ្យាល័យ
                </a>
              </div>
            </div>

            {/* HERO CARD */}
            <div className="col-lg-5 mt-5 mt-lg-0">
              <div
                className="position-relative mx-auto"
                style={{ maxWidth: "440px" }}
              >
                <div
                  className="position-absolute"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "2px solid #18a6b8",
                    borderRadius: "35px",
                    transform: "rotate(-7deg)",
                    opacity: ".5",
                  }}
                />

                <div
                  className="position-relative p-2 rounded-5 shadow-lg"
                  style={{
                    background: "#fff",
                    transform: "rotate(3deg)",
                  }}
                >
                  <img
                    src={image("BIT4.jpeg")}
                    alt="BELTEI University"
                    className="img-fluid rounded-5"
                  />
                </div>

                <div
                  className="position-absolute bg-white rounded-4 shadow-lg p-3"
                  style={{
                    left: "-35px",
                    bottom: "20px",
                    transform: "rotate(-3deg)",
                  }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center text-white"
                      style={{
                        width: "55px",
                        height: "55px",
                        background: "#18a6b8",
                      }}
                    >
                      <i className="fa fa-graduation-cap fa-lg" />
                    </div>

                    <div>
                      <small className="text-secondary">
                        Academic Year
                      </small>

                      <h5 className="fw-bold mb-0">
                        2026–2027
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section
        style={{
          marginTop: "-1px",
          background: "#ffffff",
        }}
      >
        <div className="container">
          <div
            className="row g-0 shadow-lg rounded-4 overflow-hidden position-relative"
            style={{
              marginTop: "-55px",
              background: "#fff",
            }}
          >
            {stats.map((item, index) => (
              <div
                className="col-6 col-lg-3"
                key={index}
              >
                <div
                  className="text-center p-4"
                  style={{
                    borderRight:
                      index !== 3
                        ? "1px solid #e8eef1"
                        : "none",
                  }}
                >
                  <h2
                    className="fw-bold mb-1"
                    style={{ color: "#087f8c" }}
                  >
                    {item.number}
                  </h2>

                  <p className="text-secondary mb-0">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        id="about"
        className="py-5"
        style={{ background: "#fff" }}
      >
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="position-relative">
                <img
                  src={image("BIT7-c.jpg")}
                  alt="BELTEI Campus"
                  className="img-fluid rounded-5 shadow-lg"
                />

                <div
                  className="position-absolute rounded-4 p-4 text-white shadow-lg"
                  style={{
                    right: "-20px",
                    bottom: "-25px",
                    background: "#061c2b",
                    maxWidth: "220px",
                  }}
                >
                  <i className="fa fa-university fa-2x mb-3" />

                  <h5 className="fw-bold">
                    ការអប់រំ
                  </h5>

                  <p className="small text-white-50 mb-0">
                    ចំណេះដឹងសម្រាប់ជីវិត និងអាជីព
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <span
                className="fw-bold"
                style={{
                  color: "#18a6b8",
                  letterSpacing: "2px",
                }}
              >
                WHO WE ARE
              </span>

              <h2
                className="fw-bold mt-3 mb-4"
                style={{
                  fontSize: "clamp(35px, 5vw, 55px)",
                  lineHeight: "1.2",
                }}
              >
                រៀនថ្ងៃនេះ
                <br />
                <span style={{ color: "#18a6b8" }}>
                  ដើម្បីជោគជ័យថ្ងៃស្អែក
                </span>
              </h2>

              <p
                className="text-secondary"
                style={{
                  lineHeight: "2",
                  fontSize: "17px",
                }}
              >
                សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ
                ផ្តល់បរិយាកាសសិក្សាដែលល្អ
                ដោយផ្តោតលើចំណេះដឹង ជំនាញ
                បច្ចេកវិទ្យា និងការអភិវឌ្ឍសមត្ថភាព
                របស់និស្សិត។
              </p>

              <div className="row mt-4 g-3">
                <div className="col-6">
                  <div className="d-flex gap-3">
                    <i
                      className="fa fa-check-circle fa-lg mt-1"
                      style={{ color: "#18a6b8" }}
                    />

                    <span className="fw-semibold">
                      កម្មវិធីសិក្សាទំនើប
                    </span>
                  </div>
                </div>

                <div className="col-6">
                  <div className="d-flex gap-3">
                    <i
                      className="fa fa-check-circle fa-lg mt-1"
                      style={{ color: "#18a6b8" }}
                    />

                    <span className="fw-semibold">
                      សាស្ត្រាចារ្យជំនាញ
                    </span>
                  </div>
                </div>

                <div className="col-6">
                  <div className="d-flex gap-3">
                    <i
                      className="fa fa-check-circle fa-lg mt-1"
                      style={{ color: "#18a6b8" }}
                    />

                    <span className="fw-semibold">
                      បរិក្ខារទំនើប
                    </span>
                  </div>
                </div>

                <div className="col-6">
                  <div className="d-flex gap-3">
                    <i
                      className="fa fa-check-circle fa-lg mt-1"
                      style={{ color: "#18a6b8" }}
                    />

                    <span className="fw-semibold">
                      បទពិសោធន៍ជាក់ស្តែង
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROGRAMS ================= */}
      <section
        id="programs"
        className="py-5"
        style={{ background: "#f3f8fa" }}
      >
        <div className="container py-5">
          <div className="row align-items-end mb-5">
            <div className="col-lg-8">
              <span
                className="fw-bold"
                style={{
                  color: "#18a6b8",
                  letterSpacing: "2px",
                }}
              >
                STUDY PROGRAMS
              </span>

              <h2 className="display-5 fw-bold mt-2 mb-0">
                ជ្រើសរើសជំនាញ
                <br />
                <span style={{ color: "#18a6b8" }}>
                  ដែលសាកសមនឹងអ្នក
                </span>
              </h2>
            </div>

            <div className="col-lg-4 mt-4 mt-lg-0">
              <p
                className="text-secondary mb-0"
                style={{ lineHeight: "1.8" }}
              >
                ស្វែងរកជំនាញដែលអាចជួយអ្នក
                បង្កើតអនាគត និងអាជីពដែលអ្នកចង់បាន។
              </p>
            </div>
          </div>

          <div className="row g-4">
            {programs.map((program, index) => (
              <div
                className="col-md-6 col-lg-3"
                key={index}
              >
                <div
                  className="bg-white rounded-5 p-4 h-100 shadow-sm position-relative overflow-hidden"
                  style={{
                    minHeight: "285px",
                    borderBottom: `5px solid ${program.color}`,
                    transition: "all .3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-12px)";
                    e.currentTarget.style.boxShadow =
                      "0 25px 50px rgba(0,0,0,.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <div
                    className="rounded-4 d-flex align-items-center justify-content-center mb-5"
                    style={{
                      width: "65px",
                      height: "65px",
                      color: "#fff",
                      background: program.color,
                    }}
                  >
                    <i className={`fa ${program.icon} fa-lg`} />
                  </div>

                  <span className="small text-secondary">
                    PROGRAM 0{index + 1}
                  </span>

                  <h5 className="fw-bold mt-2">
                    {program.title}
                  </h5>

                  <p className="small text-secondary">
                    {program.en}
                  </p>

                  <div
                    className="position-absolute"
                    style={{
                      right: "25px",
                      bottom: "25px",
                      color: program.color,
                    }}
                  >
                    <i className="fa fa-arrow-right" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section className="py-5 bg-white">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <span
                className="fw-bold"
                style={{
                  color: "#18a6b8",
                  letterSpacing: "2px",
                }}
              >
                STUDENT EXPERIENCE
              </span>

              <h2 className="display-5 fw-bold mt-3 mb-4">
                មិនមែនមានតែ
                <br />
                <span style={{ color: "#18a6b8" }}>
                  ការរៀនក្នុងថ្នាក់
                </span>
              </h2>

              <p
                className="text-secondary"
                style={{ lineHeight: "1.9" }}
              >
                និស្សិតអាចចូលរួមសកម្មភាព
                ទស្សនកិច្ចសិក្សា ការងារជាក្រុម
                និងបទពិសោធន៍ក្រៅថ្នាក់
                ដើម្បីអភិវឌ្ឍជំនាញបន្ថែម។
              </p>

              <div className="mt-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white"
                    style={{
                      width: "42px",
                      height: "42px",
                      background: "#18a6b8",
                    }}
                  >
                    <i className="fa fa-users" />
                  </div>

                  <span className="fw-semibold">
                    សកម្មភាពជាក្រុម
                  </span>
                </div>

                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white"
                    style={{
                      width: "42px",
                      height: "42px",
                      background: "#f0a500",
                    }}
                  >
                    <i className="fa fa-map-marked-alt" />
                  </div>

                  <span className="fw-semibold">
                    ទស្សនកិច្ចសិក្សា
                  </span>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white"
                    style={{
                      width: "42px",
                      height: "42px",
                      background: "#7357d9",
                    }}
                  >
                    <i className="fa fa-lightbulb" />
                  </div>

                  <span className="fw-semibold">
                    បទពិសោធន៍ថ្មីៗ
                  </span>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="row g-3">
                <div className="col-7">
                  <img
                    src={image("BIT9-d.jpg")}
                    alt="Student Activity"
                    className="img-fluid rounded-5 shadow-sm w-100"
                    style={{
                      height: "330px",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="col-5">
                  <img
                    src={image("BIT10-4.jpg")}
                    alt="Student Activity"
                    className="img-fluid rounded-5 shadow-sm w-100"
                    style={{
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />

                  <div
                    className="rounded-5 mt-3 p-4 text-white"
                    style={{
                      background: "#061c2b",
                    }}
                  >
                    <i className="fa fa-quote-left fa-2x mb-3" />

                    <h5 className="fw-bold">
                      Learn.
                      <br />
                      Grow.
                      <br />
                      Lead.
                    </h5>
                  </div>
                </div>

                <div className="col-5">
                  <img
                    src={image("BIT11-7.jpg")}
                    alt="Student Activity"
                    className="img-fluid rounded-5 shadow-sm w-100"
                    style={{
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="col-7">
                  <img
                    src={image("BTI12-d.jpg")}
                    alt="Student Activity"
                    className="img-fluid rounded-5 shadow-sm w-100"
                    style={{
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section
        className="py-5"
        style={{
          background: "#061c2b",
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-8 text-white">
              <span
                className="small fw-bold"
                style={{
                  color: "#18d1e5",
                  letterSpacing: "2px",
                }}
              >
                YOUR FUTURE STARTS HERE
              </span>

              <h2 className="display-5 fw-bold mt-3 mb-3">
                តើអ្នកត្រៀមរួចរាល់
                <br />
                សម្រាប់ជំហានបន្ទាប់ហើយឬនៅ?
              </h2>

              <p className="text-white-50 mb-0">
                ចាប់ផ្តើមដំណើរសិក្សារបស់អ្នក
                ជាមួយ BELTEI International University។
              </p>
            </div>

            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
              <button
                className="btn btn-lg rounded-pill px-5 fw-bold"
                style={{
                  background: "#18d1e5",
                  color: "#061c2b",
                  border: "none",
                }}
              >
                ចុះឈ្មោះចូលរៀន
                <i className="fa fa-arrow-right ms-2" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}