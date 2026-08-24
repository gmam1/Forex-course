/* ================================================================
   1. COURSE PROGRESS (CHANGE THIS DAILY / WHEN NEEDED)
   ================================================================
   Update these numbers according to what has been conducted so far.
   Percentages will be calculated based on these current totals.
*/

const courseProgress = {
  classesHeld: 6,            // How many classes have been held so far (max final = 40)
  assignmentsGiven: 5,       // How many assignments given so far (max final = 40)
  quizzesMaxMarks: 5,        // Current total possible quiz marks (e.g. 1 quiz = 5, 2 quizzes = 10...)
  finalExamHeld: false,      // true when final exam is conducted
  finalExamMax: 20           // Final exam total marks (usually 20)
};

/* ================================================================
   2. STUDENT DATA (UPDATE STUDENT MARKS HERE)
   ================================================================
   attendance     → how many classes the student attended so far
   assignments    → how many assignments the student submitted so far
   quizMarks      → total marks obtained in quizzes so far
   finalExam      → marks in final exam (0 if not held)
*/

const students = [
/*  {
    id: 1,
    name: "Ghulam Mohiuddin",
    studentId: "STU-101",
    attendance: 5,
    assignments: 4,
    quizMarks: 5,
    finalExam: 0
  }, */
  {
    id: 2,
    name: "Gulfam Nasir",
    studentId: "260801001",
    attendance: 2,
    assignments: 0,
    quizMarks: 0,
    finalExam: 0
  },
  {
    id: 3,
    name: "Kanoot",
    studentId: "260801002",
    attendance: 0,
    assignments: 0,
    quizMarks: 0,
    finalExam: 0
  },
  {
    id: 5,
    name: "missing",
    studentId: "260801004",
    attendance: 0,
    assignments: 0,
    quizMarks: 0,
    finalExam: 0
  },
  {
    id: 6,
    name: "Sehar",
    studentId: "260801005",
    attendance: 4,
    assignments: 1.6,
    quizMarks: 3.25,
    finalExam: 0
  },
  {
    id: 7,
    name: "Shahzaib Ali",
    studentId: "260801006",
    attendance: 3,
    assignments: 0,
    quizMarks: 0,
    finalExam: 0
  },
  {
    id: 8,
    name: "Umair Hussain",
    studentId: "260801007",
    attendance: 0,
    assignments: 0,
    quizMarks: 0,
    finalExam: 0
  },

     {
    id: 9,
    name: "Hamza Yasin",
    studentId: "260801008",
    attendance: 2,
    assignments: 0,
    quizMarks: 0,
    finalExam: 0
  }

];

/* ================================================================
   DO NOT EDIT BELOW (unless you understand the code)
   ================================================================ */

function calculate(student) {
  const cp = courseProgress;

  // Attendance: 1 mark per class attended (capped at classesHeld)
  const attObtained = Math.min(student.attendance, cp.classesHeld);
  const attPossible = cp.classesHeld;
  const attPct = attPossible > 0 ? (attObtained / attPossible) * 100 : 0;

  // Assignments: 0.5 mark per assignment submitted
  const asgObtained = Math.min(student.assignments * 0.5, cp.assignmentsGiven * 0.5);
  const asgPossible = cp.assignmentsGiven * 0.5;
  const asgPct = asgPossible > 0 ? (asgObtained / asgPossible) * 100 : 0;

  // Quizzes
  const quizObtained = Math.min(student.quizMarks, cp.quizzesMaxMarks);
  const quizPossible = cp.quizzesMaxMarks;
  const quizPct = quizPossible > 0 ? (quizObtained / quizPossible) * 100 : 0;

  // Final Exam
  let finalObtained = 0;
  let finalPossible = 0;
  let finalPct = 0;
  if (cp.finalExamHeld) {
    finalObtained = Math.min(student.finalExam, cp.finalExamMax);
    finalPossible = cp.finalExamMax;
    finalPct = finalPossible > 0 ? (finalObtained / finalPossible) * 100 : 0;
  }

  // Current total
  const totalObtained = attObtained + asgObtained + quizObtained + finalObtained;
  const totalPossible = attPossible + asgPossible + quizPossible + finalPossible;
  const overallPct = totalPossible > 0 ? (totalObtained / totalPossible) * 100 : 0;

  return {
    attObtained: round(attObtained),
    attPossible: round(attPossible),
    attPct: round(attPct),

    asgObtained: round(asgObtained),
    asgPossible: round(asgPossible),
    asgPct: round(asgPct),
    asgSubmitted: Math.min(student.assignments, cp.assignmentsGiven),
    asgGiven: cp.assignmentsGiven,

    quizObtained: round(quizObtained),
    quizPossible: round(quizPossible),
    quizPct: round(quizPct),

    finalObtained: round(finalObtained),
    finalPossible: round(finalPossible),
    finalPct: round(finalPct),
    finalHeld: cp.finalExamHeld,

    totalObtained: round(totalObtained),
    totalPossible: round(totalPossible),
    overallPct: round(overallPct)
  };
}

function round(n) {
  return Math.round(n * 10) / 10;
}

function getStatus(pct) {
  if (pct >= 90) return { class: "excellent", label: "Excellent" };
  if (pct >= 80) return { class: "good", label: "Good" };
  if (pct >= 70) return { class: "average", label: "Average" };
  return { class: "risk", label: "Needs Improvement" };
}

function getInitials(name) {
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
}

// ========== LIST ==========
function renderList(filter = "") {
  const list = document.getElementById("studentList");
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(filter.toLowerCase())
  );

  document.getElementById("studentCount").textContent =
    `${filtered.length} Student${filtered.length !== 1 ? "s" : ""}`;

  if (filtered.length === 0) {
    list.innerHTML = `<p style="text-align:center;padding:2rem;color:var(--text-muted)">No student found</p>`;
    return;
  }

  list.innerHTML = filtered.map(s => `
    <div class="student-item" onclick="showDetail(${s.id})">
      <div class="avatar-sm">${getInitials(s.name)}</div>
      <div class="name">${s.name}</div>
      <i class="fas fa-chevron-right arrow"></i>
    </div>
  `).join("");
}

function updateCourseStatus() {
  const cp = courseProgress;
  let text = `${cp.classesHeld} classes • ${cp.assignmentsGiven} assignments`;
  if (cp.quizzesMaxMarks > 0) text += ` • Quizzes: ${cp.quizzesMaxMarks} marks`;
  if (cp.finalExamHeld) text += ` • Final held`;
  document.getElementById("courseStatus").textContent = text;
}

// ========== DETAIL ==========
function showDetail(id) {
  const student = students.find(s => s.id === id);
  if (!student) return;

  const m = calculate(student);
  const status = getStatus(m.overallPct);

  // Profile
  document.getElementById("avatar").textContent = getInitials(student.name);
  document.getElementById("studentName").textContent = student.name;
  document.getElementById("studentId").textContent = student.studentId || "";

  // Circular score
  const circle = document.getElementById("scoreCircle");
  circle.style.strokeDasharray = `${m.overallPct}, 100`;
  document.getElementById("percentageText").textContent = `${m.overallPct}%`;

  document.getElementById("totalValue").textContent =
    `${m.totalObtained} / ${m.totalPossible}`;

  const badge = document.getElementById("statusBadge");
  badge.textContent = status.label;
  badge.className = `status-badge ${status.class}`;

  // Attendance
  document.getElementById("attSub").textContent =
    `${m.attObtained} of ${m.attPossible} classes`;
  document.getElementById("attMarks").textContent = m.attObtained;
  document.getElementById("attPct").textContent = `${m.attPct}%`;
  document.getElementById("attBar").style.width = `${m.attPct}%`;

  // Assignments
  document.getElementById("asgSub").textContent =
    `${m.asgSubmitted} of ${m.asgGiven} submitted`;
  document.getElementById("asgMarks").textContent = m.asgObtained;
  document.getElementById("asgPct").textContent = `${m.asgPct}%`;
  document.getElementById("asgBar").style.width = `${m.asgPct}%`;

  // Quizzes
  document.getElementById("quizSub").textContent =
    `${m.quizObtained} of ${m.quizPossible} marks`;
  document.getElementById("quizMarks").textContent = m.quizObtained;
  document.getElementById("quizPct").textContent = m.quizPossible > 0 ? `${m.quizPct}%` : "—";
  document.getElementById("quizBar").style.width = `${m.quizPct}%`;

  // Final
  if (m.finalHeld) {
    document.getElementById("finalSub").textContent = `${m.finalObtained} of ${m.finalPossible}`;
    document.getElementById("finalMarks").textContent = m.finalObtained;
    document.getElementById("finalPct").textContent = `${m.finalPct}%`;
    document.getElementById("finalBar").style.width = `${m.finalPct}%`;
  } else {
    document.getElementById("finalSub").textContent = "Not held yet";
    document.getElementById("finalMarks").textContent = "—";
    document.getElementById("finalPct").textContent = "—";
    document.getElementById("finalBar").style.width = "0%";
  }

  // Overall
  document.getElementById("overallBar").style.width = `${m.overallPct}%`;
  document.getElementById("overallText").textContent =
    `${m.totalObtained} marks obtained out of current possible ${m.totalPossible}`;

  // Switch page
  document.getElementById("listPage").classList.remove("active");
  document.getElementById("detailPage").classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showList() {
  document.getElementById("detailPage").classList.remove("active");
  document.getElementById("listPage").classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ========== THEME ==========
function setupTheme() {
  const saved = localStorage.getItem("theme") || "dark";
  if (saved === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    updateIcons(true);
  }

  const toggle = () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    if (isLight) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
      updateIcons(false);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      updateIcons(true);
    }
  };

  document.getElementById("themeBtn").addEventListener("click", toggle);
  document.getElementById("themeBtn2").addEventListener("click", toggle);
}

function updateIcons(isLight) {
  const icon = isLight ? "fas fa-sun" : "fas fa-moon";
  document.querySelector("#themeBtn i").className = icon;
  document.querySelector("#themeBtn2 i").className = icon;
}

// ========== INIT ==========
document.addEventListener("DOMContentLoaded", () => {
  updateCourseStatus();
  renderList();
  setupTheme();

  document.getElementById("searchInput").addEventListener("input", e => {
    renderList(e.target.value);
  });

  document.getElementById("backBtn").addEventListener("click", showList);
});
