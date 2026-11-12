import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function About() {
  const image = (filename) => `${process.env.PUBLIC_URL}/img/${filename}`;

  const [activeFaq, setActiveFaq] = useState(0);

  const milestones = [
    {
      year: "2005",
      title: "ការកកើតដំបូង (Founding)",
      desc: "បានចាប់បដិសន្ធិឡើងជា វិទ្យាស្ថាន ប៊ែលធី អន្តរជាតិ នៅថ្ងៃទី ៤ ខែសីហា ឆ្នាំ ២០០៥ ដោយផ្តោតលើការបណ្តុះបណ្តាលភាសាអង់គ្លេស និងជំនាញកុំព្យូទ័រ។",
      icon: "fa-seedling",
    },
    {
      year: "2012",
      title: "ក្លាយជាសាកលវិទ្យាល័យ (University Elevation)",
      desc: "ត្រូវបានរាជរដ្ឋាភិបាលកម្ពុជាទទួលស្គាល់ និងដំឡើងជា សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ តាមរយៈអនុក្រឹត្យលេខ ៩៧ អនក្រ.បក ចុះថ្ងៃទី ៦ ខែកញ្ញា ឆ្នាំ ២០១២។",
      icon: "fa-university",
    },
    {
      year: "2017",
      title: "ពង្រីកទីតាំងទី២ - ចោមចៅ (Campus 2 Chaom Chau)",
      desc: "សម្ពោធដាក់ឱ្យប្រើប្រាស់ទីតាំងទី២ ផ្លូវជាតិលេខ៣ សង្កាត់ចោមចៅ លើផ្ទៃដីធំទូលាយ បំពាក់ដោយសាលសន្និសីទ និងបរិក្ខារទំនើបៗ។",
      icon: "fa-building",
    },
    {
      year: "2020",
      title: "យុគសម័យឌីជីថល (Digital University)",
      desc: "ដាក់ឱ្យដំណើរការប្រព័ន្ធគ្រប់គ្រងសិស្ស-និស្សិតតាមប្រព័ន្ធបច្ចេកវិទ្យាព័ត៌មាន E-Learning, Digital Library និងបន្ទប់ពិសោធន៍ទំនើប។",
      icon: "fa-laptop-code",
    },
    {
      year: "2024–2026",
      title: "កិច្ចសហប្រតិបត្តិការអន្តរជាតិ (Global Partnerships)",
      desc: "ពង្រីកគម្រោងទីតាំងទី៣ ទួលពង្រ និងពង្រឹងកិច្ចសហប្រតិបត្តិការផ្ទេរការសិក្សាជាមួយសាកលវិទ្យាល័យល្បីៗនៅ ចក្រភពអង់គ្លេស អាមេរិក អូស្ត្រាលី និងសិង្ហបុរី។",
      icon: "fa-globe",
    },
  ];

  const coreValues = [
    {
      num: "01",
      title: "គុណភាព (Quality)",
      desc: "ធានាគុណភាពអប់រំកម្រិតខ្ពស់ ស្របតាមស្តង់ដារជាតិ និងអន្តរជាតិ បង្រៀនដោយសាស្ត្រាចារ្យមានសមត្ថភាព និងបទពិសោធន៍ច្បាស់លាស់។",
      icon: "fa-award",
      color: "#087f8c",
    },
    {
      num: "02",
      title: "ប្រសិទ្ធភាព (Efficiency)",
      desc: "កម្មវិធីសិក្សា និងការអនុវត្តជាក់ស្តែងដែលឆ្លើយតបចំតម្រូវការទីផ្សារការងារ ជួយឱ្យនិស្សិតអាចបំពេញការងារបានយ៉ាងស្ទាត់ជំនាញ។",
      icon: "fa-chart-line",
      color: "#0284c7",
    },
    {
      num: "03",
      title: "ឧត្តមភាព (Excellence)",
      desc: "បណ្តុះបណ្តាលឱ្យនិស្សិតមានភាពលេចធ្លោ ភាពជាអ្នកដឹកនាំ ស្មារតីច្នៃប្រឌិត និងការស្រាវជ្រាវវិទ្យាសាស្ត្រកម្រិតខ្ពស់។",
      icon: "fa-star",
      color: "#d49a00",
    },
    {
      num: "04",
      title: "សីលធម៌ (Morality)",
      desc: "អប់រំនិស្សិតឱ្យមានចរិយាសម្បត្តិថ្លៃថ្នូរ គោរពវិន័យ ច្បាប់សង្គម ស្រឡាញ់វប្បធម៌ជាតិ និងមានទំនាក់ទំនងល្អក្នុងសង្គម។",
      icon: "fa-heart",
      color: "#e11d48",
    },
    {
      num: "05",
      title: "គុណធម៌ (Virtue)",
      desc: "បណ្តុះស្មារតីមេត្តា ករុណា យុត្តិធម៌ សុចរិតភាព និងការរួមចំណែកជួយដល់សហគមន៍ និងប្រទេសជាតិ។",
      icon: "fa-hands-helping",
      color: "#059669",
    },
  ];

  const partners = [
    { country: "United Kingdom", name: "Partner Universities in UK", flag: "🇬🇧" },
    { country: "United States", name: "Accredited US Institutions", flag: "🇺🇸" },
    { country: "Australia", name: "Australian Higher Education", flag: "🇦🇺" },
    { country: "Singapore", name: "Singapore Management & Tech", flag: "🇸🇬" },
    { country: "Malaysia", name: "Malaysian Partner Campuses", flag: "🇲🇾" },
    { country: "Thailand", name: "Leading Thai Universities", flag: "🇹🇭" },
  ];

  const campuses = [
    {
      img: "BIU1.png",
      name: "ទីតាំងទី១ (ទួលស្លែង)",
      en: "Campus 1 (Tuol Sleng)",
      location: "#21, ផ្លូវ 360, សង្កាត់បឹងកេងកង1, ខណ្ឌបឹងកេងកង, ភ្នំពេញ",
      phone: "023 999 999 / 012 345 678",
      highlights: "ទីស្នាក់ការរដ្ឋបាលកណ្តាល • បណ្ណាល័យធំ • សាលសន្និសីទ • មន្ទីរពិសោធន៍",
    },
    {
      img: "BIU2.png",
      name: "ទីតាំងទី២ (ចោមចៅ)",
      en: "Campus 2 (Chaom Chau)",
      location: "ផ្លូវជាតិលេខ3, សង្កាត់ចោមចៅ, ខណ្ឌពោធិ៍សែនជ័យ, ភ្នំពេញ",
      phone: "023 888 888 / 011 222 333",
      highlights: "បរិវេណធំទូលាយ • មជ្ឈមណ្ឌលកីឡា • បន្ទប់ពិសោធន៍ • អាហារដ្ឋានទំនើប",
    },
    {
      img: "BIU3.png",
      name: "គម្រោងទី៣ (ទួលពង្រ)",
      en: "Campus 3 Project (Tuol Pongro)",
      location: "ផ្លូវទួលពង្រ, ខណ្ឌដង្កោ, រាជធានីភ្នំពេញ",
      phone: "023 777 777 / 016 444 555",
      highlights: "អគារសិក្សាទំនើបកម្រិតអន្តរជាតិ • អន្តេវាសិកដ្ឋាននិស្សិត",
    },
    {
      img: "bb1.png",
      name: "ទីស្នាក់ការកណ្តាល ប៊ែលធី គ្រុប",
      en: "BELTEI Group Headquarters",
      location: "រាជធានីភ្នំពេញ, ព្រះរាជាណាចក្រកម្ពុជា",
      phone: "023 999 999",
      highlights: "ការគ្រប់គ្រងទូទៅ • ទំនាក់ទំនងអន្តរជាតិ • ការិយាល័យអាហារូបករណ៍",
    },
  ];

  const faqs = [
    {
      q: "តើសាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ ត្រូវបានទទួលស្គាល់ជាផ្លូវការឬទេ?",
      a: "សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ ត្រូវបានទទួលស្គាល់ពេញលេញដោយរាជរដ្ឋាភិបាលកម្ពុជា តាមរយៈអនុក្រឹត្យលេខ ៩៧ អនក្រ.បក និងទទួលស្គាល់ដោយក្រសួងអប់រំ យុវជន និងកីឡា ព្រមទាំងគណៈកម្មាធិការទទួលស្គាល់គុណភាពអប់រំនៃកម្ពុជា (ACC)។",
    },
    {
      q: "តើសាកលវិទ្យាល័យមានកម្មវិធីសិក្សាជាភាសាអ្វីខ្លះ?",
      a: "យើងខ្ញុំមានផ្តល់ជូនកម្មវិធីសិក្សាជាពីរភាសាគឺ៖ កម្មវិធីសិក្សាជាភាសាជាតិ (Khmer-medium with English enhancement) និងកម្មវិធីសិក្សាអន្តរជាតិ (International English-medium curriculum) សម្រាប់គ្រប់មុខជំនាញ។",
    },
    {
      q: "តើមានកម្មវិធីផ្ទេរការសិក្សាទៅក្រៅប្រទេស (Credit Transfer) ដែរឬទេ?",
      a: "បាទ/ចាស! និស្សិតអាចជ្រើសរើសសិក្សានៅ BELTEI រយៈពេល ១-២ ឆ្នាំ ហើយផ្ទេរក្រេឌីតទៅបន្តការសិក្សានៅសាកលវិទ្យាល័យដៃគូនានានៅ ចក្រភពអង់គ្លេស សហរដ្ឋអាមេរិក អូស្ត្រាលី សិង្ហបុរី និងម៉ាឡេស៊ី។",
    },
    {
      q: "តើមានវេនសិក្សាណាខ្លះសម្រាប់និស្សិត?",
      a: "សាកលវិទ្យាល័យមានបត់បែនតាមពេលវេលារបស់និស្សិត រួមមាន៖ វេនព្រឹក (08:00 - 11:15), វេនរសៀល (02:00 - 05:15), វេនយប់ (05:45 - 08:30) និង វេនចុងសប្តាហ៍ សៅរ៍-អាទិត្យ សម្រាប់អ្នកកំពុងបំពេញការងារ។",
    },
    {
      q: "តើមានឱកាសទទួលបានអាហារូបករណ៍យ៉ាងដូចម្តេច?",
      a: "សាកលវិទ្យាល័យផ្តល់អាហារូបករណ៍ពី ៣០% ដល់ ១០០% សម្រាប់សិស្សនិទ្ទេស A, B, C ក្នុងការប្រឡងបាក់ឌុប សិស្សក្រីក្រមានឆន្ទៈរៀនសូត្រ និងនិស្សិតឆ្នើមប្រចាំឆ្នាំសិក្សានីមួយៗ។",
    },
  ];

  return (
    <div className="uni-page-wrapper">
      {/* ================= HERO HEADER ================= */}
      <section
        className="position-relative text-white py-5"
        style={{
          background: "linear-gradient(135deg, #04142b 0%, #071e3d 50%, #087f8c 100%)",
        }}
      >
        <div className="container py-5 text-center">
          <span className="badge bg-warning text-dark px-3 py-2 fw-bold mb-3">
            🎓 ABOUT BELTEI INTERNATIONAL UNIVERSITY
          </span>

          <h1 className="display-4 fw-bold mb-3 text-white">
            អំពីសាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ
          </h1>

          <p className="lead text-white-50 mx-auto mb-4" style={{ maxWidth: "750px", fontSize: "17px", lineHeight: "1.9" }}>
            គ្រឹះស្ថានឧត្តមសិក្សាឈានមុខគេ ដែលប្តេជ្ញាចិត្តផ្តល់ការអប់រំប្រកបដោយគុណភាពខ្ពស់ ស្របតាមស្តង់ដារជាតិ និងអន្តរជាតិ
            ដើម្បីអភិវឌ្ឍសមត្ថភាព ចំណេះដឹង និងសីលធម៌របស់និស្សិត។
          </p>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link to="/" className="text-white-50 text-decoration-none">
                  <i className="fa fa-home me-1" /> ទំព័រដើម
                </Link>
              </li>
              <li className="breadcrumb-item active text-warning" aria-current="page">
                អំពីសាកលវិទ្យាល័យ
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* ================= OVERVIEW & LEADERSHIP MESSAGE ================= */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="position-relative">
                <img
                  src={image("bb1.png")}
                  alt="BELTEI Building"
                  className="img-fluid rounded-4 shadow-lg w-100"
                  style={{ height: "420px", objectFit: "cover" }}
                />
                <div
                  className="position-absolute p-3 rounded-3 shadow-lg text-white uni-about-year-badge"
                  style={{
                    bottom: "-20px",
                    left: "20px",
                    background: "#071e3d",
                    borderLeft: "5px solid #d49a00",
                  }}
                >
                  <h4 className="fw-bold mb-0 text-warning">2005</h4>
                  <small className="text-white-50">ចាប់ផ្តើមដំណើរការ</small>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <span className="uni-kicker">WHO WE ARE</span>
              <h2 className="uni-section-title mt-2 mb-3">
                ប្រវត្តិសង្ខេប និងការរីកចម្រើន
              </h2>

              <p className="text-secondary mb-3" style={{ lineHeight: "1.9" }}>
                សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ បានចាប់បដិសន្ធិឡើងនៅថ្ងៃទី ៤ ខែសីហា ឆ្នាំ ២០០៥ ដោយផ្តើមចេញពី
                <strong> វិទ្យាស្ថាន ប៊ែលធី អន្តរជាតិ</strong>។ ដោយសារការគាំទ្រយ៉ាងខ្លាំងពីសំណាក់មាតាបិតា អាណាព្យាបាល
                និងសិស្ស-និស្សិត ព្រមទាំងគុណភាពអប់រំដ៏រឹងមាំ វិទ្យាស្ថានត្រូវបានរាជរដ្ឋាភិបាលកម្ពុជាដំឡើងជា
                <strong> សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ</strong> នៅឆ្នាំ ២០១២។
              </p>

              <p className="text-secondary mb-4" style={{ lineHeight: "1.9" }}>
                បច្ចុប្បន្ន សាកលវិទ្យាល័យមាន ១៣ មហាវិទ្យាល័យ និង ៤៥ ជំនាញសិក្សា មានសាខាធំៗចំនួន ៣
                និងអគារសិក្សាទំនើបៗជាច្រើន ដែលបំពាក់ដោយសម្ភារបច្ចេកវិទ្យាទំនើប និងសាស្ត្រាចារ្យជាតិ-អន្តរជាតិល្បីៗ។
              </p>

              <div className="row g-3">
                <div className="col-6">
                  <div className="p-3 rounded-3 bg-light border-start border-4 border-info">
                    <h3 className="fw-bold mb-0 text-dark">១៣+</h3>
                    <small className="text-muted">មហាវិទ្យាល័យទទួលស្គាល់</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 rounded-3 bg-light border-start border-4 border-warning">
                    <h3 className="fw-bold mb-0 text-dark">៤៥+</h3>
                    <small className="text-muted">មុខជំនាញឯកទេស</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VISION, MISSION & VALUES ================= */}
      <section className="py-5" style={{ background: "#f8fafc" }}>
        <div className="container py-4">
          <div className="text-center uni-section-header">
            <span className="uni-kicker">OUR FOUNDATION</span>
            <h2 className="uni-section-title">ចក្ខុវិស័យ បេសកកម្ម និងគុណតម្លៃ</h2>
            <p className="uni-section-subtitle">
              គោលការណ៍គ្រឹះដែលដឹកនាំដំណើរការអប់រំ និងការអភិវឌ្ឍធនធានមនុស្សនៅសាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ
            </p>
          </div>

          <div className="row g-4 mb-5">
            {/* Vision */}
            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4 p-md-5" style={{ background: "#ffffff", borderTop: "5px solid #087f8c" }}>
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "60px", height: "60px", background: "#e5f8fa", color: "#087f8c", fontSize: "24px" }}
                >
                  <i className="fa fa-eye" />
                </div>
                <h4 className="fw-bold text-dark mb-3">ចក្ខុវិស័យ (Vision)</h4>
                <p className="text-secondary mb-0" style={{ lineHeight: "1.9", fontSize: "15.5px" }}>
                  សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ នឹងក្លាយជាគ្រឹះស្ថានឧត្តមសិក្សាឈានមុខគេមួយនៅកម្ពុជា និងក្នុងតំបន់អាស៊ីអាគ្នេយ៍
                  ដែលផ្តល់ការអប់រំកម្រិតឧត្តមសិក្សាប្រកបដោយគុណភាពខ្ពស់ ស្របតាមស្តង់ដារអន្តរជាតិ
                  និងត្រូវបានទទួលស្គាល់ជាសកល។
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4 p-md-5" style={{ background: "#ffffff", borderTop: "5px solid #d49a00" }}>
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "60px", height: "60px", background: "#fef7e6", color: "#d49a00", fontSize: "24px" }}
                >
                  <i className="fa fa-bullseye" />
                </div>
                <h4 className="fw-bold text-dark mb-3">បេសកកម្ម (Mission)</h4>
                <p className="text-secondary mb-0" style={{ lineHeight: "1.9", fontSize: "15.5px" }}>
                  បណ្តុះបណ្តាលសិស្ស-និស្សិតឱ្យមានចំណេះដឹងទូលំទូលាយ ជំនាញវិជ្ជាជីវៈច្បាស់លាស់ ស្មារតីស្រាវជ្រាវ
                  សមត្ថភាពប្រើប្រាស់បច្ចេកវិទ្យាព័ត៌មាន ភាសាបរទេស សីលធម៌ គុណធម៌ និងស្មារតីទទួលខុសត្រូវខ្ពស់
                  ដើម្បីចូលរួមអភិវឌ្ឍសង្គមជាតិ និងប្រកួតប្រជែងក្នុងទីផ្សារការងារសកល។
                </p>
              </div>
            </div>
          </div>

          {/* Core Values 5 */}
          <div className="text-center mb-4">
            <h4 className="fw-bold text-dark">គុណតម្លៃស្នូលទាំង ៥ យ៉ាង (5 Core Values)</h4>
          </div>

          <div className="row g-3">
            {coreValues.map((v, idx) => (
              <div className="col-md-6 col-lg" key={idx}>
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center" style={{ background: "#ffffff" }}>
                  <div
                    className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "55px",
                      height: "55px",
                      background: `${v.color}15`,
                      color: v.color,
                      fontSize: "22px",
                    }}
                  >
                    <i className={`fa ${v.icon}`} />
                  </div>
                  <h6 className="fw-bold text-dark mb-2">{v.title}</h6>
                  <p className="text-secondary small mb-0" style={{ lineHeight: "1.7" }}>
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TIMELINE / MILESTONES ================= */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="text-center uni-section-header">
            <span className="uni-kicker">OUR JOURNEY</span>
            <h2 className="uni-section-title">ដំណាក់កាលអភិវឌ្ឍន៍ និងសមិទ្ធផល</h2>
            <p className="uni-section-subtitle">
              ដំណើរឆ្ពោះទៅរកឧត្តមភាពនៃការអប់រំឧត្តមសិក្សាពីឆ្នាំ ២០០៥ រហូតមកដល់បច្ចុប្បន្ន
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="uni-timeline">
                {milestones.map((m, idx) => (
                  <div className="uni-timeline-item" key={idx}>
                    <div className="uni-timeline-badge">
                      <i className={`fa ${m.icon}`} />
                    </div>
                    <div className="uni-timeline-card">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="uni-timeline-year">{m.year}</span>
                        <span className="badge bg-light text-muted border">MILESTONE</span>
                      </div>
                      <h5 className="fw-bold text-dark mb-2">{m.title}</h5>
                      <p className="text-secondary small mb-0" style={{ lineHeight: "1.8" }}>
                        {m.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INTERNATIONAL PARTNERSHIPS ================= */}
      <section className="py-5" style={{ background: "linear-gradient(135deg, #071e3d 0%, #0a2952 100%)", color: "#ffffff" }}>
        <div className="container py-4">
          <div className="text-center uni-section-header">
            <span className="badge bg-warning text-dark px-3 py-2 fw-bold mb-2">
              GLOBAL RECOGNITION
            </span>
            <h2 className="uni-section-title text-white">
              កិច្ចសហប្រតិបត្តិការអន្តរជាតិ
            </h2>
            <p className="uni-section-subtitle text-white-50">
              សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ បានចុះអនុស្សរណៈនៃការយោគយល់ (MoU) ជាមួយសាកលវិទ្យាល័យល្បីៗលើពិភពលោក
            </p>
          </div>

          <div className="row g-4">
            {partners.map((p, idx) => (
              <div className="col-md-6 col-lg-4" key={idx}>
                <div
                  className="p-4 rounded-4 h-100 d-flex align-items-center gap-3"
                  style={{
                    background: "rgba(255, 255, 255, 0.07)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                  }}
                >
                  <span style={{ fontSize: "36px" }}>{p.flag}</span>
                  <div>
                    <h6 className="fw-bold text-white mb-1">{p.country}</h6>
                    <small className="text-white-50">{p.name}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-4 text-center" style={{ background: "rgba(212, 154, 0, 0.15)", border: "1px solid rgba(212, 154, 0, 0.3)" }}>
            <h6 className="fw-bold text-warning mb-1">
              <i className="fa fa-handshake me-2" /> កម្មវិធីផ្លាស់ប្តូរការសិក្សា និងផ្ទេរក្រេឌីត (Credit Transfer)
            </h6>
            <small className="text-white-50">
              និស្សិតអាចបន្តការសិក្សានៅក្រៅប្រទេស និងទទួលបានសញ្ញាបត្រពីរ (Dual Degree) ពីសាកលវិទ្យាល័យដៃគូ។
            </small>
          </div>
        </div>
      </section>

      {/* ================= CAMPUSES SHOWCASE ================= */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="text-center uni-section-header">
            <span className="uni-kicker">CAMPUSES & INFRASTRUCTURE</span>
            <h2 className="uni-section-title">ទីតាំងសាខា និងបរិក្ខារសិក្សា</h2>
            <p className="uni-section-subtitle">
              អគារសិក្សាផ្ទាល់ខ្លួនធំទូលាយ បរិយាកាសសិក្សាស្រស់បំព្រង និងបំពាក់ដោយបរិក្ខារទំនើបៗ
            </p>
          </div>

          <div className="row g-4">
            {campuses.map((c, idx) => (
              <div className="col-md-6 col-lg-3" key={idx}>
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                  <img
                    src={image(c.img)}
                    alt={c.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <span className="badge bg-light text-dark border align-self-start mb-2">
                      0{idx + 1}
                    </span>
                    <h6 className="fw-bold text-dark mb-1">{c.name}</h6>
                    <small className="text-muted mb-2 d-block">{c.en}</small>

                    <p className="small text-secondary mb-2">
                      <i className="fa fa-map-marker-alt text-danger me-2" />
                      {c.location}
                    </p>

                    <small className="text-info mt-auto">
                      <i className="fa fa-check-circle me-1" />
                      {c.highlights}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-5" style={{ background: "#f8fafc" }}>
        <div className="container py-4">
          <div className="text-center uni-section-header">
            <span className="uni-kicker">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="uni-section-title">សំណួរដែលសួរញឹកញាប់</h2>
            <p className="uni-section-subtitle">
              ចម្លើយសម្រាប់ចម្ងល់ទូទៅអំពីការចុះឈ្មោះ កម្មវិធីសិក្សា និងអាហារូបករណ៍
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="d-flex flex-column gap-3">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="card border-0 shadow-sm rounded-3 overflow-hidden"
                    style={{ background: "#ffffff" }}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
                      className="w-100 text-start p-3 p-md-4 border-0 bg-transparent d-flex align-items-center justify-content-between"
                    >
                      <span className="fw-bold text-dark" style={{ fontSize: "15px" }}>
                        <i className="fa fa-question-circle text-info me-2" />
                        {faq.q}
                      </span>
                      <i
                        className={`fa fa-chevron-${activeFaq === idx ? "up" : "down"} text-muted ms-3`}
                      />
                    </button>

                    {activeFaq === idx && (
                      <div className="px-3 px-md-4 pb-4 pt-1 border-top">
                        <p className="text-secondary small mb-0" style={{ lineHeight: "1.9", fontSize: "14px" }}>
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section
        className="py-5 text-center text-white"
        style={{
          background: "linear-gradient(135deg, #071e3d 0%, #087f8c 100%)",
        }}
      >
        <div className="container py-4">
          <h2 className="display-6 fw-bold mb-3 text-white">
            ចូលរួមជាផ្នែកមួយនៃសាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ
          </h2>
          <p className="lead text-white-50 mx-auto mb-4" style={{ maxWidth: "600px" }}>
            កសាងចំណេះដឹង ជំនាញ និងអនាគតរបស់អ្នកជាមួយយើងខ្ញុំថ្ងៃនេះ។
          </p>

          <div className="d-flex justify-content-center flex-wrap gap-3">
            <Link to="/service" className="uni-btn-primary">
              <i className="fa fa-graduation-cap" />
              <span>មើលកម្មវិធីសិក្សា និងសេវាកម្ម</span>
            </Link>
            <Link to="/contact" className="uni-btn-secondary">
              <i className="fa fa-envelope" />
              <span>ទាក់ទងមកកាន់យើងខ្ញុំ</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}