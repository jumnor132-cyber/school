import React, { useEffect, useMemo, useState } from "react";
import "../App.css";

const BASE_URL = process.env.REACT_APP_API_URL || "https://student-backend-1gcn.onrender.com";

const API_URL = `${BASE_URL}/student_API.php`;
const DELETE_URL = `${BASE_URL}/delete.php`;
const UPDATE_URL = `${BASE_URL}/update.php`;
const LOGIN_URL = `${BASE_URL}/login.php`;
const LOGOUT_URL = `${BASE_URL}/logout.php`;
const SESSION_URL = `${BASE_URL}/check_session.php`;
const PAGE_SIZE = 10;

const emptyStudent = {
  name_student: "",
  id_student: "",
  age_student: "",
  gender: "Male",
  telegram: "",
  facebook: "",
  skill: "HTML",
  salary: "",
  place: "",
};

const skills = ["HTML", "CSS", "JavaScript", "React", "PHP", "MySQL"];

function readActivity() {
  try {
    return JSON.parse(localStorage.getItem("studentActivity") || "[]");
  } catch {
    return [];
  }
}

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [students, setStudents] = useState([]);
  const [studentForm, setStudentForm] = useState({ ...emptyStudent });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [search, setSearch] = useState("");
  const [filterSkill, setFilterSkill] = useState("All");
  const [filterGender, setFilterGender] = useState("All");
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [serchsalary, setSerchsalary] = useState("");

  const [activity, setActivity] = useState(readActivity);
  const [showActivity, setShowActivity] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profileName, setProfileName] = useState(
    localStorage.getItem("adminName") || "Administrator"
  );

  // CHECK SESSION
  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      setCheckingSession(true);

      try {
        const response = await fetch(SESSION_URL, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
 
        if (cancelled) return;

        if (response.ok && data.success === true) {
          const adminName =
            data.admin?.full_name || "Administrator";

          setIsLoggedIn(true);
          setProfileName(adminName);
          localStorage.setItem("adminName", adminName);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Session check failed:", err);
          setIsLoggedIn(false);
        }
      } finally {
        if (!cancelled) {
          setCheckingSession(false);
        }
      }
    }

    checkSession();

    return () => {
      cancelled = true;
    };
  }, []);

  // LOGIN
  async function handleLogin(e) {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok || data.success !== true) {
        throw new Error(
          data.message || "Username ឬ Password មិនត្រឹមត្រូវទេ!"
        );
      }

      const adminName = data.admin?.full_name || username;

      localStorage.setItem("adminName", adminName);
      setProfileName(adminName);
      setIsLoggedIn(true);
      setUsername("");
      setPassword("");
      setLoginError("");
    } catch (err) {
      setLoginError(
        err.message === "Failed to fetch"
          ? "មិនអាចភ្ជាប់ទៅ PHP បានទេ។ សូមពិនិត្យ XAMPP និង CORS។"
          : err.message
      );
    } finally {
      setLoginLoading(false);
    }
  }

  // ACTIVITY LOG
  function logActivity(action, studentName) {
    const item = {
      id: Date.now(),
      action,
      studentName: studentName || "-",
      admin: profileName,
      time: new Date().toLocaleString(),
    };

    setActivity((previous) => {
      const next = [item, ...previous].slice(0, 100);
      localStorage.setItem("studentActivity", JSON.stringify(next));
      return next;
    });
  }

  // LOGOUT
  async function handleLogout() {
    try {
      await fetch(LOGOUT_URL, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("adminName");

      setIsLoggedIn(false);
      setUsername("");
      setPassword("");
      setShowForm(false);
      setSelectedStudent(null);
      setMessage("");
      setError("");
      setLoginError("");
    }
  }
    // LOAD STUDENTS
  async function loadStudents() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok || data.success !== true) {
        if (response.status === 401) {
          setIsLoggedIn(false);
          localStorage.removeItem("adminName");
          throw new Error("Session ផុតកំណត់។ សូម Login ម្ដងទៀត។");
        }

        throw new Error(data.message || "Cannot load students");
      }

      setStudents(data.students || []);
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "មិនអាចភ្ជាប់ទៅ PHP API បានទេ។ សូមពិនិត្យ XAMPP និង CORS។"
          : err.message || "មិនអាចទាញទិន្នន័យបានទេ។"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      loadStudents();
    } else {
      setStudents([]);
    }
  }, [isLoggedIn]);

  // ADD STUDENT
  function openAddForm() {
    setStudentForm({ ...emptyStudent });
    setEditingId(null);
    setShowForm(true);
    setMessage("");
    setError("");
  }

  // EDIT STUDENT
  function openEditForm(student) {
    setStudentForm({
      ...emptyStudent,
      ...student,
      name_student: student.name_student || "",
      id_student: String(student.id_student ?? ""),
      age_student: student.age_student || "",
      gender: student.gender || "Male",
      telegram: student.telegram || "",
      facebook: student.facebook || "",
      skill: student.skill || "HTML",
      salary: student.salary || "",
      place: student.place || "",
    });

    setEditingId(student.id_student);
    setShowForm(true);
    setSelectedStudent(null);
    setMessage("");
    setError("");
  }

  function handleInputChange(e) {
    const { name, value } = e.target;

    setStudentForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // ADD / UPDATE
  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    if (
      !studentForm.name_student.trim() ||
      !String(studentForm.id_student).trim() ||
      !studentForm.age_student
    ) {
      setError("សូមបញ្ចូលឈ្មោះ លេខសម្គាល់ និងអាយុ!");
      return;
    }

    setSaving(true);
    const isEditing = editingId !== null;
    const url = isEditing ? UPDATE_URL : API_URL;

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...studentForm,
          original_id_student: editingId,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.success !== true) {
        if (response.status === 401) {
          setIsLoggedIn(false);
          localStorage.removeItem("adminName");
        }

        throw new Error(data.message || "Cannot save student");
      }

      const studentName = studentForm.name_student;

      setShowForm(false);
      setStudentForm({ ...emptyStudent });
      setEditingId(null);
      setMessage(
        isEditing
          ? "បានកែប្រែព័ត៌មានសិស្សជោគជ័យ!"
          : "បានបន្ថែមសិស្សជោគជ័យ!"
      );

      logActivity(
        isEditing ? "Updated student" : "Added student",
        studentName
      );

      await loadStudents();
    } catch (err) {
      setError(err.message || "មិនអាចរក្សាទុកទិន្នន័យបានទេ។");
    } finally {
      setSaving(false);
    }
  }

  // DELETE STUDENT
  async function handleDelete(student) {
    if (
      !window.confirm(
        `តើអ្នកប្រាកដថាចង់លុប ${student.name_student} មែនទេ?`
      )
    ) {
      return;
    }

    setError("");
    setMessage("");

    try {
      const response = await fetch(DELETE_URL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_student: student.id_student,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.success !== true) {
        if (response.status === 401) {
          setIsLoggedIn(false);
          localStorage.removeItem("adminName");
        }

        throw new Error(data.message || "Delete failed");
      }

      setMessage("បានលុបសិស្សជោគជ័យ!");
      setSelectedStudent(null);
      logActivity("Deleted student", student.name_student);
      await loadStudents();
    } catch (err) {
      setError(err.message || "មិនអាចលុបសិស្សបានទេ។");
    }
  }

  // SEARCH AND FILTER
  const filteredStudents = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return students.filter((student) => {
      const matchesSearch = [
        student.name_student,
        student.id_student,
        student.age_student,
        student.gender,
        student.telegram,
        student.facebook,
        student.skill,
        student.place,
      ].some((value) =>
        String(value ?? "").toLowerCase().includes(keyword)
      );

      const matchesSkill =
        filterSkill === "All" ||
        String(student.skill || "").toLowerCase() ===
          filterSkill.toLowerCase();

      const matchesGender =
        filterGender === "All" ||
        String(student.gender || "").toLowerCase() ===
          filterGender.toLowerCase();

      return matchesSearch && matchesSkill && matchesGender;
    });
  }, [students, search, filterSkill, filterGender]);

  // PAGINATION
  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / PAGE_SIZE)
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    setPage(1);
  }, [search, filterSkill, filterGender]);

  // STATISTICS
  const totalSalary = students.reduce(
    (total, student) => total + Number(student.salary || 0),
    0
  );

  const totalMale = students.filter(
    (student) =>
      String(student.gender || "").toLowerCase() === "male"
  ).length;

  const totalFemale = students.filter(
    (student) =>
      String(student.gender || "").toLowerCase() === "female"
  ).length;

  const totalSkills = new Set(
    students.map((student) => student.skill).filter(Boolean)
  ).size;

  // EXPORT CSV
  function exportCSV() {
    if (filteredStudents.length === 0) {
      setError("គ្មានទិន្នន័យសម្រាប់ Export ទេ!");
      return;
    }

    const headers = [
      "Student Name",
      "Student ID",
      "Age",
      "Gender",
      "Telegram",
      "Facebook",
      "Skill",
      "Salary",
      "Place",
    ];

    const rows = filteredStudents.map((s) => [
      s.name_student,
      s.id_student,
      s.age_student,
      s.gender,
      s.telegram,
      s.facebook,
      s.skill,
      s.salary,
      s.place,
    ]);

    const escapeCSV = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csv =
      "\uFEFF" +
      [headers, ...rows]
        .map((row) => row.map(escapeCSV).join(","))
        .join("\r\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "students.csv";
    link.click();
    URL.revokeObjectURL(url);

    setMessage("បាន Export ទិន្នន័យទៅ CSV ជោគជ័យ!");
    logActivity(
      "Exported student CSV",
      `${filteredStudents.length} records`
    );
  }

  // ADMIN PROFILE
  function saveProfile(e) {
    e.preventDefault();

    const name = profileName.trim();

    if (!name) {
      setError("សូមបញ្ចូលឈ្មោះ Admin!");
      return;
    }

    localStorage.setItem("adminName", name);
    setProfileName(name);
    setShowProfile(false);
    setMessage("បានកែប្រែឈ្មោះបង្ហាញរបស់ Admin!");
    logActivity("Updated profile", name);
  }
    // SESSION CHECKING SCREEN
  if (checkingSession) {
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="login-logo">🎓</div>
          <h1>BELTEI</h1>
          <p className="login-subtitle">Student Management System</p>
          <p>កំពុងរៀបចំទំព័រ Login...</p>
        </div>
      </div>
    );
  }

  // LOGIN PAGE
  if (!isLoggedIn) {
    return (
      <div className="login-page">
        <form className="login-card" onSubmit={handleLogin}>
          <div className="login-logo">🎓</div>
          <h1>BELTEI</h1>
          <p className="login-subtitle">Student Management System</p>

          <h2>Welcome Back!</h2>
          <p className="login-description">
            Please login to your account.
          </p>

          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            autoComplete="username"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            autoComplete="current-password"
            required
          />

          {loginError && (
            <p className="login-error">{loginError}</p>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loginLoading}
          >
            {loginLoading ? "Logging in..." : "Login to Dashboard"}
          </button>

          <p className="login-footer">
            Secure administrator login
          </p>
        </form>
      </div>
    );
  }

  // DASHBOARD
  return (
    <main className="student-page">
      <aside className="student-sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-logo">🎓</span>
          <div>
            <h2>BELTEI</h2>
            <p>Student System</p>
          </div>
        </div>

        <nav className="sidebar-menu">
          <a href="#dashboard" className="sidebar-link active">
            <span>▦</span> Dashboard
          </a>

          <a href="#students" className="sidebar-link">
            <span>♙</span> Students
          </a>

          <button
            type="button"
            className="sidebar-link sidebar-add-link"
            onClick={openAddForm}
          >
            <span>＋</span> Add Student
          </button>

          <button
            type="button"
            className="sidebar-link"
            onClick={() => setShowActivity(!showActivity)}
          >
            <span>◷</span> Activity Log
            {activity.length > 0 && (
              <span className="activity-count">{activity.length}</span>
            )}
          </button>

          <button
            type="button"
            className="sidebar-link"
            onClick={() => setShowProfile(true)}
          >
            <span>♙</span> Admin Profile
          </button>
        </nav>

        <div className="sidebar-bottom">
          <p>Logged in as {profileName}</p>
          <button
            type="button"
            className="logout-btn"
            onClick={handleLogout}
          >
            ↪ Logout
          </button>
        </div>
      </aside>

      <section className="student-main" id="dashboard">
        <header className="dashboard-topbar">
          <div>
            <h1>Dashboard Overview</h1>
            <p>Welcome back, {profileName}!</p>
          </div>

          <button
            type="button"
            className="refresh-btn"
            onClick={loadStudents}
            disabled={loading}
          >
            ↻ {loading ? "Loading..." : "Refresh"}
          </button>
        </header>

        {error && (
          <div className="dashboard-alert error">
            {error}
            <button type="button" onClick={() => setError("")}>
              ✕
            </button>
          </div>
        )}

        {message && (
          <div className="dashboard-alert success">
            {message}
            <button type="button" onClick={() => setMessage("")}>
              ✕
            </button>
          </div>
        )}

        <section className="student-stats">
          <div className="stat-card">
            <div className="stat-icon purple">♙</div>
            <div>
              <p>Total Students</p>
              <h2>{students.length}</h2>
              <small>Database records</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon pink">♂</div>
            <div>
              <p>Male Students</p>
              <h2>{totalMale}</h2>
              <small>Male records</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon blue">♀</div>
            <div>
              <p>Female Students</p>
              <h2>{totalFemale}</h2>
              <small>Female records</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">$</div>
            <div>
              <p>Total Salary</p>
              <h2>
                ${totalSalary.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}
              </h2>
              <small>{totalSkills} skill types</small>
            </div>
          </div>
        </section>

        <section className="analytics-card">
          <div className="section-title">
            <div>
              <h2>Skills Overview</h2>
              <p>Student count by skill</p>
            </div>
          </div>

          {skills.map((skill) => {
            const count = students.filter(
              (s) =>
                String(s.skill || "").toLowerCase() ===
                skill.toLowerCase()
            ).length;

            const percent = students.length
              ? (count / students.length) * 100
              : 0;

            return (
              <div className="skill-chart-row" key={skill}>
                <div className="skill-chart-label">
                  <span>{skill}</span>
                  <strong>{count}</strong>
                </div>

                <div className="skill-chart-track">
                  <div
                    className="skill-chart-fill"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </section>

        {showForm && (
          <section className="student-form-card" id="student-form">
            <div className="form-card-header">
              <div>
                <h2>
                  {editingId !== null
                    ? "Edit Student"
                    : "Add New Student"}
                </h2>
                <p>Enter the student information below.</p>
              </div>

              <button
                type="button"
                className="close-form-btn"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setStudentForm({ ...emptyStudent });
                }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="student-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Student Name *</label>
                  <input
                    name="name_student"
                    value={studentForm.name_student}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Student ID *</label>
                  <input
                    name="id_student"
                    value={studentForm.id_student}
                    onChange={handleInputChange}
                    required
                    disabled={editingId !== null}
                  />
                </div>

                <div className="form-group">
                  <label>Age *</label>
                  <input
                    type="number"
                    min="1"
                    name="age_student"
                    value={studentForm.age_student}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={studentForm.gender}
                    onChange={handleInputChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Telegram</label>
                  <input
                    name="telegram"
                    value={studentForm.telegram}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Facebook</label>
                  <input
                    name="facebook"
                    value={studentForm.facebook}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Skill *</label>
                  <select
                    name="skill"
                    value={studentForm.skill}
                    onChange={handleInputChange}
                    required
                  >
                    {skills.map((skill) => (
                      <option key={skill} value={skill}>
                        {skill}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Salary ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="salary"
                    value={studentForm.salary}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Place</label>
                  <input
                    name="place"
                    value={studentForm.place}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId !== null
                    ? "Update Student"
                    : "Save Student"}
                </button>
              </div>
            </form>
          </section>
        )}

        {showActivity && (
          <section className="analytics-card">
            <div className="section-title">
              <div>
                <h2>Recent Activity</h2>
                <p>Activity saved in this browser</p>
              </div>

              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  if (window.confirm("Clear activity history?")) {
                    localStorage.removeItem("studentActivity");
                    setActivity([]);
                  }
                }}
              >
                Clear Log
              </button>
            </div>

            {activity.length === 0 ? (
              <p>No activities yet.</p>
            ) : (
              <div className="activity-list">
                {activity.map((item) => (
                  <div className="activity-item" key={item.id}>
                    <div className="activity-dot" />
                    <div className="activity-details">
                      <strong>{item.action}</strong>
                      <p>{item.studentName}</p>
                      <small>
                        {item.admin} · {item.time}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {showProfile && (
          <div className="modal-backdrop">
            <form className="details-modal" onSubmit={saveProfile}>
              <div className="modal-header">
                <h2>Admin Profile</h2>
                <button
                  type="button"
                  onClick={() => setShowProfile(false)}
                >
                  ✕
                </button>
              </div>

              <label>Display Name</label>
              <input
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                required
              />

              <p className="profile-note">
                This changes the display name in this browser only.
              </p>

              <button className="save-btn" type="submit">
                Save Profile
              </button>
            </form>
          </div>
        )}

        <section className="student-table-card" id="students">
          <div className="table-card-header">
            <div>
              <h2>Student Management</h2>
              <p>View and manage all student records.</p>
            </div>

            <div className="header-actions">
              <button
                type="button"
                className="export-btn"
                onClick={exportCSV}
              >
                ⇩ Export CSV
              </button>

              <button
                type="button"
                className="add-student-btn"
                onClick={openAddForm}
              >
                + Add Student
              </button>
            </div>
          </div>

          <div className="student-toolbar">
            <div className="student-search">
              <span>⌕</span>
              <input
                type="search"
                placeholder="Search students..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
              className="skill-filter"
            >
              <option value="All">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <select
              value={filterSkill}
              onChange={(e) => setFilterSkill(e.target.value)}
              className="skill-filter"
            >
              <option value="All">All Skills</option>
              {skills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="table-message">
              Loading students...
            </div>
          ) : (
            <div className="student-table-wrapper">
              <table className="student-table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Student ID</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Skill</th>
                    <th>Salary</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedStudents.length > 0 ? (
                    paginatedStudents.map((student, index) => (
                      <tr key={student.id_student}>
                        <td>
                          {(currentPage - 1) * PAGE_SIZE +
                            index +
                            1}
                        </td>

                        <td className="student-name">
                          {student.name_student}
                        </td>

                        <td>{student.id_student}</td>
                        <td>{student.age_student}</td>

                        <td>
                          <span
                            className={`gender-badge ${
                              String(
                                student.gender || ""
                              ).toLowerCase() === "female"
                                ? "female"
                                : "male"
                            }`}
                          >
                            {student.gender || "-"}
                          </span>
                        </td>

                        <td>
                          <span className="skill-badge">
                            {student.skill || "-"}
                          </span>
                        </td>

                        <td>
                          $
                          {Number(
                            student.salary || 0
                          ).toLocaleString()}
                        </td>

                        <td>
                          <div className="student-actions">
                            <button
                              type="button"
                              className="view-btn"
                              onClick={() =>
                                setSelectedStudent(student)
                              }
                            >
                              View
                            </button>

                            <button
                              type="button"
                              className="Edit-btn"
                              onClick={() =>
                                openEditForm(student)
                              }
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="Delete-btn"
                              onClick={() =>
                                handleDelete(student)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="empty-table">
                        {error
                          ? "Could not load records."
                          : "No matching students found."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div className="pagination">
            <span>
              Showing{" "}
              {filteredStudents.length === 0
                ? 0
                : (currentPage - 1) * PAGE_SIZE + 1}
              {" - "}
              {Math.min(
                currentPage * PAGE_SIZE,
                filteredStudents.length
              )}
              {" of "}
              {filteredStudents.length}
            </span>

            <div className="pagination-buttons">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() =>
                  setPage((p) => Math.max(1, p - 1))
                }
              >
                Previous
              </button>

              <span>
                {currentPage} / {totalPages}
              </span>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setPage((p) =>
                    Math.min(totalPages, p + 1)
                  )
                }
              >
                Next
              </button>
            </div>
          </div>
        </section>

        <footer className="dashboard-footer">
          BELTEI Student Management System · Admin Dashboard
        </footer>
      </section>

      {selectedStudent && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedStudent(null)}
        >
          <div
            className="details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2>Student Details</h2>
                <p>Complete student information</p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
              >
                ✕
              </button>
            </div>

            <div className="details-grid">
              {[
                ["Student Name", selectedStudent.name_student],
                ["Student ID", selectedStudent.id_student],
                ["Age", selectedStudent.age_student],
                ["Gender", selectedStudent.gender],
                ["Telegram", selectedStudent.telegram],
                ["Facebook", selectedStudent.facebook],
                ["Skill", selectedStudent.skill],
                [
                  "Salary",
                  `$${selectedStudent.salary || "0"}`,
                ],
                ["Place", selectedStudent.place],
              ].map(([label, value]) => (
                <div className="detail-item" key={label}>
                  <small>{label}</small>
                  <strong>{value || "-"}</strong>
                </div>
              ))}
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setSelectedStudent(null)}
              >
                Close
              </button>

              <button
                type="button"
                className="save-btn"
                onClick={() => openEditForm(selectedStudent)}
              >
                Edit Student
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Login;

