import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const image = (filename) => `${process.env.PUBLIC_URL}/img/${filename}`;

  const [activeCategory, setActiveCategory] = useState("all");

  const stats = [
    { number: "20+", label: "ឆ្នាំបទពិសោធន៍អប់រំ", sub: "Years of Educational Excellence" },
    { number: "13+", label: "មហាវិទ្យាល័យទទួលស្គាល់", sub: "Accredited Faculties" },
    { number: "45+", label: "ជំនាញសិក្សាឯកទេស", sub: "Academic Majors & Programs" },
    { number: "35,000+", label: "និស្សិតបញ្ចប់ការសិក្សា", sub: "Graduates & Alumni Network" },
    { number: "98%", label: "អត្រាទទួលបានការងារ", sub: "Graduate Employment Rate" },
  ];

  const faculties = [
    {
      id: "it",
      category: "tech",
      icon: "fa-laptop-code",
      title: "មហាវិទ្យាល័យ ព័ត៌មានវិទ្យា និងវិទ្យាសាស្ត្រ",
      en: "Faculty of Information Technology & Science",
      color: "#087f8c",
      bg: "#e5f8fa",
      majors: ["វិស្វកម្មសូហ្វវែរ (Software Engineering)", "សន្តិសុខសាយប័រ (Cyber Security)", "បញ្ញាសិប្បនិម្មិត (AI & Data Science)", "ប្រព័ន្ធបណ្តាញកុំព្យូទ័រ (Network Systems)"],
      degrees: ["បរិញ្ញាបត្ររង", "បរិញ្ញាបត្រ", "អនុបណ្ឌិត"],
    },
    {
      id: "business",
      category: "business",
      icon: "fa-chart-line",
      title: "មហាវិទ្យាល័យ គ្រប់គ្រងពាណិជ្ជកម្ម",
      en: "Faculty of Business Administration",
      color: "#d49a00",
      bg: "#fef7e6",
      majors: ["ការគ្រប់គ្រងទូទៅ (Management)", "ទីផ្សារ និងពាណិជ្ជកម្មអេឡិចត្រូនិក (E-Commerce)", "ធុរកិច្ចអន្តរជាតិ (International Business)", "សហគ្រិនភាព (Entrepreneurship)"],
      degrees: ["បរិញ្ញាបត្ររង", "បរិញ្ញាបត្រ", "អនុបណ្ឌិត", "បណ្ឌិត"],
    },
    {
      id: "banking",
      category: "business",
      icon: "fa-calculator",
      title: "មហាវិទ្យាល័យ ហិរញ្ញវត្ថុ និងធនាគារ",
      en: "Faculty of Finance and Banking",
      color: "#0284c7",
      bg: "#e0f2fe",
      majors: ["ធនាគារ និងហិរញ្ញវត្ថុ (Banking & Finance)", "គណនេយ្យ និងសវនកម្ម (Accounting & Auditing)", "បច្ចេកវិទ្យាហិរញ្ញវត្ថុ (FinTech)"],
      degrees: ["បរិញ្ញាបត្ររង", "បរិញ្ញាបត្រ", "អនុបណ្ឌិត"],
    },
    {
      id: "languages",
      category: "languages",
      icon: "fa-language",
      title: "មហាវិទ្យាល័យ ភាសាបរទេស និងមនុស្សសាស្ត្រ",
      en: "Faculty of Foreign Languages & Humanities",
      color: "#7c3aed",
      bg: "#f5f3ff",
      majors: ["ភាសាអង់គ្លេសពាណិជ្ជកម្ម (Business English)", "ភាសាអង់គ្លេសបង្រៀន (TESOL)", "ភាសាចិនពាណិជ្ជកម្ម (Business Chinese)", "ការបកប្រែផ្ទាល់មាត់ និងជាលាយលក្ខណ៍អក្សរ"],
      degrees: ["បរិញ្ញាបត្ររង", "បរិញ្ញាបត្រ", "អនុបណ្ឌិត"],
    },
    {
      id: "law",
      category: "social",
      icon: "fa-balance-scale",
      title: "មហាវិទ្យាល័យ ច្បាប់ និងវិទ្យាសាស្ត្រនយោបាយ",
      en: "Faculty of Law & Political Science",
      color: "#b91c1c",
      bg: "#fef2f2",
      majors: ["ច្បាប់ឯកជន និងច្បាប់សាធារណៈ", "ច្បាប់ពាណិជ្ជកម្មអន្តរជាតិ", "វិទ្យាសាស្ត្រនយោបាយ និងការទូត"],
      degrees: ["បរិញ្ញាបត្រ", "អនុបណ្ឌិត"],
    },
    {
      id: "engineering",
      category: "engineering",
      icon: "fa-drafting-compass",
      title: "មហាវិទ្យាល័យ វិស្វកម្ម និងស្ថាបត្យកម្ម",
      en: "Faculty of Engineering & Architecture",
      color: "#ea580c",
      bg: "#fff7ed",
      majors: ["វិស្វកម្មសំណង់ស៊ីវិល (Civil Engineering)", "ស្ថាបត្យកម្ម និងនគរូបនីយវិទ្យា (Architecture)", "វិស្វកម្មអគ្គិសនី (Electrical Engineering)"],
      degrees: ["បរិញ្ញាបត្រ"],
    },
    {
      id: "tourism",
      category: "business",
      icon: "fa-concierge-bell",
      title: "មហាវិទ្យាល័យ ទេសចរណ៍ និងបដិសណ្ឋារកិច្ច",
      en: "Faculty of Tourism & Hospitality",
      color: "#059669",
      bg: "#ecfdf5",
      majors: ["ការគ្រប់គ្រងសណ្ឋាគារ និងបដិសណ្ឋារកិច្ច", "ការគ្រប់គ្រងទេសចរណ៍ និងមគ្គុទ្ទេសក៍", "ការរៀបចំព្រឹត្តិការណ៍ និងពិព័រណ៍"],
      degrees: ["បរិញ្ញាបត្ររង", "បរិញ្ញាបត្រ"],
    },
    {
      id: "economics",
      category: "social",
      icon: "fa-globe-asia",
      title: "មហាវិទ្យាល័យ ទំនាក់ទំនងអន្តរជាតិ និងសេដ្ឋកិច្ច",
      en: "Faculty of International Relations & Economics",
      color: "#0f766e",
      bg: "#f0fdfa",
      majors: ["ទំនាក់ទំនងអន្តរជាតិ (International Relations)", "សេដ្ឋកិច្ចអភិវឌ្ឍន៍ (Development Economics)", "សេដ្ឋកិច្ចឌីជីថល (Digital Economy)"],
      degrees: ["បរិញ្ញាបត្រ", "អនុបណ្ឌិត"],
    },
  ];

  const filteredFaculties =
    activeCategory === "all"
      ? faculties
      : faculties.filter((f) => f.category === activeCategory);

  const degreeLevels = [
    {
      level: "បរិញ្ញាបត្ររង",
      en: "Associate Degree",
      duration: "រយៈពេល ២ ឆ្នាំ (៤ ឆមាស)",
      credits: "៦០ ក្រេឌីត",
      desc: "ផ្តោតលើជំនាញបច្ចេកទេស និងការអនុវត្តជាក់ស្តែង ត្រៀមខ្លួនចូលបម្រើការងារបានឆាប់រហ័ស និងអាចបន្តឡើងថ្នាក់បរិញ្ញាបត្របាន។",
      icon: "fa-user-graduate",
    },
    {
      level: "បរិញ្ញាបត្រ",
      en: "Bachelor's Degree",
      duration: "រយៈពេល ៤ ឆ្នាំ (៨ ឆមាស)",
      credits: "១២០ ក្រេឌីត",
      desc: "កម្មវិធីសិក្សាស្តង់ដារខ្ពស់ ផ្តល់ចំណេះដឹងទ្រឹស្តីស៊ីជម្រៅ ស្រាវជ្រាវ គម្រោងជាក់ស្តែង និងការចុះកម្មសិក្សានៅបណ្តាក្រុមហ៊ុនធំៗ។",
      icon: "fa-graduation-cap",
      featured: true,
    },
    {
      level: "បរិញ្ញាបត្រជាន់ខ្ពស់",
      en: "Master's Degree",
      duration: "រយៈពេល ២ ឆ្នាំ (៤ ឆមាស)",
      credits: "៤៥ ក្រេឌីត",
      desc: "បណ្តុះបណ្តាលថ្នាក់ដឹកនាំ អ្នកគ្រប់គ្រង និងអ្នកជំនាញកម្រិតខ្ពស់ លើជំនាញគ្រប់គ្រង ហិរញ្ញវត្ថុ បច្ចេកវិទ្យា និងច្បាប់។",
      icon: "fa-award",
    },
    {
      level: "ថ្នាក់បណ្ឌិត",
      en: "Doctoral Degree (Ph.D.)",
      duration: "រយៈពេល ៣ ឆ្នាំ (៦ ឆមាស)",
      credits: "៥៤ ក្រេឌីត",
      desc: "ផ្តោតលើការស្រាវជ្រាវកម្រិតកំពូល ការបោះពុម្ពផ្សាយស្នាដៃសិក្សាស្រាវជ្រាវ និងការបង្កើតចំណេះដឹងថ្មីដើម្បីអភិវឌ្ឍសង្គមជាតិ។",
      icon: "fa-book-open",
    },
  ];

  const whyChooseUs = [
    {
      icon: "fa-certificate",
      title: "ទទួលស្គាល់កម្រិតជាតិ & អន្តរជាតិ",
      text: "ទទួលស្គាល់ពេញលេញដោយក្រសួងអប់រំ យុវជន និងកីឡា និងគណៈកម្មាធិការទទួលស្គាល់គុណភាពអប់រំនៃកម្ពុជា (ACC)។",
    },
    {
      icon: "fa-chalkboard-teacher",
      title: "សាស្ត្រាចារ្យកម្រិតបណ្ឌិត និងអនុបណ្ឌិត",
      text: "បង្រៀនដោយសាស្ត្រាចារ្យជាតិ និងអន្តរជាតិ ដែលមានបទពិសោធន៍ការងារ និងជំនាញជាក់ស្តែងយូរឆ្នាំ។",
    },
    {
      icon: "fa-globe-americas",
      title: "កម្មវិធីផ្ទេរការសិក្សាអន្តរជាតិ",
      text: "មានកិច្ចសហប្រតិបត្តិការផ្ទេរក្រេឌីតសិក្សាទៅសាកលវិទ្យាល័យល្បីៗនៅ ចក្រភពអង់គ្លេស សហរដ្ឋអាមេរិក សិង្ហបុរី និងម៉ាឡេស៊ី។",
    },
    {
      icon: "fa-briefcase",
      title: "មជ្ឈមណ្ឌលការងារ និងកម្មសិក្សា",
      text: "សហការជាមួយក្រុមហ៊ុន ធនាគារ និងស្ថាប័នរដ្ឋជាង ៣០០+ ធានាឱកាសចុះកម្មសិក្សា និងការងារធ្វើក្រោយបញ្ចប់ការសិក្សា។",
    },
    {
      icon: "fa-microchip",
      title: "បន្ទប់ពិសោធន៍ & បច្ចេកវិទ្យាទំនើប",
      text: "បន្ទប់រៀនបំពាក់ Smart TV, ម៉ាស៊ីនត្រជាក់, បន្ទប់កុំព្យូទ័រទំនើប, និងបណ្ណាល័យឌីជីថល (E-Library) រាប់ពាន់ក្បាល។",
    },
    {
      icon: "fa-hand-holding-usd",
      title: "អាហារូបករណ៍រហូតដល់ ១០០%",
      text: "ផ្តល់អាហារូបករណ៍លើកទឹកចិត្តសម្រាប់សិស្សនិទ្ទេស A, B, C សិស្សក្រីក្រ និងនិស្សិតឆ្នើមប្រចាំឆ្នាំ។",
    },
  ];

  const campuses = [
    {
      img: "BIU1.png",
      name: "ទីតាំងទី១ (ទួលស្លែង)",
      en: "Campus 1 (Tuol Sleng)",
      address: "#21, ផ្លូវ 360, សង្កាត់បឹងកេងកង1, ខណ្ឌបឹងកេងកង, ភ្នំពេញ",
      phone: "023 999 999 / 012 345 678",
      features: "អគាររដ្ឋបាលកណ្តាល • បណ្ណាល័យធំ • សាលសន្និសីទ • បន្ទប់កុំព្យូទ័រ",
    },
    {
      img: "BIU2.png",
      name: "ទីតាំងទី២ (ចោមចៅ)",
      en: "Campus 2 (Chaom Chau)",
      address: "ផ្លូវជាតិលេខ3, សង្កាត់ចោមចៅ, ខណ្ឌពោធិ៍សែនជ័យ, ភ្នំពេញ",
      phone: "023 888 888 / 011 222 333",
      features: "បរិវេណធំទូលាយ • មជ្ឈមណ្ឌលកីឡា • បន្ទប់ពិសោធន៍បច្ចេកវិទ្យា • អាហារដ្ឋាន",
    },
    {
      img: "BIU3.png",
      name: "គម្រោងទី៣ (ទួលពង្រ)",
      en: "Campus 3 Project (Tuol Pongro)",
      address: "ផ្លូវទួលពង្រ, ខណ្ឌដង្កោ, រាជធានីភ្នំពេញ",
      phone: "023 777 777 / 016 444 555",
      features: "អគារសិក្សាទំនើបកម្រិតស្តង់ដារអន្តរជាតិ • អន្តេវាសិកដ្ឋាននិស្សិត",
    },
  ];

  const testimonials = [
    {
      img: "student1.jpeg",
      name: "ជា សុខា",
      role: "និស្សិតឆ្នាំទី៤ ជំនាញ ព័ត៌មានវិទ្យា (IT)",
      company: "Software Engineer នៅក្រុមហ៊ុនបច្ចេកវិទ្យា",
      text: "ការសិក្សានៅ BELTEI មិនត្រឹមតែបង្រៀនទ្រឹស្តីប៉ុណ្ណោះទេ តែបានអនុវត្ត Project ពិតៗ ដែលជួយឱ្យខ្ញុំទទួលបានការងារធ្វើតាំងពីមិនទាន់ចប់ឆ្នាំទី៤។",
    },
    {
      img: "student2.jpeg",
      name: "អ៊ឹម ចាន់ថឿន",
      role: "និស្សិតបញ្ចប់ការសិក្សា ជំនាញ គ្រប់គ្រងពាណិជ្ជកម្ម",
      company: "Branch Manager នៅធនាគារពាណិជ្ជ",
      text: "សាស្ត្រាចារ្យនៅទីនេះមានបទពិសោធន៍ខ្ពស់ និងយកចិត្តទុកដាក់លើនិស្សិតខ្លាំងណាស់។ កម្មវិធីសិក្សាពីរភាសាជាតិ-អន្តរជាតិ ពិតជាជួយខ្ញុំច្រើនក្នុងវិស័យការងារ។",
    },
    {
      img: "student3.jpeg",
      name: "លី ម៉េងហួរ",
      role: "និស្សិតអាហារូបករណ៍ ជំនាញ ធនាគារ និងហិរញ្ញវត្ថុ",
      company: "Financial Analyst",
      text: "បរិយាកាសសិក្សាស្អាត សម្ភារទំនើប និងមានបណ្ណាល័យឌីជីថលងាយស្រួលស្រាវជ្រាវ។ ខ្ញុំពិតជាមានមោទនភាពដែលបានក្លាយជានិស្សិត BELTEI។",
    },
    {
      img: "student4.jpeg",
      name: "ម៉េង ហុង",
      role: "និស្សិតបញ្ចប់ការសិក្សា ជំនាញ ភាសាអង់គ្លេសពាណិជ្ជកម្ម",
      company: "International Relations Officer",
      text: "BELTEI បានផ្តល់ឱ្យខ្ញុំនូវមូលដ្ឋានគ្រឹះភាសាអង់គ្លេសយ៉ាងរឹងមាំ និងឱកាសចូលរួមសិក្ខាសាលាជាតិ-អន្តរជាតិជាច្រើន។",
    },
  ];

  return (
    <div className="uni-page-wrapper">
      {/* ================= ANNOUNCEMENT TICKER ================= */}
      <div className="uni-ticker-bar">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div className="d-flex align-items-center gap-2">
              <span className="uni-ticker-badge">
                <i className="fa fa-bullhorn me-1" /> ដំណឹងថ្មីៗ
              </span>
              <span className="small text-truncate" style={{ maxWidth: "750px" }}>
                បើកទទួលពាក្យចុះឈ្មោះចូលរៀន ឆ្នាំសិក្សា ២០២៦–២០២៧ វគ្គថ្មី! អាហារូបករណ៍ ៣០% ដល់ ៥០% សម្រាប់សិស្សនិទ្ទេស A, B, C
              </span>
            </div>
            <Link to="/contact" className="small fw-bold text-dark text-decoration-none">
              ព័ត៌មានលម្អិត <i className="fa fa-arrow-right ms-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="uni-hero">
        <div
          className="uni-hero-bg"
          style={{ backgroundImage: `url('${image("BIT3.jpg")}')` }}
        />
        <div className="uni-hero-overlay" />
        <div className="uni-hero-pattern" />

        <div className="container uni-hero-content">
          <div className="row align-items-center g-5">
            <div className="col-lg-7 text-white">
              <div className="uni-pill-tag mb-4">
                <span className="uni-pill-dot" />
                <span>BELTEI INTERNATIONAL UNIVERSITY • គុណភាព & ឧត្តមភាព</span>
              </div>

              <h1 className="uni-hero-title">
                អនាគតរបស់អ្នក
                <br />
                <span className="uni-gold-gradient-text">ចាប់ផ្តើមនៅទីនេះ</span>
              </h1>

              <p className="lead text-white-50 mb-4" style={{ fontSize: "17px", lineHeight: "1.9", maxWidth: "600px" }}>
                សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ ផ្តល់ការអប់រំកម្រិតឧត្តមសិក្សាស្របតាមស្តង់ដារជាតិ និងអន្តរជាតិ
                បណ្តុះបណ្តាលចំណេះដឹង ជំនាញវិជ្ជាជីវៈ សីលធម៌ និងគុណធម៌ ដើម្បីជោគជ័យក្នុងអាជីពការងារ។
              </p>

              <div className="d-flex flex-wrap gap-3 mb-5">
                <Link to="/service" className="uni-btn-primary">
                  <i className="fa fa-file-signature" />
                  <span>ចុះឈ្មោះចូលរៀន (Apply Now)</span>
                </Link>

                <a href="#programs" className="uni-btn-secondary">
                  <i className="fa fa-book-open" />
                  <span>កម្មវិធីសិក្សា (Programs)</span>
                </a>

                <Link to="/verify" className="uni-btn-secondary">
                  <i className="fa fa-qrcode" />
                  <span>ផ្ទៀងផ្ទាត់សញ្ញាបត្រ</span>
                </Link>
              </div>

              <div className="d-flex align-items-center gap-4 pt-3 border-top border-light border-opacity-25 flex-wrap">
                <div className="d-flex align-items-center gap-2">
                  <i className="fa fa-check-circle text-warning fs-5" />
                  <small className="text-white">ទទួលស្គាល់ដោយ MoEYS & ACC</small>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="fa fa-check-circle text-warning fs-5" />
                  <small className="text-white">១៣ មហាវិទ្យាល័យ • ៤៥ ជំនាញ</small>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="fa fa-check-circle text-warning fs-5" />
                  <small className="text-white">អាហារូបករណ៍រហូតដល់ ១០០%</small>
                </div>
              </div>
            </div>

            {/* Hero Card / University Image showcase */}
            <div className="col-lg-5">
              <div className="position-relative mx-auto" style={{ maxWidth: "450px" }}>
                <div
                  className="rounded-4 overflow-hidden shadow-lg position-relative"
                  style={{
                    border: "4px solid rgba(255, 255, 255, 0.2)",
                    background: "#04142b",
                  }}
                >
                  <img
                    src={image("BIT4.jpeg")}
                    alt="BELTEI International University"
                    className="img-fluid w-100"
                    style={{ height: "380px", objectFit: "cover" }}
                  />
                  <div
                    className="p-3 text-white"
                    style={{
                      background: "linear-gradient(to top, rgba(4,20,43,0.95), rgba(4,20,43,0.7))",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <span className="badge bg-warning text-dark fw-bold mb-1">
                          ACADEMIC YEAR 2026–2027
                        </span>
                        <h6 className="fw-bold mb-0 text-white">
                          សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ
                        </h6>
                      </div>
                      <div className="text-end">
                        <small className="text-warning fw-bold d-block">MoEYS</small>
                        <small className="text-white-50">Accredited</small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Highlights Box */}
                <div
                  className="position-absolute bg-white rounded-3 shadow-lg p-3 d-flex align-items-center gap-3 uni-hero-float-badge"
                  style={{
                    bottom: "-25px",
                    left: "-20px",
                    borderLeft: "5px solid #d49a00",
                    maxWidth: "280px",
                  }}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0"
                    style={{ width: "46px", height: "46px", background: "#087f8c" }}
                  >
                    <i className="fa fa-award fa-lg" />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: "14px" }}>
                      គុណភាពអប់រំស្តង់ដារ
                    </h6>
                    <small className="text-muted" style={{ fontSize: "11px" }}>
                      National & International
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="py-4 position-relative" style={{ zIndex: 10, marginTop: "-30px" }}>
        <div className="container">
          <div className="uni-stats-grid">
            {stats.map((item, idx) => (
              <div key={idx}>
                <div className="uni-stat-card">
                  <div className={`uni-stat-number ${idx % 2 === 0 ? "teal" : "gold"}`}>
                    {item.number}
                  </div>
                  <h6 className="fw-bold text-dark mb-1" style={{ fontSize: "13.5px" }}>
                    {item.label}
                  </h6>
                  <p className="uni-stat-label">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRESIDENT WELCOME / ABOUT OVERVIEW ================= */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="position-relative">
                <img
                  src={image("BIT7-c.jpg")}
                  alt="BELTEI University Campus"
                  className="img-fluid rounded-4 shadow-lg w-100"
                  style={{ height: "430px", objectFit: "cover" }}
                />
                <div
                  className="position-absolute p-4 rounded-4 shadow-lg text-white uni-about-float-badge"
                  style={{
                    bottom: "-25px",
                    right: "-20px",
                    background: "linear-gradient(135deg, #071e3d 0%, #087f8c 100%)",
                    maxWidth: "260px",
                    border: "2px solid rgba(255,255,255,0.15)",
                  }}
                >
                  <i className="fa fa-university fa-2x text-warning mb-2" />
                  <h6 className="fw-bold mb-1">២០+ ឆ្នាំនៃការអភិវឌ្ឍ</h6>
                  <small className="text-white-50">
                    បណ្តុះបណ្តាលធនធានមនុស្សដើម្បីអនាគតកម្ពុជា
                  </small>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <span className="uni-kicker">
                <i className="fa fa-university me-1" /> ABOUT OUR UNIVERSITY
              </span>
              <h2 className="uni-section-title mt-2 mb-3">
                ស្វាគមន៍មកកាន់
                <br />
                <span className="uni-text-teal">សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ</span>
              </h2>

              <p className="text-secondary mb-3" style={{ lineHeight: "1.9", fontSize: "15px" }}>
                សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ បានចាប់បដិសន្ធិឡើងដោយការប្តេជ្ញាចិត្តខ្ពស់ក្នុងការផ្តល់ការអប់រំកម្រិតឧត្តមសិក្សា
                ប្រកបដោយគុណភាពខ្ពស់ ស្របតាមស្តង់ដារជាតិ និងអន្តរជាតិ។ យើងខ្ញុំផ្តល់ជូននូវបរិយាកាសសិក្សាដ៏សំបូរបែប
                បំពាក់ដោយបរិក្ខារទំនើបៗ និងបង្រៀនដោយសាស្ត្រាចារ្យកម្រិតបណ្ឌិត និងអនុបណ្ឌិតដែលមានបទពិសោធន៍យូរឆ្នាំ។
              </p>

              <div className="p-3 rounded-3 mb-4" style={{ background: "#f8fafc", borderLeft: "4px solid #087f8c" }}>
                <strong className="d-block uni-text-navy mb-1">
                  បាវចនា ៥ យ៉ាងរបស់សាកលវិទ្យាល័យ៖
                </strong>
                <span className="uni-text-gold fw-bold">
                  គុណភាព • ប្រសិទ្ធភាព • ឧត្តមភាព • សីលធម៌ • គុណធម៌
                </span>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-2">
                    <i className="fa fa-check-circle text-success fs-5" />
                    <span className="fw-semibold text-dark">កម្មវិធីសិក្សាជាតិ និងអន្តរជាតិ</span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-2">
                    <i className="fa fa-check-circle text-success fs-5" />
                    <span className="fw-semibold text-dark">ផ្ទេរការសិក្សាទៅក្រៅប្រទេស</span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-2">
                    <i className="fa fa-check-circle text-success fs-5" />
                    <span className="fw-semibold text-dark">បន្ទប់កុំព្យូទ័រ & E-Library</span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-2">
                    <i className="fa fa-check-circle text-success fs-5" />
                    <span className="fw-semibold text-dark">ចុះកម្មសិក្សា និងការងារ ៩៨%</span>
                  </div>
                </div>
              </div>

              <Link to="/about" className="btn btn-outline-dark rounded-pill px-4 py-2 fw-bold">
                ស្វែងយល់បន្ថែមអំពីសាកលវិទ្យាល័យ <i className="fa fa-arrow-right ms-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DEGREE LEVELS OFFERED ================= */}
      <section className="py-5" style={{ background: "#f1f5f9" }}>
        <div className="container py-4">
          <div className="text-center uni-section-header">
            <span className="uni-kicker">DEGREE PROGRAMS</span>
            <h2 className="uni-section-title">កម្រិតសញ្ញាបត្រដែលផ្តល់ជូន</h2>
            <p className="uni-section-subtitle">
              សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ ផ្តល់ជូនការបណ្តុះបណ្តាលគ្រប់កម្រិតឧត្តមសិក្សា ចាប់ពីថ្នាក់បរិញ្ញាបត្ររង រហូតដល់ថ្នាក់បណ្ឌិត។
            </p>
          </div>

          <div className="row g-4">
            {degreeLevels.map((deg, i) => (
              <div className="col-md-6 col-lg-3" key={i}>
                <div
                  className="uni-degree-card position-relative"
                  style={deg.featured ? { borderColor: "#087f8c", boxShadow: "0 10px 30px rgba(8,127,140,0.15)" } : {}}
                >
                  {deg.featured && (
                    <span
                      className="badge bg-danger position-absolute"
                      style={{ top: "12px", right: "12px", fontSize: "10px" }}
                    >
                      ពេញនិយមបំផុត
                    </span>
                  )}
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                    style={{
                      width: "60px",
                      height: "60px",
                      background: deg.featured ? "#e5f8fa" : "#f1f5f9",
                      color: deg.featured ? "#087f8c" : "#475569",
                      fontSize: "24px",
                    }}
                  >
                    <i className={`fa ${deg.icon}`} />
                  </div>

                  <span className="uni-degree-years">{deg.duration}</span>

                  <h5 className="fw-bold text-dark mt-2 mb-1">{deg.level}</h5>
                  <small className="text-muted fw-semibold d-block mb-3">{deg.en}</small>

                  <p className="text-secondary small mb-3" style={{ lineHeight: "1.7" }}>
                    {deg.desc}
                  </p>

                  <div className="border-top pt-2">
                    <small className="text-muted fw-bold">
                      <i className="fa fa-check me-1 text-success" />
                      ក្រេឌីតសរុប៖ {deg.credits}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROGRAMS / FACULTIES SECTION ================= */}
      <section id="programs" className="py-5 bg-white">
        <div className="container py-4">
          <div className="text-center uni-section-header">
            <span className="uni-kicker">ACADEMIC FACULTIES</span>
            <h2 className="uni-section-title">មហាវិទ្យាល័យ និងមុខជំនាញសិក្សា</h2>
            <p className="uni-section-subtitle">
              ជ្រើសរើសជំនាញដែលសាកសមនឹងចំណង់ចំណូលចិត្ត និងតម្រូវការទីផ្សារការងារក្នុងយុគសម័យឌីជីថល។
            </p>

            {/* Category Filter Pills */}
            <div className="d-flex justify-content-center flex-wrap gap-2 mt-4 uni-filter-pills">
              {[
                { id: "all", label: "ទាំងអស់ (All Faculties)" },
                { id: "tech", label: "ព័ត៌មានវិទ្យា & AI" },
                { id: "business", label: "ធុរកិច្ច & ហិរញ្ញវត្ថុ" },
                { id: "languages", label: "ភាសាបរទេស" },
                { id: "social", label: "ច្បាប់ & សេដ្ឋកិច្ច" },
                { id: "engineering", label: "វិស្វកម្ម & ស្ថាបត្យកម្ម" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold ${
                    activeCategory === tab.id ? "btn-dark text-white" : "btn-light text-secondary"
                  }`}
                  style={{ fontSize: "13px" }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="row g-4">
            {filteredFaculties.map((fac, idx) => (
              <div className="col-md-6 col-lg-4" key={fac.id}>
                <div className="uni-program-card">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div
                      className="uni-program-icon-box"
                      style={{ background: fac.bg, color: fac.color }}
                    >
                      <i className={`fa ${fac.icon}`} />
                    </div>
                    <span className="badge bg-light text-dark border">
                      FACULTY 0{idx + 1}
                    </span>
                  </div>

                  <h5 className="fw-bold text-dark mb-1" style={{ fontSize: "17px" }}>
                    {fac.title}
                  </h5>
                  <p className="small text-muted mb-3">{fac.en}</p>

                  <div className="mb-3">
                    <strong className="d-block small text-dark mb-2">មុខជំនាញសំខាន់ៗ៖</strong>
                    <ul className="list-unstyled small text-secondary mb-0">
                      {fac.majors.map((m, mIdx) => (
                        <li key={mIdx} className="mb-1 text-truncate">
                          <i className="fa fa-check text-success me-2" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between">
                    <div>
                      {fac.degrees.map((d, dIdx) => (
                        <span key={dIdx} className="uni-degree-pill">
                          {d}
                        </span>
                      ))}
                    </div>
                    <Link
                      to="/contact"
                      className="btn btn-sm btn-outline-info rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "34px", height: "34px" }}
                      title="សាកសួរព័ត៌មានលម្អិត"
                    >
                      <i className="fa fa-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/contact" className="uni-btn-primary">
              <i className="fa fa-question-circle" />
              <span>សាកសួរ និងប្រឹក្សាជ្រើសរើសជំនាញសិក្សា</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE BELTEI ================= */}
      <section className="py-5" style={{ background: "linear-gradient(135deg, #071e3d 0%, #083262 100%)", color: "#ffffff" }}>
        <div className="container py-4">
          <div className="text-center uni-section-header">
            <span className="badge bg-warning text-dark px-3 py-2 fw-bold mb-2">
              WHY CHOOSE US
            </span>
            <h2 className="uni-section-title text-white">
              ហេតុអ្វីជ្រើសរើស សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ?
            </h2>
            <p className="uni-section-subtitle text-white-50">
              ៦ ចំណុចលេចធ្លោដែលធ្វើឱ្យ BELTEI ក្លាយជាជម្រើសដំបូងរបស់សិស្ស-និស្សិតនៅកម្ពុជា
            </p>
          </div>

          <div className="row g-4">
            {whyChooseUs.map((item, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div
                  className="p-4 rounded-4 h-100"
                  style={{
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    backdropFilter: "blur(6px)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3 text-warning"
                    style={{
                      width: "54px",
                      height: "54px",
                      background: "rgba(212, 154, 0, 0.2)",
                      fontSize: "22px",
                    }}
                  >
                    <i className={`fa ${item.icon}`} />
                  </div>
                  <h5 className="fw-bold text-white mb-2" style={{ fontSize: "17px" }}>
                    {item.title}
                  </h5>
                  <p className="text-white-50 small mb-0" style={{ lineHeight: "1.8" }}>
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= REAL CAMPUS & FACILITIES SHOWCASE ================= */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="text-center uni-section-header">
            <span className="uni-kicker">CAMPUS LIFE & FACILITIES</span>
            <h2 className="uni-section-title">បរិក្ខារ និងសកម្មភាពសិក្សាជាក់ស្តែង</h2>
            <p className="uni-section-subtitle">
              រូបភាពពិតនៃបរិយាកាសសិក្សា បន្ទប់ពិសោធន៍ បណ្ណាល័យ និងសកម្មភាពនិស្សិតនៅសាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ
            </p>
          </div>

          <div className="row g-3">
            <div className="col-lg-8">
              <div className="position-relative rounded-4 overflow-hidden shadow-sm h-100" style={{ minHeight: "340px" }}>
                <img
                  src={image("BIT9-d.jpg")}
                  alt="Student Activity"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
                <div
                  className="position-absolute bottom-0 start-0 end-0 p-3 text-white"
                  style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.85))" }}
                >
                  <h6 className="fw-bold mb-0">សកម្មភាពសិក្សា និងការងារជាក្រុមរបស់និស្សិត</h6>
                  <small className="text-white-50">Student Teamwork & Interactive Learning</small>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="d-flex flex-column gap-3 h-100">
                <div className="position-relative rounded-4 overflow-hidden shadow-sm flex-fill" style={{ minHeight: "160px" }}>
                  <img
                    src={image("BIT10-4.jpg")}
                    alt="Classroom"
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                  <div
                    className="position-absolute bottom-0 start-0 end-0 p-2 text-white"
                    style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}
                  >
                    <small className="fw-bold d-block">បន្ទប់រៀនបំពាក់សម្ភារទំនើប</small>
                  </div>
                </div>

                <div className="position-relative rounded-4 overflow-hidden shadow-sm flex-fill" style={{ minHeight: "160px" }}>
                  <img
                    src={image("BIT11-7.jpg")}
                    alt="Graduation Ceremony"
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                  <div
                    className="position-absolute bottom-0 start-0 end-0 p-2 text-white"
                    style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}
                  >
                    <small className="fw-bold d-block">ពិធីប្រគល់សញ្ញាបត្រប្រចាំឆ្នាំ</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="position-relative rounded-4 overflow-hidden shadow-sm" style={{ height: "220px" }}>
                <img
                  src={image("BTI12-d.jpg")}
                  alt="Student Presentation"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
                <div
                  className="position-absolute bottom-0 start-0 end-0 p-2 text-white"
                  style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}
                >
                  <small className="fw-bold d-block">ការធ្វើបទបង្ហាញ និងសន្និសីទ</small>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="position-relative rounded-4 overflow-hidden shadow-sm" style={{ height: "220px" }}>
                <img
                  src={image("BIT13-7.jpg")}
                  alt="Academic Research"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
                <div
                  className="position-absolute bottom-0 start-0 end-0 p-2 text-white"
                  style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}
                >
                  <small className="fw-bold d-block">ការស្រាវជ្រាវ និងទស្សនកិច្ចសិក្សា</small>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="position-relative rounded-4 overflow-hidden shadow-sm" style={{ height: "220px" }}>
                <img
                  src={image("BIT14-e.jpg")}
                  alt="BELTEI Campus Community"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
                <div
                  className="position-absolute bottom-0 start-0 end-0 p-2 text-white"
                  style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}
                >
                  <small className="fw-bold d-block">សហគមន៍និស្សិត BELTEI</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CAMPUS LOCATIONS ================= */}
      <section id="campuses" className="py-5" style={{ background: "#f8fafc" }}>
        <div className="container py-4">
          <div className="text-center uni-section-header">
            <span className="uni-kicker">CAMPUS LOCATIONS</span>
            <h2 className="uni-section-title">ទីតាំងសាខាសិក្សារបស់យើង</h2>
            <p className="uni-section-subtitle">
              ទីតាំងងាយស្រួលធ្វើដំណើរ ស្ថិតនៅកណ្តាលរាជធានីភ្នំពេញ ផ្តល់បរិយាកាសសិក្សាប្រកបដោយផាសុកភាព និងសុវត្ថិភាពខ្ពស់
            </p>
          </div>

          <div className="row g-4">
            {campuses.map((campus, idx) => (
              <div className="col-md-6 col-lg-4" key={idx}>
                <div className="uni-campus-card">
                  <div className="overflow-hidden position-relative">
                    <img
                      src={image(campus.img)}
                      alt={campus.name}
                      className="uni-campus-img"
                    />
                    <span
                      className="badge bg-warning text-dark position-absolute fw-bold"
                      style={{ top: "15px", left: "15px", fontSize: "11px" }}
                    >
                      CAMPUS 0{idx + 1}
                    </span>
                  </div>

                  <div className="uni-campus-content">
                    <h5 className="fw-bold text-dark mb-1">{campus.name}</h5>
                    <small className="text-muted fw-semibold mb-3 d-block">{campus.en}</small>

                    <p className="small text-secondary mb-2">
                      <i className="fa fa-map-marker-alt text-danger me-2" />
                      {campus.address}
                    </p>

                    <p className="small text-secondary mb-3">
                      <i className="fa fa-phone-alt text-info me-2" />
                      {campus.phone}
                    </p>

                    <div className="p-2 rounded bg-light small text-muted mt-auto mb-3">
                      <i className="fa fa-star text-warning me-1" />
                      <strong>បរិក្ខារ៖</strong> {campus.features}
                    </div>

                    <Link to="/contact" className="btn btn-outline-dark btn-sm rounded-pill w-100 fw-bold">
                      <i className="fa fa-directions me-1" /> ផែនទី និងទំនាក់ទំនង
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS / ALUMNI ================= */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="text-center uni-section-header">
            <span className="uni-kicker">SUCCESS STORIES</span>
            <h2 className="uni-section-title">មតិយោបល់ និងជោគជ័យរបស់និស្សិត</h2>
            <p className="uni-section-subtitle">
              ស្តាប់ការចែករំលែកពីនិស្សិត និងអតីតនិស្សិតដែលបានបញ្ចប់ការសិក្សាពីសាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ
            </p>
          </div>

          <div className="row g-4">
            {testimonials.map((t, idx) => (
              <div className="col-md-6 col-lg-3" key={idx}>
                <div
                  className="card h-100 border-0 shadow-sm p-4 text-center rounded-4"
                  style={{ background: "#f8fafc", border: "1px solid #edf2f7" }}
                >
                  <img
                    src={image(t.img)}
                    alt={t.name}
                    className="rounded-circle mx-auto mb-3 shadow-sm"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      border: "3px solid #087f8c",
                    }}
                  />

                  <div className="text-warning mb-2 small">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </div>

                  <h6 className="fw-bold text-dark mb-1">{t.name}</h6>
                  <small className="text-info fw-semibold d-block mb-1">{t.role}</small>
                  <small className="text-muted d-block mb-3" style={{ fontSize: "11px" }}>
                    {t.company}
                  </small>

                  <p className="text-secondary small mb-0" style={{ lineHeight: "1.7" }}>
                    "{t.text}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #04142b 0%, #071e3d 50%, #087f8c 100%)",
          color: "#ffffff",
        }}
      >
        <div className="container py-4 text-center">
          <span className="badge bg-warning text-dark px-3 py-2 fw-bold mb-3">
            YOUR FUTURE STARTS TODAY
          </span>
          <h2 className="display-6 fw-bold mb-3 text-white">
            តើអ្នកត្រៀមខ្លួនសម្រាប់អនាគតជោគជ័យហើយឬនៅ?
          </h2>
          <p className="lead text-white-50 mx-auto mb-4" style={{ maxWidth: "650px", fontSize: "16px" }}>
            ចុះឈ្មោះសិក្សានៅសាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ ថ្ងៃនេះ ដើម្បីទទួលបានអាហារូបករណ៍
            និងការបណ្តុះបណ្តាលប្រកបដោយគុណភាពខ្ពស់។
          </p>

          <div className="d-flex justify-content-center flex-wrap gap-3">
            <Link to="/contact" className="uni-btn-primary">
              <i className="fa fa-paper-plane" />
              <span>ចុះឈ្មោះចូលរៀន (Online Admission)</span>
            </Link>
            <a href="tel:023999999" className="uni-btn-secondary">
              <i className="fa fa-phone-alt" />
              <span>ទូរស័ព្ទប្រឹក្សា៖ 023 999 999</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}