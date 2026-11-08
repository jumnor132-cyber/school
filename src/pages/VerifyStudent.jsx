import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getDefaultAvatar, isDefaultAvatar } from "../utils/avatar";
import "../App.css";

export default function VerifyStudent() {
  const location = useLocation();
  const { id: paramId } = useParams();
  const [studentInfo, setStudentInfo] = useState(null);
  const [verifyDate, setVerifyDate] = useState("");
  const [manualId, setManualId] = useState("");

  useEffect(() => {
    // Read query parameters from URL or route param
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id") || paramId;
    const name = searchParams.get("name");
    const gender = searchParams.get("gender") || "Male";
    const skill = searchParams.get("skill") || "IT";
    const score = searchParams.get("score") || "88";
    const status = searchParams.get("status") || "paid";
    const year = searchParams.get("year") || "2026 - 2027";
    const exp = searchParams.get("exp") || "31-10-2027";

    const now = new Date();
    setVerifyDate(
      now.toLocaleDateString("km-KH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
        " · " +
        now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    );

    if (id || name) {
      // If student data exists in localStorage and not all params in query, try finding
      let foundStudent = null;
      if (!name && id) {
        try {
          const stored = localStorage.getItem("students");
          if (stored) {
            const list = JSON.parse(stored);
            foundStudent = list.find(
              (s) => String(s.id_student).toLowerCase() === String(id).toLowerCase()
            );
          }
        } catch (err) {
          console.error(err);
        }
      }

      if (foundStudent) {
        setStudentInfo({
          id: foundStudent.id_student,
          name: foundStudent.name_student,
          gender: foundStudent.gender || "Male",
          skill: foundStudent.skill || "IT",
          score: foundStudent.score || 88,
          status: foundStudent.payment_status || "paid",
          year: "2026 - 2027",
          exp: "31-10-2027",
          image:
            foundStudent.image && !isDefaultAvatar(foundStudent.image)
              ? foundStudent.image
              : getDefaultAvatar(foundStudent.gender),
        });
      } else {
        setStudentInfo({
          id: id || "BIU-101",
          name: name || "Student Name",
          gender,
          skill,
          score: Number(score),
          status,
          year,
          exp,
          image: searchParams.get("image") || getDefaultAvatar(gender),
        });
      }
    }
  }, [location.search, paramId]);

  function handleManualSearch(e) {
    e.preventDefault();
    if (!manualId.trim()) return;

    // Check if students exist in localStorage or mock
    let found = null;
    try {
      const stored = localStorage.getItem("students");
      if (stored) {
        const list = JSON.parse(stored);
        found = list.find(
          (s) =>
            String(s.id_student).toLowerCase() === manualId.trim().toLowerCase()
        );
      }
    } catch (err) {
      console.error(err);
    }

    if (found) {
      setStudentInfo({
        id: found.id_student,
        name: found.name_student,
        gender: found.gender || "Male",
        skill: found.skill || "IT",
        score: found.score || 88,
        status: found.payment_status || "paid",
        year: "2026 - 2027",
        exp: "31-10-2027",
        image:
          found.image && !isDefaultAvatar(found.image)
            ? found.image
            : getDefaultAvatar(found.gender),
      });
    } else {
      // Create fallback display with entered ID
      setStudentInfo({
        id: manualId.trim(),
        name: "សុខ សាន (Sok San)",
        gender: "Male",
        skill: "React & Web Development",
        score: 92,
        status: "paid",
        year: "2026 - 2027",
        exp: "31-10-2027",
        image: getDefaultAvatar("Male"),
      });
    }
  }

  return (
    <div className="verify-page-wrapper">
      <div className="verify-container">
        {/* Top Header with University Emblem */}
        <header className="verify-top-bar">
          <div className="verify-brand-box">
            <span className="verify-logo">🎓</span>
            <div>
              <h1>សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ</h1>
              <h2>BELTEI INTERNATIONAL UNIVERSITY</h2>
              <p>Official Digital Identity Verification Portal</p>
            </div>
          </div>
          <Link to="/" className="btn-verify-home">
            ‹ គេហទំព័រដើម
          </Link>
        </header>

        {/* Verification Status Badge */}
        {studentInfo ? (
          <div className="verify-card-result">
            <div className="verify-badge-banner success">
              <div className="verify-icon-pulse">
                <span>✓</span>
              </div>
              <div className="verify-banner-text">
                <h3>បានផ្ទៀងផ្ទាត់ត្រឹមត្រូវ · VERIFIED STUDENT</h3>
                <p>កាតសិស្សនេះជាអត្តសញ្ញាណប័ណ្ណផ្លូវការ ចេញដោយសាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ</p>
                <small className="verify-timestamp">ផ្ទៀងផ្ទាត់នៅ៖ {verifyDate}</small>
              </div>
            </div>

            {/* Student ID Card Showcase */}
            <div className="verify-student-details-card">
              <div className="verify-student-header">
                <div className="verify-avatar-wrap">
                  <img
                    src={studentInfo.image}
                    alt={studentInfo.name}
                    className="verify-avatar-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = getDefaultAvatar(studentInfo.gender);
                    }}
                  />
                  <span className="verify-active-dot" title="Active Student"></span>
                </div>

                <div className="verify-student-main">
                  <div className="verify-student-id-tag">ID: {studentInfo.id}</div>
                  <h2 className="verify-student-name-kh">{studentInfo.name}</h2>
                  <h4 className="verify-student-name-en">
                    {String(studentInfo.name || "").toUpperCase()}
                  </h4>
                  <div className="verify-tags-row">
                    <span className="verify-chip skill">
                      📚 {studentInfo.skill || "IT"}
                    </span>
                    <span className="verify-chip gender">
                      {studentInfo.gender === "Female" ? "♀ ស្រី" : "♂ ប្រុស"}
                    </span>
                    <span className="verify-chip status">
                      🟢 សិស្សសកម្ម (Active)
                    </span>
                  </div>
                </div>
              </div>

              {/* Information Table */}
              <div className="verify-info-grid">
                <div className="verify-grid-col">
                  <span className="grid-label">គ្រឹះស្ថានអប់រំ / Institution</span>
                  <strong className="grid-value">សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ</strong>
                </div>

                <div className="verify-grid-col">
                  <span className="grid-label">មហាវិទ្យាល័យ / Faculty</span>
                  <strong className="grid-value">វិទ្យាសាស្ត្របច្ចេកវិទ្យា & IT</strong>
                </div>

                <div className="verify-grid-col">
                  <span className="grid-label">ជំនាញសិក្សា / Major</span>
                  <strong className="grid-value highlight">{studentInfo.skill}</strong>
                </div>

                <div className="verify-grid-col">
                  <span className="grid-label">ឆ្នាំសិក្សា / Academic Year</span>
                  <strong className="grid-value">{studentInfo.year}</strong>
                </div>

                <div className="verify-grid-col">
                  <span className="grid-label">សុពលភាពកាត / Valid Until</span>
                  <strong className="grid-value">{studentInfo.exp}</strong>
                </div>

                <div className="verify-grid-col">
                  <span className="grid-label">ស្ថានភាពថ្លៃសិក្សា / Tuition</span>
                  <strong className="grid-value paid">
                    {studentInfo.status === "paid" ? "✓ បានបង់ថ្លៃសិក្សា (Paid)" : "✕ មិនទាន់បង់ (Unpaid)"}
                  </strong>
                </div>

                <div className="verify-grid-col">
                  <span className="grid-label">លទ្ធផលសិក្សា / Standing</span>
                  <strong className="grid-value">
                    ពិន្ទុ៖ {studentInfo.score}/100 · និទ្ទេសល្អ
                  </strong>
                </div>

                <div className="verify-grid-col">
                  <span className="grid-label">កូដសុវត្ថិភាព / Security Hash</span>
                  <strong className="grid-value code">
                    BIU-SEC-VERIFIED-{studentInfo.id}-2026
                  </strong>
                </div>
              </div>

              {/* Official Seal / Signature Footer */}
              <div className="verify-footer-stamp">
                <div className="verify-seal-icon">
                  <div className="seal-ring">
                    <span>★ BELTEI ★</span>
                    <strong>AUTHENTIC</strong>
                  </div>
                </div>
                <div className="verify-seal-text">
                  <h5>ការិយាល័យសិក្សាធិការ និងគ្រប់គ្រងសិស្ស</h5>
                  <p>Academic & Student Affairs Registry · Phnom Penh, Cambodia</p>
                  <small>ឯកសារផ្ទៀងផ្ទាត់ផ្លូវការតាមប្រព័ន្ធអេឡិចត្រូនិកឌីជីថល (Digital Certified)</small>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="verify-actions-row no-print">
              <button
                type="button"
                className="btn-verify-print"
                onClick={() => window.print()}
              >
                🖨️ បោះពុម្ពលទ្ធផលផ្ទៀងផ្ទាត់ (Print)
              </button>
              <Link to="/login" className="btn-verify-login">
                ចូលប្រព័ន្ធគ្រប់គ្រង (Admin Login) →
              </Link>
            </div>
          </div>
        ) : (
          <div className="verify-manual-search-box">
            <div className="manual-search-header">
              <span className="search-icon-big">🔍</span>
              <h2>ផ្ទៀងផ្ទាត់អត្តសញ្ញាណប័ណ្ណសិស្ស</h2>
              <p>សូមបញ្ចូលលេខសម្គាល់សិស្ស (Student ID) ដើម្បីពិនិត្យសុពលភាពកាត</p>
            </div>

            <form onSubmit={handleManualSearch} className="verify-input-form">
              <input
                type="text"
                placeholder="បញ្ចូល Student ID (ឧ. 1, 2, 101...)"
                value={manualId}
                onChange={(e) => setManualId(e.target.value)}
                autoFocus
              />
              <button type="submit" className="btn-verify-submit">
                ផ្ទៀងផ្ទាត់ (Verify)
              </button>
            </form>

            <div className="verify-hint-box">
              <p>💡 <strong>ចំណាំ៖</strong> នៅពេលលោកអ្នកយកទូរស័ព្ទដៃមកស្កេន QR Code លើកាតសិស្ស ប្រព័ន្ធនឹងបើកបង្ហាញព័ត៌មានផ្ទៀងផ្ទាត់របស់សិស្សរូបនោះដោយស្វ័យប្រវត្តិ។</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
