const DB_KEY = "csDeptDb";

const examRules = {
  FULL_CIA: {
    max: { cia1: 20, cia2: 50, cia3: 20, attendance: 5, ese: 100 },
    rawMax: 90,
    scaleTo: 45
  },
  END_SEM: {
    max: { cia1: 20, cia2: 50, cia3: 20, cia4: 25, cia5: 10, attendance: 5, ese: 100 },
    rawMax: 125,
    scaleTo: 45
  }
};

const EXAM_TYPE_OPTIONS = [
  { value: "CIA_1", label: "CIA 1", key: "cia1" },
  { value: "CIA_2", label: "CIA 2", key: "cia2" },
  { value: "MID_SEM", label: "Mid Sem", key: "midSem" },
  { value: "CIA_3", label: "CIA 3", key: "cia3" },
  { value: "END_SEM", label: "End Sem", key: "endSem" }
];

const seededStudents = [
  { regNo: "BCA001", name: "Aarya N", program: "BCA" },
  { regNo: "BCA002", name: "Dhruv M", program: "BCA" },
  { regNo: "BCA003", name: "Ishita P", program: "BCA" },
  { regNo: "BSC001", name: "Nikhil R", program: "BSc CM" },
  { regNo: "BSC002", name: "Pooja K", program: "BSc CM" },
  { regNo: "MSC001", name: "Rahul S", program: "MSc Data Science" },
  { regNo: "MSC002", name: "Sara D", program: "MSc Data Science" }
];

const ASGN_TYPES = [
  { id: "RESEARCH_PAPER",   label: "Research Paper",   icon: "📄" },
  { id: "WORKSHOP",          label: "Workshop",          icon: "🔧" },
  { id: "HACKATHON",         label: "Hackathon",         icon: "💻" },
  { id: "MINI_PROJECT",      label: "Mini Project",      icon: "🎯" },
  { id: "MAJOR_PROJECT",     label: "Major Project",     icon: "🏆" },
  { id: "CASE_STUDY",        label: "Case Study",        icon: "📋" },
  { id: "CERTIFICATION",     label: "Certification",     icon: "📜" },
  { id: "CODING_CHALLENGE",  label: "Coding Challenge",  icon: "⚡" },
  { id: "OPEN_SOURCE",       label: "Open Source",       icon: "🌐" },
  { id: "INTERNSHIP_TASK",   label: "Internship Task",   icon: "💼" },
  { id: "SEMINAR",           label: "Seminar",           icon: "🎤" },
  { id: "TECH_BLOG",         label: "Tech Blog",         icon: "✍️" },
  { id: "PROTOTYPE",         label: "Prototype",         icon: "🔬" },
  { id: "APP_DEVELOPMENT",   label: "App Development",   icon: "📱" },
  { id: "GD_LEAD",           label: "GD Lead",           icon: "👥" },
  { id: "INNOVATION",        label: "Innovation",        icon: "💡" },
  { id: "CUSTOM",            label: "Custom",            icon: "✏️" }
];

const ASGN_TYPE_FIELDS = {
  RESEARCH_PAPER: [
    { name: "topic",            label: "Research Topic",    type: "text" },
    { name: "referenceStyle",   label: "Reference Style",   type: "select", options: ["APA","MLA","IEEE","Chicago"] },
    { name: "wordLimit",        label: "Word Limit",        type: "number" },
    { name: "submissionFormat", label: "Submission Format", type: "select", options: ["PDF","DOCX","Both"] }
  ],
  WORKSHOP: [
    { name: "workshopName", label: "Workshop Name",      type: "text" },
    { name: "venue",        label: "Venue",              type: "text" },
    { name: "duration",     label: "Duration (hours)",   type: "number" },
    { name: "facilitator",  label: "Facilitator Name",   type: "text" },
    { name: "materials",    label: "Materials Required", type: "textarea" }
  ],
  HACKATHON: [
    { name: "theme",    label: "Theme",           type: "text" },
    { name: "teamSize", label: "Team Size",        type: "number" },
    { name: "duration", label: "Duration (hours)", type: "number" },
    { name: "platform", label: "Platform / Venue", type: "text" }
  ],
  MINI_PROJECT: [
    { name: "projectTitle", label: "Project Title",      type: "text" },
    { name: "techStack",    label: "Technology Stack",   type: "text" },
    { name: "teamSize",     label: "Team Size",          type: "number" }
  ],
  MAJOR_PROJECT: [
    { name: "projectTitle", label: "Project Title",    type: "text" },
    { name: "techStack",    label: "Tech Stack",        type: "text" },
    { name: "teamSize",     label: "Team Size",         type: "number" },
    { name: "mentor",       label: "Mentor Name",       type: "text" },
    { name: "milestones",   label: "Milestones",        type: "textarea" }
  ],
  CASE_STUDY: [
    { name: "domain",    label: "Topic / Domain",      type: "text" },
    { name: "pages",     label: "Pages Required",      type: "number" },
    { name: "framework", label: "Analysis Framework",  type: "text" }
  ],
  CERTIFICATION: [
    { name: "certName", label: "Certification Name", type: "text" },
    { name: "platform", label: "Platform",           type: "select", options: ["Coursera","Udemy","edX","LinkedIn Learning","Google","Microsoft","Other"] }
  ],
  CODING_CHALLENGE: [
    { name: "platform",    label: "Platform",         type: "select", options: ["LeetCode","HackerRank","CodeForces","CodeChef","Other"] },
    { name: "difficulty",  label: "Difficulty Level", type: "select", options: ["Easy","Medium","Hard","Mixed"] },
    { name: "numProblems", label: "No. of Problems",  type: "number" }
  ],
  OPEN_SOURCE: [
    { name: "repoLink",        label: "Repository Link",    type: "text" },
    { name: "contributionType",label: "Contribution Type", type: "select", options: ["Bug Fix","Feature","Documentation","Testing","Any"] },
    { name: "technology",      label: "Technology",         type: "text" }
  ],
  INTERNSHIP_TASK: [
    { name: "company",        label: "Company Name",     type: "text" },
    { name: "taskDesc",       label: "Task Description", type: "textarea" },
    { name: "reportRequired", label: "Report Required",  type: "select", options: ["Yes","No"] }
  ],
  SEMINAR: [
    { name: "semTopic", label: "Topic",              type: "text" },
    { name: "duration", label: "Duration (minutes)", type: "number" },
    { name: "mode",     label: "Mode",               type: "select", options: ["Online","Offline","Hybrid"] }
  ],
  TECH_BLOG: [
    { name: "blogPlatform", label: "Platform",   type: "select", options: ["Medium","Dev.to","Hashnode","Personal Blog","Other"] },
    { name: "wordCount",    label: "Word Count", type: "number" },
    { name: "blogTopic",    label: "Topic",      type: "text" }
  ],
  PROTOTYPE: [
    { name: "techStack",    label: "Technology Stack",      type: "text" },
    { name: "deliverables", label: "Deliverables",          type: "textarea" },
    { name: "presentation", label: "Presentation Required", type: "select", options: ["Yes","No"] }
  ],
  APP_DEVELOPMENT: [
    { name: "appPlatform", label: "Platform",          type: "select", options: ["Web","Mobile (Android)","Mobile (iOS)","Desktop","Cross-Platform"] },
    { name: "techStack",   label: "Tech Stack",        type: "text" },
    { name: "features",    label: "Features Required", type: "textarea" }
  ],
  GD_LEAD: [
    { name: "gdTopic",   label: "Topic",              type: "text" },
    { name: "groupSize", label: "Group Size",          type: "number" },
    { name: "duration",  label: "Duration (minutes)", type: "number" }
  ],
  INNOVATION: [
    { name: "innTitle",         label: "Idea Title",        type: "text" },
    { name: "problemStatement", label: "Problem Statement", type: "textarea" },
    { name: "expectedOutput",   label: "Expected Output",   type: "textarea" }
  ],
  CUSTOM: [
    { name: "customTitle", label: "Assignment Title",        type: "text" },
    { name: "customDesc",  label: "Description",             type: "textarea" },
    { name: "requirements",label: "Requirements/Instructions",type: "textarea" }
  ]
};

let asgnWizard = { step: 1, subjectId: "", mode: "ENTIRE_CLASS", perfType: "", selectedRegs: [], typeId: "", details: {}, dueDate: "" };

let currentUser = null;
let memoryDbCache = null;
let stateUpdatedAt = null;
let csrfToken = null;
let analyticsActiveTab = "OVERALL";

const roleMap = {
  itAdmin: "IT Admin",
  admin: "Admin",
  classTeacher: "Class Teacher",
  teacher: "Teacher"
};

const navItems = [
  { id: "overview", label: "Overview", roles: ["itAdmin", "admin", "classTeacher", "teacher"] },
  { id: "adminSetup", label: "Admin Setup", roles: ["itAdmin", "admin", "classTeacher"] },
  { id: "examScheduling", label: "Exam Scheduling", roles: ["itAdmin", "admin"] },
  { id: "marks", label: "Marks", roles: ["itAdmin", "admin", "classTeacher", "teacher"] },
  { id: "analytics", label: "Analytics", roles: ["itAdmin", "admin", "classTeacher", "teacher"] },
  { id: "assignments", label: "Assignments", roles: ["itAdmin", "admin", "classTeacher", "teacher"] },
  { id: "events", label: "Events", roles: ["itAdmin", "admin", "classTeacher", "teacher"] },
  { id: "documents", label: "Documents", roles: ["itAdmin", "admin", "classTeacher", "teacher"] },
  { id: "profile", label: "Profile", roles: ["itAdmin", "admin", "classTeacher", "teacher"] },
  { id: "notifications", label: "Notifications", roles: ["itAdmin", "admin", "classTeacher", "teacher"] },
  { id: "aiAssistant", label: "AI Assistant", roles: ["itAdmin", "admin", "classTeacher", "teacher"] }
];

let charts = {};

async function api(path, options = {}) {
  const method = (options.method || "GET").toUpperCase();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };
  if (!["GET", "HEAD", "OPTIONS"].includes(method) && csrfToken) {
    headers["x-csrf-token"] = csrfToken;
  }

  const res = await fetch(path, {
    headers,
    ...options
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const error = new Error(data.error || `Request failed: ${res.status}`);
    error.status = res.status;
    error.payload = data;
    throw error;
  }
  return res.json();
}

async function loadSessionUser() {
  const result = await api("/api/auth/me");
  currentUser = result.user;
  csrfToken = result.csrfToken || csrfToken;
}

async function getDb() {
  if (memoryDbCache) return memoryDbCache;
  const result = await api("/api/state");
  memoryDbCache = result.state;
  stateUpdatedAt = result.updatedAt || null;
  localStorage.setItem(DB_KEY, JSON.stringify(memoryDbCache));
  return memoryDbCache;
}

async function setDb(db) {
  memoryDbCache = db;
  localStorage.setItem(DB_KEY, JSON.stringify(db));
  try {
    const result = await api("/api/state", {
      method: "PUT",
      body: JSON.stringify({ state: db, expectedUpdatedAt: stateUpdatedAt })
    });
    stateUpdatedAt = result.updatedAt || stateUpdatedAt;
  } catch (err) {
    if (err.status === 409) {
      alert("Another user updated data. Reloading latest state to avoid overwrite.");
      memoryDbCache = null;
      await getDb();
    }
    throw err;
  }
}

function notify(db, message, roles = [], users = []) {
  db.notifications.unshift({
    id: crypto.randomUUID(),
    message,
    roles,
    users,
    createdAt: new Date().toISOString(),
    readBy: []
  });
}

function userCanSeeNotification(notification) {
  return notification.roles.includes(currentUser.role) || notification.users.includes(currentUser.username) || (!notification.roles.length && !notification.users.length);
}

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleString();
}

function round2(n) {
  return Math.round((Number(n) + Number.EPSILON) * 100) / 100;
}

function examTypeToMeta(examType) {
  return EXAM_TYPE_OPTIONS.find(opt => opt.value === examType) || EXAM_TYPE_OPTIONS[0];
}

function getDefaultMarksPattern(subjectType) {
  if (subjectType === "END_SEM") {
    return {
      exams: [
        { id: crypto.randomUUID(), examType: "CIA_1", maxMarks: 20, scaleTo: 10 },
        { id: crypto.randomUUID(), examType: "CIA_2", maxMarks: 50, scaleTo: 15 },
        { id: crypto.randomUUID(), examType: "MID_SEM", maxMarks: 50, scaleTo: 20 },
        { id: crypto.randomUUID(), examType: "CIA_3", maxMarks: 20, scaleTo: 10 },
        { id: crypto.randomUUID(), examType: "END_SEM", maxMarks: 100, scaleTo: 45 }
      ]
    };
  }

  return {
    exams: [
      { id: crypto.randomUUID(), examType: "CIA_1", maxMarks: 20, scaleTo: 15 },
      { id: crypto.randomUUID(), examType: "CIA_2", maxMarks: 50, scaleTo: 25 },
      { id: crypto.randomUUID(), examType: "CIA_3", maxMarks: 20, scaleTo: 15 },
      { id: crypto.randomUUID(), examType: "END_SEM", maxMarks: 100, scaleTo: 45 }
    ]
  };
}

function normalizeSubject(subject) {
  if (!subject.subjectCode) {
    const short = subject.name ? subject.name.split(" ").map(w => w[0]).join("").toUpperCase() : "SUB";
    subject.subjectCode = `${short}-${String(Math.floor(Math.random() * 900) + 100)}`;
  }
  if (!subject.course) subject.course = "Sem 1";
  if (!subject.classSection) subject.classSection = "A";
  if (!subject.marksPattern || !Array.isArray(subject.marksPattern.exams)) {
    subject.marksPattern = getDefaultMarksPattern(subject.subjectType);
  }
  if (typeof subject.isLca !== "boolean") subject.isLca = false;
  if (!Array.isArray(subject.lcaIncharges)) subject.lcaIncharges = [];
}

function ensureSubjectsNormalized(db) {
  let changed = false;
  db.subjects.forEach(subject => {
    const before = JSON.stringify(subject);
    normalizeSubject(subject);
    if (JSON.stringify(subject) !== before) changed = true;
  });
  return changed;
}

function canEditSubjectPattern(subject) {
  if (!subject) return false;
  if (["admin", "itAdmin"].includes(currentUser.role)) return true;
  return currentUser.role === "teacher" && subject.teacherUsername === currentUser.username;
}

function getVisibleSubjects(db) {
  if (["itAdmin", "admin"].includes(currentUser.role)) return db.subjects;
  if (currentUser.role === "classTeacher") return db.subjects;
  return db.subjects.filter(s => s.teacherUsername === currentUser.username);
}

function computeMarks(subject, row) {
  normalizeSubject(subject);
  const warnings = [];
  const capped = {};
  const scaledParts = {};
  const exams = subject.marksPattern.exams || [];

  let rawTotal = 0;
  let scaledTotal = 0;
  let finalScale = 0;

  exams.forEach(exam => {
    const meta = examTypeToMeta(exam.examType);
    const key = meta.key;
    const maxMarks = Number(exam.maxMarks || 0);
    const scaleTo = Number(exam.scaleTo || 0);
    const raw = Number(row[key] || 0);

    if (raw > maxMarks) {
      capped[key] = maxMarks;
      warnings.push(`${meta.label.toUpperCase()} capped at ${maxMarks} from ${raw}.`);
    } else if (raw < 0 || Number.isNaN(raw)) {
      capped[key] = 0;
    } else {
      capped[key] = raw;
    }

    rawTotal += capped[key];
    finalScale += scaleTo;
    scaledParts[key] = maxMarks > 0 ? (capped[key] / maxMarks) * scaleTo : 0;
    scaledTotal += scaledParts[key];
  });

  const converted100 = finalScale > 0 ? (scaledTotal / finalScale) * 100 : 0;

  return {
    capped,
    scaledParts,
    rawCia: round2(rawTotal),
    scaledCia: round2(scaledTotal),
    scaledEse: 0,
    finalTotal: round2(scaledTotal),
    converted100: round2(converted100),
    finalScale: round2(finalScale),
    warnings
  };
}

function initNav() {
  document.getElementById("userBadge").textContent = `${currentUser.name} • ${roleMap[currentUser.role] || currentUser.role}`;
  const nav = document.getElementById("navMenu");
  const visible = navItems.filter(item => item.roles.includes(currentUser.role));
  nav.innerHTML = visible.map((item, idx) => `<button class="nav-btn ${idx === 0 ? "active" : ""}" data-view="${item.id}">${item.label}</button>`).join("");

  nav.addEventListener("click", (e) => {
    const btn = e.target.closest(".nav-btn");
    if (!btn) return;
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    switchView(btn.dataset.view);
  });
}

function switchView(viewId) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.getElementById(viewId).classList.add("active");
  document.getElementById("viewTitle").textContent = navItems.find(i => i.id === viewId)?.label || "Overview";
  if (viewId === "analytics") {
    setTimeout(() => {
      renderAnalytics();
    }, 0);
  }
  if (viewId === "documents") {
    renderSubmittedDocsTable();
  }
}

async function renderOverview() {
  const db = await getDb();
  const visibleSubjects = getVisibleSubjects(db);
  const marksRows = visibleSubjects.flatMap(subject => db.marks[subject.id] || []);
  const avgFinal = marksRows.length ? round2(marksRows.reduce((sum, row) => sum + Number(row.finalTotal || 0), 0) / marksRows.length) : 0;

  document.getElementById("overview").innerHTML = `
    <div class="kpi-grid">
      <div class="kpi"><div>Total Teachers</div><div class="value">${db.teachers.length}</div></div>
      <div class="kpi"><div>Total Subjects</div><div class="value">${db.subjects.length}</div></div>
      <div class="kpi"><div>Total Events</div><div class="value">${db.events.length}</div></div>
      <div class="kpi"><div>Avg Final Score</div><div class="value">${avgFinal}</div></div>
    </div>
    <div class="panel" style="margin-top:14px;">
      <h3>Assigned Subjects</h3>
      <p>${visibleSubjects.map(s => `${s.name} (${s.subjectType})`).join(" • ") || "No subjects assigned."}</p>
    </div>
  `;
}

async function refreshAdminSelectors() {
  const db = await getDb();
  if (ensureSubjectsNormalized(db)) {
    await setDb(db);
  }
  const programSelect = document.getElementById("subjectProgramSelect");
  const courseSelect = document.getElementById("subjectCourseSelect");
  const teacherSelect = document.getElementById("subjectTeacherSelect");
  const studentProgramSelect = document.getElementById("studentProgramSelect");
  const lcaTeacher1Select = document.getElementById("lcaTeacher1Select");
  const lcaTeacher2Select = document.getElementById("lcaTeacher2Select");
  if (programSelect) {
    programSelect.innerHTML = `<option value="">Select Program</option>${db.programs.map(p => `<option>${p.name}</option>`).join("")}`;
  }
  if (courseSelect) {
    courseSelect.innerHTML = `<option value="">Select Course</option>`;
  }
  if (studentProgramSelect) {
    studentProgramSelect.innerHTML = `<option value="">Select Program</option>${db.programs.map(p => `<option>${p.name}</option>`).join("")}`;
  }
  if (teacherSelect) {
    teacherSelect.innerHTML = `<option value="">Assign Teacher</option>${db.teachers.map(t => `<option value="${t.username}">${t.name} (${t.role})</option>`).join("")}`;
  }
  if (lcaTeacher1Select) {
    lcaTeacher1Select.innerHTML = `<option value="">Select LCA In-charge 1</option>${db.teachers.map(t => `<option value="${t.username}">${t.name} (${t.role})</option>`).join("")}`;
  }
  if (lcaTeacher2Select) {
    lcaTeacher2Select.innerHTML = `<option value="">Select LCA In-charge 2</option>${db.teachers.map(t => `<option value="${t.username}">${t.name} (${t.role})</option>`).join("")}`;
  }

  if (programSelect && courseSelect && !programSelect.dataset.boundCourse) {
    programSelect.addEventListener("change", () => {
      const selectedProgram = db.programs.find(p => p.name === programSelect.value);
      const courses = selectedProgram?.courses || [];
      courseSelect.innerHTML = `<option value="">Select Course</option>${courses.map(c => `<option>${c}</option>`).join("")}`;
    });
    programSelect.dataset.boundCourse = "true";
  }

  const isLcaToggle = document.getElementById("isLcaToggle");
  if (isLcaToggle && !isLcaToggle.dataset.boundLca) {
    isLcaToggle.addEventListener("change", () => {
      const enabled = isLcaToggle.checked;
      if (lcaTeacher1Select) {
        lcaTeacher1Select.disabled = !enabled;
        if (!enabled) lcaTeacher1Select.value = "";
      }
      if (lcaTeacher2Select) {
        lcaTeacher2Select.disabled = !enabled;
        if (!enabled) lcaTeacher2Select.value = "";
      }
    });
    isLcaToggle.dataset.boundLca = "true";
  }
}

async function renderTeacherTable() {
  const db = await getDb();
  const table = document.getElementById("teachersTable");
  if (!table) return;
  table.innerHTML = `
    <tr><th>Name</th><th>Role</th><th>Username</th><th>Action</th></tr>
    ${db.teachers.map(t => `
      <tr>
        <td>${t.name}</td>
        <td>${t.role}</td>
        <td>${t.username}</td>
        <td><button class="soft-btn" data-edit-teacher="${t.id}">Edit</button></td>
      </tr>
    `).join("")}
  `;
}

async function renderStudentTable() {
  const db = await getDb();
  const table = document.getElementById("studentsTable");
  if (!table) return;
  const rows = [...(db.students || [])].sort((a, b) => String(a.regNo).localeCompare(String(b.regNo)));
  table.innerHTML = `
    <tr><th>Reg No</th><th>Name</th><th>Program</th><th>Action</th></tr>
    ${rows.map(st => `
      <tr data-student-reg="${st.regNo}">
        <td>${st.regNo}</td>
        <td>${st.name}</td>
        <td>${st.program}</td>
        <td>
          <button class="soft-btn" data-edit-student="${st.regNo}">Edit</button>
          <button class="soft-btn" data-delete-student="${st.regNo}">Delete</button>
        </td>
      </tr>
    `).join("") || `<tr><td colspan="4">No students found.</td></tr>`}
  `;
}

function bindAdminForms() {
  const teacherForm = document.getElementById("teacherForm");
  const programForm = document.getElementById("programForm");
  const classroomForm = document.getElementById("classroomForm");
  const subjectForm = document.getElementById("subjectForm");
  const studentForm = document.getElementById("studentForm");
  const teachersTable = document.getElementById("teachersTable");
  const studentsTable = document.getElementById("studentsTable");

  const canManageCoreAdmin = ["itAdmin", "admin"].includes(currentUser.role);
  const canManageStudentAndClassroom = ["itAdmin", "admin", "classTeacher"].includes(currentUser.role);

  const togglePanel = (el, visible) => {
    const panel = el?.closest(".panel");
    if (panel) panel.style.display = visible ? "" : "none";
  };

  togglePanel(teacherForm, canManageCoreAdmin);
  togglePanel(programForm, canManageCoreAdmin);
  togglePanel(subjectForm, canManageCoreAdmin);
  togglePanel(teachersTable, canManageCoreAdmin);
  togglePanel(classroomForm, canManageStudentAndClassroom);
  const studentPanel = document.getElementById("studentMgmtPanel");
  if (studentPanel) studentPanel.style.display = canManageStudentAndClassroom ? "" : "none";

  if (teacherForm && canManageCoreAdmin) {
    teacherForm.addEventListener("submit", async e => {
      e.preventDefault();
      const db = await getDb();
      const data = new FormData(teacherForm);
      const username = data.get("username").trim();
      if (db.teachers.some(t => t.username === username)) {
        alert("Username already exists.");
        return;
      }
      db.teachers.push({
        id: crypto.randomUUID(),
        name: data.get("name").trim(),
        role: data.get("role"),
        username,
        password: data.get("password")
      });
      notify(db, `Teacher account created: ${username}`, ["itAdmin", "admin"]);
      await setDb(db);
      teacherForm.reset();
      await renderTeacherTable();
      await refreshAdminSelectors();
    });
  }

  if (programForm && canManageCoreAdmin) {
    programForm.addEventListener("submit", async e => {
      e.preventDefault();
      const db = await getDb();
      const data = new FormData(programForm);
      const name = data.get("programName").trim();
      const courseName = data.get("courseName").trim();
      const existing = db.programs.find(p => p.name === name);
      if (existing) {
        if (!existing.courses.includes(courseName)) existing.courses.push(courseName);
      } else {
        db.programs.push({ id: crypto.randomUUID(), name, courses: [courseName] });
      }
      notify(db, `Program updated: ${name}`, ["itAdmin", "admin"]);
      await setDb(db);
      programForm.reset();
      await refreshAdminSelectors();
    });
  }

  if (classroomForm && canManageStudentAndClassroom) {
    classroomForm.addEventListener("submit", async e => {
      e.preventDefault();
      const db = await getDb();
      const data = new FormData(classroomForm);
      db.classrooms.push({ id: crypto.randomUUID(), name: data.get("classroomName"), capacity: Number(data.get("capacity")) });
      notify(db, `Classroom created: ${data.get("classroomName")}`, ["itAdmin", "admin", "classTeacher"]);
      await setDb(db);
      classroomForm.reset();
    });
  }

  if (studentForm && canManageStudentAndClassroom) {
    studentForm.addEventListener("submit", async e => {
      e.preventDefault();
      const db = await getDb();
      const data = new FormData(studentForm);
      const regNo = data.get("regNo").trim().toUpperCase();
      const name = data.get("name").trim();
      const program = data.get("program");
      if (db.students.some(st => st.regNo.toUpperCase() === regNo)) {
        alert("Student register number already exists.");
        return;
      }
      db.students.push({ regNo, name, program });
      notify(db, `Student added: ${regNo} (${name})`, ["itAdmin", "admin", "classTeacher"]);
      await setDb(db);
      studentForm.reset();
      await renderStudentTable();
      await renderOverview();
    });
  }

  if (subjectForm && canManageCoreAdmin) {
    subjectForm.addEventListener("submit", async e => {
      e.preventDefault();
      const db = await getDb();
      const data = new FormData(subjectForm);
      const subjectCode = data.get("subjectCode").trim().toUpperCase();
      const classSection = data.get("classSection").trim().toUpperCase();
      const duplicate = db.subjects.some(s =>
        (s.subjectCode || "").toUpperCase() === subjectCode
        && (s.program || "") === data.get("program")
        && (s.course || "") === data.get("course")
        && (s.classSection || "A").toUpperCase() === classSection
      );
      if (duplicate) {
        alert("This subject code already exists for the same program, course, and section.");
        return;
      }

      const isLca = data.get("isLca") === "on";
      const lcaTeacher1 = data.get("lcaTeacher1");
      const lcaTeacher2 = data.get("lcaTeacher2");
      if (isLca) {
        if (!lcaTeacher1 || !lcaTeacher2) {
          alert("Select both LCA in-charge teachers.");
          return;
        }
        if (lcaTeacher1 === lcaTeacher2) {
          alert("LCA in-charge teachers must be different.");
          return;
        }
      }

      const subjectType = data.get("subjectType");
      db.subjects.push({
        id: crypto.randomUUID(),
        name: data.get("subjectName").trim(),
        subjectCode,
        program: data.get("program"),
        course: data.get("course"),
        classSection,
        subjectType,
        teacherUsername: data.get("teacherUsername"),
        isLca,
        lcaIncharges: isLca ? [lcaTeacher1, lcaTeacher2] : [],
        marksPattern: getDefaultMarksPattern(subjectType)
      });
      notify(db, `Subject created: ${data.get("subjectName")}`, ["itAdmin", "admin"], [data.get("teacherUsername")]);
      await setDb(db);
      subjectForm.reset();
      const lcaTeacher1Select = document.getElementById("lcaTeacher1Select");
      const lcaTeacher2Select = document.getElementById("lcaTeacher2Select");
      if (lcaTeacher1Select) lcaTeacher1Select.disabled = true;
      if (lcaTeacher2Select) lcaTeacher2Select.disabled = true;
      await refreshSubjectSelectors();
      await renderOverview();
    });
  }

  if (teachersTable && canManageCoreAdmin) {
    teachersTable.addEventListener("click", async (e) => {
      const btn = e.target.closest("button[data-edit-teacher]");
      if (!btn) return;
      const db = await getDb();
      const teacher = db.teachers.find(t => t.id === btn.dataset.editTeacher);
      if (!teacher) return;
      const newName = prompt("Edit Name", teacher.name);
      if (!newName) return;
      teacher.name = newName.trim();
      await setDb(db);
      await renderTeacherTable();
    });
  }

  if (studentsTable && canManageStudentAndClassroom) {
    studentsTable.addEventListener("click", async (e) => {
      const editBtn = e.target.closest("button[data-edit-student]");
      const deleteBtn = e.target.closest("button[data-delete-student]");
      if (!editBtn && !deleteBtn) return;

      const regNo = (editBtn?.dataset.editStudent || deleteBtn?.dataset.deleteStudent || "").trim();
      if (!regNo) return;
      const db = await getDb();
      const student = db.students.find(st => st.regNo === regNo);
      if (!student) return;

      if (editBtn) {
        const nextName = prompt("Edit Student Name", student.name);
        if (!nextName) return;
        student.name = nextName.trim();
      }

      if (deleteBtn) {
        const confirmDelete = confirm(`Delete student ${student.regNo} - ${student.name}?`);
        if (!confirmDelete) return;
        db.students = db.students.filter(st => st.regNo !== student.regNo);
      }

      await setDb(db);
      await renderStudentTable();
      await renderOverview();
    });
  }
}

async function renderExamWindows() {
  const db = await getDb();
  const table = document.getElementById("examWindowTable");
  if (!table) return;
  table.innerHTML = `
    <tr><th>Exam Type</th><th>Start</th><th>End</th><th>Mode</th></tr>
    ${db.examWindows.map(e => `<tr><td>${e.examType}</td><td>${e.startDate}</td><td>${e.endDate}</td><td>${e.isFixed ? "Fixed" : "Window"}</td></tr>`).join("")}
  `;
}

function bindExamForm() {
  const form = document.getElementById("examScheduleForm");
  if (!form) return;
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const db = await getDb();
    const data = new FormData(form);
    db.examWindows.push({
      id: crypto.randomUUID(),
      examType: data.get("examType"),
      startDate: data.get("startDate"),
      endDate: data.get("endDate"),
      isFixed: data.get("isFixed") === "on"
    });
    notify(db, `Exam schedule updated for ${data.get("examType")}`, ["teacher", "classTeacher", "admin", "itAdmin"]);
    await setDb(db);
    form.reset();
    await renderExamWindows();
    await renderNotifications();
  });
}

async function refreshSubjectSelectors() {
  const db = await getDb();
  if (ensureSubjectsNormalized(db)) {
    await setDb(db);
  }
  const visibleSubjects = getVisibleSubjects(db);
  const selectorIds = ["marksSubjectSelect", "analyticsSubjectSelect", "assignmentSubjectSelect", "patternSubjectSelect", "docEventSelect"];
  selectorIds.forEach(id => {
    const select = document.getElementById(id);
    if (!select) return;
    if (id === "docEventSelect") {
      select.innerHTML = `<option value="">Select Event</option>${db.events.filter(ev => ev.createdBy === currentUser.username).map(ev => `<option value="${ev.id}">${ev.name} (${ev.status})</option>`).join("")}`;
      return;
    }
    select.innerHTML = `<option value="">Select Subject</option>${visibleSubjects.map(s => `<option value="${s.id}">${s.subjectCode} • ${s.name} • ${s.course}-${s.classSection || "A"}</option>`).join("")}`;
  });
}

function buildMarksInputs(subject, db) {
  normalizeSubject(subject);
  const marksTable = document.getElementById("marksTable");
  const existingRows = db.marks[subject.id] || [];
  const rowMap = new Map(existingRows.map(r => [r.regNo, r]));

  // Keep marks entry aligned with analytics by including students already present in saved marks.
  const roster = db.students
    .filter(st => st.program === subject.program)
    .map(st => ({ regNo: st.regNo, name: st.name }));
  const rosterRegSet = new Set(roster.map(st => st.regNo));
  existingRows.forEach(row => {
    if (!row?.regNo || rosterRegSet.has(row.regNo)) return;
    roster.push({
      regNo: row.regNo,
      name: row.studentName || `Student ${row.regNo}`
    });
    rosterRegSet.add(row.regNo);
  });

  const exams = subject.marksPattern.exams || [];
  const cols = exams.map(exam => {
    const meta = examTypeToMeta(exam.examType);
    return {
      key: meta.key,
      label: meta.label,
      maxMarks: Number(exam.maxMarks || 0),
      scaleTo: Number(exam.scaleTo || 0)
    };
  });

  marksTable.innerHTML = `
    <tr>
      <th>Reg No</th><th>Student</th>
      ${cols.map(c => `<th>${c.label}<br><small>Max ${c.maxMarks} → ${c.scaleTo}</small></th>`).join("")}
      <th>Raw Total</th><th>Scaled Total</th><th>Final</th>
    </tr>
    ${roster.map(st => {
      const saved = rowMap.get(st.regNo) || {};
      const calc = computeMarks(subject, saved);
      return `
        <tr data-reg="${st.regNo}">
          <td>${st.regNo}</td>
          <td>${st.name}</td>
          ${cols.map(c => `<td><input type="number" min="0" max="${c.maxMarks}" step="0.01" data-col="${c.key}" value="${saved[c.key] ?? 0}"></td>`).join("")}
          <td data-out="rawCia">${calc.rawCia}</td>
          <td data-out="scaledCia">${calc.scaledCia}</td>
          <td data-out="finalTotal">${calc.finalTotal}</td>
        </tr>
      `;
    }).join("")}
  `;

  marksTable.addEventListener("input", (e) => {
    const row = e.target.closest("tr[data-reg]");
    if (!row) return;
    const draft = {};
    row.querySelectorAll("input[data-col]").forEach(inp => {
      draft[inp.dataset.col] = Number(inp.value || 0);
    });
    const calc = computeMarks(subject, draft);
    row.querySelector('[data-out="rawCia"]').textContent = calc.rawCia;
    row.querySelector('[data-out="scaledCia"]').textContent = calc.scaledCia;
    row.querySelector('[data-out="finalTotal"]').textContent = calc.finalTotal;
  });
}

function buildPatternRow(exam, isEditable) {
  return `
    <tr data-pattern-row="${exam.id}">
      <td>
        <select data-field="examType" ${isEditable ? "" : "disabled"}>
          ${EXAM_TYPE_OPTIONS.map(opt => `<option value="${opt.value}" ${opt.value === exam.examType ? "selected" : ""}>${opt.label}</option>`).join("")}
        </select>
      </td>
      <td><input type="number" data-field="maxMarks" min="1" step="0.01" value="${Number(exam.maxMarks || 0)}" ${isEditable ? "" : "disabled"}></td>
      <td><input type="number" data-field="scaleTo" min="0" step="0.01" value="${Number(exam.scaleTo || 0)}" ${isEditable ? "" : "disabled"}></td>
      <td>${isEditable ? `<button class="soft-btn" type="button" data-remove-pattern-row="${exam.id}">Remove</button>` : "-"}</td>
    </tr>
  `;
}

function readPatternRowsFromTable() {
  const rows = [...document.querySelectorAll("#patternExamTable tr[data-pattern-row]")];
  return rows.map(row => ({
    id: row.dataset.patternRow,
    examType: row.querySelector('select[data-field="examType"]').value,
    maxMarks: Number(row.querySelector('input[data-field="maxMarks"]').value || 0),
    scaleTo: Number(row.querySelector('input[data-field="scaleTo"]').value || 0)
  }));
}

function setPatternTotalScaled(exams) {
  const total = round2(exams.reduce((sum, exam) => sum + Number(exam.scaleTo || 0), 0));
  const el = document.getElementById("patternTotalScaled");
  if (el) el.textContent = String(total);
}

async function renderMarksPatternEditor() {
  const db = await getDb();
  if (ensureSubjectsNormalized(db)) {
    await setDb(db);
  }

  const select = document.getElementById("patternSubjectSelect");
  const table = document.getElementById("patternExamTable");
  const note = document.getElementById("patternAccessNote");
  const addBtn = document.getElementById("addPatternExamBtn");
  const saveBtn = document.getElementById("savePatternBtn");
  if (!select || !table || !note || !addBtn || !saveBtn) return;

  const subject = db.subjects.find(s => s.id === select.value);
  if (!subject) {
    table.innerHTML = `<tr><th>Exam Type</th><th>Max Marks</th><th>Scale To</th><th>Action</th></tr><tr><td colspan="4">Select a subject to configure pattern.</td></tr>`;
    note.textContent = "";
    addBtn.disabled = true;
    saveBtn.disabled = true;
    setPatternTotalScaled([]);
    return;
  }

  normalizeSubject(subject);
  const canEdit = canEditSubjectPattern(subject);
  const exams = subject.marksPattern.exams || [];

  table.innerHTML = `
    <tr><th>Exam Type</th><th>Max Marks</th><th>Scale To</th><th>Action</th></tr>
    ${exams.map(exam => buildPatternRow(exam, canEdit)).join("") || `<tr><td colspan="4">No exams configured.</td></tr>`}
  `;

  note.textContent = canEdit
    ? "You can edit this subject's marks pattern."
    : "Read-only: Only IT Admin, Admin, or the assigned subject teacher can edit this pattern.";
  addBtn.disabled = !canEdit;
  saveBtn.disabled = !canEdit;
  setPatternTotalScaled(exams);
}

function bindMarksPatternSection() {
  const table = document.getElementById("patternExamTable");
  const select = document.getElementById("patternSubjectSelect");
  const addBtn = document.getElementById("addPatternExamBtn");
  const saveBtn = document.getElementById("savePatternBtn");
  if (!table || !select || !addBtn || !saveBtn) return;

  select.addEventListener("change", async () => {
    await renderMarksPatternEditor();
  });

  table.addEventListener("input", () => {
    setPatternTotalScaled(readPatternRowsFromTable());
  });

  table.addEventListener("click", e => {
    const removeBtn = e.target.closest("button[data-remove-pattern-row]");
    if (!removeBtn) return;
    const row = removeBtn.closest("tr[data-pattern-row]");
    if (row) row.remove();
    setPatternTotalScaled(readPatternRowsFromTable());
  });

  addBtn.addEventListener("click", () => {
    const tbodyRows = [...table.querySelectorAll("tr[data-pattern-row]")];
    const canEdit = !addBtn.disabled;
    if (!canEdit) return;
    const newExam = { id: crypto.randomUUID(), examType: "CIA_1", maxMarks: 20, scaleTo: 10 };
    if (!tbodyRows.length) {
      table.innerHTML = `<tr><th>Exam Type</th><th>Max Marks</th><th>Scale To</th><th>Action</th></tr>${buildPatternRow(newExam, true)}`;
    } else {
      table.insertAdjacentHTML("beforeend", buildPatternRow(newExam, true));
    }
    setPatternTotalScaled(readPatternRowsFromTable());
  });

  saveBtn.addEventListener("click", async () => {
    const db = await getDb();
    const subject = db.subjects.find(s => s.id === select.value);
    if (!subject) {
      alert("Select a subject first.");
      return;
    }
    if (!canEditSubjectPattern(subject)) {
      alert("You are not allowed to edit this marks pattern.");
      return;
    }

    const exams = readPatternRowsFromTable();
    if (!exams.length) {
      alert("Add at least one exam row.");
      return;
    }
    if (exams.some(exam => !exam.examType || exam.maxMarks <= 0 || exam.scaleTo < 0)) {
      alert("Each row must have exam type, max marks > 0, and scale >= 0.");
      return;
    }

    subject.marksPattern = { exams };
    notify(db, `Marks pattern updated for ${subject.name}`, ["admin", "itAdmin"], [subject.teacherUsername]);
    await setDb(db);
    await refreshSubjectSelectors();

    const marksSelect = document.getElementById("marksSubjectSelect");
    if (marksSelect && marksSelect.value === subject.id) {
      buildMarksInputs(subject, db);
    }

    await renderMarksPatternEditor();
    await renderAnalytics();
    await renderNotifications();
  });
}

function bindMarksSection() {
  const subjectSelect = document.getElementById("marksSubjectSelect");
  if (!subjectSelect) return;

  subjectSelect.addEventListener("change", async () => {
    const db = await getDb();
    const subject = db.subjects.find(s => s.id === subjectSelect.value);
    if (!subject) return;
    normalizeSubject(subject);
    const totalScale = round2((subject.marksPattern.exams || []).reduce((sum, exam) => sum + Number(exam.scaleTo || 0), 0));
    document.getElementById("subjectTypeBadge").textContent = `Subject Type: ${subject.subjectType === "FULL_CIA" ? "FULL CIA" : "END SEM"} • Final Scale: ${totalScale}`;
    document.getElementById("cutoffInput").value = db.cutoffs[subject.id] ?? 60;
    buildMarksInputs(subject, db);
  });

  document.getElementById("saveMarksBtn").addEventListener("click", async () => {
    const db = await getDb();
    const subject = db.subjects.find(s => s.id === subjectSelect.value);
    if (!subject) {
      alert("Select a subject first.");
      return;
    }

    const rows = [...document.querySelectorAll("#marksTable tr[data-reg]")];
    const saved = [];
    const warnings = [];

    rows.forEach(row => {
      const regNo = row.dataset.reg;
      const student = db.students.find(s => s.regNo === regNo);
      const draft = {};
      row.querySelectorAll("input[data-col]").forEach(inp => {
        draft[inp.dataset.col] = Number(inp.value || 0);
      });
      const calc = computeMarks(subject, draft);
      warnings.push(...calc.warnings.map(w => `${student.name} (${regNo}): ${w}`));
      saved.push({
        regNo,
        studentName: student.name,
        ...calc.capped,
        rawCia: calc.rawCia,
        scaledCia: calc.scaledCia,
        scaledEse: calc.scaledEse,
        finalTotal: calc.finalTotal,
        converted100: calc.converted100,
        finalScale: calc.finalScale,
        updatedAt: new Date().toISOString()
      });
    });

    db.marks[subject.id] = saved;
    if (warnings.length) {
      db.markWarnings.push({ subjectId: subject.id, timestamp: new Date().toISOString(), warnings });
    }
    notify(db, `Marks updated for ${subject.name}`, ["admin", "itAdmin", "teacher", "classTeacher"]);
    await setDb(db);
    document.getElementById("markWarnings").innerHTML = warnings.length ? warnings.map(w => `<div>${w}</div>`).join("") : "No validation warnings.";
    await renderAnalytics();
    await renderOverview();
  });

  document.getElementById("saveCutoffBtn").addEventListener("click", async () => {
    const db = await getDb();
    const subjectId = subjectSelect.value;
    if (!subjectId) return;
    db.cutoffs[subjectId] = Number(document.getElementById("cutoffInput").value || 60);
    await setDb(db);
  });
}

function destroyChartIfAny(key) {
  if (charts[key]) {
    charts[key].destroy();
    charts[key] = null;
  }
}

function populationStdDev(values) {
  if (!values.length) return 0;
  const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
  const variance = values.reduce((sum, val) => sum + ((val - avg) ** 2), 0) / values.length;
  return Math.sqrt(variance);
}

function chartPalette() {
  return {
    teal: "#0a9396",
    tealDark: "#005f73",
    mint: "#94d2bd",
    amber: "#ee9b00",
    red: "#bb3e03",
    green: "#2a9d8f",
    slate: "#4f6d7a"
  };
}

function percentTick(value) {
  return `${value}%`;
}

function makeResponsiveOptions(title, yPercent = true) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false
    },
    plugins: {
      title: {
        display: true,
        text: title,
        font: { size: 13, weight: "600" },
        padding: { top: 6, bottom: 8 }
      },
      legend: {
        position: "top",
        labels: { boxWidth: 14, usePointStyle: true }
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const val = Number(ctx.parsed?.y ?? ctx.parsed ?? 0);
            return `${ctx.dataset.label}: ${val.toFixed(2)}${yPercent ? "%" : ""}`;
          }
        }
      }
    },
    scales: yPercent
      ? {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: { callback: percentTick }
        }
      }
      : undefined
  };
}

function getCutoffPercent(subject, cutoffValue) {
  const totalScale = (subject.marksPattern?.exams || []).reduce((sum, exam) => sum + Number(exam.scaleTo || 0), 0);
  if (Number(cutoffValue) <= 100) return Number(cutoffValue);
  if (!totalScale) return 60;
  return round2((Number(cutoffValue) / totalScale) * 100);
}

function getConductedExamMetas(subject, rows) {
  const seen = new Set();
  const exams = (subject.marksPattern?.exams || []).map(exam => {
    const meta = examTypeToMeta(exam.examType);
    return {
      id: exam.id || `${meta.key}-${Math.random()}`,
      key: meta.key,
      label: meta.label,
      maxMarks: Number(exam.maxMarks || 0),
      scaleTo: Number(exam.scaleTo || 0)
    };
  }).filter(exam => {
    if (seen.has(exam.key)) return false;
    seen.add(exam.key);
    return true;
  });

  return exams.filter(exam => rows.some(row => Number(row[exam.key] || 0) > 0));
}

function getExamPercent(row, examMeta) {
  const raw = Number(row[examMeta.key] || 0);
  if (examMeta.maxMarks <= 0) return 0;
  const clamped = Math.min(Math.max(raw, 0), examMeta.maxMarks);
  return round2((clamped / examMeta.maxMarks) * 100);
}

function getOverallConductedPercent(row, conductedExams) {
  const totalScale = conductedExams.reduce((sum, exam) => sum + Number(exam.scaleTo || 0), 0);
  if (!totalScale) return 0;

  const scaled = conductedExams.reduce((sum, exam) => {
    const raw = Number(row[exam.key] || 0);
    const clamped = Math.min(Math.max(raw, 0), Number(exam.maxMarks || 0));
    if (exam.maxMarks <= 0) return sum;
    return sum + ((clamped / exam.maxMarks) * exam.scaleTo);
  }, 0);

  return round2((scaled / totalScale) * 100);
}

function avg(values) {
  return values.length ? round2(values.reduce((sum, value) => sum + value, 0) / values.length) : 0;
}

function setAnalyticsEmptyState(message) {
  ["avg", "distribution", "trend", "passFail"].forEach(destroyChartIfAny);
  document.getElementById("topTable").innerHTML = `<tr><th>Rank</th><th>Student</th><th>Score</th></tr><tr><td colspan="3">${message}</td></tr>`;
  document.getElementById("riskTable").innerHTML = `<tr><th>Student</th><th>Score</th><th>Status</th></tr><tr><td colspan="3">${message}</td></tr>`;
}

function renderUploadedAnalytics(subject, rows, scopeLabel, scopeScores) {
  const safeRows = Array.isArray(rows) ? rows : [];
  const safeScores = Array.isArray(scopeScores) ? scopeScores : [];
  const titleEl = document.getElementById("uploadedAnalyticsTitle");
  if (titleEl) {
    titleEl.textContent = `Exam Scope Analytics (${scopeLabel || "Overall"})`;
  }

  const hasData = safeRows.length && safeScores.length;
  if (!hasData) {
    document.getElementById("upNotAttended").textContent = "0";
    document.getElementById("upMin").textContent = "0.00";
    document.getElementById("upMax").textContent = "0.00";
    document.getElementById("upAvg").textContent = "0.00";
    document.getElementById("upStdev").textContent = "0.00";
    document.getElementById("upPerformanceMeasure").textContent = "No data available for this scope.";
    document.getElementById("uploadedDistributionTable").innerHTML = `<tr><th>Range</th><th>Count</th><th>Percentage</th></tr><tr><td colspan="3">No data</td></tr>`;
    document.getElementById("uploadedDataTable").innerHTML = `<tr><th>Roll No</th><th>Name</th><th>Subject</th><th>Assessment</th><th>Marks (%)</th></tr><tr><td colspan="5">No data</td></tr>`;
    destroyChartIfAny("uploadedMarks");
    return;
  }

  const marks = safeScores.map(score => Number(score || 0));
  const notAttended = safeScores.filter(score => score === null || score === undefined || score === "").length;
  const min = Math.min(...marks);
  const max = Math.max(...marks);
  const avg = marks.reduce((sum, val) => sum + val, 0) / marks.length;
  const stdev = populationStdDev(marks);

  const ranges = [
    { label: "≥90%", test: m => m >= 90 },
    { label: "85% - 89%", test: m => m >= 85 && m <= 89 },
    { label: "80% - 84%", test: m => m >= 80 && m <= 84 },
    { label: "75% - 79%", test: m => m >= 75 && m <= 79 },
    { label: "70% - 74%", test: m => m >= 70 && m <= 74 },
    { label: "65% - 69%", test: m => m >= 65 && m <= 69 },
    { label: "60% - 64%", test: m => m >= 60 && m <= 64 },
    { label: "50% - 59%", test: m => m >= 50 && m <= 59 },
    { label: "40% - 49%", test: m => m >= 40 && m <= 49 },
    { label: "< 40%", test: m => m < 40 }
  ];

  const dist = ranges.map(range => {
    const count = marks.filter(range.test).length;
    const percentage = marks.length ? (count / marks.length) * 100 : 0;
    return { label: range.label, count, percentage };
  });

  document.getElementById("upNotAttended").textContent = String(notAttended);
  document.getElementById("upMin").textContent = min.toFixed(2);
  document.getElementById("upMax").textContent = max.toFixed(2);
  document.getElementById("upAvg").textContent = avg.toFixed(2);
  document.getElementById("upStdev").textContent = stdev.toFixed(2);
  document.getElementById("upPerformanceMeasure").textContent = `Average Score (${scopeLabel}): ${avg.toFixed(2)} / 100 (${avg.toFixed(1)}%)`;

  document.getElementById("uploadedDistributionTable").innerHTML = `
    <tr><th>Range</th><th>Count</th><th>Percentage</th></tr>
    ${dist.map(row => `<tr><td>${row.label}</td><td>${row.count}</td><td>${row.percentage.toFixed(1)}%</td></tr>`).join("")}
  `;

  document.getElementById("uploadedDataTable").innerHTML = `
    <tr><th>Roll No</th><th>Name</th><th>Subject</th><th>Assessment</th><th>Marks (%)</th></tr>
    ${safeRows.map((row, idx) => `<tr><td>${row.regNo}</td><td>${row.studentName}</td><td>${subject?.name || "-"}</td><td>${scopeLabel}</td><td>${marks[idx].toFixed(2)}</td></tr>`).join("")}
  `;

  destroyChartIfAny("uploadedMarks");
  charts.uploadedMarks = new Chart(document.getElementById("uploadedMarksChart"), {
    type: "bar",
    data: {
      labels: safeRows.map(row => row.regNo),
      datasets: [
        {
          type: "bar",
          label: `${scopeLabel} (%)`,
          data: marks,
          backgroundColor: "#0a9396"
        },
        {
          type: "line",
          label: "Passing Mark (40/100)",
          data: new Array(marks.length).fill(40),
          borderColor: "#bb3e03",
          borderWidth: 2,
          pointRadius: 0,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
}

async function renderAnalytics() {
  const db = await getDb();
  const select = document.getElementById("analyticsSubjectSelect");
  const subjectId = select?.value || getVisibleSubjects(db)[0]?.id;
  if (!subjectId) return;
  if (select && !select.value) select.value = subjectId;

  const subject = db.subjects.find(s => s.id === subjectId);
  if (!subject) return;
  normalizeSubject(subject);
  const rows = db.marks[subjectId] || [];
  const cutoffPercent = getCutoffPercent(subject, db.cutoffs[subjectId] ?? 60);
  const conductedExams = getConductedExamMetas(subject, rows);

  const tabs = [{ id: "OVERALL", label: "Overall" }, ...conductedExams.map(exam => ({ id: exam.id, label: exam.label }))];
  const tabsHost = document.getElementById("analyticsTabs");
  if (tabsHost) {
    if (!tabs.find(tab => tab.id === analyticsActiveTab)) analyticsActiveTab = "OVERALL";
    tabsHost.innerHTML = tabs.map(tab => `<button type="button" class="analytics-tab-btn ${tab.id === analyticsActiveTab ? "active" : ""}" data-analytics-tab="${tab.id}">${tab.label}</button>`).join("");
  }

  if (!rows.length) {
    setAnalyticsEmptyState("No marks saved yet for this subject.");
    document.getElementById("viewSubtitle").textContent = `${subject.name}: No marks yet.`;
    renderUploadedAnalytics(subject, [], "Overall", []);
    return;
  }

  if (!conductedExams.length) {
    setAnalyticsEmptyState("No exam appears conducted yet. Enter marks for at least one exam.");
    document.getElementById("viewSubtitle").textContent = `${subject.name}: Waiting for first exam marks.`;
    renderUploadedAnalytics(subject, rows, "Overall", []);
    return;
  }

  const selectedExam = conductedExams.find(exam => exam.id === analyticsActiveTab) || null;
  const isOverall = analyticsActiveTab === "OVERALL" || !selectedExam;

  const activeScores = rows.map(row => isOverall
    ? getOverallConductedPercent(row, conductedExams)
    : getExamPercent(row, selectedExam)
  );

  const high = activeScores.filter(score => score >= cutoffPercent + 15).length;
  const mid = activeScores.filter(score => score >= cutoffPercent && score < cutoffPercent + 15).length;
  const low = activeScores.filter(score => score < cutoffPercent).length;
  const palette = chartPalette();

  destroyChartIfAny("avg");
  destroyChartIfAny("distribution");
  destroyChartIfAny("trend");
  destroyChartIfAny("passFail");

  const avgLabels = isOverall
    ? [...conductedExams.map(exam => exam.label), "Overall"]
    : [selectedExam.label];
  const avgValues = isOverall
    ? [...conductedExams.map(exam => avg(rows.map(row => getExamPercent(row, exam)))), avg(activeScores)]
    : [avg(activeScores)];

  charts.avg = new Chart(document.getElementById("avgChart"), {
    type: "bar",
    data: {
      labels: avgLabels,
      datasets: [
        {
          label: "Average (%)",
          data: avgValues,
          backgroundColor: avgLabels.map((_, idx) => [palette.teal, palette.tealDark, palette.mint, palette.green][idx] || palette.teal),
          borderRadius: 10,
          maxBarThickness: 56
        },
        {
          type: "line",
          label: "Cutoff (%)",
          data: new Array(avgLabels.length).fill(cutoffPercent),
          borderColor: palette.red,
          backgroundColor: palette.red,
          pointRadius: 0,
          borderWidth: 2,
          borderDash: [6, 4]
        }
      ]
    },
    options: makeResponsiveOptions("Average Performance")
  });

  charts.distribution = new Chart(document.getElementById("distributionChart"), {
    type: "doughnut",
    data: {
      labels: ["High", "Average", "Low"],
      datasets: [{
        data: [high, mid, low],
        backgroundColor: [palette.green, palette.amber, palette.red],
        borderWidth: 2,
        borderColor: "#ffffff",
        hoverOffset: 8
      }]
    },
    options: {
      ...makeResponsiveOptions("Student Distribution", false),
      cutout: "56%"
    }
  });

  charts.trend = new Chart(document.getElementById("trendChart"), {
    type: "line",
    data: {
      labels: rows.map(r => r.studentName),
      datasets: isOverall
        ? [
          ...conductedExams.map((exam, idx) => ({
            label: exam.label,
            data: rows.map(r => getExamPercent(r, exam)),
            borderColor: [palette.teal, palette.amber, palette.red, palette.tealDark][idx] || palette.teal,
            pointRadius: 2,
            pointHoverRadius: 4,
            tension: 0.3
          })),
          {
            label: "Overall",
            data: activeScores,
            borderColor: palette.green,
            borderWidth: 3,
            pointRadius: 2,
            pointHoverRadius: 4,
            tension: 0.25
          }
        ]
        : [{
          label: selectedExam.label,
          data: activeScores,
          borderColor: palette.teal,
          borderWidth: 3,
          backgroundColor: "rgba(10, 147, 150, 0.12)",
          fill: true,
          pointRadius: 3,
          pointHoverRadius: 5,
          tension: 0.25
        }]
    },
    options: makeResponsiveOptions("Student Trend")
  });

  charts.passFail = new Chart(document.getElementById("passFailChart"), {
    type: "doughnut",
    data: {
      labels: ["Pass", "Fail"],
      datasets: [{
        data: [activeScores.filter(score => score >= cutoffPercent).length, activeScores.filter(score => score < cutoffPercent).length],
        backgroundColor: [palette.green, palette.red],
        borderWidth: 2,
        borderColor: "#ffffff"
      }]
    },
    options: {
      ...makeResponsiveOptions("Pass vs Fail", false),
      rotation: -90,
      circumference: 180,
      cutout: "58%"
    }
  });

  const ranked = rows.map((row, idx) => ({
    studentName: row.studentName,
    score: activeScores[idx]
  })).sort((a, b) => b.score - a.score);

  const top = ranked.slice(0, 5);
  document.getElementById("topTable").innerHTML = `<tr><th>Rank</th><th>Student</th><th>Score</th></tr>${top.map((r, i) => `<tr><td>${i + 1}</td><td>${r.studentName}</td><td>${r.score}%</td></tr>`).join("")}`;

  const risk = ranked.filter(r => r.score < cutoffPercent);
  document.getElementById("riskTable").innerHTML = `<tr><th>Student</th><th>Score</th><th>Status</th></tr>${risk.map(r => `<tr><td>${r.studentName}</td><td>${r.score}%</td><td>Reactive Student</td></tr>`).join("") || `<tr><td colspan="3">No at-risk students</td></tr>`}`;

  const examScopeText = isOverall
    ? `Overall (${conductedExams.map(exam => exam.label).join(", ")})`
    : selectedExam.label;
  document.getElementById("viewSubtitle").textContent = `${subject.name} • ${examScopeText} • Cutoff ${cutoffPercent}%`;
  renderUploadedAnalytics(subject, rows, isOverall ? "Overall" : selectedExam.label, activeScores);
}

function bindAnalyticsSelection() {
  const select = document.getElementById("analyticsSubjectSelect");
  if (!select) return;
  select.addEventListener("change", () => {
    analyticsActiveTab = "OVERALL";
    renderAnalytics();
  });

  const tabsHost = document.getElementById("analyticsTabs");
  if (!tabsHost) return;
  tabsHost.addEventListener("click", e => {
    const btn = e.target.closest("button[data-analytics-tab]");
    if (!btn) return;
    analyticsActiveTab = btn.dataset.analyticsTab;
    renderAnalytics();
  });
}

function getTargetStudents(db, assignmentType, subjectId, specificRegs) {
  const subject = db.subjects.find(s => s.id === subjectId);
  const classStudents = db.students.filter(st => st.program === subject.program);

  if (assignmentType === "ENTIRE_CLASS") return classStudents;
  if (assignmentType === "SPECIFIC_STUDENTS") {
    const regs = specificRegs.split(",").map(r => r.trim()).filter(Boolean);
    return classStudents.filter(st => regs.includes(st.regNo));
  }

  const cutoff = db.cutoffs[subjectId] ?? 60;
  const marksRows = db.marks[subjectId] || [];
  const riskRegs = new Set(marksRows.filter(r => r.finalTotal < cutoff).map(r => r.regNo));
  return classStudents.filter(st => riskRegs.has(st.regNo));
}

function resetAsgnWizard() {
  asgnWizard = { step:1, subjectId:"", mode:"ENTIRE_CLASS", perfType:"", selectedRegs:[], typeId:"", details:{}, dueDate:"" };
  goToAsgnStep(1);
  document.querySelectorAll(".asgn-mode-card").forEach((c,i) => c.classList.toggle("active", i===0));
  document.querySelectorAll(".asgn-type-card").forEach(c => c.classList.remove("active"));
  document.querySelectorAll(".asgn-perf-card").forEach(c => c.classList.remove("active"));
  const sl=document.getElementById("asgnStudentList"), pc=document.getElementById("asgnPerformanceCards");
  if(sl) sl.style.display="none";
  if(pc) pc.style.display="none";
  const ss=document.getElementById("assignmentSubjectSelect");
  if(ss) ss.value="";
}

function goToAsgnStep(step) {
  asgnWizard.step=step;
  document.querySelectorAll(".asgn-step-body").forEach(b => b.classList.remove("active"));
  const body=document.getElementById("asgnStep"+step);
  if(body) body.classList.add("active");
  document.querySelectorAll(".asgn-step-dot").forEach(dot => {
    const s=Number(dot.dataset.s);
    dot.classList.toggle("active", s===step);
    dot.classList.toggle("done", s<step);
  });
  const back=document.getElementById("asgnBackBtn"), next=document.getElementById("asgnNextBtn");
  if(back) back.style.display=step===1?"none":"inline-block";
  if(next) next.textContent=step===4?"Publish Assignment":"Next Step \u2192";
}

function updateAsgnStudentCounts(db) {
  const subject=db.subjects.find(s=>s.id===asgnWizard.subjectId);
  if(!subject) return;
  const cutoff=db.cutoffs[asgnWizard.subjectId]??60;
  const classStudents=db.students.filter(st=>st.program===subject.program);
  const marksRows=db.marks[asgnWizard.subjectId]||[];
  const passRegs=new Set(marksRows.filter(r=>r.finalTotal>=cutoff).map(r=>r.regNo));
  const pro=classStudents.filter(st=>passRegs.has(st.regNo)).length;
  const re=classStudents.filter(st=>!passRegs.has(st.regNo)).length;
  const pEl=document.getElementById("proactiveCount"), rEl=document.getElementById("reactiveCount");
  if(pEl) pEl.textContent=`High-performing (\u2265${cutoff}%) \u2014 ${pro} students`;
  if(rEl) rEl.textContent=`Need improvement (<${cutoff}%) \u2014 ${re} students`;
}

function buildTypeGrid() {
  const grid=document.getElementById("asgnTypeGrid");
  if(!grid||grid.children.length) return;
  grid.innerHTML=ASGN_TYPES.map(t=>`<div class="asgn-type-card" data-type="${t.id}"><span>${t.icon}</span><small>${t.label}</small></div>`).join("");
  grid.addEventListener("click", e=>{
    const card=e.target.closest(".asgn-type-card");
    if(!card) return;
    grid.querySelectorAll(".asgn-type-card").forEach(c=>c.classList.remove("active"));
    card.classList.add("active");
    asgnWizard.typeId=card.dataset.type;
  });
}

function buildDetailsForm() {
  const container=document.getElementById("asgnDetailsFields");
  if(!container) return;
  const typeConfig=ASGN_TYPES.find(t=>t.id===asgnWizard.typeId);
  const fields=ASGN_TYPE_FIELDS[asgnWizard.typeId]||[];
  let html=`
    <div><label class="asgn-details-label">Assignment Title *</label>
    <input id="asgn_title" type="text" placeholder="Assignment title" value="${typeConfig?typeConfig.label+' Assignment':''}" style="width:100%"></div>
    <div><label class="asgn-details-label">Due Date *</label>
    <input id="asgn_dueDate" type="date" style="width:100%"></div>`;
  fields.forEach(f=>{
    const fid="asgn_"+f.name;
    if(f.type==="textarea") html+=`<div style="grid-column:1/-1"><label class="asgn-details-label">${f.label}</label><textarea id="${fid}" placeholder="${f.label}" style="width:100%;min-height:80px"></textarea></div>`;
    else if(f.type==="select") html+=`<div><label class="asgn-details-label">${f.label}</label><select id="${fid}" style="width:100%">${f.options.map(o=>`<option>${o}</option>`).join("")}</select></div>`;
    else html+=`<div><label class="asgn-details-label">${f.label}</label><input id="${fid}" type="${f.type}" placeholder="${f.label}" style="width:100%"></div>`;
  });
  container.innerHTML=html;
}

function collectDetailsFormValues() {
  const fields=ASGN_TYPE_FIELDS[asgnWizard.typeId]||[];
  asgnWizard.details.title=document.getElementById("asgn_title")?.value.trim()||"";
  asgnWizard.dueDate=document.getElementById("asgn_dueDate")?.value||"";
  const fv={};
  fields.forEach(f=>{const el=document.getElementById("asgn_"+f.name); if(el) fv[f.name]=el.value;});
  asgnWizard.details.fields=fv;
}

function buildReview(db) {
  const subject=db.subjects.find(s=>s.id===asgnWizard.subjectId);
  const typeConfig=ASGN_TYPES.find(t=>t.id===asgnWizard.typeId);
  const reviewEl=document.getElementById("asgnReview");
  if(!reviewEl) return;
  const modeLabel={ENTIRE_CLASS:"Entire Class",SPECIFIC_STUDENTS:`Selected Students (${asgnWizard.selectedRegs.length})`,PERFORMANCE_BASED:`By Performance \u2014 ${asgnWizard.perfType}`}[asgnWizard.mode]||"--";
  const items=[
    {label:"Assignment Title", value:asgnWizard.details.title||"--"},
    {label:"Class / Subject",  value:subject?`${subject.name} (${subject.program})`:"--"},
    {label:"Assignment Type",  value:typeConfig?`${typeConfig.icon} ${typeConfig.label}`:"--"},
    {label:"Target Students",  value:modeLabel},
    {label:"Due Date",         value:asgnWizard.dueDate||"--"}
  ];
  (ASGN_TYPE_FIELDS[asgnWizard.typeId]||[]).forEach(f=>{
    items.push({label:f.label, value:asgnWizard.details.fields?.[f.name]||"--"});
  });
  reviewEl.innerHTML=items.map(it=>`<div class="asgn-review-item"><div class="review-label">${it.label}</div><div class="review-value">${it.value}</div></div>`).join("");
}

function populateStudentCheckboxes(db) {
  const subject=db.subjects.find(s=>s.id===asgnWizard.subjectId);
  const container=document.getElementById("asgnStudentCheckboxes");
  if(!container) return;
  if(!subject){container.innerHTML="<p>Select a class first.</p>"; return;}
  const students=db.students.filter(s=>s.program===subject.program);
  container.innerHTML=students.length
    ? students.map(st=>`<label class="asgn-checkbox-item"><input type="checkbox" class="asgn-student-chk" value="${st.regNo}"> <span>${st.regNo} \u2014 ${st.name}</span></label>`).join("")
    : "<p>No students found.</p>";
}

async function publishAssignment() {
  const db=await getDb();
  const subject=db.subjects.find(s=>s.id===asgnWizard.subjectId);
  if(!subject){alert("No subject selected."); return;}
  const cutoff=db.cutoffs[asgnWizard.subjectId]??60;
  const classStudents=db.students.filter(st=>st.program===subject.program);
  const marksRows=db.marks[asgnWizard.subjectId]||[];
  let targetRegs=[];
  if(asgnWizard.mode==="ENTIRE_CLASS"){
    targetRegs=classStudents.map(s=>s.regNo);
  }else if(asgnWizard.mode==="SPECIFIC_STUDENTS"){
    targetRegs=asgnWizard.selectedRegs;
  }else{
    const passRegs=new Set(marksRows.filter(r=>r.finalTotal>=cutoff).map(r=>r.regNo));
    targetRegs=asgnWizard.perfType==="PROACTIVE"
      ? classStudents.filter(s=>passRegs.has(s.regNo)).map(s=>s.regNo)
      : classStudents.filter(s=>!passRegs.has(s.regNo)).map(s=>s.regNo);
  }
  const typeConfig=ASGN_TYPES.find(t=>t.id===asgnWizard.typeId);
  const id=crypto.randomUUID();
  const link=`${window.location.origin}${window.location.pathname.replace("dashboard.html","student-assignment.html")}?id=${id}`;
  db.assignments.unshift({
    id, assignmentType:asgnWizard.typeId, assignmentLabel:typeConfig?.label||asgnWizard.typeId,
    subjectId:asgnWizard.subjectId, mode:asgnWizard.mode, perfType:asgnWizard.perfType,
    title:asgnWizard.details.title, details:asgnWizard.details.fields||{},
    dueDate:asgnWizard.dueDate, createdBy:currentUser.username,
    targetRegs, link, submissions:[], createdAt:new Date().toISOString()
  });
  notify(db,`Assignment created: ${asgnWizard.details.title}`,["teacher","classTeacher","admin","itAdmin"]);
  await setDb(db);
  await renderAssignments();
  await renderNotifications();
  resetAsgnWizard();
}

function initAssignmentWizard() {
  buildTypeGrid();
  document.querySelectorAll(".asgn-mode-card").forEach(card=>{
    card.addEventListener("click", async ()=>{
      document.querySelectorAll(".asgn-mode-card").forEach(c=>c.classList.remove("active"));
      card.classList.add("active");
      asgnWizard.mode=card.dataset.mode;
      const listEl=document.getElementById("asgnStudentList"), perfEl=document.getElementById("asgnPerformanceCards");
      if(asgnWizard.mode==="SPECIFIC_STUDENTS"){
        if(listEl) listEl.style.display="block";
        if(perfEl) perfEl.style.display="none";
        populateStudentCheckboxes(await getDb());
      }else if(asgnWizard.mode==="PERFORMANCE_BASED"){
        if(listEl) listEl.style.display="none";
        if(perfEl) perfEl.style.display="block";
        updateAsgnStudentCounts(await getDb());
      }else{
        if(listEl) listEl.style.display="none";
        if(perfEl) perfEl.style.display="none";
      }
    });
  });
  document.querySelectorAll(".asgn-perf-card").forEach(card=>{
    card.addEventListener("click", ()=>{
      document.querySelectorAll(".asgn-perf-card").forEach(c=>c.classList.remove("active"));
      card.classList.add("active");
      asgnWizard.perfType=card.dataset.perf;
    });
  });
  const subSel=document.getElementById("assignmentSubjectSelect");
  if(subSel) subSel.addEventListener("change", async e=>{
    asgnWizard.subjectId=e.target.value;
    const db=await getDb();
    if(asgnWizard.mode==="SPECIFIC_STUDENTS") populateStudentCheckboxes(db);
    if(asgnWizard.mode==="PERFORMANCE_BASED") updateAsgnStudentCounts(db);
  });
  const nextBtn=document.getElementById("asgnNextBtn");
  if(nextBtn) nextBtn.addEventListener("click", async ()=>{
    if(asgnWizard.step===4){await publishAssignment(); return;}
    if(asgnWizard.step===1){
      if(!asgnWizard.subjectId){alert("Please select a class."); return;}
      if(asgnWizard.mode==="PERFORMANCE_BASED"&&!asgnWizard.perfType){alert("Please select Proactive or Reactive."); return;}
      if(asgnWizard.mode==="SPECIFIC_STUDENTS"){
        asgnWizard.selectedRegs=[...document.querySelectorAll(".asgn-student-chk:checked")].map(c=>c.value);
        if(!asgnWizard.selectedRegs.length){alert("Select at least one student."); return;}
      }
    }
    if(asgnWizard.step===2&&!asgnWizard.typeId){alert("Please select an assignment type."); return;}
    if(asgnWizard.step===2) buildDetailsForm();
    if(asgnWizard.step===3){
      if(!document.getElementById("asgn_title")?.value.trim()){alert("Please enter an assignment title."); return;}
      if(!document.getElementById("asgn_dueDate")?.value){alert("Please select a due date."); return;}
      collectDetailsFormValues();
      buildReview(await getDb());
    }
    goToAsgnStep(asgnWizard.step+1);
  });
  const backBtn=document.getElementById("asgnBackBtn");
  if(backBtn) backBtn.addEventListener("click", ()=>goToAsgnStep(asgnWizard.step-1));
}

async function renderAssignments() {
  const db = await getDb();
  const table = document.getElementById("assignmentTable");
  if (!table) return;

  const allowed = ["admin", "itAdmin"].includes(currentUser.role)
    ? db.assignments
    : db.assignments.filter(a => a.createdBy === currentUser.username);

  table.innerHTML = `
    <tr><th>Title</th><th>Type</th><th>Due</th><th>Targets</th><th>Submissions</th><th>Link</th></tr>
    ${allowed.map(a => `
      <tr>
        <td>${a.title}</td>
        <td>${a.assignmentLabel || a.assignmentType}</td>
        <td>${a.dueDate}</td>
        <td>${a.targetRegs.length}</td>
        <td>${a.submissions?.length || 0}</td>
        <td><a href="${a.link}" target="_blank">Open</a></td>
      </tr>
    `).join("") || `<tr><td colspan="6">No assignments yet.</td></tr>`}
  `;
}

function readFileName(input) {
  return input?.files?.[0]?.name || "";
}

function readFileEntry(input) {
  const file = input?.files?.[0];
  if (!file) return Promise.resolve(null);
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve({ name: file.name, dataUrl: String(reader.result || "") });
    reader.onerror = () => resolve({ name: file.name, dataUrl: "" });
    reader.readAsDataURL(file);
  });
}

function normalizeFileEntry(value) {
  if (!value) return null;
  if (typeof value === "string") {
    return value ? { name: value, dataUrl: "" } : null;
  }
  if (typeof value === "object") {
    const name = String(value.name || "").trim();
    if (!name) return null;
    return { name, dataUrl: String(value.dataUrl || "") };
  }
  return null;
}

function normalizeFileEntryList(list) {
  if (!Array.isArray(list)) return [];
  return list.map(normalizeFileEntry).filter(Boolean);
}

async function readFixedFileEntries(ids, existing = []) {
  const out = [];
  for (let i = 0; i < ids.length; i += 1) {
    const selected = await readFileEntry(document.getElementById(ids[i]));
    if (selected) {
      out.push(selected);
      continue;
    }
    const fallback = normalizeFileEntry(existing[i]);
    if (fallback) out.push(fallback);
  }
  return out;
}

function readPostEventPhotoNames(existing = []) {
  const ids = ["postEventPhoto1", "postEventPhoto2", "postEventPhoto3", "postEventPhoto4", "postEventPhoto5"];
  const names = ids.map((id, idx) => {
    const fileName = readFileName(document.getElementById(id));
    return fileName || existing[idx] || "";
  }).filter(Boolean);
  return names.slice(0, 5);
}

function readNewsletterPhotoNames(existing = []) {
  const ids = ["postEventNewsletterPhoto1", "postEventNewsletterPhoto2"];
  const names = ids.map((id, idx) => {
    const fileName = readFileName(document.getElementById(id));
    return fileName || existing[idx] || "";
  }).filter(Boolean);
  return names.slice(0, 2);
}

function normalizePostEventDocs(docs) {
  if (!docs) {
    return {
      report: "",
      reportFile: "",
      reportFileObj: null,
      newsletter: "",
      newsletterFile: "",
      newsletterFileObj: null,
      newsletterPhotos: [],
      newsletterPhotoFiles: [],
      photos: [],
      eventPhotoFiles: []
    };
  }

  const newsletterFileObj = normalizeFileEntry(docs.newsletterFileObj || docs.newsletterFile);
  const reportFileObj = normalizeFileEntry(docs.reportFileObj || docs.reportFile);
  const newsletterPhotoFiles = normalizeFileEntryList(
    docs.newsletterPhotoFiles || docs.newsletterPhotos || []
  ).slice(0, 2);
  const eventPhotoFiles = normalizeFileEntryList(
    docs.eventPhotoFiles || docs.photos || []
  ).slice(0, 5);

  return {
    report: docs.report || "",
    reportFile: reportFileObj?.name || "",
    reportFileObj,
    newsletter: docs.newsletter || "",
    newsletterFile: newsletterFileObj?.name || "",
    newsletterFileObj,
    newsletterPhotos: newsletterPhotoFiles.map(f => f.name),
    newsletterPhotoFiles,
    photos: eventPhotoFiles.map(f => f.name),
    eventPhotoFiles
  };
}

async function openPostEventForm(event) {
  const form = document.getElementById("postEventForm");
  if (!form) return;
  switchView("documents");
  await refreshSubjectSelectors();

  const docEventSelect = document.getElementById("docEventSelect");
  if (docEventSelect) {
    docEventSelect.value = event.id;
  }

  const existing = normalizePostEventDocs(event.postEventDocs);

  document.getElementById("postEventId").value = event.id;
  document.getElementById("postEventName").value = `${event.name} (${event.date})`;
  const newsletterHint = document.getElementById("postEventNewsletterFileHint");
  if (newsletterHint) {
    newsletterHint.textContent = existing.newsletterFileObj?.name
      ? `Existing newsletter file: ${existing.newsletterFileObj.name}`
      : "No newsletter file uploaded yet.";
  }
  const reportHint = document.getElementById("postEventReportFileHint");
  if (reportHint) {
    reportHint.textContent = existing.reportFileObj?.name
      ? `Existing event report file: ${existing.reportFileObj.name}`
      : "No event report file uploaded yet.";
  }
}

function bindPostEventDocsForm() {
  const form = document.getElementById("postEventForm");
  if (!form) return;

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const dbCurrent = await getDb();
    const eventId = document.getElementById("postEventId").value;
    const event = dbCurrent.events.find(ev => ev.id === eventId);
    if (!event) {
      alert("Select an event from My Events table first.");
      return;
    }
    if (event.createdBy !== currentUser.username) {
      alert("Only the teacher who created this event can submit post-event documents.");
      return;
    }

    const profile = dbCurrent.profiles[currentUser.username] || {};
    if (!profile.signatureDataUrl) {
      alert("Upload digital signature in Profile before submitting event documents.");
      switchView("profile");
      return;
    }

    const existing = normalizePostEventDocs(event.postEventDocs);
    const newsletterFileInput = document.getElementById("postEventNewsletterFile");
    const newsletterFileObj = (await readFileEntry(newsletterFileInput)) || existing.newsletterFileObj;
    if (!newsletterFileObj?.name) {
      alert("Please upload newsletter file (.doc, .docx, or .pdf).");
      return;
    }

    const reportFileInput = document.getElementById("postEventReportFile");
    const reportFileObj = (await readFileEntry(reportFileInput)) || existing.reportFileObj;
    if (!reportFileObj?.name) {
      alert("Please upload event report file (.doc, .docx, or .pdf).");
      return;
    }

    const newsletterPhotoFiles = await readFixedFileEntries(
      ["postEventNewsletterPhoto1", "postEventNewsletterPhoto2"],
      existing.newsletterPhotoFiles
    );
    if (newsletterPhotoFiles.length < 2) {
      alert("Please upload 2 newsletter photos.");
      return;
    }

    const eventPhotoFiles = await readFixedFileEntries(
      ["postEventPhoto1", "postEventPhoto2", "postEventPhoto3", "postEventPhoto4", "postEventPhoto5"],
      existing.eventPhotoFiles
    );
    if (eventPhotoFiles.length < 5) {
      alert("Please upload 5 separate event photos. Newsletter photos are counted separately.");
      return;
    }

    const newsletterPhotos = newsletterPhotoFiles.map(file => file.name);
    const photos = eventPhotoFiles.map(file => file.name);

    event.postEventDocs = {
      report: existing.report || "",
      newsletter: existing.newsletter || "",
      reportFile: reportFileObj.name,
      reportFileObj,
      newsletterFile: newsletterFileObj.name,
      newsletterFileObj,
      newsletterPhotos,
      newsletterPhotoFiles,
      photos,
      eventPhotoFiles,
      submittedAt: new Date().toISOString()
    };

    notify(
      dbCurrent,
      `Newsletter package received for ${event.name}: ${newsletterFileObj.name}, ${newsletterPhotos.length} newsletter photos.`,
      [],
      [dbCurrent.newsletterIncharge]
    );
    notify(
      dbCurrent,
      `Full post-event documents submitted for ${event.name} by ${event.createdBy}.`,
      ["admin", "itAdmin"],
      []
    );
    await setDb(dbCurrent);
    await renderEvents();
    await renderSubmittedDocsTable();
    await renderNotifications();
    const eventName = document.getElementById("postEventName").value;
    form.reset();
    document.getElementById("postEventId").value = "";
    document.getElementById("postEventName").value = "";
    const newsletterHint = document.getElementById("postEventNewsletterFileHint");
    if (newsletterHint) newsletterHint.textContent = "No newsletter file uploaded yet.";
    const reportHint = document.getElementById("postEventReportFileHint");
    if (reportHint) reportHint.textContent = "No event report file uploaded yet.";
    const eventSelect = document.getElementById("docEventSelect");
    if (eventSelect) eventSelect.value = "";
    document.getElementById("docStatus").textContent = `Submission saved for ${eventName}.`;
    alert("Post-event documents submitted successfully.");
  });
}

async function renderSubmittedDocsTable() {
  const table = document.getElementById("submittedDocsTable");
  if (!table) return;
  const status = document.getElementById("docStatus");

  const db = await getDb();
  const rows = db.events
    .filter(ev => ev.postEventDocs)
    .filter(ev => ["admin", "itAdmin"].includes(currentUser.role) || ev.createdBy === currentUser.username)
    .map(ev => {
      const docs = normalizePostEventDocs(ev.postEventDocs);
      const makeLink = (file) => {
        if (!file?.name) return "-";
        if (file.dataUrl) return `<a href="${file.dataUrl}" target="_blank" rel="noopener">Open ${file.name}</a>`;
        return `<span title="${file.name}">Legacy: ${file.name} (re-submit required)</span>`;
      };
      const makePhotoLinks = (files) => {
        if (!Array.isArray(files) || !files.length) return "-";
        return files
          .map((file, idx) => file?.dataUrl
            ? `<a href="${file.dataUrl}" target="_blank" rel="noopener">Photo ${idx + 1}</a>`
            : `Legacy Photo ${idx + 1} (re-submit)`)
          .join(" | ");
      };
      // Legacy records only store filenames; creator must re-submit to make files openable.
      const isLegacy = Boolean(
        (docs.newsletterFileObj?.name && !docs.newsletterFileObj?.dataUrl) ||
        (docs.reportFileObj?.name && !docs.reportFileObj?.dataUrl) ||
        (docs.newsletterPhotoFiles?.some(file => file?.name && !file?.dataUrl)) ||
        (docs.eventPhotoFiles?.some(file => file?.name && !file?.dataUrl))
      );
      return {
        eventId: ev.id,
        event: ev.name,
        organizer: ev.createdBy,
        date: ev.date,
        newsletterFile: makeLink(docs.newsletterFileObj),
        reportFile: makeLink(docs.reportFileObj),
        newsletterPhotos: makePhotoLinks(docs.newsletterPhotoFiles),
        eventPhotos: makePhotoLinks(docs.eventPhotoFiles),
        submittedAt: ev.postEventDocs?.submittedAt ? new Date(ev.postEventDocs.submittedAt).toLocaleString() : "-",
        isLegacy
      };
    });

  const legacyCount = rows.filter(row => row.isLegacy).length;
  if (status) {
    if (legacyCount > 0) {
      status.textContent = `${legacyCount} submission(s) are legacy filename-only records. Ask the event creator to re-submit once to make files openable.`;
    } else {
      status.textContent = "All submitted files are openable.";
    }
  }

  const isReviewer = ["admin", "itAdmin"].includes(currentUser.role);

  table.innerHTML = `
    <tr>
      <th>Event</th><th>Organizer</th><th>Date</th><th>Newsletter File</th><th>Report File</th><th>Newsletter Photos</th><th>Event Photos</th><th>Submitted At</th><th>Action</th>
    </tr>
    ${rows.map(r => `
      <tr>
        <td>${r.event}</td>
        <td>${r.organizer}</td>
        <td>${r.date}</td>
        <td>${r.newsletterFile}</td>
        <td>${r.reportFile}</td>
        <td>${r.newsletterPhotos}</td>
        <td>${r.eventPhotos}</td>
        <td>${r.submittedAt}</td>
        <td>${isReviewer && r.isLegacy ? `<button class="soft-btn" data-notify-resubmit="${r.eventId}">Notify Creator</button>` : "-"}</td>
      </tr>
    `).join("") || `<tr><td colspan="9">No submissions yet.</td></tr>`}
  `;

  // One-click notify for HOD/Admin to ask event creator to re-submit legacy records.
  table.onclick = async (e) => {
    const btn = e.target.closest("button[data-notify-resubmit]");
    if (!btn || !isReviewer) return;

    const eventId = btn.dataset.notifyResubmit;
    const dbCurrent = await getDb();
    const event = dbCurrent.events.find(ev => ev.id === eventId);
    if (!event) {
      alert("Event not found.");
      return;
    }

    notify(
      dbCurrent,
      `Please re-submit post-event documents for ${event.name}. Current record is legacy and files cannot be opened by HOD/Admin.`,
      [],
      [event.createdBy]
    );
    await setDb(dbCurrent);
    await renderNotifications();
    await renderSubmittedDocsTable();
    alert(`Notification sent to ${event.createdBy}.`);
  };
}

function bindEventForm() {
  const form = document.getElementById("eventForm");
  if (!form) return;
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const db = await getDb();
    const data = new FormData(form);
    const status = ["admin", "itAdmin"].includes(currentUser.role) ? "Approved" : "Pending";
    db.events.unshift({
      id: crypto.randomUUID(),
      name: data.get("name"),
      eventType: data.get("eventType"),
      date: data.get("date"),
      venue: data.get("venue"),
      poster: readFileName(form.poster),
      venueProof: readFileName(form.venueProof),
      guestProof: readFileName(form.guestProof),
      status,
      createdBy: currentUser.username,
      postEventDocs: null,
      createdAt: new Date().toISOString()
    });
    notify(db, `Event submitted: ${data.get("name")}`, ["admin", "itAdmin"]);
    await setDb(db);
    form.reset();
    await renderEvents();
    await refreshSubjectSelectors();
    await renderNotifications();
  });
}

function canSubmitPostEvent(eventDateIso) {
  const eventDate = new Date(eventDateIso).getTime();
  const now = Date.now();
  const diffDays = (now - eventDate) / (1000 * 60 * 60 * 24);
  return diffDays <= 3;
}

async function renderEvents() {
  const db = await getDb();
  const eventsTable = document.getElementById("eventsTable");
  const myEventsTable = document.getElementById("myEventsTable");

  eventsTable.innerHTML = `
    <tr><th>Name</th><th>Type</th><th>Date</th><th>Organizer</th><th>Status</th><th>Action</th></tr>
    ${db.events.map(ev => `
      <tr>
        <td>${ev.name}</td>
        <td>${ev.eventType}</td>
        <td>${ev.date}</td>
        <td>${ev.createdBy}</td>
        <td>${ev.status}</td>
        <td>
          ${currentUser.role === "admin" || currentUser.role === "itAdmin"
            ? `<button class="soft-btn" data-approve="${ev.id}">Approve</button> <button class="soft-btn" data-reject="${ev.id}">Reject</button>`
            : "-"}
        </td>
      </tr>
    `).join("") || `<tr><td colspan="6">No events.</td></tr>`}
  `;

  const mine = db.events.filter(ev => ev.createdBy === currentUser.username);
  myEventsTable.innerHTML = `
    <tr><th>Name</th><th>Date</th><th>Status</th><th>Post Event Docs</th></tr>
    ${mine.map(ev => `
      <tr>
        <td>${ev.name}</td>
        <td>${ev.date}</td>
        <td>${ev.status}</td>
        <td>
          <button class="soft-btn" data-post-docs="${ev.id}" ${canSubmitPostEvent(ev.date) ? "" : "disabled"}>${ev.postEventDocs ? "Update Docs" : "Upload Docs"}</button>
        </td>
      </tr>
    `).join("") || `<tr><td colspan="4">No events created.</td></tr>`}
  `;

  eventsTable.onclick = async e => {
    const dbCurrent = await getDb();
    const approve = e.target.closest("button[data-approve]");
    const reject = e.target.closest("button[data-reject]");
    if (approve) {
      const event = dbCurrent.events.find(x => x.id === approve.dataset.approve);
      if (event) event.status = "Approved";
      notify(dbCurrent, `Event approved: ${event.name}`, [], [event.createdBy]);
      await setDb(dbCurrent);
      await renderEvents();
      await renderNotifications();
    }
    if (reject) {
      const event = dbCurrent.events.find(x => x.id === reject.dataset.reject);
      if (event) event.status = "Rejected";
      notify(dbCurrent, `Event rejected: ${event.name}`, [], [event.createdBy]);
      await setDb(dbCurrent);
      await renderEvents();
      await renderNotifications();
    }
  };

  myEventsTable.onclick = async e => {
    const post = e.target.closest("button[data-post-docs]");
    if (!post) return;
    const dbCurrent = await getDb();
    const event = dbCurrent.events.find(x => x.id === post.dataset.postDocs);
    if (!event) return;
    openPostEventForm(event);
  };

  await renderSubmittedDocsTable();
}

async function bindProfileForm() {
  const form = document.getElementById("profileForm");
  if (!form) return;

  const db = await getDb();
  const existing = db.profiles[currentUser.username] || {};
  form.name.value = existing.name || currentUser.name || "";
  form.dob.value = existing.dob || "";
  form.email.value = existing.email || "";
  form.phone.value = existing.phone || "";
  form.bloodGroup.value = existing.bloodGroup || "";
  if (existing.signatureDataUrl) {
    document.getElementById("signaturePreview").innerHTML = `<img src="${existing.signatureDataUrl}" alt="Signature">`;
  }

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const dbCurrent = await getDb();
    const reader = new FileReader();
    const file = form.signature.files[0];

    const saveProfile = async (signatureDataUrl = existing.signatureDataUrl || "") => {
      dbCurrent.profiles[currentUser.username] = {
        name: form.name.value.trim(),
        dob: form.dob.value,
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        bloodGroup: form.bloodGroup.value.trim(),
        signatureDataUrl
      };
      await setDb(dbCurrent);
      document.getElementById("signaturePreview").innerHTML = signatureDataUrl ? `<img src="${signatureDataUrl}" alt="Signature">` : "";
      alert("Profile saved.");
    };

    if (file) {
      reader.onload = () => saveProfile(reader.result);
      reader.readAsDataURL(file);
    } else {
      await saveProfile();
    }
  });
}

async function generateDocx(type) {
  const db = await getDb();
  const eventId = document.getElementById("docEventSelect").value;
  const event = db.events.find(ev => ev.id === eventId);
  if (!event) {
    alert("Select an event first.");
    return;
  }

  const profile = db.profiles[currentUser.username] || {};
  const signatureState = profile.signatureDataUrl ? "Teacher signature uploaded" : "Teacher signature missing";

  const postDocs = normalizePostEventDocs(event.postEventDocs);
  const notesText = type === "newsletter"
    ? (postDocs.newsletter || postDocs.newsletterFile || "Newsletter not submitted yet")
    : (postDocs.report || postDocs.reportFile || "Event report not submitted yet");
  const newsletterPhotosText = postDocs.newsletterPhotos?.length ? postDocs.newsletterPhotos.join(", ") : "No newsletter photos submitted";
  const photosText = postDocs.photos?.length ? postDocs.photos.join(", ") : "No event photos submitted";

  const doc = new window.docx.Document({
    sections: [{
      properties: {},
      children: [
        new window.docx.Paragraph({ text: type === "report" ? "Event Report" : "Department Newsletter", heading: window.docx.HeadingLevel.HEADING_1 }),
        new window.docx.Paragraph(`Event: ${event.name}`),
        new window.docx.Paragraph(`Type: ${event.eventType}`),
        new window.docx.Paragraph(`Date: ${event.date}`),
        new window.docx.Paragraph(`Venue: ${event.venue}`),
        new window.docx.Paragraph(`Organizer: ${event.createdBy}`),
        new window.docx.Paragraph(`Status: ${event.status}`),
        new window.docx.Paragraph(`Document Notes: ${notesText}`),
        new window.docx.Paragraph(`Newsletter Photos: ${newsletterPhotosText}`),
        new window.docx.Paragraph(`Event Photos: ${photosText}`),
        new window.docx.Paragraph(`Signature Check: ${signatureState}`),
        new window.docx.Paragraph("\n"),
        new window.docx.Paragraph("Teacher Signature: _________________________ (Bottom Left)"),
        new window.docx.Paragraph("HOD Signature: _____________________________ (Bottom Right)")
      ]
    }]
  });

  const blob = await window.docx.Packer.toBlob(doc);
  const fileName = `${type}_${event.name.replace(/\s+/g, "_")}.docx`;
  window.saveAs(blob, fileName);
  document.getElementById("docStatus").textContent = `${fileName} generated successfully.`;
}

function bindDocumentButtons() {
  const reportBtn = document.getElementById("generateReportBtn");
  const newsBtn = document.getElementById("generateNewsletterBtn");
  const eventSelect = document.getElementById("docEventSelect");
  if (!reportBtn || !newsBtn || !eventSelect) return;

  reportBtn.addEventListener("click", () => generateDocx("report"));
  newsBtn.addEventListener("click", () => generateDocx("newsletter"));

  eventSelect.addEventListener("change", async () => {
    const db = await getDb();
    const event = db.events.find(ev => ev.id === eventSelect.value);
    if (!event) {
      const form = document.getElementById("postEventForm");
      if (form) form.reset();
      document.getElementById("postEventId").value = "";
      document.getElementById("postEventName").value = "";
      return;
    }
    await openPostEventForm(event);
  });
}

async function renderNotifications() {
  const db = await getDb();
  const list = document.getElementById("notificationList");
  if (!list) return;

  const filtered = db.notifications.filter(userCanSeeNotification);
  list.innerHTML = filtered.map(note => {
    const read = note.readBy.includes(currentUser.username);
    return `<li style="opacity:${read ? 0.6 : 1}"><strong>${read ? "Read" : "New"}</strong> • ${note.message}<br><small>${formatDate(note.createdAt)}</small></li>`;
  }).join("") || "<li>No notifications yet.</li>";
}

function bindNotificationActions() {
  const btn = document.getElementById("markAllReadBtn");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    const db = await getDb();
    db.notifications.forEach(note => {
      if (userCanSeeNotification(note) && !note.readBy.includes(currentUser.username)) {
        note.readBy.push(currentUser.username);
      }
    });
    await setDb(db);
    await renderNotifications();
  });
}

async function aiGenerate() {
  const task = document.getElementById("aiTaskType").value;
  const prompt = document.getElementById("aiPrompt").value.trim();
  const db = await getDb();

  const subjectId = document.getElementById("analyticsSubjectSelect").value || getVisibleSubjects(db)[0]?.id;
  const subject = db.subjects.find(s => s.id === subjectId);
  const rows = subject ? (db.marks[subject.id] || []) : [];
  const cutoff = subject ? (db.cutoffs[subject.id] ?? 60) : 60;
  const riskCount = rows.filter(r => r.finalTotal < cutoff).length;

  let response = "";

  if (task === "lesson") {
    response = [
      `AI Teaching Plan for ${subject?.name || "selected subject"}`,
      "1. Start with a 10-minute concept recap and one real-world case.",
      "2. Run a diagnostic quiz based on CIA weak areas.",
      "3. Split class into 3 ability groups for differentiated tasks.",
      "4. End with exit-ticket questions and next-class micro-remediation."
    ].join("\n");
  } else if (task === "atRisk") {
    response = [
      `At-Risk Intervention Plan (${riskCount} students below cutoff ${cutoff})`,
      "1. Assign 2 remedial worksheets focused on CIA2 topics.",
      "2. Pair low scorers with peer mentors from top performers.",
      "3. Schedule 2 short doubt-clearing sessions this week.",
      "4. Re-test with mini CIA and track improvement trend."
    ].join("\n");
  } else if (task === "assignment") {
    response = [
      "AI Assignment Draft",
      "Title: Applied Problem Solving Set",
      "Description: Solve 5 practical scenarios and submit code + explanation PDF.",
      "Rubric: Correctness 40, Design 25, Documentation 20, Viva readiness 15.",
      "Differentiation: Advanced bonus for proactive students; guided template for reactive students."
    ].join("\n");
  } else if (task === "event") {
    response = [
      "AI Event Proposal",
      "Theme: Industry-Driven Coding Workshop",
      "Agenda: Keynote, hands-on lab, challenge sprint, reflection.",
      "Required docs checklist: poster, venue confirmation, guest confirmation.",
      "Post-event outputs: report summary, photos archive, newsletter brief."
    ].join("\n");
  } else {
    response = [
      "AI Custom Assistant",
      `You asked: ${prompt || "(no custom prompt entered)"}`,
      "Suggested next steps:",
      "1. Define objective and deadline.",
      "2. Identify target student cohort.",
      "3. Select assessment/assignment/event workflow.",
      "4. Trigger notifications and track completion."
    ].join("\n");
  }

  document.getElementById("aiOutput").textContent = response;
}

function bindAiAssistant() {
  const runBtn = document.getElementById("runAiBtn");
  if (!runBtn) return;
  runBtn.addEventListener("click", () => {
    aiGenerate();
  });
}

async function boot() {
  try {
    await loadSessionUser();
  } catch (_err) {
    window.location.href = "login.html";
    return;
  }

  initNav();
  await renderOverview();
  await refreshAdminSelectors();
  await renderTeacherTable();
  await renderStudentTable();
  bindAdminForms();

  await renderExamWindows();
  bindExamForm();

  await refreshSubjectSelectors();
  bindMarksSection();
  bindMarksPatternSection();
  await renderMarksPatternEditor();
  bindAnalyticsSelection();
  await renderAnalytics();

  function resetAsgnWizard() {
    asgnWizard = { step: 1, subjectId: "", mode: "ENTIRE_CLASS", perfType: "", selectedRegs: [], typeId: "", details: {}, dueDate: "" };
    goToAsgnStep(1);
    document.querySelectorAll(".asgn-mode-card").forEach((c, i) => c.classList.toggle("active", i === 0));
    document.querySelectorAll(".asgn-type-card").forEach(c => c.classList.remove("active"));
    document.querySelectorAll(".asgn-perf-card").forEach(c => c.classList.remove("active"));
    const sl = document.getElementById("asgnStudentList");
    const pc = document.getElementById("asgnPerformanceCards");
    if (sl) sl.style.display = "none";
    if (pc) pc.style.display = "none";
    const subSel = document.getElementById("assignmentSubjectSelect");
    if (subSel) subSel.value = "";
  }

  function goToAsgnStep(step) {
    asgnWizard.step = step;
    document.querySelectorAll(".asgn-step-body").forEach(b => b.classList.remove("active"));
    const body = document.getElementById(`asgnStep${step}`);
    if (body) body.classList.add("active");
    document.querySelectorAll(".asgn-step-dot").forEach(dot => {
      const s = Number(dot.dataset.s);
      dot.classList.toggle("active", s === step);
      dot.classList.toggle("done", s < step);
    });
    const back = document.getElementById("asgnBackBtn");
    const next = document.getElementById("asgnNextBtn");
    if (back) back.style.display = step === 1 ? "none" : "inline-block";
    if (next) next.textContent = step === 4 ? "🚀 Publish Assignment" : "Next Step →";
  }

  function updateAsgnStudentCounts(db) {
    const subject = db.subjects.find(s => s.id === asgnWizard.subjectId);
    if (!subject) return;
    const cutoff = db.cutoffs[asgnWizard.subjectId] ?? 60;
    const classStudents = db.students.filter(st => st.program === subject.program);
    const marksRows = db.marks[asgnWizard.subjectId] || [];
    const passRegs = new Set(marksRows.filter(r => r.finalTotal >= cutoff).map(r => r.regNo));
    const proactive = classStudents.filter(st => passRegs.has(st.regNo)).length;
    const reactive = classStudents.filter(st => !passRegs.has(st.regNo)).length;
    const pEl = document.getElementById("proactiveCount");
    const rEl = document.getElementById("reactiveCount");
    if (pEl) pEl.textContent = `High-performing students (≥${cutoff}%) — ${proactive} students`;
    if (rEl) rEl.textContent = `Students who need improvement (<${cutoff}%) — ${reactive} students`;
  }

  function buildTypeGrid() {
    const grid = document.getElementById("asgnTypeGrid");
    if (!grid || grid.children.length) return;
    grid.innerHTML = ASGN_TYPES.map(t =>
      `<div class="asgn-type-card" data-type="${t.id}"><span>${t.icon}</span><small>${t.label}</small></div>`
    ).join("");
    grid.addEventListener("click", e => {
      const card = e.target.closest(".asgn-type-card");
      if (!card) return;
      grid.querySelectorAll(".asgn-type-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      asgnWizard.typeId = card.dataset.type;
    });
  }

  function buildDetailsForm() {
    const container = document.getElementById("asgnDetailsFields");
    if (!container) return;
    const typeConfig = ASGN_TYPES.find(t => t.id === asgnWizard.typeId);
    const fields = ASGN_TYPE_FIELDS[asgnWizard.typeId] || [];
    let html = `
      <div>
        <label class="asgn-details-label">Assignment Title *</label>
        <input id="asgn_title" type="text" placeholder="Assignment title" value="${typeConfig ? typeConfig.label + ' Assignment' : ''}" style="width:100%">
      </div>
      <div>
        <label class="asgn-details-label">Due Date *</label>
        <input id="asgn_dueDate" type="date" style="width:100%">
      </div>`;
    fields.forEach(f => {
      const fid = `asgn_${f.name}`;
      if (f.type === "textarea") {
        html += `<div style="grid-column:1/-1"><label class="asgn-details-label">${f.label}</label><textarea id="${fid}" placeholder="${f.label}" style="width:100%;min-height:80px"></textarea></div>`;
      } else if (f.type === "select") {
        html += `<div><label class="asgn-details-label">${f.label}</label><select id="${fid}" style="width:100%">${f.options.map(o => `<option>${o}</option>`).join("")}</select></div>`;
      } else {
        html += `<div><label class="asgn-details-label">${f.label}</label><input id="${fid}" type="${f.type}" placeholder="${f.label}" style="width:100%"></div>`;
      }
    });
    container.innerHTML = html;
  }

  function collectDetailsFormValues() {
    const fields = ASGN_TYPE_FIELDS[asgnWizard.typeId] || [];
    asgnWizard.details.title = document.getElementById("asgn_title")?.value.trim() || "";
    asgnWizard.dueDate = document.getElementById("asgn_dueDate")?.value || "";
    const fieldVals = {};
    fields.forEach(f => {
      const el = document.getElementById(`asgn_${f.name}`);
      if (el) fieldVals[f.name] = el.value;
    });
    asgnWizard.details.fields = fieldVals;
  }

  function buildReview(db) {
    const subject = db.subjects.find(s => s.id === asgnWizard.subjectId);
    const typeConfig = ASGN_TYPES.find(t => t.id === asgnWizard.typeId);
    const reviewEl = document.getElementById("asgnReview");
    if (!reviewEl) return;
    const modeLabel = { ENTIRE_CLASS: "Entire Class", SPECIFIC_STUDENTS: `Selected Students (${asgnWizard.selectedRegs.length})`, PERFORMANCE_BASED: `By Performance — ${asgnWizard.perfType}` }[asgnWizard.mode] || "—";
    const items = [
      { label: "Assignment Title", value: asgnWizard.details.title || "—" },
      { label: "Class / Subject",  value: subject ? `${subject.name} (${subject.program})` : "—" },
      { label: "Assignment Type",  value: typeConfig ? `${typeConfig.icon} ${typeConfig.label}` : "—" },
      { label: "Target Students",  value: modeLabel },
      { label: "Due Date",         value: asgnWizard.dueDate || "—" }
    ];
    const fieldDefs = ASGN_TYPE_FIELDS[asgnWizard.typeId] || [];
    fieldDefs.forEach(f => {
      items.push({ label: f.label, value: asgnWizard.details.fields?.[f.name] || "—" });
    });
    reviewEl.innerHTML = items.map(item =>
      `<div class="asgn-review-item"><div class="review-label">${item.label}</div><div class="review-value">${item.value}</div></div>`
    ).join("");
  }

  function populateStudentCheckboxes(db) {
    const subject = db.subjects.find(s => s.id === asgnWizard.subjectId);
    const container = document.getElementById("asgnStudentCheckboxes");
    if (!container) return;
    if (!subject) { container.innerHTML = "<p>Select a class first.</p>"; return; }
    const students = db.students.filter(s => s.program === subject.program);
    container.innerHTML = students.length
      ? students.map(st => `<label class="asgn-checkbox-item"><input type="checkbox" class="asgn-student-chk" value="${st.regNo}"> <span>${st.regNo} — ${st.name}</span></label>`).join("")
      : "<p>No students found for this class.</p>";
  }

  async function publishAssignment() {
    const db = await getDb();
    const subject = db.subjects.find(s => s.id === asgnWizard.subjectId);
    if (!subject) { alert("No subject selected."); return; }
    const cutoff = db.cutoffs[asgnWizard.subjectId] ?? 60;
    const classStudents = db.students.filter(st => st.program === subject.program);
    const marksRows = db.marks[asgnWizard.subjectId] || [];
    let targetRegs = [];
    if (asgnWizard.mode === "ENTIRE_CLASS") {
      targetRegs = classStudents.map(s => s.regNo);
    } else if (asgnWizard.mode === "SPECIFIC_STUDENTS") {
      targetRegs = asgnWizard.selectedRegs;
    } else {
      const passRegs = new Set(marksRows.filter(r => r.finalTotal >= cutoff).map(r => r.regNo));
      targetRegs = asgnWizard.perfType === "PROACTIVE"
        ? classStudents.filter(s => passRegs.has(s.regNo)).map(s => s.regNo)
        : classStudents.filter(s => !passRegs.has(s.regNo)).map(s => s.regNo);
    }
    const typeConfig = ASGN_TYPES.find(t => t.id === asgnWizard.typeId);
    const id = crypto.randomUUID();
    const link = `${window.location.origin}${window.location.pathname.replace("dashboard.html","student-assignment.html")}?id=${id}`;
    db.assignments.unshift({
      id,
      assignmentType: asgnWizard.typeId,
      assignmentLabel: typeConfig?.label || asgnWizard.typeId,
      subjectId: asgnWizard.subjectId,
      mode: asgnWizard.mode,
      perfType: asgnWizard.perfType,
      title: asgnWizard.details.title,
      details: asgnWizard.details.fields || {},
      dueDate: asgnWizard.dueDate,
      createdBy: currentUser.username,
      targetRegs,
      link,
      submissions: [],
      createdAt: new Date().toISOString()
    });
    notify(db, `Assignment created: ${asgnWizard.details.title}`, ["teacher","classTeacher","admin","itAdmin"]);
    await setDb(db);
    await renderAssignments();
    await renderNotifications();
    resetAsgnWizard();
  }

  function initAssignmentWizard() {
    buildTypeGrid();
    document.querySelectorAll(".asgn-mode-card").forEach(card => {
      card.addEventListener("click", async () => {
        document.querySelectorAll(".asgn-mode-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        asgnWizard.mode = card.dataset.mode;
        const listEl = document.getElementById("asgnStudentList");
        const perfEl = document.getElementById("asgnPerformanceCards");
        if (asgnWizard.mode === "SPECIFIC_STUDENTS") {
          if (listEl) listEl.style.display = "block";
          if (perfEl) perfEl.style.display = "none";
          const db = await getDb();
          populateStudentCheckboxes(db);
        } else if (asgnWizard.mode === "PERFORMANCE_BASED") {
          if (listEl) listEl.style.display = "none";
          if (perfEl) perfEl.style.display = "block";
          const db = await getDb();
          updateAsgnStudentCounts(db);
        } else {
          if (listEl) listEl.style.display = "none";
          if (perfEl) perfEl.style.display = "none";
        }
      });
    });
    document.querySelectorAll(".asgn-perf-card").forEach(card => {
      card.addEventListener("click", () => {
        document.querySelectorAll(".asgn-perf-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        asgnWizard.perfType = card.dataset.perf;
      });
    });
    const subSel = document.getElementById("assignmentSubjectSelect");
    if (subSel) {
      subSel.addEventListener("change", async e => {
        asgnWizard.subjectId = e.target.value;
        const db = await getDb();
        if (asgnWizard.mode === "SPECIFIC_STUDENTS") populateStudentCheckboxes(db);
        if (asgnWizard.mode === "PERFORMANCE_BASED") updateAsgnStudentCounts(db);
      });
    }
    document.getElementById("asgnNextBtn").addEventListener("click", async () => {
      if (asgnWizard.step === 4) { await publishAssignment(); return; }
      if (asgnWizard.step === 1) {
        if (!asgnWizard.subjectId) { alert("Please select a class."); return; }
        if (asgnWizard.mode === "PERFORMANCE_BASED" && !asgnWizard.perfType) { alert("Please select Proactive or Reactive."); return; }
        if (asgnWizard.mode === "SPECIFIC_STUDENTS") {
          asgnWizard.selectedRegs = [...document.querySelectorAll(".asgn-student-chk:checked")].map(c => c.value);
          if (!asgnWizard.selectedRegs.length) { alert("Select at least one student."); return; }
        }
      }
      if (asgnWizard.step === 2) {
        if (!asgnWizard.typeId) { alert("Please select an assignment type."); return; }
        buildDetailsForm();
      }
      if (asgnWizard.step === 3) {
        const title = document.getElementById("asgn_title")?.value.trim();
        const dueDate = document.getElementById("asgn_dueDate")?.value;
        if (!title) { alert("Please enter an assignment title."); return; }
        if (!dueDate) { alert("Please select a due date."); return; }
        collectDetailsFormValues();
        const db = await getDb();
        buildReview(db);
      }
      goToAsgnStep(asgnWizard.step + 1);
    });
    document.getElementById("asgnBackBtn").addEventListener("click", () => goToAsgnStep(asgnWizard.step - 1));
  }

  initAssignmentWizard();
  await renderAssignments();

  bindEventForm();
  bindPostEventDocsForm();
  await renderEvents();

  await bindProfileForm();
  bindDocumentButtons();
  await renderSubmittedDocsTable();
  await renderNotifications();
  bindNotificationActions();
  bindAiAssistant();

  document.getElementById("logoutBtn").addEventListener("click", async () => {
    try {
      await api("/api/auth/logout", { method: "POST" });
    } catch (_err) {
      // ignore logout error
    }
    window.location.href = "login.html";
  });
}

boot();
