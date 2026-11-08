import React, { useEffect, useMemo, useState } from "react";
import "../App.css";

import {
  API_URL,
  DELETE_URL,
  UPDATE_URL,
  LOGIN_URL,
  LOGOUT_URL,
  SESSION_URL,
  TOGGLE_PAYMENT_URL,
} from "../config/api";
import {
  getDefaultAvatar,
  isDefaultAvatar,
  compressImageFile,
} from "../utils/avatar";

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
  image: "",
  isCustomImage: false,
  payment_status: "unpaid",
  score: 85,
};

const skills = ["HTML", "CSS", "JavaScript", "React", "PHP", "MySQL"];

export function getGradeInfo(score) {
  const num = Number(score);
  if (isNaN(num) || score === "" || score === null || score === undefined) {
    return {
      grade: "B",
      gpa: "3.5",
      khmer: "ល្អណាស់",
      en: "Very Good",
      color: "#0284c7",
      bg: "#e0f2fe",
      star: "★★★★☆",
      badgeClass: "grade-b",
    };
  }
  if (num >= 90) {
    return {
      grade: "A",
      gpa: "4.0",
      khmer: "ល្អប្រសើរ",
      en: "Excellent",
      color: "#059669",
      bg: "#d1fae5",
      star: "★★★★★",
      badgeClass: "grade-a",
    };
  } else if (num >= 80) {
    return {
      grade: "B",
      gpa: "3.5",
      khmer: "ល្អណាស់",
      en: "Very Good",
      color: "#0284c7",
      bg: "#e0f2fe",
      star: "★★★★☆",
      badgeClass: "grade-b",
    };
  } else if (num >= 70) {
    return {
      grade: "C",
      gpa: "3.0",
      khmer: "ល្អ",
      en: "Good",
      color: "#d97706",
      bg: "#fef3c7",
      star: "★★★☆☆",
      badgeClass: "grade-c",
    };
  } else if (num >= 60) {
    return {
      grade: "D",
      gpa: "2.5",
      khmer: "ល្អបង្គួរ",
      en: "Fairly Good",
      color: "#7c3aed",
      bg: "#ede9fe",
      star: "★★☆☆☆",
      badgeClass: "grade-d",
    };
  } else if (num >= 50) {
    return {
      grade: "E",
      gpa: "2.0",
      khmer: "មធ្យម",
      en: "Average / Pass",
      color: "#ea580c",
      bg: "#ffedd5",
      star: "★☆☆☆☆",
      badgeClass: "grade-e",
    };
  } else {
    return {
      grade: "F",
      gpa: "0.0",
      khmer: "ធ្លាក់",
      en: "Fail",
      color: "#dc2626",
      bg: "#fee2e2",
      star: "☆☆☆☆☆",
      badgeClass: "grade-f",
    };
  }
}

function readStudentScores() {
  try {
    return JSON.parse(localStorage.getItem("studentScores") || "{}");
  } catch {
    return {};
  }
}

function getStudentScore(student, storedScores = {}) {
  if (!student) return 85;
  const id = String(student.id_student);
  if (storedScores[id] !== undefined && storedScores[id] !== null && storedScores[id] !== "") {
    return Number(storedScores[id]);
  }
  if (student.score !== undefined && student.score !== null && student.score !== "") {
    return Number(student.score);
  }
  const pseudo = Math.abs(
    String(id).split("").reduce((acc, char) => acc * 31 + char.charCodeAt(0), 11)
  ) % 26;
  return 72 + pseudo; // 72 to 97
}

function readActivity() {
  try {
    return JSON.parse(localStorage.getItem("studentActivity") || "[]");
  } catch {
    return [];
  }
}

const ATTENDANCE_STORAGE_KEY = "school_mini_student_attendance_v1";

function readAttendanceData() {
  try {
    return JSON.parse(localStorage.getItem(ATTENDANCE_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function getTodayDateString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getStudentVerificationUrl(student, scoresMap = {}) {
  if (!student) return "";
  const host =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1")
      ? "192.168.100.242"
      : typeof window !== "undefined"
      ? window.location.hostname
      : "192.168.100.242";
  const port =
    typeof window !== "undefined" && window.location.port
      ? `:${window.location.port}`
      : ":3000";
  const protocol =
    typeof window !== "undefined" && window.location.protocol
      ? window.location.protocol
      : "http:";

  const score =
    scoresMap && scoresMap[student.id_student] !== undefined
      ? scoresMap[student.id_student]
      : student.score || 88;

  const params = new URLSearchParams({
    id: String(student.id_student || ""),
    name: String(student.name_student || ""),
    gender: String(student.gender || "Male"),
    skill: String(student.skill || "IT"),
    score: String(score),
    status: String(student.payment_status || "paid"),
    year: "2026 - 2027",
    exp: "31-10-2027",
    verified: "true",
  });

  return `${protocol}//${host}${port}/verify?${params.toString()}`;
}

const TEACHERS_STORAGE_KEY = "school_mini_teachers_list_v1";
const TEACHER_ATTENDANCE_KEY = "school_mini_teacher_attendance_v1";

const defaultTeachers = [
  {
    id_teacher: "T-101",
    name_teacher: "សាស្ត្រាចារ្យ សេង ពិសិដ្ឋ",
    name_en: "Prof. Seng Piseth",
    gender: "Male",
    skill: "React & Web Framework",
    degree: "Master of Computer Science (M.Sc)",
    phone: "012 889 977",
    email: "seng.piseth@beltei.edu.kh",
    room: "Lab 401",
    shift: "Morning (ព្រឹក)",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    id_teacher: "T-102",
    name_teacher: "បណ្ឌិត ចាន់ ដារ៉ា",
    name_en: "Dr. Chan Dara",
    gender: "Male",
    skill: "MySQL & Database System",
    degree: "Ph.D in Information Technology",
    phone: "016 778 899",
    email: "chan.dara@beltei.edu.kh",
    room: "Room 302",
    shift: "Afternoon (រសៀល)",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id_teacher: "T-103",
    name_teacher: "សាស្រ្តាចារ្យ មាស សុខា",
    name_en: "Ms. Meas Sokha",
    gender: "Female",
    skill: "UI/UX & Web Design",
    degree: "Master of Digital Media",
    phone: "098 554 433",
    email: "meas.sokha@beltei.edu.kh",
    room: "Design Studio A",
    shift: "Morning (ព្រឹក)",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
  {
    id_teacher: "T-104",
    name_teacher: "លោកគ្រូ កែវ វិជ្ជា",
    name_en: "Mr. Keo Vichea",
    gender: "Male",
    skill: "JavaScript & Frontend",
    degree: "Bachelor of Software Engineering",
    phone: "077 223 344",
    email: "keo.vichea@beltei.edu.kh",
    room: "Lab 205",
    shift: "Evening (យប់)",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
  {
    id_teacher: "T-105",
    name_teacher: "អ្នកគ្រូ គឹម ស្រីនាង",
    name_en: "Ms. Kim Sreyniang",
    gender: "Female",
    skill: "HTML & CSS Web Development",
    degree: "Bachelor of Computer Science",
    phone: "089 667 788",
    email: "kim.sreyniang@beltei.edu.kh",
    room: "Room 201",
    shift: "Morning (ព្រឹក)",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
  },
  {
    id_teacher: "T-106",
    name_teacher: "លោកគ្រូ ហេង សម្បត្តិ",
    name_en: "Mr. Heng Sambath",
    gender: "Male",
    skill: "PHP & Backend API",
    degree: "Master of Software Systems",
    phone: "092 112 233",
    email: "heng.sambath@beltei.edu.kh",
    room: "Lab 303",
    shift: "Afternoon (រសៀល)",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
  },
];

function readTeachersData() {
  try {
    const raw = localStorage.getItem(TEACHERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(TEACHERS_STORAGE_KEY, JSON.stringify(defaultTeachers));
      return defaultTeachers;
    }
    return JSON.parse(raw);
  } catch {
    return defaultTeachers;
  }
}

function readTeacherAttendanceData() {
  try {
    return JSON.parse(localStorage.getItem(TEACHER_ATTENDANCE_KEY) || "{}");
  } catch {
    return {};
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
  const [filterPayment, setFilterPayment] = useState("All");
  const [page, setPage] = useState(1);
  const [updatingPaymentId, setUpdatingPaymentId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [activity, setActivity] = useState(readActivity);
  const [showActivity, setShowActivity] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profileName, setProfileName] = useState(
    localStorage.getItem("adminName") || "Administrator"
  );

  const [idCardStudent, setIdCardStudent] = useState(null);
  const [receiptStudent, setReceiptStudent] = useState(null);
  const [khqrStudent, setKhqrStudent] = useState(null);
  const [certificateStudent, setCertificateStudent] = useState(null);
  const [studentScores, setStudentScores] = useState(readStudentScores);
  const [filterGrade, setFilterGrade] = useState("All");
  const [showCertHub, setShowCertHub] = useState(false);
  const [showAttendanceHub, setShowAttendanceHub] = useState(false);
  const [attendanceDate, setAttendanceDate] = useState(getTodayDateString());
  const [attendanceData, setAttendanceData] = useState(readAttendanceData);
  const [attendanceSearch, setAttendanceSearch] = useState("");
  const [attendanceSkill, setAttendanceSkill] = useState("All");
  const [attendanceFilterStatus, setAttendanceFilterStatus] = useState("All");
  const [showAttendancePrint, setShowAttendancePrint] = useState(false);
  const [showTeacherHub, setShowTeacherHub] = useState(false);
  const [teachers, setTeachers] = useState(readTeachersData);
  const [teacherAttendance, setTeacherAttendance] = useState(readTeacherAttendanceData);
  const [teacherSearch, setTeacherSearch] = useState("");
  const [teacherFilterSkill, setTeacherFilterSkill] = useState("All");
  const [teacherFilterStatus, setTeacherFilterStatus] = useState("All");
  const [showTeacherPrint, setShowTeacherPrint] = useState(false);
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const [newTeacherForm, setNewTeacherForm] = useState({
    name_teacher: "",
    name_en: "",
    gender: "Male",
    skill: "React & Web Framework",
    degree: "Bachelor of Computer Science",
    phone: "",
    email: "",
    room: "Lab 401",
    shift: "Morning (ព្រឹក)",
    image: "",
  });

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
      const fetchUrl = `${API_URL}${API_URL.includes("?") ? "&" : "?"}_t=${Date.now()}`;
      const response = await fetch(fetchUrl, {
        credentials: "include",
        cache: "no-store",
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

      const freshList = data.students || [];
      setStudents(freshList);
      return freshList;
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "មិនអាចភ្ជាប់ទៅ PHP API បានទេ។ សូមពិនិត្យ XAMPP និង CORS។"
          : err.message || "មិនអាចទាញទិន្នន័យបានទេ។"
      );
      return null;
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
    setStudentForm({
      ...emptyStudent,
      gender: "Male",
      image: getDefaultAvatar("Male"),
      isCustomImage: false,
      payment_status: "unpaid",
      score: 85,
    });
    setEditingId(null);
    setShowForm(true);
    setMessage("");
    setError("");
  }

  // EDIT STUDENT
  function openEditForm(student) {
    const gender = student.gender || "Male";
    const hasCustom = Boolean(student.image && !isDefaultAvatar(student.image));
    const currentImg = hasCustom ? student.image : getDefaultAvatar(gender);

    setStudentForm({
      ...emptyStudent,
      ...student,
      name_student: student.name_student || "",
      id_student: String(student.id_student ?? ""),
      age_student: student.age_student || "",
      gender: gender,
      telegram: student.telegram || "",
      facebook: student.facebook || "",
      skill: student.skill || "HTML",
      salary: student.salary || "",
      place: student.place || "",
      image: currentImg,
      isCustomImage: hasCustom,
      payment_status: student.payment_status || "unpaid",
      score: getStudentScore(student, studentScores),
    });

    setEditingId(student.id_student);
    setShowForm(true);
    setSelectedStudent(null);
    setMessage("");
    setError("");
  }

  // TOGGLE PAYMENT STATUS (Admin click on checkmark / cross)
  async function handleTogglePayment(student, e) {
    if (e) e.stopPropagation();
    const nextStatus = student.payment_status === "paid" ? "unpaid" : "paid";
    const studentId = student.id_student;

    setUpdatingPaymentId(studentId);
    setError("");
    setMessage("");

    // Optimistic UI update
    setStudents((prev) =>
      prev.map((s) =>
        s.id_student === studentId ? { ...s, payment_status: nextStatus } : s
      )
    );

    try {
      const response = await fetch(TOGGLE_PAYMENT_URL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_student: studentId,
          payment_status: nextStatus,
        }),
      });

      const data = await response.json();
      if (!response.ok || data.success !== true) {
        throw new Error(data.message || "Failed to update payment status");
      }

      const msg =
        nextStatus === "paid"
          ? `សិស្ស ${student.name_student} បានបង់ប្រាក់រួចរាល់ (Paid)!`
          : `សិស្ស ${student.name_student} មិនទាន់បង់ប្រាក់ (Unpaid)!`;

      setMessage(msg);
      logActivity(
        nextStatus === "paid" ? "Marked as Paid (បង់ប្រាក់រួច)" : "Marked as Unpaid (មិនទាន់បង់)",
        student.name_student
      );
    } catch (err) {
      // Revert if error
      setStudents((prev) =>
        prev.map((s) =>
          s.id_student === studentId
            ? { ...s, payment_status: student.payment_status || "unpaid" }
            : s
        )
      );
      setError(err.message || "មិនអាចកែប្រែស្ថានភាពបង់ប្រាក់បានទេ។");
    } finally {
      setUpdatingPaymentId(null);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;

    setStudentForm((previous) => {
      if (name === "gender") {
        const willChangeAvatar = !previous.isCustomImage;
        return {
          ...previous,
          gender: value,
          image: willChangeAvatar ? getDefaultAvatar(value) : previous.image,
        };
      }
      return {
        ...previous,
        [name]: value,
      };
    });
  }

  const [uploadingImage, setUploadingImage] = useState(false);

  async function handleImageFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type || !file.type.startsWith("image/")) {
      setError("សូមជ្រើសរើសឯកសារជារូបភាព (JPG, PNG, WebP)!");
      return;
    }

    try {
      setUploadingImage(true);
      setError("");
      const compressedDataUrl = await compressImageFile(file);
      setStudentForm((previous) => ({
        ...previous,
        image: compressedDataUrl,
        isCustomImage: true,
      }));
    } catch (err) {
      console.error("Error uploading image:", err);
      setError("មានបញ្ហាក្នុងការផ្ទុកឡើងរូបភាព។");
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  }

  function handleResetToGenderAvatar() {
    setStudentForm((previous) => ({
      ...previous,
      image: getDefaultAvatar(previous.gender),
      isCustomImage: false,
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
    const finalImage = studentForm.image || getDefaultAvatar(studentForm.gender);

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...studentForm,
          image: finalImage,
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

      if (studentForm.score !== "" && studentForm.score !== undefined && studentForm.score !== null) {
        const studentIdKey = String(studentForm.id_student);
        const updatedScores = {
          ...studentScores,
          [studentIdKey]: Number(studentForm.score),
        };
        localStorage.setItem("studentScores", JSON.stringify(updatedScores));
        setStudentScores(updatedScores);
      }

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
      const studentScore = getStudentScore(student, studentScores);
      const gradeInfo = getGradeInfo(studentScore);

      const matchesSearch = [
        student.name_student,
        student.id_student,
        student.age_student,
        student.gender,
        student.telegram,
        student.facebook,
        student.skill,
        student.place,
        gradeInfo.grade,
        gradeInfo.khmer,
        gradeInfo.en,
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

      const matchesPayment =
        filterPayment === "All" ||
        String(student.payment_status || "unpaid").toLowerCase() ===
          filterPayment.toLowerCase();

      const matchesGrade =
        filterGrade === "All" ||
        gradeInfo.grade.toUpperCase() === filterGrade.toUpperCase();

      return (
        matchesSearch &&
        matchesSkill &&
        matchesGender &&
        matchesPayment &&
        matchesGrade
      );
    });
  }, [students, search, filterSkill, filterGender, filterPayment, filterGrade, studentScores]);

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
  }, [search, filterSkill, filterGender, filterPayment, filterGrade]);

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

  const totalPaid = students.filter(
    (student) =>
      String(student.payment_status || "unpaid").toLowerCase() === "paid"
  ).length;

  const totalUnpaid = students.length - totalPaid;

  const totalSkills = new Set(
    students.map((student) => student.skill).filter(Boolean)
  ).size;

  const studentScoresList = students.map((s) => getStudentScore(s, studentScores));
  const avgScore = students.length > 0
    ? (studentScoresList.reduce((acc, score) => acc + score, 0) / students.length)
    : 0;

  const totalGradeA = students.filter(
    (s) => getStudentScore(s, studentScores) >= 90
  ).length;

  const totalGradeB = students.filter((s) => {
    const sc = getStudentScore(s, studentScores);
    return sc >= 80 && sc < 90;
  }).length;

  const totalGradeC = students.filter((s) => {
    const sc = getStudentScore(s, studentScores);
    return sc >= 70 && sc < 80;
  }).length;

  const totalGradeOther = students.filter(
    (s) => getStudentScore(s, studentScores) < 70
  ).length;

  // ATTENDANCE METHODS & CALCULATIONS
  function saveAttendanceData(newData) {
    setAttendanceData(newData);
    try {
      localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(newData));
    } catch (err) {
      console.error("Failed to save attendance:", err);
    }
  }

  function getStudentAttendance(studentId, date = attendanceDate) {
    const day = attendanceData[date] || {};
    return day[String(studentId)] || null;
  }

  function handleSetStudentAttendance(studentId, status, note = null) {
    const dateKey = attendanceDate;
    const dayRecord = { ...(attendanceData[dateKey] || {}) };
    const existing = dayRecord[String(studentId)] || {};
    const nowTime = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    dayRecord[String(studentId)] = {
      status,
      note: note !== null ? note : (existing.note || ""),
      time: existing.time || nowTime,
    };

    const updated = {
      ...attendanceData,
      [dateKey]: dayRecord,
    };
    saveAttendanceData(updated);
  }

  function handleSetStudentAttendanceNote(studentId, note) {
    const dateKey = attendanceDate;
    const dayRecord = { ...(attendanceData[dateKey] || {}) };
    const existing = dayRecord[String(studentId)] || {
      status: "present",
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };

    dayRecord[String(studentId)] = {
      ...existing,
      note,
    };

    const updated = {
      ...attendanceData,
      [dateKey]: dayRecord,
    };
    saveAttendanceData(updated);
  }

  function handleResetStudentAttendance(studentId) {
    const dateKey = attendanceDate;
    const dayRecord = { ...(attendanceData[dateKey] || {}) };
    delete dayRecord[String(studentId)];
    const updated = {
      ...attendanceData,
      [dateKey]: dayRecord,
    };
    saveAttendanceData(updated);
  }

  function handleMarkAllAttendance(status = "present") {
    const dateKey = attendanceDate;
    const dayRecord = { ...(attendanceData[dateKey] || {}) };
    const nowTime = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    const targetStudents =
      attendanceSkill === "All"
        ? students
        : students.filter((s) => s.skill === attendanceSkill);

    targetStudents.forEach((s) => {
      const sid = String(s.id_student);
      dayRecord[sid] = {
        status,
        note: dayRecord[sid]?.note || "",
        time: dayRecord[sid]?.time || nowTime,
      };
    });

    const updated = {
      ...attendanceData,
      [dateKey]: dayRecord,
    };
    saveAttendanceData(updated);
    setMessage(
      `✓ បានកត់ត្រា "${
        status === "present" ? "វត្តមាន" : status
      }" សម្រាប់សិស្សទាំងអស់ (${targetStudents.length} នាក់)`
    );
  }

  function exportAttendanceCSV() {
    const dayRecord = attendanceData[attendanceDate] || {};
    const rows = [
      [
        "ID",
        "Name",
        "Gender",
        "Major/Skill",
        "Date",
        "Status (Khmer)",
        "Status (EN)",
        "Time",
        "Note/Reason",
      ],
    ];

    students.forEach((s) => {
      const sid = String(s.id_student);
      const rec = dayRecord[sid];
      const st = rec?.status || "unmarked";
      let stKhmer = "មិនទាន់កត់";
      let stEn = "Pending";
      if (st === "present") {
        stKhmer = "វត្តមាន";
        stEn = "Present";
      } else if (st === "late") {
        stKhmer = "មកយឺត";
        stEn = "Late";
      } else if (st === "permission") {
        stKhmer = "សុំច្បាប់";
        stEn = "Permission";
      } else if (st === "absent") {
        stKhmer = "អវត្តមាន";
        stEn = "Absent";
      }

      rows.push([
        s.id_student,
        s.name_student,
        s.gender,
        s.skill || "IT",
        attendanceDate,
        stKhmer,
        stEn,
        rec?.time || "-",
        rec?.note || "",
      ]);
    });

    const csvContent =
      "\uFEFF" +
      rows
        .map((r) =>
          r
            .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
            .join(",")
        )
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Attendance_${attendanceDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const todayDateKey = getTodayDateString();
  const todayAttendanceRecord = attendanceData[todayDateKey] || {};
  const todayPresentCount = students.filter(
    (s) => todayAttendanceRecord[String(s.id_student)]?.status === "present"
  ).length;

  const currentDayRecord = attendanceData[attendanceDate] || {};
  const countPresent = students.filter(
    (s) => currentDayRecord[String(s.id_student)]?.status === "present"
  ).length;
  const countLate = students.filter(
    (s) => currentDayRecord[String(s.id_student)]?.status === "late"
  ).length;
  const countPermission = students.filter(
    (s) => currentDayRecord[String(s.id_student)]?.status === "permission"
  ).length;
  const countAbsent = students.filter(
    (s) => currentDayRecord[String(s.id_student)]?.status === "absent"
  ).length;
  const countUnmarked = Math.max(
    0,
    students.length - (countPresent + countLate + countPermission + countAbsent)
  );
  const attendanceRate =
    students.length > 0
      ? Math.round(((countPresent + countLate) / students.length) * 100)
      : 0;

  const filteredAttendanceStudents = students.filter((student) => {
    const q = attendanceSearch.toLowerCase().trim();
    const matchSearch =
      !q ||
      String(student.name_student || "").toLowerCase().includes(q) ||
      String(student.id_student || "").toLowerCase().includes(q);

    const matchSkill =
      attendanceSkill === "All" || student.skill === attendanceSkill;

    const rec = currentDayRecord[String(student.id_student)];
    const status = rec?.status || "unmarked";
    const matchStatus =
      attendanceFilterStatus === "All" ||
      status === attendanceFilterStatus;

    return matchSearch && matchSkill && matchStatus;
  });

  // TEACHER METHODS & STATS (សម្រាប់គ្រូ)
  function saveTeachersData(newTeachers) {
    setTeachers(newTeachers);
    try {
      localStorage.setItem(TEACHERS_STORAGE_KEY, JSON.stringify(newTeachers));
    } catch (e) {
      console.error(e);
    }
  }

  function saveTeacherAttendanceData(newData) {
    setTeacherAttendance(newData);
    try {
      localStorage.setItem(TEACHER_ATTENDANCE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error(e);
    }
  }

  function handleSetTeacherAttendance(teacherId, status, note = null) {
    const dateKey = attendanceDate;
    const dayRecord = { ...(teacherAttendance[dateKey] || {}) };
    const existing = dayRecord[String(teacherId)] || {};
    const nowTime = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    dayRecord[String(teacherId)] = {
      status,
      note: note !== null ? note : (existing.note || ""),
      time: existing.time || nowTime,
    };

    const updated = {
      ...teacherAttendance,
      [dateKey]: dayRecord,
    };
    saveTeacherAttendanceData(updated);
  }

  function handleSetTeacherAttendanceNote(teacherId, note) {
    const dateKey = attendanceDate;
    const dayRecord = { ...(teacherAttendance[dateKey] || {}) };
    const existing = dayRecord[String(teacherId)] || {
      status: "present",
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };

    dayRecord[String(teacherId)] = {
      ...existing,
      note,
    };

    const updated = {
      ...teacherAttendance,
      [dateKey]: dayRecord,
    };
    saveTeacherAttendanceData(updated);
  }

  function handleResetTeacherAttendance(teacherId) {
    const dateKey = attendanceDate;
    const dayRecord = { ...(teacherAttendance[dateKey] || {}) };
    delete dayRecord[String(teacherId)];
    const updated = {
      ...teacherAttendance,
      [dateKey]: dayRecord,
    };
    saveTeacherAttendanceData(updated);
  }

  function handleMarkAllTeachers(status = "present") {
    const dateKey = attendanceDate;
    const dayRecord = { ...(teacherAttendance[dateKey] || {}) };
    const nowTime = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    teachers.forEach((t) => {
      const tid = String(t.id_teacher);
      dayRecord[tid] = {
        status,
        note: dayRecord[tid]?.note || "",
        time: dayRecord[tid]?.time || nowTime,
      };
    });

    const updated = {
      ...teacherAttendance,
      [dateKey]: dayRecord,
    };
    saveTeacherAttendanceData(updated);
    setMessage(
      `✓ បានកត់ត្រា "${status === "present" ? "វត្តមាន" : status}" សម្រាប់គ្រូបង្រៀនទាំងអស់ (${teachers.length} នាក់)`
    );
  }

  function handleCreateTeacher(e) {
    e.preventDefault();
    if (!newTeacherForm.name_teacher.trim()) {
      setError("សូមបញ្ចូលឈ្មោះគ្រូបង្រៀន!");
      return;
    }
    const newId = `T-${100 + teachers.length + 1}`;
    const teacherToAdd = {
      ...newTeacherForm,
      id_teacher: newId,
      image:
        newTeacherForm.image ||
        (newTeacherForm.gender === "Female"
          ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
          : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"),
    };
    const updatedTeachers = [...teachers, teacherToAdd];
    saveTeachersData(updatedTeachers);
    setShowAddTeacherModal(false);
    setNewTeacherForm({
      name_teacher: "",
      name_en: "",
      gender: "Male",
      skill: "React & Web Framework",
      degree: "Bachelor of Computer Science",
      phone: "",
      email: "",
      room: "Lab 401",
      shift: "Morning (ព្រឹក)",
      image: "",
    });
    setMessage(`✓ បានបន្ថែមគ្រូបង្រៀនថ្មី៖ ${teacherToAdd.name_teacher} ដោយជោគជ័យ!`);
  }

  function exportTeacherAttendanceCSV() {
    const dayRecord = teacherAttendance[attendanceDate] || {};
    const rows = [
      [
        "ID",
        "Name (Khmer)",
        "Name (EN)",
        "Gender",
        "Degree",
        "Skill/Subject",
        "Room",
        "Shift",
        "Phone",
        "Date",
        "Status (Khmer)",
        "Status (EN)",
        "Time",
        "Note/Reason",
      ],
    ];

    teachers.forEach((t) => {
      const tid = String(t.id_teacher);
      const rec = dayRecord[tid];
      const st = rec?.status || "unmarked";
      let stKhmer = "មិនទាន់កត់";
      let stEn = "Pending";
      if (st === "present") {
        stKhmer = "វត្តមាន (មកបង្រៀន)";
        stEn = "Present";
      } else if (st === "late") {
        stKhmer = "មកយឺត";
        stEn = "Late";
      } else if (st === "permission") {
        stKhmer = "សុំច្បាប់";
        stEn = "Permission";
      } else if (st === "absent") {
        stKhmer = "អវត្តមាន";
        stEn = "Absent";
      }

      rows.push([
        t.id_teacher,
        t.name_teacher,
        t.name_en || "",
        t.gender,
        t.degree || "",
        t.skill || "",
        t.room || "",
        t.shift || "",
        t.phone || "",
        attendanceDate,
        stKhmer,
        stEn,
        rec?.time || "-",
        rec?.note || "",
      ]);
    });

    const csvContent =
      "\uFEFF" +
      rows
        .map((r) =>
          r
            .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
            .join(",")
        )
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Teacher_Attendance_${attendanceDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const currentTeacherDayRecord = teacherAttendance[attendanceDate] || {};
  const todayTeacherDayRecord = teacherAttendance[getTodayDateString()] || {};
  const todayTeacherPresentCount = teachers.filter(
    (t) => todayTeacherDayRecord[String(t.id_teacher)]?.status === "present"
  ).length;

  const countTeacherPresent = teachers.filter(
    (t) => currentTeacherDayRecord[String(t.id_teacher)]?.status === "present"
  ).length;
  const countTeacherLate = teachers.filter(
    (t) => currentTeacherDayRecord[String(t.id_teacher)]?.status === "late"
  ).length;
  const countTeacherPermission = teachers.filter(
    (t) => currentTeacherDayRecord[String(t.id_teacher)]?.status === "permission"
  ).length;
  const countTeacherAbsent = teachers.filter(
    (t) => currentTeacherDayRecord[String(t.id_teacher)]?.status === "absent"
  ).length;
  const countTeacherUnmarked = Math.max(
    0,
    teachers.length -
      (countTeacherPresent +
        countTeacherLate +
        countTeacherPermission +
        countTeacherAbsent)
  );
  const teacherAttendanceRate =
    teachers.length > 0
      ? Math.round(
          ((countTeacherPresent + countTeacherLate) / teachers.length) * 100
        )
      : 0;

  const filteredTeachers = teachers.filter((teacher) => {
    const q = teacherSearch.toLowerCase().trim();
    const matchSearch =
      !q ||
      String(teacher.name_teacher || "").toLowerCase().includes(q) ||
      String(teacher.name_en || "").toLowerCase().includes(q) ||
      String(teacher.id_teacher || "").toLowerCase().includes(q);

    const matchSkill =
      teacherFilterSkill === "All" || teacher.skill === teacherFilterSkill;

    const rec = currentTeacherDayRecord[String(teacher.id_teacher)];
    const status = rec?.status || "unmarked";
    const matchStatus =
      teacherFilterStatus === "All" || status === teacherFilterStatus;

    return matchSearch && matchSkill && matchStatus;
  });

  // EXPORT CSV
  async function exportCSV() {
    setExporting(true);
    setError("");

    try {
      // Always fetch latest data from the database before generating CSV
      const freshStudents = await loadStudents();
      const currentList = freshStudents !== null ? freshStudents : students;

      // Re-apply current search and filters to the fresh data
      const keyword = search.toLowerCase().trim();
      const exportList = currentList.filter((student) => {
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

        const matchesPayment =
          filterPayment === "All" ||
          String(student.payment_status || "unpaid").toLowerCase() ===
            filterPayment.toLowerCase();

        return (
          matchesSearch &&
          matchesSkill &&
          matchesGender &&
          matchesPayment
        );
      });

      if (exportList.length === 0) {
        setError("គ្មានទិន្នន័យសម្រាប់ Export ទេ!");
        return;
      }

      const headers = [
        "Student Name",
        "Student ID",
        "Age",
        "Gender",
        "Payment Status",
        "Telegram",
        "Facebook",
        "Skill",
        "Salary",
        "Place",
      ];

      const rows = exportList.map((s) => [
        s.name_student,
        s.id_student,
        s.age_student,
        s.gender,
        s.payment_status === "paid" ? "Paid" : "Unpaid",
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

      const dateStr = new Date().toISOString().slice(0, 10);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `students_${dateStr}.csv`;
      link.click();
      URL.revokeObjectURL(url);

      setMessage("បាន Export ទិន្នន័យទៅ CSV ជោគជ័យ!");
      logActivity(
        "Exported student CSV",
        `${exportList.length} records`
      );
    } catch (err) {
      setError("បរាជ័យក្នុងការ Export ទិន្នន័យ: " + (err.message || ""));
    } finally {
      setExporting(false);
    }
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

          <button
            type="button"
            className={`sidebar-link ${showCertHub ? "active" : ""}`}
            onClick={() => {
              const next = !showCertHub;
              setShowCertHub(next);
              if (next) {
                setTimeout(() => {
                  document.getElementById("certificates-hub")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }
            }}
          >
            <span>🎖️</span> ប័ណ្ណសរសើរ
            {totalGradeA > 0 && (
              <span className="cert-count-pill">{totalGradeA}</span>
            )}
          </button>

          <button
            type="button"
            className={`sidebar-link ${showAttendanceHub ? "active" : ""}`}
            onClick={() => {
              const next = !showAttendanceHub;
              setShowAttendanceHub(next);
              if (next) {
                setTimeout(() => {
                  document.getElementById("attendance-hub")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }
            }}
          >
            <span>📋</span> Check វត្តមាន
            {students.length > 0 && (
              <span className="attendance-pill">
                {todayPresentCount}/{students.length}
              </span>
            )}
          </button>

          <button
            type="button"
            className={`sidebar-link ${showTeacherHub ? "active" : ""}`}
            onClick={() => {
              const next = !showTeacherHub;
              setShowTeacherHub(next);
              if (next) {
                setTimeout(() => {
                  document.getElementById("teacher-hub")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }
            }}
          >
            <span>👨‍🏫</span> សម្រាប់គ្រូ
            {teachers.length > 0 && (
              <span className="teacher-pill">
                {todayTeacherPresentCount}/{teachers.length}
              </span>
            )}
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

          <div className="stat-card">
            <div className="stat-icon emerald">✓</div>
            <div>
              <p>Payment Status</p>
              <h2>
                {totalPaid}{" "}
                <small style={{ fontSize: "14px", fontWeight: "normal", color: "#6b6d82" }}>
                  / {students.length}
                </small>
              </h2>
              <small>
                <span style={{ color: "#059669", fontWeight: "700" }}>✓ {totalPaid} Paid</span>
                {" · "}
                <span style={{ color: "#dc2626", fontWeight: "700" }}>✕ {totalUnpaid} Unpaid</span>
              </small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon gold">★</div>
            <div>
              <p>Top Honors (និទ្ទេស A)</p>
              <h2>
                {totalGradeA}{" "}
                <small style={{ fontSize: "14px", fontWeight: "normal", color: "#6b6d82" }}>
                  / {students.length}
                </small>
              </h2>
              <small>
                <span style={{ color: "#d97706", fontWeight: "700" }}>★ {totalGradeA} Students</span>
                {" · "}
                <span style={{ color: "#087f8c", fontWeight: "600" }}>Avg: {avgScore.toFixed(1)}/100</span>
              </small>
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

        <section className="analytics-card" style={{ marginTop: "18px" }}>
          <div className="section-title">
            <div>
              <h2>Academic Grades (និទ្ទេសសិក្សា)</h2>
              <p>Student evaluation & grade distribution · ពិន្ទុមធ្យម៖ {avgScore.toFixed(1)}/100</p>
            </div>
          </div>

          {[
            { label: "និទ្ទេស A (90–100)", sub: "ល្អប្រសើរ (Excellent)", count: totalGradeA, color: "#059669" },
            { label: "និទ្ទេស B (80–89)", sub: "ល្អណាស់ (Very Good)", count: totalGradeB, color: "#0284c7" },
            { label: "និទ្ទេស C (70–79)", sub: "ល្អ (Good)", count: totalGradeC, color: "#d97706" },
            { label: "និទ្ទេស D/E/F (< 70)", sub: "មធ្យម / ធ្លាក់", count: totalGradeOther, color: "#dc2626" },
          ].map((item) => {
            const percent = students.length ? (item.count / students.length) * 100 : 0;
            return (
              <div className="skill-chart-row" key={item.label}>
                <div className="skill-chart-label">
                  <span><strong>{item.label}</strong> · <small style={{ color: "#64748b" }}>{item.sub}</small></span>
                  <strong>{item.count} នាក់ ({percent.toFixed(0)}%)</strong>
                </div>
                <div className="skill-chart-track">
                  <div
                    className="skill-chart-fill"
                    style={{ width: `${percent}%`, background: item.color }}
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
              {/* Photo Upload & Gender-Based Avatar Section */}
              <div className="student-photo-upload-section">
                <div className="avatar-preview-container">
                  <div className="avatar-preview-circle">
                    <img
                      src={studentForm.image || getDefaultAvatar(studentForm.gender)}
                      alt="Student Preview"
                      className="avatar-preview-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getDefaultAvatar(studentForm.gender);
                      }}
                    />
                    {uploadingImage && (
                      <div className="avatar-uploading-overlay">
                        <span>⏳</span>
                      </div>
                    )}
                  </div>
                  <span
                    className={`photo-gender-badge ${
                      String(studentForm.gender || "").toLowerCase() === "female"
                        ? "female"
                        : "male"
                    }`}
                  >
                    {studentForm.gender === "Female"
                      ? "♀ Female Avatar"
                      : "♂ Male Avatar"}
                  </span>
                </div>

                <div className="avatar-upload-details">
                  <label className="photo-section-label">
                    រូបភាពសិស្ស / Student Photo
                  </label>
                  <p className="photo-section-hint">
                    {studentForm.isCustomImage
                      ? "✓ រូបភាពផ្ទាល់ខ្លួនត្រូវបានផ្ទុកឡើង (Custom photo uploaded)"
                      : `ស្វ័យប្រវត្តិតាមភេទ (Default avatar based on gender: ${studentForm.gender})`}
                  </p>

                  <div className="photo-action-buttons">
                    <label className="photo-upload-button">
                      <span>📷</span>
                      <span>
                        {uploadingImage
                          ? "កំពុងផ្ទុកឡើង..."
                          : "Upload Photo (ផ្ទុកឡើងរូបភាព)"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        disabled={uploadingImage}
                        style={{ display: "none" }}
                      />
                    </label>

                    {studentForm.isCustomImage && (
                      <button
                        type="button"
                        className="photo-reset-button"
                        onClick={handleResetToGenderAvatar}
                      >
                        ↺ ប្តូរតាមភេទវិញ (Use Gender Avatar)
                      </button>
                    )}
                  </div>
                </div>
              </div>

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

                <div className="form-group">
                  <label>Payment Status (ស្ថានភាពបង់ប្រាក់)</label>
                  <select
                    name="payment_status"
                    value={studentForm.payment_status || "unpaid"}
                    onChange={handleInputChange}
                  >
                    <option value="unpaid">✕ Unpaid (មិនទាន់បង់ប្រាក់)</option>
                    <option value="paid">✓ Paid (បានបង់ប្រាក់រួចរាល់)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>ពិន្ទុ / Score (0 - 100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    name="score"
                    value={studentForm.score ?? ""}
                    onChange={handleInputChange}
                    placeholder="បញ្ចូលពិន្ទុ ឧ. 92"
                  />
                  <small style={{ color: "#087f8c", fontSize: "11px", fontWeight: "600", marginTop: "4px", display: "block" }}>
                    និទ្ទេសស្វ័យប្រវត្តិ៖ {getGradeInfo(studentForm.score).grade} ({getGradeInfo(studentForm.score).khmer} - {getGradeInfo(studentForm.score).en})
                  </small>
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

        {showCertHub && (
          <section className="analytics-card cert-hub-section" id="certificates-hub" style={{ marginBottom: "26px" }}>
            <div className="section-title">
              <div>
                <h2>🎖️ មជ្ឈមណ្ឌលប័ណ្ណសរសើរសិស្ស (Certificates of Honor)</h2>
                <p>បញ្ជីសិស្សឆ្នើម និងសិស្សទាំងអស់ដែលមានសិទ្ធិទទួលបានប័ណ្ណសរសើរផ្លូវការ</p>
              </div>

              <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                <span className="badge-cert-summary gold">
                  ★ {totalGradeA} សិស្សនិទ្ទេស A
                </span>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowCertHub(false)}
                >
                  ✕ បិទ (Close)
                </button>
              </div>
            </div>

            <div className="cert-cards-grid">
              {students
                .slice()
                .sort((a, b) => getStudentScore(b, studentScores) - getStudentScore(a, studentScores))
                .map((student) => {
                  const sc = getStudentScore(student, studentScores);
                  const gr = getGradeInfo(sc);
                  const photo = student.image && !isDefaultAvatar(student.image)
                    ? student.image
                    : getDefaultAvatar(student.gender);

                  return (
                    <div
                      className={`cert-student-card ${gr.grade === "A" ? "honor-a" : ""}`}
                      key={student.id_student}
                    >
                      <div className="cert-card-avatar-wrap">
                        <img
                          src={photo}
                          alt={student.name_student}
                          className="cert-card-avatar"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = getDefaultAvatar(student.gender);
                          }}
                        />
                        <span className={`cert-grade-tag ${gr.badgeClass}`}>
                          {gr.grade}
                        </span>
                      </div>

                      <div className="cert-card-info">
                        <h4>{student.name_student}</h4>
                        <p className="cert-card-sub">
                          ID: {student.id_student} · {student.skill || "IT"}
                        </p>
                        <div className="cert-card-score-line">
                          <span>ពិន្ទុ៖ <strong>{sc}/100</strong></span>
                          <span className="cert-card-khmer">{gr.khmer}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn-issue-cert"
                        onClick={() => setCertificateStudent(student)}
                      >
                        🎖️ បើកប័ណ្ណសរសើរ
                      </button>
                    </div>
                  );
                })}
            </div>
          </section>
        )}

        {showAttendanceHub && (
          <section className="analytics-card attendance-hub-section" id="attendance-hub" style={{ marginBottom: "26px" }}>
            <div className="section-title attendance-header-wrap">
              <div>
                <h2>📋 ប្រព័ន្ធពិនិត្យ និងកត់ត្រាវត្តមានសិស្ស (Student Attendance)</h2>
                <p>កត់ត្រាវត្តមានប្រចាំថ្ងៃ ពិនិត្យវត្តមានសិស្សទាន់ពេល យឺត សុំច្បាប់ និងអវត្តមាន</p>
              </div>

              <div className="attendance-top-actions">
                <div className="attendance-date-selector">
                  <span className="attendance-date-icon">📅</span>
                  <input
                    type="date"
                    className="attendance-date-input"
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                  />
                  {attendanceDate !== getTodayDateString() && (
                    <button
                      type="button"
                      className="btn-attendance-today"
                      onClick={() => setAttendanceDate(getTodayDateString())}
                      title="ត្រឡប់មកថ្ងៃនេះ"
                    >
                      ថ្ងៃនេះ
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  className="btn-mark-all-present"
                  onClick={() => handleMarkAllAttendance("present")}
                  title="កត់ត្រាវត្តមានសិស្សទាំងអស់ជាវត្តមាន"
                >
                  ✓ វត្តមានទាំងអស់
                </button>

                <button
                  type="button"
                  className="btn-attendance-print"
                  onClick={() => setShowAttendancePrint(true)}
                  title="បោះពុម្ពបញ្ជីវត្តមានប្រចាំថ្ងៃ"
                >
                  🖨️ បោះពុម្ពបញ្ជី
                </button>

                <button
                  type="button"
                  className="btn-attendance-csv"
                  onClick={exportAttendanceCSV}
                  title="ទាញយករបាយការណ៍ជា CSV Excel"
                >
                  📥 Export CSV
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowAttendanceHub(false)}
                >
                  ✕ បិទ
                </button>
              </div>
            </div>

            {/* Mode Tabs */}
            <div className="attendance-type-tabs">
              <button
                type="button"
                className="att-type-tab active"
                onClick={() => {}}
              >
                👨‍🎓 សម្រាប់សិស្ស (Student Attendance)
              </button>
              <button
                type="button"
                className="att-type-tab"
                onClick={() => {
                  setShowAttendanceHub(false);
                  setShowTeacherHub(true);
                }}
              >
                👨‍🏫 សម្រាប់គ្រូ (Teacher Attendance)
              </button>
            </div>

            {/* Attendance Live Metrics Bar */}
            <div className="attendance-stats-grid">
              <div
                className={`attendance-stat-box present ${attendanceFilterStatus === "present" ? "active-stat" : ""}`}
                onClick={() => setAttendanceFilterStatus(attendanceFilterStatus === "present" ? "All" : "present")}
              >
                <div className="stat-box-icon">🟢</div>
                <div className="stat-box-content">
                  <span className="stat-box-label">វត្តមាន (Present)</span>
                  <div className="stat-box-number">
                    {countPresent} <small>/ {students.length}</small>
                  </div>
                  <span className="stat-box-sub">
                    {students.length ? Math.round((countPresent / students.length) * 100) : 0}% នៃសិស្សទាំងអស់
                  </span>
                </div>
              </div>

              <div
                className={`attendance-stat-box late ${attendanceFilterStatus === "late" ? "active-stat" : ""}`}
                onClick={() => setAttendanceFilterStatus(attendanceFilterStatus === "late" ? "All" : "late")}
              >
                <div className="stat-box-icon">🟡</div>
                <div className="stat-box-content">
                  <span className="stat-box-label">មកយឺត (Late)</span>
                  <div className="stat-box-number">{countLate}</div>
                  <span className="stat-box-sub">យឺតម៉ោងរៀន</span>
                </div>
              </div>

              <div
                className={`attendance-stat-box permission ${attendanceFilterStatus === "permission" ? "active-stat" : ""}`}
                onClick={() => setAttendanceFilterStatus(attendanceFilterStatus === "permission" ? "All" : "permission")}
              >
                <div className="stat-box-icon">🔵</div>
                <div className="stat-box-content">
                  <span className="stat-box-label">សុំច្បាប់ (Permission)</span>
                  <div className="stat-box-number">{countPermission}</div>
                  <span className="stat-box-sub">មានច្បាប់អនុញ្ញាត</span>
                </div>
              </div>

              <div
                className={`attendance-stat-box absent ${attendanceFilterStatus === "absent" ? "active-stat" : ""}`}
                onClick={() => setAttendanceFilterStatus(attendanceFilterStatus === "absent" ? "All" : "absent")}
              >
                <div className="stat-box-icon">🔴</div>
                <div className="stat-box-content">
                  <span className="stat-box-label">អវត្តមាន (Absent)</span>
                  <div className="stat-box-number">{countAbsent}</div>
                  <span className="stat-box-sub">អវត្តមានឥតច្បាប់</span>
                </div>
              </div>

              <div className="attendance-stat-box rate">
                <div className="stat-box-icon">📈</div>
                <div className="stat-box-content">
                  <span className="stat-box-label">អត្រាវត្តមានសរុប</span>
                  <div className="stat-box-number">{attendanceRate}%</div>
                  <span className="stat-box-sub">
                    {countUnmarked > 0 ? `នៅសល់ ${countUnmarked} មិនទាន់កត់` : "កត់ត្រាបានពេញលេញ"}
                  </span>
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="attendance-toolbar">
              <div className="attendance-search-wrap">
                <span>⌕</span>
                <input
                  type="search"
                  placeholder="ស្វែងរកឈ្មោះសិស្ស ឬ ID..."
                  value={attendanceSearch}
                  onChange={(e) => setAttendanceSearch(e.target.value)}
                />
              </div>

              <div className="attendance-filter-group">
                <select
                  value={attendanceSkill}
                  onChange={(e) => setAttendanceSkill(e.target.value)}
                  className="attendance-skill-select"
                >
                  <option value="All">គ្រប់ជំនាញទាំងអស់ (All Skills)</option>
                  {skills.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <div className="attendance-filter-chips">
                  {[
                    { key: "All", label: "ទាំងអស់", count: students.length },
                    { key: "present", label: "🟢 វត្តមាន", count: countPresent },
                    { key: "late", label: "🟡 យឺត", count: countLate },
                    { key: "permission", label: "🔵 ច្បាប់", count: countPermission },
                    { key: "absent", label: "🔴 អវត្តមាន", count: countAbsent },
                    { key: "unmarked", label: "⚪ មិនទាន់កត់", count: countUnmarked },
                  ].map((chip) => (
                    <button
                      key={chip.key}
                      type="button"
                      className={`attendance-chip ${attendanceFilterStatus === chip.key ? "active" : ""}`}
                      onClick={() => setAttendanceFilterStatus(chip.key)}
                    >
                      {chip.label} ({chip.count})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Attendance Roster Table */}
            <div className="attendance-table-wrap">
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th style={{ width: "48px" }}>#</th>
                    <th>ព័ត៌មានសិស្ស (Student)</th>
                    <th style={{ width: "130px" }}>ជំនាញ (Skill)</th>
                    <th style={{ width: "380px" }}>កំណត់ស្ថានភាពវត្តមាន (Attendance Status)</th>
                    <th>កំណត់ចំណាំ / មូលហេតុ (Note / Reason)</th>
                    <th style={{ width: "90px" }}>ម៉ោងកត់</th>
                    <th style={{ width: "40px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendanceStudents.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="attendance-empty">
                        <div style={{ padding: "32px 0", textAlign: "center" }}>
                          <p style={{ fontSize: "15px", color: "#64748b" }}>
                            🔍 មិនមានទិន្នន័យសិស្សត្រូវនឹងលក្ខខណ្ឌស្វែងរកនេះឡើយ
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredAttendanceStudents.map((student, idx) => {
                      const rec = currentDayRecord[String(student.id_student)];
                      const currentStatus = rec?.status || "unmarked";
                      const photo =
                        student.image && !isDefaultAvatar(student.image)
                          ? student.image
                          : getDefaultAvatar(student.gender);

                      return (
                        <tr
                          key={student.id_student}
                          className={`attendance-row status-${currentStatus}`}
                        >
                          <td className="attendance-idx">{idx + 1}</td>
                          <td>
                            <div className="attendance-student-cell">
                              <img
                                src={photo}
                                alt={student.name_student}
                                className="attendance-student-avatar"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = getDefaultAvatar(student.gender);
                                }}
                              />
                              <div>
                                <strong className="attendance-student-name">
                                  {student.name_student}
                                </strong>
                                <div className="attendance-student-sub">
                                  <span>ID: {student.id_student}</span> ·{" "}
                                  <span>{student.gender || "-"}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="attendance-skill-badge">
                              {student.skill || "IT"}
                            </span>
                          </td>
                          <td>
                            <div className="attendance-status-toggles">
                              <button
                                type="button"
                                className={`att-toggle-btn present ${currentStatus === "present" ? "selected" : ""}`}
                                onClick={() => handleSetStudentAttendance(student.id_student, "present")}
                                title="វត្តមាន (Present)"
                              >
                                <span>✓</span> វត្តមាន
                              </button>
                              <button
                                type="button"
                                className={`att-toggle-btn late ${currentStatus === "late" ? "selected" : ""}`}
                                onClick={() => handleSetStudentAttendance(student.id_student, "late")}
                                title="មកយឺត (Late)"
                              >
                                <span>⏱</span> យឺត
                              </button>
                              <button
                                type="button"
                                className={`att-toggle-btn permission ${currentStatus === "permission" ? "selected" : ""}`}
                                onClick={() => handleSetStudentAttendance(student.id_student, "permission")}
                                title="សុំច្បាប់ (Permission)"
                              >
                                <span>📝</span> ច្បាប់
                              </button>
                              <button
                                type="button"
                                className={`att-toggle-btn absent ${currentStatus === "absent" ? "selected" : ""}`}
                                onClick={() => handleSetStudentAttendance(student.id_student, "absent")}
                                title="អវត្តមាន (Absent)"
                              >
                                <span>✕</span> អវត្តមាន
                              </button>
                            </div>
                          </td>
                          <td>
                            <input
                              type="text"
                              className="attendance-note-input"
                              placeholder="មូលហេតុ (ឧ. ឈឺ, ធុរៈ...)"
                              value={rec?.note || ""}
                              onChange={(e) => handleSetStudentAttendanceNote(student.id_student, e.target.value)}
                            />
                          </td>
                          <td className="attendance-time-cell">
                            {rec?.time ? (
                              <span className="attendance-time-badge">{rec.time}</span>
                            ) : (
                              <span className="attendance-time-empty">-</span>
                            )}
                          </td>
                          <td>
                            {rec && (
                              <button
                                type="button"
                                className="btn-attendance-row-reset"
                                onClick={() => handleResetStudentAttendance(student.id_student)}
                                title="កំណត់ឡើងវិញ (Reset)"
                              >
                                ↺
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {showTeacherHub && (
          <section className="analytics-card teacher-hub-section" id="teacher-hub" style={{ marginBottom: "26px" }}>
            <div className="section-title attendance-header-wrap">
              <div>
                <h2>👨‍🏫 ប្រព័ន្ធគ្រប់គ្រង និងវត្តមានសម្រាប់គ្រូបង្រៀន (Teacher Management & Attendance)</h2>
                <p>កត់ត្រាវត្តមានសាស្ត្រាចារ្យ លោកគ្រូ-អ្នកគ្រូ គ្រប់គ្រងព័ត៌មាន និងបោះពុម្ពបញ្ជីវត្តមាន</p>
              </div>

              <div className="attendance-top-actions">
                <div className="attendance-date-selector">
                  <span className="attendance-date-icon">📅</span>
                  <input
                    type="date"
                    className="attendance-date-input"
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                  />
                  {attendanceDate !== getTodayDateString() && (
                    <button
                      type="button"
                      className="btn-attendance-today"
                      onClick={() => setAttendanceDate(getTodayDateString())}
                      title="ត្រឡប់មកថ្ងៃនេះ"
                    >
                      ថ្ងៃនេះ
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  className="btn-add-teacher"
                  onClick={() => setShowAddTeacherModal(true)}
                  title="បន្ថែមគ្រូបង្រៀនថ្មី"
                >
                  ＋ បន្ថែមគ្រូថ្មី
                </button>

                <button
                  type="button"
                  className="btn-mark-all-present"
                  onClick={() => handleMarkAllTeachers("present")}
                  title="កត់ត្រាគ្រូទាំងអស់ជាវត្តមាន (មកបង្រៀន)"
                >
                  ✓ គ្រូទាំងអស់មក
                </button>

                <button
                  type="button"
                  className="btn-attendance-print"
                  onClick={() => setShowTeacherPrint(true)}
                  title="បោះពុម្ពបញ្ជីវត្តមានគ្រូ"
                >
                  🖨️ បោះពុម្ពបញ្ជីគ្រូ
                </button>

                <button
                  type="button"
                  className="btn-attendance-csv"
                  onClick={exportTeacherAttendanceCSV}
                  title="ទាញយកជា CSV Excel"
                >
                  📥 Export CSV
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowTeacherHub(false)}
                >
                  ✕ បិទ
                </button>
              </div>
            </div>

            {/* Mode Tabs */}
            <div className="attendance-type-tabs">
              <button
                type="button"
                className="att-type-tab"
                onClick={() => {
                  setShowTeacherHub(false);
                  setShowAttendanceHub(true);
                }}
              >
                👨‍🎓 សម្រាប់សិស្ស (Student Attendance)
              </button>
              <button
                type="button"
                className="att-type-tab active"
                onClick={() => {}}
              >
                👨‍🏫 សម្រាប់គ្រូ (Teacher Attendance)
              </button>
            </div>

            {/* Teacher Live Metrics Bar */}
            <div className="attendance-stats-grid">
              <div
                className={`attendance-stat-box present ${teacherFilterStatus === "present" ? "active-stat" : ""}`}
                onClick={() => setTeacherFilterStatus(teacherFilterStatus === "present" ? "All" : "present")}
              >
                <div className="stat-box-icon">🟢</div>
                <div className="stat-box-content">
                  <span className="stat-box-label">គ្រូមកបង្រៀន (Present)</span>
                  <div className="stat-box-number">
                    {countTeacherPresent} <small>/ {teachers.length}</small>
                  </div>
                  <span className="stat-box-sub">
                    {teachers.length ? Math.round((countTeacherPresent / teachers.length) * 100) : 0}% នៃគ្រូទាំងអស់
                  </span>
                </div>
              </div>

              <div
                className={`attendance-stat-box late ${teacherFilterStatus === "late" ? "active-stat" : ""}`}
                onClick={() => setTeacherFilterStatus(teacherFilterStatus === "late" ? "All" : "late")}
              >
                <div className="stat-box-icon">🟡</div>
                <div className="stat-box-content">
                  <span className="stat-box-label">មកយឺត (Late)</span>
                  <div className="stat-box-number">{countTeacherLate}</div>
                  <span className="stat-box-sub">យឺតម៉ោងបង្រៀន</span>
                </div>
              </div>

              <div
                className={`attendance-stat-box permission ${teacherFilterStatus === "permission" ? "active-stat" : ""}`}
                onClick={() => setTeacherFilterStatus(teacherFilterStatus === "permission" ? "All" : "permission")}
              >
                <div className="stat-box-icon">🔵</div>
                <div className="stat-box-content">
                  <span className="stat-box-label">សុំច្បាប់ (Leave)</span>
                  <div className="stat-box-number">{countTeacherPermission}</div>
                  <span className="stat-box-sub">មានច្បាប់អនុញ្ញាត</span>
                </div>
              </div>

              <div
                className={`attendance-stat-box absent ${teacherFilterStatus === "absent" ? "active-stat" : ""}`}
                onClick={() => setTeacherFilterStatus(teacherFilterStatus === "absent" ? "All" : "absent")}
              >
                <div className="stat-box-icon">🔴</div>
                <div className="stat-box-content">
                  <span className="stat-box-label">អវត្តមាន (Absent)</span>
                  <div className="stat-box-number">{countTeacherAbsent}</div>
                  <span className="stat-box-sub">អវត្តមានឥតច្បាប់</span>
                </div>
              </div>

              <div className="attendance-stat-box rate">
                <div className="stat-box-icon">📈</div>
                <div className="stat-box-content">
                  <span className="stat-box-label">អត្រាវត្តមានគ្រូ</span>
                  <div className="stat-box-number">{teacherAttendanceRate}%</div>
                  <span className="stat-box-sub">
                    {countTeacherUnmarked > 0 ? `នៅសល់ ${countTeacherUnmarked} មិនទាន់កត់` : "កត់ត្រាបានពេញលេញ"}
                  </span>
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="attendance-toolbar">
              <div className="attendance-search-wrap">
                <span>⌕</span>
                <input
                  type="search"
                  placeholder="ស្វែងរកឈ្មោះគ្រូ ឬ ID..."
                  value={teacherSearch}
                  onChange={(e) => setTeacherSearch(e.target.value)}
                />
              </div>

              <div className="attendance-filter-group">
                <select
                  value={teacherFilterSkill}
                  onChange={(e) => setTeacherFilterSkill(e.target.value)}
                  className="attendance-skill-select"
                >
                  <option value="All">គ្រប់មុខវិជ្ជា/ជំនាញ (All Subjects)</option>
                  {[...new Set(teachers.map((t) => t.skill).filter(Boolean))].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <div className="attendance-filter-chips">
                  {[
                    { key: "All", label: "ទាំងអស់", count: teachers.length },
                    { key: "present", label: "🟢 មកបង្រៀន", count: countTeacherPresent },
                    { key: "late", label: "🟡 យឺត", count: countTeacherLate },
                    { key: "permission", label: "🔵 សុំច្បាប់", count: countTeacherPermission },
                    { key: "absent", label: "🔴 អវត្តមាន", count: countTeacherAbsent },
                    { key: "unmarked", label: "⚪ មិនទាន់កត់", count: countTeacherUnmarked },
                  ].map((chip) => (
                    <button
                      key={chip.key}
                      type="button"
                      className={`attendance-chip ${teacherFilterStatus === chip.key ? "active" : ""}`}
                      onClick={() => setTeacherFilterStatus(chip.key)}
                    >
                      {chip.label} ({chip.count})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Teachers Attendance Table */}
            <div className="attendance-table-wrap">
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th style={{ width: "48px" }}>#</th>
                    <th>ព័ត៌មានគ្រូបង្រៀន (Teacher)</th>
                    <th style={{ width: "160px" }}>មុខវិជ្ជា/ជំនាញ (Subject)</th>
                    <th style={{ width: "140px" }}>បន្ទប់/វេន (Room & Shift)</th>
                    <th style={{ width: "370px" }}>កំណត់ស្ថានភាពវត្តមាន (Status)</th>
                    <th>កំណត់ចំណាំ (Remarks / Notes)</th>
                    <th style={{ width: "90px" }}>ម៉ោងកត់</th>
                    <th style={{ width: "40px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="attendance-empty">
                        <div style={{ padding: "32px 0", textAlign: "center" }}>
                          <p style={{ fontSize: "15px", color: "#64748b" }}>
                            🔍 មិនមានទិន្នន័យគ្រូបង្រៀនត្រូវនឹងលក្ខខណ្ឌស្វែងរកនេះឡើយ
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredTeachers.map((teacher, idx) => {
                      const rec = currentTeacherDayRecord[String(teacher.id_teacher)];
                      const currentStatus = rec?.status || "unmarked";

                      return (
                        <tr
                          key={teacher.id_teacher}
                          className={`attendance-row status-${currentStatus}`}
                        >
                          <td className="attendance-idx">{idx + 1}</td>
                          <td>
                            <div className="attendance-student-cell">
                              <img
                                src={teacher.image}
                                alt={teacher.name_teacher}
                                className="attendance-student-avatar"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = getDefaultAvatar(teacher.gender);
                                }}
                              />
                              <div>
                                <strong className="attendance-student-name">
                                  {teacher.name_teacher}
                                </strong>
                                <div className="attendance-student-sub">
                                  <span>ID: {teacher.id_teacher}</span> ·{" "}
                                  <span>{teacher.name_en || teacher.degree}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="attendance-skill-badge" style={{ background: "#ede9fe", color: "#6d28d9" }}>
                              {teacher.skill}
                            </span>
                          </td>
                          <td>
                            <div style={{ fontSize: "12px", color: "#334155", fontWeight: "600" }}>
                              <div>{teacher.room || "Lab"}</div>
                              <small style={{ color: "#64748b" }}>{teacher.shift || "Morning"}</small>
                            </div>
                          </td>
                          <td>
                            <div className="attendance-status-toggles">
                              <button
                                type="button"
                                className={`att-toggle-btn present ${currentStatus === "present" ? "selected" : ""}`}
                                onClick={() => handleSetTeacherAttendance(teacher.id_teacher, "present")}
                                title="វត្តមាន មកបង្រៀន (Present)"
                              >
                                <span>✓</span> មកបង្រៀន
                              </button>
                              <button
                                type="button"
                                className={`att-toggle-btn late ${currentStatus === "late" ? "selected" : ""}`}
                                onClick={() => handleSetTeacherAttendance(teacher.id_teacher, "late")}
                                title="មកយឺត (Late)"
                              >
                                <span>⏱</span> យឺត
                              </button>
                              <button
                                type="button"
                                className={`att-toggle-btn permission ${currentStatus === "permission" ? "selected" : ""}`}
                                onClick={() => handleSetTeacherAttendance(teacher.id_teacher, "permission")}
                                title="សុំច្បាប់ (Leave)"
                              >
                                <span>📝</span> ច្បាប់
                              </button>
                              <button
                                type="button"
                                className={`att-toggle-btn absent ${currentStatus === "absent" ? "selected" : ""}`}
                                onClick={() => handleSetTeacherAttendance(teacher.id_teacher, "absent")}
                                title="អវត្តមាន (Absent)"
                              >
                                <span>✕</span> អវត្តមាន
                              </button>
                            </div>
                          </td>
                          <td>
                            <input
                              type="text"
                              className="attendance-note-input"
                              placeholder="ចំណាំ (ឧ. បង្រៀនទាន់ម៉ោង, សុំច្បាប់...)"
                              value={rec?.note || ""}
                              onChange={(e) => handleSetTeacherAttendanceNote(teacher.id_teacher, e.target.value)}
                            />
                          </td>
                          <td className="attendance-time-cell">
                            {rec?.time ? (
                              <span className="attendance-time-badge">{rec.time}</span>
                            ) : (
                              <span className="attendance-time-empty">-</span>
                            )}
                          </td>
                          <td>
                            {rec && (
                              <button
                                type="button"
                                className="btn-attendance-row-reset"
                                onClick={() => handleResetTeacherAttendance(teacher.id_teacher)}
                                title="កំណត់ឡើងវិញ (Reset)"
                              >
                                ↺
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </section>
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
                disabled={exporting}
              >
                {exporting ? "⏳ Exporting..." : "⇩ Export CSV"}
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

            <select
              value={filterPayment}
              onChange={(e) => setFilterPayment(e.target.value)}
              className="skill-filter"
            >
              <option value="All">All Payment Status</option>
              <option value="paid">✓ Paid Only (បានបង់រួច)</option>
              <option value="unpaid">✕ Unpaid Only (មិនទាន់បង់)</option>
            </select>

            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="skill-filter"
            >
              <option value="All">All Grades (គ្រប់និទ្ទេស)</option>
              <option value="A">★ និទ្ទេស A (90-100 ពិន្ទុ)</option>
              <option value="B">★ និទ្ទេស B (80-89 ពិន្ទុ)</option>
              <option value="C">★ និទ្ទេស C (70-79 ពិន្ទុ)</option>
              <option value="D">★ និទ្ទេស D (60-69 ពិន្ទុ)</option>
              <option value="E">★ និទ្ទេស E (50-59 ពិន្ទុ)</option>
              <option value="F">✕ និទ្ទេស F (ក្រោម 50 ពិន្ទុ)</option>
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
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Student ID</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Skill</th>
                    <th>Salary</th>
                    <th>Score & Grade (ពិន្ទុ & និទ្ទេស)</th>
                    <th>Payment</th>
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

                        <td className="student-photo-cell">
                          <img
                            src={
                              student.image && !isDefaultAvatar(student.image)
                                ? student.image
                                : getDefaultAvatar(student.gender)
                            }
                            alt={student.name_student}
                            className="student-table-photo"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = getDefaultAvatar(student.gender);
                            }}
                          />
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
                          {(() => {
                            const sc = getStudentScore(student, studentScores);
                            const gr = getGradeInfo(sc);
                            return (
                              <div className="student-score-cell">
                                <div className="score-top">
                                  <span className="score-val">{sc}</span>
                                  <span className="score-max">/100</span>
                                  <span className={`grade-badge ${gr.badgeClass}`}>
                                    {gr.grade}
                                  </span>
                                </div>
                                <small className="grade-khmer-sub">{gr.khmer}</small>
                              </div>
                            );
                          })()}
                        </td>

                        <td>
                          <div className="payment-cell-wrapper">
                            <button
                              type="button"
                              className={`payment-toggle-btn ${
                                student.payment_status === "paid"
                                  ? "paid"
                                  : "unpaid"
                              }`}
                              onClick={(e) =>
                                handleTogglePayment(student, e)
                              }
                              disabled={
                                updatingPaymentId ===
                                student.id_student
                              }
                              title={
                                student.payment_status === "paid"
                                  ? "ស្ថានភាព៖ បានបង់ប្រាក់រួច (ចុចដើម្បីប្តូរទៅ មិនទាន់បង់)"
                                  : "ស្ថានភាព៖ មិនទាន់បង់ប្រាក់ (ចុចដើម្បីប្តូរទៅ បានបង់)"
                              }
                            >
                              {updatingPaymentId ===
                              student.id_student ? (
                                <span className="payment-btn-loading">
                                  ⏳
                                </span>
                              ) : student.payment_status === "paid" ? (
                                <>
                                  <span className="payment-icon check">
                                    ✓
                                  </span>
                                  <span className="payment-btn-text">
                                    Paid
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span className="payment-icon cross">
                                    ✕
                                  </span>
                                  <span className="payment-btn-text">
                                    Unpaid
                                  </span>
                                </>
                              )}
                            </button>

                            {student.payment_status === "paid" ? (
                              <button
                                type="button"
                                className="quick-icon-btn receipt"
                                title="Print Payment Receipt (វិក្កយបត្រ)"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setReceiptStudent(student);
                                }}
                              >
                                🧾
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="quick-icon-btn khqr"
                                title="Pay with Bakong KHQR (ស្កេនបង់ប្រាក់)"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setKhqrStudent(student);
                                }}
                              >
                                📱
                              </button>
                            )}
                          </div>
                        </td>

                        <td>
                          <div className="student-actions">
                            <button
                              type="button"
                              className="view-btn"
                              onClick={() =>
                                setSelectedStudent(student)
                              }
                              title="View Details"
                            >
                              View
                            </button>

                            <button
                              type="button"
                              className="id-card-action-btn"
                              onClick={() => setIdCardStudent(student)}
                              title="Generate Student ID Card"
                            >
                              🪪 ID
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
                      <td colSpan="11" className="empty-table">
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

            <div className="modal-student-avatar-card">
              <img
                src={
                  selectedStudent.image && !isDefaultAvatar(selectedStudent.image)
                    ? selectedStudent.image
                    : getDefaultAvatar(selectedStudent.gender)
                }
                alt={selectedStudent.name_student}
                className="modal-student-photo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = getDefaultAvatar(selectedStudent.gender);
                }}
              />
              <div className="modal-student-meta">
                <h3>{selectedStudent.name_student}</h3>
                <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                  <span
                    className={`gender-badge ${
                      String(selectedStudent.gender || "").toLowerCase() === "female"
                        ? "female"
                        : "male"
                    }`}
                  >
                    {selectedStudent.gender || "-"}
                  </span>
                  <span
                    className={`payment-toggle-btn ${
                      selectedStudent.payment_status === "paid" ? "paid" : "unpaid"
                    }`}
                    style={{ pointerEvents: "none", padding: "4px 10px", fontSize: "11px" }}
                  >
                    {selectedStudent.payment_status === "paid" ? "✓ Paid (បានបង់)" : "✕ Unpaid (មិនទាន់បង់)"}
                  </span>
                </div>
              </div>
            </div>

            <div className="details-grid">
              {[
                ["Student Name", selectedStudent.name_student],
                ["Student ID", selectedStudent.id_student],
                ["Age", selectedStudent.age_student],
                ["Gender", selectedStudent.gender],
                [
                  "Payment Status",
                  selectedStudent.payment_status === "paid"
                    ? "✓ Paid (បានបង់ប្រាក់រួចរាល់)"
                    : "✕ Unpaid (មិនទាន់បង់ប្រាក់)",
                ],
                ["Telegram", selectedStudent.telegram],
                ["Facebook", selectedStudent.facebook],
                ["Skill", selectedStudent.skill],
                [
                  "Salary",
                  `$${selectedStudent.salary || "0"}`,
                ],
                ["Place", selectedStudent.place],
                [
                  "Score / ពិន្ទុ",
                  `${getStudentScore(selectedStudent, studentScores)} / 100`,
                ],
                [
                  "Grade / និទ្ទេស",
                  `${getGradeInfo(getStudentScore(selectedStudent, studentScores)).grade} (${getGradeInfo(getStudentScore(selectedStudent, studentScores)).khmer} - ${getGradeInfo(getStudentScore(selectedStudent, studentScores)).en})`,
                ],
                [
                  "Attendance (វត្តមាន)",
                  (() => {
                    const rec = getStudentAttendance(selectedStudent.id_student);
                    if (!rec) return "មិនទាន់កត់ត្រា (Not Checked)";
                    if (rec.status === "present") return `✓ វត្តមាន (${rec.time || ""})`;
                    if (rec.status === "late") return `⏱ មកយឺត (${rec.time || ""})${rec.note ? " - " + rec.note : ""}`;
                    if (rec.status === "permission") return `📝 សុំច្បាប់${rec.note ? " - " + rec.note : ""}`;
                    if (rec.status === "absent") return `✕ អវត្តមាន${rec.note ? " - " + rec.note : ""}`;
                    return "-";
                  })(),
                ],
              ].map(([label, value]) => (
                <div className="detail-item" key={label}>
                  <small>{label}</small>
                  <strong>{value || "-"}</strong>
                </div>
              ))}
            </div>

            <div className="modal-print-actions">
              <button
                type="button"
                className="btn-modal-print idcard"
                onClick={() => setIdCardStudent(selectedStudent)}
              >
                🪪 Student ID Card
              </button>
              <button
                type="button"
                className="btn-modal-print cert"
                onClick={() => setCertificateStudent(selectedStudent)}
              >
                🎖️ ប័ណ្ណសរសើរ
              </button>
              <button
                type="button"
                className="btn-modal-print receipt"
                onClick={() => setReceiptStudent(selectedStudent)}
              >
                🧾 Payment Receipt
              </button>
              <button
                type="button"
                className="btn-modal-print khqr"
                onClick={() => setKhqrStudent(selectedStudent)}
              >
                📱 Bakong KHQR
              </button>
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

      {/* ================= STUDENT ID CARD MODAL ================= */}
      {idCardStudent && (
        <div
          className="modal-backdrop"
          onClick={() => setIdCardStudent(null)}
        >
          <div
            className="idcard-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="idcard-modal-header no-print">
              <div>
                <h3>🎓 Student ID Card</h3>
                <p>BELTEI International University Official Card</p>
              </div>
              <button
                type="button"
                className="close-modal-btn"
                onClick={() => setIdCardStudent(null)}
              >
                ✕
              </button>
            </div>

            {/* The Printable ID Card Area */}
            <div className="idcard-print-wrap">
              <div className="beltei-idcard printable-area">
                {/* Top header */}
                <div className="idcard-top">
                  <div className="idcard-logo-badge">
                    <span>🎓</span>
                  </div>
                  <div className="idcard-header-titles">
                    <h4>សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ</h4>
                    <h5>BELTEI INTERNATIONAL UNIVERSITY</h5>
                    <span className="idcard-accreditation">Future of Education · Cambodia</span>
                  </div>
                </div>

                <div className="idcard-badge-tag">STUDENT CARD</div>

                {/* Body */}
                <div className="idcard-body">
                  <div className="idcard-photo-box">
                    <img
                      src={
                        idCardStudent.image && !isDefaultAvatar(idCardStudent.image)
                          ? idCardStudent.image
                          : getDefaultAvatar(idCardStudent.gender)
                      }
                      alt={idCardStudent.name_student}
                      className="idcard-photo-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getDefaultAvatar(idCardStudent.gender);
                      }}
                    />
                    <span className="idcard-id-pill">ID: {idCardStudent.id_student}</span>
                  </div>

                  <div className="idcard-details">
                    <div className="idcard-name-kh">{idCardStudent.name_student}</div>
                    <div className="idcard-name-en">{String(idCardStudent.name_student || "").toUpperCase()}</div>

                    <div className="idcard-info-table">
                      <div className="idcard-info-row">
                        <span className="lbl">ជំនាញ / Major:</span>
                        <span className="val highlight">{idCardStudent.skill || "IT"}</span>
                      </div>
                      <div className="idcard-info-row">
                        <span className="lbl">ភេទ / Gender:</span>
                        <span className="val">{idCardStudent.gender || "Male"}</span>
                      </div>
                      <div className="idcard-info-row">
                        <span className="lbl">ឆ្នាំសិក្សា / Year:</span>
                        <span className="val">2026 - 2027</span>
                      </div>
                      <div className="idcard-info-row">
                        <span className="lbl">ផុតកំណត់ / Exp:</span>
                        <span className="val">31-10-2027</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer with barcode, scannable QR Code & official stamp */}
                <div className="idcard-footer">
                  <div className="idcard-barcode-section">
                    <div className="idcard-barcode-lines">
                      {[2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 3, 1, 4, 2].map((w, i) => (
                        <span
                          key={i}
                          style={{
                            display: "inline-block",
                            width: `${w * 1.2}px`,
                            height: "22px",
                            background: "#1e293b",
                            marginRight: "1px",
                          }}
                        />
                      ))}
                    </div>
                    <span className="idcard-barcode-text">*{idCardStudent.id_student}*</span>
                  </div>

                  {/* Scannable QR Code */}
                  <div className="idcard-qr-section" title="ស្កេន QR Code ដើម្បីផ្ទៀងផ្ទាត់អត្តសញ្ញាណសិស្សផ្លូវការ">
                    <div className="idcard-qr-box">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&margin=1&data=${encodeURIComponent(
                          getStudentVerificationUrl(idCardStudent, studentScores)
                        )}`}
                        alt="QR Code Verification"
                        className="idcard-qr-img"
                      />
                    </div>
                    <span className="idcard-qr-label">📷 SCAN TO VERIFY</span>
                  </div>

                  <div className="idcard-seal-box">
                    <div className="idcard-seal">
                      <span>★ BELTEI ★</span>
                      <small>OFFICIAL</small>
                    </div>
                    <div className="idcard-signature">
                      <span className="sig-line">Dean of Academic</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scan hint info */}
            <div className="idcard-scan-hint no-print">
              <span>📱 <strong>ស្កេន QR Code</strong> លើកាតសិស្សដោយកាមេរ៉ាទូរស័ព្ទដៃ ដើម្បីផ្ទៀងផ្ទាត់អត្តសញ្ញាណ ឬចុចប៊ូតុងខាងក្រោម៖</span>
            </div>

            {/* Action buttons */}
            <div className="idcard-actions no-print">
              <a
                href={getStudentVerificationUrl(idCardStudent, studentScores)}
                target="_blank"
                rel="noopener noreferrer"
                className="idcard-verify-btn"
                title="តេស្តបើកមើលទំព័រផ្ទៀងផ្ទាត់សិស្សផ្លូវការ"
              >
                🔍 តេស្តស្កេនមើល QR (Test Scan Link)
              </a>
              <button
                type="button"
                className="idcard-print-btn"
                onClick={() => window.print()}
              >
                🖨️ បោះពុម្ពកាតសិស្ស (Print ID Card)
              </button>
              <button
                type="button"
                className="idcard-close-btn"
                onClick={() => setIdCardStudent(null)}
              >
                ✕ បិទ (Close)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= PAYMENT RECEIPT / INVOICE MODAL ================= */}
      {receiptStudent && (
        <div
          className="modal-backdrop"
          onClick={() => setReceiptStudent(null)}
        >
          <div
            className="receipt-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="receipt-modal-header no-print">
              <div>
                <h3>🧾 Official Tuition Receipt</h3>
                <p>វិក្កយបត្រទទួលប្រាក់ថ្លៃសិក្សាផ្លូវការ</p>
              </div>
              <button
                type="button"
                className="close-modal-btn"
                onClick={() => setReceiptStudent(null)}
              >
                ✕
              </button>
            </div>

            {/* The Printable Receipt Area */}
            <div className="receipt-paper printable-area">
              <div className="receipt-header-row">
                <div className="receipt-brand">
                  <div className="receipt-brand-logo">🎓</div>
                  <div>
                    <h2>សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ</h2>
                    <h3>BELTEI INTERNATIONAL UNIVERSITY</h3>
                    <p>Phnom Penh, Cambodia · Tel: (855) 23 999 999 · www.beltei.edu.kh</p>
                  </div>
                </div>
                <div className="receipt-meta-box">
                  <span className="receipt-badge-title">OFFICIAL RECEIPT</span>
                  <div className="receipt-meta-item">
                    <span>Receipt No:</span>
                    <strong>BIU-REC-{String(receiptStudent.id_student).padStart(5, "0")}</strong>
                  </div>
                  <div className="receipt-meta-item">
                    <span>Date:</span>
                    <strong>{new Date().toLocaleDateString("en-GB")}</strong>
                  </div>
                </div>
              </div>

              <div className="receipt-divider" />

              <div className="receipt-student-info">
                <div className="receipt-info-col">
                  <p><span>Student Name:</span> <strong>{receiptStudent.name_student}</strong></p>
                  <p><span>Student ID:</span> <strong>{receiptStudent.id_student}</strong></p>
                  <p><span>Gender:</span> <strong>{receiptStudent.gender || "-"}</strong></p>
                </div>
                <div className="receipt-info-col">
                  <p><span>Skill / Course:</span> <strong>{receiptStudent.skill || "-"}</strong></p>
                  <p><span>Campus / Place:</span> <strong>{receiptStudent.place || "Phnom Penh Main Campus"}</strong></p>
                  <p><span>Payment Method:</span> <strong>Bakong KHQR / Cash</strong></p>
                </div>
              </div>

              <table className="receipt-table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Description / ការពិពណ៌នា</th>
                    <th>Academic Term</th>
                    <th>Amount (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <strong>Course Tuition & Training Fee</strong>
                      <br />
                      <small>Framework Web Development - {receiptStudent.skill} Specialization</small>
                    </td>
                    <td>2026 - 2027</td>
                    <td>${Number(receiptStudent.salary || 500).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Student Registration, ID Card & Platform Access</td>
                    <td>Annual</td>
                    <td>$0.00 (Included)</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold" }}>Total Amount (សរុប):</td>
                    <td style={{ fontWeight: "bold", fontSize: "16px", color: "#087f8c" }}>
                      ${Number(receiptStudent.salary || 500).toFixed(2)} USD
                    </td>
                  </tr>
                </tfoot>
              </table>

              <div className="receipt-bottom-grid">
                <div className="receipt-status-section">
                  <div className={`receipt-stamp ${receiptStudent.payment_status === "paid" ? "paid-stamp" : "unpaid-stamp"}`}>
                    {receiptStudent.payment_status === "paid" ? (
                      <>
                        <div className="stamp-circle">★ BELTEI UNIVERSITY ★</div>
                        <div className="stamp-text">PAID IN FULL</div>
                        <div className="stamp-date">{new Date().toLocaleDateString("en-GB")}</div>
                      </>
                    ) : (
                      <>
                        <div className="stamp-circle">★ BELTEI UNIVERSITY ★</div>
                        <div className="stamp-text">PENDING</div>
                        <div className="stamp-date">UNPAID</div>
                      </>
                    )}
                  </div>
                  <p className="receipt-note">
                    * Receipt is valid only with official university stamp and cashier signature.
                  </p>
                </div>

                <div className="receipt-signatures">
                  <div className="sig-block">
                    <div className="sig-line-top" />
                    <p>Student's Signature</p>
                  </div>
                  <div className="sig-block">
                    <div className="sig-officer-name">{profileName}</div>
                    <div className="sig-line-top" />
                    <p>Authorized Cashier / Admin</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="receipt-actions no-print">
              <button
                type="button"
                className="receipt-print-btn"
                onClick={() => window.print()}
              >
                🖨️ បោះពុម្ពវិក្កយបត្រ (Print Receipt)
              </button>
              <button
                type="button"
                className="receipt-close-btn"
                onClick={() => setReceiptStudent(null)}
              >
                ✕ បិទ (Close)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= BAKONG KHQR MODAL ================= */}
      {khqrStudent && (
        <div
          className="modal-backdrop"
          onClick={() => setKhqrStudent(null)}
        >
          <div
            className="khqr-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* KHQR Header Banner */}
            <div className="khqr-modal-header">
              <div className="khqr-badge">
                <span className="khqr-red-text">KHQR</span>
              </div>
              <div className="khqr-bakong-sub">
                <span>National Bank of Cambodia</span>
              </div>
              <button
                type="button"
                className="khqr-close-x"
                onClick={() => setKhqrStudent(null)}
              >
                ✕
              </button>
            </div>

            <div className="khqr-modal-body">
              <div className="khqr-merchant-info">
                <h4>BELTEI INTERNATIONAL UNIVERSITY</h4>
                <p>Tuition Fee Collection</p>
              </div>

              <div className="khqr-amount-box">
                <span className="khqr-amount-currency">$</span>
                <span className="khqr-amount-val">
                  {Number(khqrStudent.salary || 500).toFixed(2)}
                </span>
                <span className="khqr-amount-code">USD</span>
              </div>

              <div className="khqr-qr-wrapper">
                <div className="khqr-qr-frame">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=230x230&data=KHQR:BELTEI_INT_UNIVERSITY:STUDENT:${khqrStudent.id_student}:USD:${khqrStudent.salary || 500}&color=0f172a&bgcolor=ffffff`}
                    alt="KHQR Code"
                    className="khqr-qr-img"
                  />
                  <div className="khqr-center-icon">
                    <span>៛ $</span>
                  </div>
                </div>
              </div>

              <div className="khqr-student-meta">
                <div className="khqr-meta-row">
                  <span>សិស្ស / Student:</span>
                  <strong>{khqrStudent.name_student}</strong>
                </div>
                <div className="khqr-meta-row">
                  <span>អត្តលេខ / Student ID:</span>
                  <strong>{khqrStudent.id_student}</strong>
                </div>
                <div className="khqr-meta-row">
                  <span>ជំនាញ / Course:</span>
                  <strong>{khqrStudent.skill || "IT"}</strong>
                </div>
                <div className="khqr-meta-row">
                  <span>ស្ថានភាព / Status:</span>
                  <span
                    className={`khqr-status-pill ${
                      khqrStudent.payment_status === "paid" ? "paid" : "unpaid"
                    }`}
                  >
                    {khqrStudent.payment_status === "paid" ? "✓ បានបង់រួច" : "✕ មិនទាន់បង់"}
                  </span>
                </div>
              </div>

              <div className="khqr-scan-instruction">
                <span>📲</span>
                <span>
                  ស្កេនជាមួយកម្មវិធី Mobile Banking ណាមួយ (ABA, ACLEDA, Canadia, Wing, etc.)
                </span>
              </div>

              {khqrStudent.payment_status !== "paid" ? (
                <button
                  type="button"
                  className="khqr-confirm-pay-btn"
                  disabled={updatingPaymentId === khqrStudent.id_student}
                  onClick={async () => {
                    await handleTogglePayment(khqrStudent);
                    const updated = { ...khqrStudent, payment_status: "paid" };
                    setKhqrStudent(null);
                    setReceiptStudent(updated);
                  }}
                >
                  {updatingPaymentId === khqrStudent.id_student
                    ? "កំពុងកត់ត្រា..."
                    : "✓ បញ្ជាក់ថាបានទទួលប្រាក់រួច (Confirm & Issue Receipt)"}
                </button>
              ) : (
                <button
                  type="button"
                  className="khqr-confirm-pay-btn receipt-view"
                  onClick={() => {
                    setKhqrStudent(null);
                    setReceiptStudent(khqrStudent);
                  }}
                >
                  🧾 មើលវិក្កយបត្របង់ប្រាក់ (View Receipt)
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= CERTIFICATE OF HONOR / ប័ណ្ណសរសើរ ================= */}
      {certificateStudent && (() => {
        const score = getStudentScore(certificateStudent, studentScores);
        const gradeInfo = getGradeInfo(score);
        const certPhoto = certificateStudent.image && !isDefaultAvatar(certificateStudent.image)
          ? certificateStudent.image
          : getDefaultAvatar(certificateStudent.gender);

        return (
          <div
            className="modal-backdrop"
            onClick={() => setCertificateStudent(null)}
          >
            <div
              className="cert-modal-container"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cert-modal-header no-print">
                <div>
                  <h3>🎖️ ប័ណ្ណសរសើរ / Certificate of Honor</h3>
                  <p>BELTEI International University Academic Award</p>
                </div>
                <button
                  type="button"
                  className="close-modal-btn"
                  onClick={() => setCertificateStudent(null)}
                >
                  ✕
                </button>
              </div>

              {/* The Printable Certificate Area */}
              <div className="cert-print-wrap">
                <div className="beltei-certificate printable-area">
                  {/* Ornate Gold Border inner */}
                  <div className="cert-inner-border">
                    {/* Corner Ornaments */}
                    <div className="cert-corner tl">✦</div>
                    <div className="cert-corner tr">✦</div>
                    <div className="cert-corner bl">✦</div>
                    <div className="cert-corner br">✦</div>

                    {/* Royal Header */}
                    <div className="cert-royal-header">
                      <div className="cert-national-motto">
                        <h4>ព្រះរាជាណាចក្រកម្ពុជា</h4>
                        <h5>ជាតិ សាសនា ព្រះមហាក្សត្រ</h5>
                        <div className="cert-motto-underline" />
                      </div>

                      <div className="cert-school-header">
                        <div className="cert-uni-logo">🎓</div>
                        <div>
                          <h2>សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ</h2>
                          <h3>BELTEI INTERNATIONAL UNIVERSITY</h3>
                        </div>
                      </div>
                    </div>

                    {/* Certificate Title */}
                    <div className="cert-main-title">
                      <h1>ប័ណ្ណសរសើរ</h1>
                      <div className="cert-eng-title">CERTIFICATE OF HONOR</div>
                      <p className="cert-award-reason">
                        សម្រាប់សិស្សឆ្នើមប្រចាំវគ្គសិក្សា (OUTSTANDING ACADEMIC ACHIEVEMENT)
                      </p>
                    </div>

                    {/* Student Photo & Recognition Content */}
                    <div className="cert-recipient-section">
                      <div className="cert-photo-wrapper">
                        <div className="cert-photo-frame">
                          <img
                            src={certPhoto}
                            alt={certificateStudent.name_student}
                            className="cert-student-img"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = getDefaultAvatar(certificateStudent.gender);
                            }}
                          />
                        </div>
                        <div className="cert-ribbon-badge">★ សិស្សឆ្នើម ★</div>
                      </div>

                      <div className="cert-text-content">
                        <p className="cert-intro-text">
                          គណៈគ្រប់គ្រងនៃសាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ សូមផ្តល់ប័ណ្ណសរសើរនេះជូនចំពោះ៖
                        </p>

                        <div className="cert-student-name">
                          {certificateStudent.name_student}
                        </div>
                        <div className="cert-student-name-en">
                          {String(certificateStudent.name_student || "").toUpperCase()}
                        </div>

                        <div className="cert-meta-info">
                          <span>អត្តលេខ (ID)៖ <strong>{certificateStudent.id_student}</strong></span>
                          <span className="cert-bullet">·</span>
                          <span>ជំនាញ (Major)៖ <strong>{certificateStudent.skill || "Information Technology"}</strong></span>
                          <span className="cert-bullet">·</span>
                          <span>ឆ្នាំសិក្សា៖ <strong>២០២៦–២០២៧</strong></span>
                        </div>

                        {/* Grade and Score Highlight Box */}
                        <div className="cert-grade-highlight-box">
                          <div className="cert-grade-badge">
                            <span className="cert-grade-label">និទ្ទេស (GRADE)</span>
                            <span className="cert-grade-letter">{gradeInfo.grade}</span>
                            <span className="cert-grade-khmer">({gradeInfo.khmer})</span>
                          </div>

                          <div className="cert-score-badge">
                            <span className="cert-score-label">ពិន្ទុសរុប (SCORE)</span>
                            <span className="cert-score-number">{score} <small>/ 100</small></span>
                            <span className="cert-stars">{gradeInfo.star}</span>
                          </div>

                          <div className="cert-eval-badge">
                            <span className="cert-eval-label">ការវាយតម្លៃ</span>
                            <span className="cert-eval-text">{gradeInfo.en}</span>
                            <span className="cert-eval-gpa">GPA: {gradeInfo.gpa}</span>
                          </div>
                        </div>

                        <p className="cert-congrats-text">
                          ដែលបានខិតខំប្រឹងប្រែងសិក្សា និងទទួលបានលទ្ធផលឆ្នើមក្នុងមុខវិជ្ជា <strong>Framework Web Page Development</strong>។
                          សូមជូនពរឱ្យទទួលបានជោគជ័យ និងអនាគតដ៏ភ្លឺស្វាង!
                        </p>
                      </div>
                    </div>

                    {/* Footer / Seals / Signatures */}
                    <div className="cert-footer-row">
                      <div className="cert-sig-col">
                        <p className="cert-date-text">
                          រាជធានីភ្នំពេញ, ថ្ងៃទី {new Date().getDate()} ខែ {new Date().getMonth() + 1} ឆ្នាំ {new Date().getFullYear()}
                        </p>
                        <div className="cert-sig-space" />
                        <div className="cert-sig-line" />
                        <p className="cert-sig-title">ព្រឹទ្ធបុរសមហាវិទ្យាល័យ</p>
                        <small className="cert-sig-subtitle">Dean of Faculty</small>
                      </div>

                      <div className="cert-seal-col">
                        <div className="cert-official-seal">
                          <div className="seal-outer-ring">
                            <div className="seal-inner-ring">
                              <span>★ BELTEI INT UNIVERSITY ★</span>
                              <div className="seal-star">★</div>
                              <strong>OFFICIAL MERIT</strong>
                              <small>EXCELLENCE</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="cert-sig-col">
                        <p className="cert-president-label">សាកលវិទ្យាធិការ / ប្រធានគណៈគ្រប់គ្រង</p>
                        <div className="cert-sig-space">
                          <span className="cert-signer-name">{profileName}</span>
                        </div>
                        <div className="cert-sig-line" />
                        <p className="cert-sig-title">University President / Director</p>
                        <small className="cert-sig-subtitle">BELTEI International University</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="cert-actions no-print">
                <button
                  type="button"
                  className="cert-print-btn"
                  onClick={() => window.print()}
                >
                  🖨️ បោះពុម្ពប័ណ្ណសរសើរ (Print Certificate)
                </button>
                <button
                  type="button"
                  className="cert-close-btn"
                  onClick={() => setCertificateStudent(null)}
                >
                  ✕ បិទ (Close)
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {showAttendancePrint && (
        <div
          className="modal-backdrop attendance-print-backdrop"
          onClick={() => setShowAttendancePrint(false)}
        >
          <div
            className="attendance-print-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="attendance-print-actions-top no-print">
              <button
                type="button"
                className="cert-print-btn"
                onClick={() => window.print()}
              >
                🖨️ បោះពុម្ពបញ្ជីវត្តមាន (Print Sheet)
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowAttendancePrint(false)}
              >
                ✕ បិទ (Close)
              </button>
            </div>

            <div className="printable-attendance-document printable-area" id="printable-attendance">
              {/* Official Header */}
              <div className="att-print-header">
                <div className="att-print-country">
                  <h3>ព្រះរាជាណាចក្រកម្ពុជា</h3>
                  <h4>ជាតិ សាសនា ព្រះមហាក្សត្រ</h4>
                  <div className="att-print-ornament">════ ✦ ════</div>
                </div>

                <div className="att-print-institution">
                  <div className="att-print-logo-box">🎓</div>
                  <div>
                    <h2>សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ</h2>
                    <h3>BELTEI INTERNATIONAL UNIVERSITY</h3>
                    <p>មហាវិទ្យាល័យបច្ចេកវិទ្យាព័ត៌មាន និងវិទ្យាសាស្ត្រកុំព្យូទ័រ</p>
                  </div>
                </div>

                <div className="att-print-title-box">
                  <h1>បញ្ជីវត្តមានសិស្សប្រចាំថ្ងៃ</h1>
                  <h2>DAILY STUDENT ATTENDANCE ROSTER</h2>
                </div>

                <div className="att-print-meta-grid">
                  <div><strong>កាលបរិច្ឆេទ / Date:</strong> {attendanceDate}</div>
                  <div><strong>ជំនាញ / Major:</strong> {attendanceSkill === "All" ? "គ្រប់ជំនាញទាំងអស់ (All Skills)" : attendanceSkill}</div>
                  <div><strong>អ្នកកត់ត្រា / Teacher:</strong> {profileName}</div>
                  <div><strong>ចំនួនសិស្សសរុប:</strong> {students.length} នាក់</div>
                </div>
              </div>

              {/* Attendance Table for Print */}
              <table className="att-print-table">
                <thead>
                  <tr>
                    <th style={{ width: "35px" }}>ល.រ</th>
                    <th style={{ width: "75px" }}>អត្តលេខ</th>
                    <th>គោត្តនាម និងនាម</th>
                    <th style={{ width: "55px" }}>ភេទ</th>
                    <th style={{ width: "85px" }}>ជំនាញ</th>
                    <th style={{ width: "105px" }}>ស្ថានភាព</th>
                    <th style={{ width: "70px" }}>ម៉ោងកត់</th>
                    <th>មូលហេតុ / កំណត់ចំណាំ</th>
                    <th style={{ width: "80px" }}>ហត្ថលេខា</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((st, index) => {
                    const rec = currentDayRecord[String(st.id_student)];
                    const s = rec?.status || "unmarked";
                    let label = "មិនទាន់កត់";
                    let statusClass = "unmarked";
                    if (s === "present") { label = "✓ វត្តមាន"; statusClass = "present"; }
                    else if (s === "late") { label = "⏱ មកយឺត"; statusClass = "late"; }
                    else if (s === "permission") { label = "📝 ច្បាប់"; statusClass = "permission"; }
                    else if (s === "absent") { label = "✕ អវត្តមាន"; statusClass = "absent"; }

                    return (
                      <tr key={st.id_student}>
                        <td style={{ textAlign: "center" }}>{index + 1}</td>
                        <td style={{ textAlign: "center", fontWeight: "700" }}>{st.id_student}</td>
                        <td style={{ fontWeight: "600" }}>{st.name_student}</td>
                        <td style={{ textAlign: "center" }}>{st.gender || "-"}</td>
                        <td>{st.skill || "IT"}</td>
                        <td style={{ textAlign: "center" }}>
                          <span className={`att-print-status ${statusClass}`}>{label}</span>
                        </td>
                        <td style={{ textAlign: "center", fontSize: "11px" }}>{rec?.time || "-"}</td>
                        <td>{rec?.note || ""}</td>
                        <td></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Statistics & Signatures */}
              <div className="att-print-summary-row">
                <div className="att-print-stat-item">
                  <span>វត្តមាន:</span> <strong>{countPresent}</strong>
                </div>
                <div className="att-print-stat-item">
                  <span>មកយឺត:</span> <strong>{countLate}</strong>
                </div>
                <div className="att-print-stat-item">
                  <span>សុំច្បាប់:</span> <strong>{countPermission}</strong>
                </div>
                <div className="att-print-stat-item">
                  <span>អវត្តមាន:</span> <strong>{countAbsent}</strong>
                </div>
                <div className="att-print-stat-item">
                  <span>អត្រាវត្តមានសរុប:</span> <strong>{attendanceRate}%</strong>
                </div>
              </div>

              <div className="att-print-signatures">
                <div className="att-print-sig-col">
                  <p>បានឃើញ និងពិនិត្យត្រឹមត្រូវ</p>
                  <p className="att-print-sig-title">ប្រធានដេប៉ាតឺម៉ង់ / ការិយាល័យសិក្សា</p>
                  <div className="att-print-sig-line"></div>
                </div>

                <div className="att-print-sig-col">
                  <p>រាជធានីភ្នំពេញ, ថ្ងៃទី {new Date().getDate()} ខែ {new Date().getMonth() + 1} ឆ្នាំ {new Date().getFullYear()}</p>
                  <p className="att-print-sig-title">គ្រូបង្រៀន / អ្នកកត់ត្រាវត្តមាន</p>
                  <div className="att-print-sig-space">{profileName}</div>
                  <div className="att-print-sig-line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Teacher Modal */}
      {showAddTeacherModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowAddTeacherModal(false)}
        >
          <div
            className="student-form-modal"
            style={{ maxWidth: "600px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2>＋ បន្ថែមគ្រូបង្រៀនថ្មី (Add New Teacher)</h2>
                <p>បញ្ចូលព័ត៌មានសាស្ត្រាចារ្យ ឬគ្រូបង្រៀនក្នុងប្រព័ន្ធ</p>
              </div>
              <button
                type="button"
                className="close-modal-btn"
                onClick={() => setShowAddTeacherModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTeacher} className="student-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>ឈ្មោះជាភាសាខ្មែរ (Khmer Name) *</label>
                  <input
                    type="text"
                    required
                    placeholder="ឧ. សាស្ត្រាចារ្យ សេង ពិសិដ្ឋ"
                    value={newTeacherForm.name_teacher}
                    onChange={(e) =>
                      setNewTeacherForm({
                        ...newTeacherForm,
                        name_teacher: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>ឈ្មោះជាឡាតាំង (English Name)</label>
                  <input
                    type="text"
                    placeholder="ឧ. Prof. Seng Piseth"
                    value={newTeacherForm.name_en}
                    onChange={(e) =>
                      setNewTeacherForm({
                        ...newTeacherForm,
                        name_en: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>ភេទ (Gender)</label>
                  <select
                    value={newTeacherForm.gender}
                    onChange={(e) =>
                      setNewTeacherForm({
                        ...newTeacherForm,
                        gender: e.target.value,
                      })
                    }
                  >
                    <option value="Male">ប្រុស (Male)</option>
                    <option value="Female">ស្រី (Female)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>ជំនាញ/មុខវិជ្ជាបង្រៀន (Skill / Subject)</label>
                  <input
                    type="text"
                    placeholder="ឧ. React & Web Framework"
                    value={newTeacherForm.skill}
                    onChange={(e) =>
                      setNewTeacherForm({
                        ...newTeacherForm,
                        skill: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>កម្រិតសញ្ញាបត្រ (Degree / Qualification)</label>
                  <input
                    type="text"
                    placeholder="ឧ. Master of Computer Science"
                    value={newTeacherForm.degree}
                    onChange={(e) =>
                      setNewTeacherForm({
                        ...newTeacherForm,
                        degree: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>លេខទូរស័ព្ទ (Phone Number)</label>
                  <input
                    type="text"
                    placeholder="ឧ. 012 889 977"
                    value={newTeacherForm.phone}
                    onChange={(e) =>
                      setNewTeacherForm({
                        ...newTeacherForm,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>បន្ទប់បង្រៀន (Classroom / Lab)</label>
                  <input
                    type="text"
                    placeholder="ឧ. Lab 401"
                    value={newTeacherForm.room}
                    onChange={(e) =>
                      setNewTeacherForm({
                        ...newTeacherForm,
                        room: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>វេនបង្រៀន (Shift)</label>
                  <select
                    value={newTeacherForm.shift}
                    onChange={(e) =>
                      setNewTeacherForm({
                        ...newTeacherForm,
                        shift: e.target.value,
                      })
                    }
                  >
                    <option value="Morning (ព្រឹក)">ព្រឹក (Morning 08:00 - 11:15 AM)</option>
                    <option value="Afternoon (រសៀល)">រសៀល (Afternoon 02:00 - 05:15 PM)</option>
                    <option value="Evening (យប់)">យប់ (Evening 05:30 - 08:30 PM)</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowAddTeacherModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  ＋ រក្សាទុកគ្រូថ្មី (Save Teacher)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Print Faculty Attendance Sheet Modal */}
      {showTeacherPrint && (
        <div
          className="modal-backdrop attendance-print-backdrop"
          onClick={() => setShowTeacherPrint(false)}
        >
          <div
            className="attendance-print-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="attendance-print-actions-top no-print">
              <button
                type="button"
                className="cert-print-btn"
                onClick={() => window.print()}
              >
                🖨️ បោះពុម្ពបញ្ជីវត្តមានគ្រូ (Print Sheet)
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowTeacherPrint(false)}
              >
                ✕ បិទ (Close)
              </button>
            </div>

            <div className="printable-attendance-document printable-area" id="printable-teacher-attendance">
              {/* Official Header */}
              <div className="att-print-header">
                <div className="att-print-country">
                  <h3>ព្រះរាជាណាចក្រកម្ពុជា</h3>
                  <h4>ជាតិ សាសនា ព្រះមហាក្សត្រ</h4>
                  <div className="att-print-ornament">════ ✦ ════</div>
                </div>

                <div className="att-print-institution">
                  <div className="att-print-logo-box">🎓</div>
                  <div>
                    <h2>សាកលវិទ្យាល័យ ប៊ែលធី អន្តរជាតិ</h2>
                    <h3>BELTEI INTERNATIONAL UNIVERSITY</h3>
                    <p>ការិយាល័យសិក្សាធិការ និងគ្រប់គ្រងបុគ្គលិកគរុកោសល្យ</p>
                  </div>
                </div>

                <div className="att-print-title-box">
                  <h1>បញ្ជីវត្តមានសាស្ត្រាចារ្យ និងគ្រូបង្រៀនប្រចាំថ្ងៃ</h1>
                  <h2>FACULTY & LECTURER DAILY ATTENDANCE REPORT</h2>
                </div>

                <div className="att-print-meta-grid">
                  <div><strong>កាលបរិច្ឆេទ / Date:</strong> {attendanceDate}</div>
                  <div><strong>មុខវិជ្ជា/ដេប៉ាតឺម៉ង់:</strong> {teacherFilterSkill === "All" ? "គ្រប់ជំនាញទាំងអស់ (All Faculties)" : teacherFilterSkill}</div>
                  <div><strong>អ្នករៀបចំ / Admin:</strong> {profileName}</div>
                  <div><strong>ចំនួនគ្រូបង្រៀនសរុប:</strong> {teachers.length} នាក់</div>
                </div>
              </div>

              {/* Attendance Table for Print */}
              <table className="att-print-table">
                <thead>
                  <tr>
                    <th style={{ width: "35px" }}>ល.រ</th>
                    <th style={{ width: "75px" }}>អត្តលេខ</th>
                    <th>គោត្តនាម និងនាម</th>
                    <th style={{ width: "55px" }}>ភេទ</th>
                    <th style={{ width: "130px" }}>មុខវិជ្ជាបង្រៀន</th>
                    <th style={{ width: "75px" }}>បន្ទប់</th>
                    <th style={{ width: "80px" }}>វេន</th>
                    <th style={{ width: "105px" }}>ស្ថានភាព</th>
                    <th style={{ width: "65px" }}>ម៉ោង</th>
                    <th>កំណត់ចំណាំ</th>
                    <th style={{ width: "70px" }}>ហត្ថលេខា</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((t, index) => {
                    const rec = currentTeacherDayRecord[String(t.id_teacher)];
                    const s = rec?.status || "unmarked";
                    let label = "មិនទាន់កត់";
                    let statusClass = "unmarked";
                    if (s === "present") { label = "✓ មកបង្រៀន"; statusClass = "present"; }
                    else if (s === "late") { label = "⏱ មកយឺត"; statusClass = "late"; }
                    else if (s === "permission") { label = "📝 សុំច្បាប់"; statusClass = "permission"; }
                    else if (s === "absent") { label = "✕ អវត្តមាន"; statusClass = "absent"; }

                    return (
                      <tr key={t.id_teacher}>
                        <td style={{ textAlign: "center" }}>{index + 1}</td>
                        <td style={{ textAlign: "center", fontWeight: "700" }}>{t.id_teacher}</td>
                        <td style={{ fontWeight: "700" }}>{t.name_teacher}</td>
                        <td style={{ textAlign: "center" }}>{t.gender || "-"}</td>
                        <td>{t.skill || "-"}</td>
                        <td style={{ textAlign: "center" }}>{t.room || "Lab"}</td>
                        <td style={{ textAlign: "center", fontSize: "10px" }}>{t.shift || "-"}</td>
                        <td style={{ textAlign: "center" }}>
                          <span className={`att-print-status ${statusClass}`}>{label}</span>
                        </td>
                        <td style={{ textAlign: "center", fontSize: "11px" }}>{rec?.time || "-"}</td>
                        <td>{rec?.note || ""}</td>
                        <td></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Statistics & Signatures */}
              <div className="att-print-summary-row">
                <div className="att-print-stat-item">
                  <span>មកបង្រៀន:</span> <strong>{countTeacherPresent}</strong>
                </div>
                <div className="att-print-stat-item">
                  <span>មកយឺត:</span> <strong>{countTeacherLate}</strong>
                </div>
                <div className="att-print-stat-item">
                  <span>សុំច្បាប់:</span> <strong>{countTeacherPermission}</strong>
                </div>
                <div className="att-print-stat-item">
                  <span>អវត្តមាន:</span> <strong>{countTeacherAbsent}</strong>
                </div>
                <div className="att-print-stat-item">
                  <span>អត្រាវត្តមានគ្រូ:</span> <strong>{teacherAttendanceRate}%</strong>
                </div>
              </div>

              <div className="att-print-signatures">
                <div className="att-print-sig-col">
                  <p>បានឃើញ និងឯកភាព</p>
                  <p className="att-print-sig-title">ព្រឹទ្ធបុរសមហាវិទ្យាល័យ / Dean</p>
                  <div className="att-print-sig-line"></div>
                </div>

                <div className="att-print-sig-col">
                  <p>រាជធានីភ្នំពេញ, ថ្ងៃទី {new Date().getDate()} ខែ {new Date().getMonth() + 1} ឆ្នាំ {new Date().getFullYear()}</p>
                  <p className="att-print-sig-title">អ្នកត្រួតពិនិត្យវត្តមានបុគ្គលិកគរុកោសល្យ</p>
                  <div className="att-print-sig-space">{profileName}</div>
                  <div className="att-print-sig-line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Login;




































let i = 0;

while (i < 10) {
    console.log(i);

    i++;
}

let n = 0;

do {
    console.log(n);

    n++;
} while (n < 10);