import React from "react";

export default function About() {
  const image = (filename) =>
    `${process.env.PUBLIC_URL}/img/${filename}`;

  const features = [
    {
      icon: "🎓",
      title: "កម្មវិធីសិក្សា",
      text: "មានកម្មវិធីសិក្សាជាតិ និងអន្តរជាតិ សម្រាប់បំពេញតម្រូវការរបស់និស្សិត។",
    },
    {
      icon: "👨‍🏫",
      title: "សាស្ត្រាចារ្យមានបទពិសោធន៍",
      text: "បង្រៀនដោយលោកគ្រូ អ្នកគ្រូ និងសាស្ត្រាចារ្យដែលមានចំណេះដឹង និងបទពិសោធន៍។",
    },
    {
      icon: "💻",
      title: "បរិក្ខារទំនើប",
      text: "មានបន្ទប់រៀន បន្ទប់កុំព្យូទ័រ បណ្ណាល័យ និងសម្ភារសិក្សាទំនើបៗ។",
    },
    {
      icon: "🏆",
      title: "អាហារូបករណ៍",
      text: "មានឱកាសទទួលបានអាហារូបករណ៍ និងការលើកទឹកចិត្តសម្រាប់និស្សិត។",
    },
  ];

  const campuses = [
    {
      image: image("BIU1.png"),
      title: "ទីតាំងទី១ - ទួលស្លែង",
      location: "ខណ្ឌបឹងកេងកង រាជធានីភ្នំពេញ",
    },
    {
      image: image("BIU2.png"),
      title: "ទីតាំងទី២ - ចោមចៅ",
      location: "ផ្លូវជាតិលេខ៣ ខណ្ឌពោធិ៍សែនជ័យ",
    },
    {
      image: image("BIU3.png"),
      title: "គម្រោងទី៣ - ទួលពង្រ",
      location: "គម្រោងអគារសិក្សាថ្មី និងទំនើប",
    },
  ];

  return (
    <div className="about-page">
      {/* ================= HERO ================= */}
      <section
        className="py-5 text-white"
        style={{
          background:
            "linear-gradient(135deg, #1b4332, #2d6a4f, #40916c)",
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span
                className="badge px-3 py-2 mb-3"
                style={{
                  background: "#d8f3dc",
                  color: "#1b4332",
                  borderRadius: "4px",
                }}
              >
                ABOUT OUR UNIVERSITY
              </span>

              <h1 className="display-3 fw-bold mb-4">
                BELTEI
                <br />
                <span style={{ color: "#ffd166" }}>
                  International University
                </span>
              </h1>

              <p className="lead mb-4 opacity-75">
                សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ
                ជាគ្រឹះស្ថានឧត្តមសិក្សាឯកជនមួយ
                ដែលផ្តល់ការអប់រំប្រកបដោយគុណភាព
                និងស្របតាមស្តង់ដារអន្តរជាតិ។
              </p>

              <button
                className="btn btn-lg px-4"
                style={{
                  background: "#ffd166",
                  color: "#1b4332",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "600",
                }}
              >
                ស្វែងយល់បន្ថែម
              </button>
            </div>

            <div className="col-lg-5">
              <div
                className="p-3 shadow-lg"
                style={{
                  background: "#ffffff",
                  borderRadius: "6px",
                }}
              >
                <img
                  src={image("BIU1.png")}
                  alt="BELTEI International University"
                  className="img-fluid w-100"
                  style={{
                    height: "360px",
                    objectFit: "cover",
                    borderRadius: "3px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        className="py-5"
        style={{
          background: "#f8faf9",
        }}
      >
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <div className="position-relative">
                <img
                  src={image("bb1.png")}
                  alt="BELTEI Group Headquarters"
                  className="img-fluid shadow rounded-3"
                />

                <div
                  className="position-absolute text-white p-4 shadow"
                  style={{
                    right: "-15px",
                    bottom: "-15px",
                    background: "#2d6a4f",
                    borderRadius: "6px",
                    borderBottom: "5px solid #ffd166",
                  }}
                >
                  <h2 className="fw-bold mb-0">2005</h2>
                  <small>បានចាប់ផ្តើម</small>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <span
                className="fw-bold"
                style={{ color: "#2d6a4f" }}
              >
                WHO WE ARE
              </span>

              <h2 className="display-6 fw-bold mt-2 mb-4">
                អំពីសាកលវិទ្យាល័យ
              </h2>

              <p
                className="text-secondary"
                style={{ lineHeight: "1.9" }}
              >
                សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ
                បានចាប់បដិសន្ធិឡើងនៅថ្ងៃទី ៤ ខែសីហា ឆ្នាំ ២០០៥
                ដោយផ្តើមចេញពីវិទ្យាស្ថាន ប៊ែលធី អន្តរជាតិ
                និងបានអភិវឌ្ឍជាបន្តបន្ទាប់ទៅជាសាកលវិទ្យាល័យ។
              </p>

              <p
                className="text-secondary"
                style={{ lineHeight: "1.9" }}
              >
                បច្ចុប្បន្ន សាកលវិទ្យាល័យមានទីតាំងសិក្សាជាច្រើន
                និងផ្តល់ជូនកម្មវិធីសិក្សាជាភាសាជាតិ
                និងកម្មវិធីសិក្សាអន្តរជាតិ
                ដើម្បីផ្តល់ឱកាសដល់សិស្ស-និស្សិតកម្ពុជាទទួលបាន
                ចំណេះដឹង និងជំនាញសម្រាប់អនាគត។
              </p>

              <div className="row mt-4 g-3">
                <div className="col-6">
                  <div
                    className="p-3"
                    style={{
                      background: "#ffffff",
                      borderLeft: "4px solid #2d6a4f",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
                    }}
                  >
                    <h3
                      className="fw-bold mb-1"
                      style={{ color: "#2d6a4f" }}
                    >
                      13+
                    </h3>
                    <p className="text-secondary mb-0">
                      មហាវិទ្យាល័យ
                    </p>
                  </div>
                </div>

                <div className="col-6">
                  <div
                    className="p-3"
                    style={{
                      background: "#ffffff",
                      borderLeft: "4px solid #ffd166",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
                    }}
                  >
                    <h3
                      className="fw-bold mb-1"
                      style={{ color: "#2d6a4f" }}
                    >
                      45+
                    </h3>
                    <p className="text-secondary mb-0">
                      ជំនាញសិក្សា
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <span
              className="fw-bold"
              style={{ color: "#2d6a4f" }}
            >
              WHY CHOOSE US
            </span>

            <h2 className="display-6 fw-bold mt-2">
              ហេតុអ្វីជ្រើសរើស BELTEI?
            </h2>
          </div>

          <div className="row g-4">
            {features.map((item, index) => (
              <div
                className="col-md-6 col-lg-3"
                key={index}
              >
                <div
                  className="h-100 p-4 text-center"
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-8px)";
                    e.currentTarget.style.borderColor =
                      "#2d6a4f";
                    e.currentTarget.style.boxShadow =
                      "0 12px 30px rgba(45,106,79,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";
                    e.currentTarget.style.borderColor =
                      "#e5e7eb";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    className="d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: "68px",
                      height: "68px",
                      background: "#d8f3dc",
                      borderRadius: "50%",
                      fontSize: "30px",
                    }}
                  >
                    {item.icon}
                  </div>

                  <h5 className="fw-bold mb-3">
                    {item.title}
                  </h5>

                  <p className="text-secondary mb-0">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CAMPUSES ================= */}
      <section
        className="py-5"
        style={{
          background: "#17211b",
        }}
      >
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-end mb-5">
            <div>
              <span
                className="fw-bold"
                style={{ color: "#ffd166" }}
              >
                OUR CAMPUSES
              </span>

              <h2 className="display-6 fw-bold mt-2 mb-0 text-white">
                ទីតាំងសិក្សារបស់យើង
              </h2>
            </div>
          </div>

          <div className="row g-4">
            {campuses.map((campus, index) => (
              <div
                className="col-md-6 col-lg-4"
                key={index}
              >
                <div
                  className="h-100 overflow-hidden"
                  style={{
                    background: "#223029",
                    borderRadius: "6px",
                    border: "1px solid #34443b",
                  }}
                >
                  <img
                    src={campus.image}
                    alt={campus.title}
                    className="w-100"
                    style={{
                      height: "240px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="p-4">
                    <span
                      className="small fw-bold"
                      style={{ color: "#ffd166" }}
                    >
                      CAMPUS 0{index + 1}
                    </span>

                    <h5 className="fw-bold mt-2 text-white">
                      {campus.title}
                    </h5>

                    <p className="text-white-50 mb-0">
                      📍 {campus.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROGRAMS ================= */}
      <section className="py-5">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span
                className="fw-bold"
                style={{ color: "#2d6a4f" }}
              >
                PROGRAMS
              </span>

              <h2 className="display-6 fw-bold mt-2 mb-4">
                កម្មវិធីសិក្សាដែលផ្តល់ជូន
              </h2>

              <div
                style={{
                  borderLeft: "4px solid #2d6a4f",
                  paddingLeft: "25px",
                }}
              >
                <div className="mb-4">
                  <h5 className="fw-bold">
                    បរិញ្ញាបត្ររង
                  </h5>
                  <p className="text-secondary mb-0">
                    Associate Degree — រយៈពេល ២ ឆ្នាំ
                  </p>
                </div>

                <div className="mb-4">
                  <h5 className="fw-bold">
                    បរិញ្ញាបត្រ
                  </h5>
                  <p className="text-secondary mb-0">
                    Bachelor's Degree — រយៈពេល ៤ ឆ្នាំ
                  </p>
                </div>

                <div>
                  <h5 className="fw-bold">
                    បរិញ្ញាបត្រជាន់ខ្ពស់ និងបណ្ឌិត
                  </h5>
                  <p className="text-secondary mb-0">
                    Master's & Doctoral Degrees
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div
                className="p-2"
                style={{
                  background: "#2d6a4f",
                  borderRadius: "6px",
                }}
              >
                <img
                  src={image("images.jpeg")}
                  alt="BELTEI study program"
                  className="img-fluid w-100"
                  style={{
                    height: "330px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BOTTOM CTA ================= */}
      <section
        className="py-5 text-white text-center"
        style={{
          background: "#2d6a4f",
          borderTop: "5px solid #ffd166",
        }}
      >
        <div className="container py-4">
          <h2 className="fw-bold mb-3">
            ចាប់ផ្តើមអនាគតរបស់អ្នកជាមួយ BELTEI
          </h2>

          <p className="mb-4 opacity-75">
            រៀនថ្ងៃនេះ ដើម្បីកសាងអនាគតដ៏ល្អប្រសើរ។
          </p>

          <button
            className="btn btn-lg px-5"
            style={{
              background: "#ffd166",
              color: "#1b4332",
              border: "none",
              borderRadius: "6px",
              fontWeight: "600",
            }}
          >
            ចូលមើលកម្មវិធីសិក្សា
          </button>
        </div>
      </section>
    </div>
  );
}