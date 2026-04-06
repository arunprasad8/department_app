const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const Database = require("better-sqlite3");

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === "production";
if (isProd && !process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is required in production.");
}
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(path.join(dataDir, "app.db"));

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS app_state (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  state_json TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
  sid TEXT PRIMARY KEY,
  expires_at INTEGER NOT NULL,
  data TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  username TEXT NOT NULL,
  role TEXT NOT NULL,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT,
  ip TEXT,
  details_json TEXT NOT NULL
);
`);

const insertAuditStmt = db.prepare(
  "INSERT INTO audit_logs (id, created_at, username, role, action, target_type, target_id, ip, details_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
);

class SQLiteSessionStore extends session.Store {
  constructor(database) {
    super();
    this.db = database;
    this.getStmt = this.db.prepare("SELECT data, expires_at FROM sessions WHERE sid = ?");
    this.setStmt = this.db.prepare("INSERT INTO sessions (sid, expires_at, data) VALUES (?, ?, ?) ON CONFLICT(sid) DO UPDATE SET expires_at=excluded.expires_at, data=excluded.data");
    this.destroyStmt = this.db.prepare("DELETE FROM sessions WHERE sid = ?");
    this.cleanupStmt = this.db.prepare("DELETE FROM sessions WHERE expires_at < ?");
    this.cleanupTimer = setInterval(() => {
      try {
        this.cleanupStmt.run(Date.now());
      } catch (_err) {
        // Ignore cleanup failures; next cycle will retry.
      }
    }, 10 * 60 * 1000);
    if (this.cleanupTimer.unref) this.cleanupTimer.unref();
  }

  get(sid, callback) {
    try {
      const row = this.getStmt.get(sid);
      if (!row) return process.nextTick(() => callback(null, null));
      if (row.expires_at <= Date.now()) {
        this.destroyStmt.run(sid);
        return process.nextTick(() => callback(null, null));
      }
      return process.nextTick(() => callback(null, JSON.parse(row.data)));
    } catch (err) {
      return process.nextTick(() => callback(err));
    }
  }

  set(sid, sess, callback) {
    try {
      const maxAge = Number(sess?.cookie?.maxAge || 0);
      const expiresAt = Date.now() + (Number.isFinite(maxAge) && maxAge > 0 ? maxAge : 12 * 60 * 60 * 1000);
      this.setStmt.run(sid, expiresAt, JSON.stringify(sess));
      return process.nextTick(() => callback && callback(null));
    } catch (err) {
      return process.nextTick(() => callback && callback(err));
    }
  }

  destroy(sid, callback) {
    try {
      this.destroyStmt.run(sid);
      return process.nextTick(() => callback && callback(null));
    } catch (err) {
      return process.nextTick(() => callback && callback(err));
    }
  }

  touch(sid, sess, callback) {
    return this.set(sid, sess, callback);
  }
}

const seededStudents = [
  { regNo: "BCA001", name: "Aarya N", program: "BCA" },
  { regNo: "BCA002", name: "Dhruv M", program: "BCA" },
  { regNo: "BCA003", name: "Ishita P", program: "BCA" },
  { regNo: "BSC001", name: "Nikhil R", program: "BSc CM" },
  { regNo: "BSC002", name: "Pooja K", program: "BSc CM" },
  { regNo: "MSC001", name: "Rahul S", program: "MSc Data Science" },
  { regNo: "MSC002", name: "Sara D", program: "MSc Data Science" }
];

function uid() {
  if (globalThis.crypto && crypto.randomUUID) return crypto.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function defaultState() {
  return {
    teachers: [
      { id: uid(), name: "HOD Rajesh", role: "HOD", username: "hod_rajesh" },
      { id: uid(), name: "PC Priya", role: "Program Coordinator", username: "pc_priya" },
      { id: uid(), name: "Dr. Anil Verma", role: "Teacher", username: "teacher_anil" },
      { id: uid(), name: "Prof. Suresh Nair", role: "Teacher", username: "teacher_suresh" },
      { id: uid(), name: "Dr. Meera Desai", role: "Teacher", username: "teacher_meera" },
      { id: uid(), name: "Mr. Ravi Patel", role: "Teacher", username: "teacher_ravi" },
      { id: uid(), name: "Ms. Anjali Sharma", role: "Teacher", username: "teacher_anjali" },
      { id: uid(), name: "Dr. Sameer Khan", role: "Teacher", username: "teacher_sameer" },
      { id: uid(), name: "IT Admin", role: "IT Admin", username: "it_admin" }
    ],
    programs: [
      { id: uid(), name: "BCA", courses: ["Sem 1", "Sem 2", "Sem 3"] },
      { id: uid(), name: "BSc CM", courses: ["Sem 1", "Sem 2", "Sem 3"] },
      { id: uid(), name: "MSc Data Science", courses: ["Sem 1", "Sem 2"] }
    ],
    classrooms: [{ id: uid(), name: "Lab A1", capacity: 60 }],
    subjects: [
      { id: uid(), name: "Data Structures", program: "BCA", subjectType: "FULL_CIA", teacherUsername: "teacher_anil" },
      { id: uid(), name: "Operating Systems", program: "BCA", subjectType: "END_SEM", teacherUsername: "teacher_ravi" },
      { id: uid(), name: "Python Programming", program: "BSc CM", subjectType: "FULL_CIA", teacherUsername: "teacher_meera" }
    ],
    examWindows: [
      { id: uid(), examType: "CIA", startDate: "2026-08-10", endDate: "2026-08-16", isFixed: false },
      { id: uid(), examType: "MID_SEM", startDate: "2026-09-12", endDate: "2026-09-12", isFixed: true },
      { id: uid(), examType: "END_SEM", startDate: "2026-11-20", endDate: "2026-11-20", isFixed: true }
    ],
    students: seededStudents,
    marks: {},
    cutoffs: {},
    assignments: [],
    events: [],
    notifications: [],
    profiles: {},
    docs: [],
    newsletterIncharge: "teacher_suresh",
    markWarnings: []
  };
}

function seedUsers() {
  const users = [
    { username: "it_admin", password: "itadmin123", role: "itAdmin", name: "IT Admin" },
    { username: "hod_rajesh", password: "hod123456", role: "admin", name: "HOD Rajesh" },
    { username: "pc_priya", password: "pc123456", role: "admin", name: "PC Priya" },
    { username: "ct_amit", password: "ct123456", role: "classTeacher", name: "Mr. Amit Kumar" },
    { username: "ct_neha", password: "ct123456", role: "classTeacher", name: "Mrs. Neha Singh" },
    { username: "ct_vikram", password: "ct123456", role: "classTeacher", name: "Dr. Vikram Gupta" },
    { username: "teacher_anil", password: "teacher123456", role: "teacher", name: "Dr. Anil Verma" },
    { username: "teacher_suresh", password: "teacher123456", role: "teacher", name: "Prof. Suresh Nair" },
    { username: "teacher_meera", password: "teacher123456", role: "teacher", name: "Dr. Meera Desai" },
    { username: "teacher_ravi", password: "teacher123456", role: "teacher", name: "Mr. Ravi Patel" },
    { username: "teacher_anjali", password: "teacher123456", role: "teacher", name: "Ms. Anjali Sharma" },
    { username: "teacher_sameer", password: "teacher123456", role: "teacher", name: "Dr. Sameer Khan" }
  ];

  const insert = db.prepare("INSERT INTO users (id, username, password_hash, role, name) VALUES (?, ?, ?, ?, ?)");
  const exists = db.prepare("SELECT 1 FROM users WHERE username = ?");

  users.forEach((user) => {
    if (!exists.get(user.username)) {
      insert.run(uid(), user.username, bcrypt.hashSync(user.password, 10), user.role, user.name);
    }
  });
}

function seedState() {
  const row = db.prepare("SELECT state_json FROM app_state WHERE id = 1").get();
  if (!row) {
    db.prepare("INSERT INTO app_state (id, state_json, updated_at) VALUES (1, ?, ?)")
      .run(JSON.stringify(defaultState()), new Date().toISOString());
  }
}

seedUsers();
seedState();

function loadState() {
  const row = db.prepare("SELECT state_json FROM app_state WHERE id = 1").get();
  return JSON.parse(row.state_json);
}

function saveState(state) {
  db.prepare("UPDATE app_state SET state_json = ?, updated_at = ? WHERE id = 1")
    .run(JSON.stringify(state), new Date().toISOString());
}

const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 8;
const PUBLIC_SUBMISSION_WINDOW_MS = 10 * 60 * 1000;
const PUBLIC_SUBMISSION_MAX_ATTEMPTS = 20;
const loginAttempts = new Map();
const publicSubmissionAttempts = new Map();

function cleanExpiredAttempts(store) {
  const now = Date.now();
  for (const [key, value] of store.entries()) {
    if (value.expiresAt <= now) store.delete(key);
  }
}

function registerAttempt(store, key, maxAttempts, windowMs) {
  cleanExpiredAttempts(store);
  const now = Date.now();
  const existing = store.get(key);
  if (!existing || existing.expiresAt <= now) {
    store.set(key, { count: 1, expiresAt: now + windowMs });
    return { blocked: false, remaining: maxAttempts - 1 };
  }
  existing.count += 1;
  if (existing.count > maxAttempts) {
    return { blocked: true, retryAfterSec: Math.ceil((existing.expiresAt - now) / 1000) };
  }
  return { blocked: false, remaining: Math.max(0, maxAttempts - existing.count) };
}

function clearAttempts(store, key) {
  store.delete(key);
}

function reqClientKey(req) {
  return req.ip || req.socket?.remoteAddress || "unknown";
}

function ensureCsrfToken(req) {
  if (!req.session.csrfToken) {
    req.session.csrfToken = crypto.randomBytes(24).toString("hex");
  }
  return req.session.csrfToken;
}

function safeString(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function safeSubmissionBody(body) {
  const studentName = safeString(body?.studentName, 120);
  const regNo = safeString(body?.regNo, 40);
  const fileName = safeString(body?.fileName, 200);
  if (!studentName || !regNo || !fileName) return null;
  return { studentName, regNo, fileName };
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function jsonEquals(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function canTeacherEditSubject(subject, user) {
  if (!subject || !user) return false;
  if (subject.teacherUsername === user.username) return true;
  if (Array.isArray(subject.lcaTeacherUsernames) && subject.lcaTeacherUsernames.includes(user.username)) return true;
  return false;
}

function requireRole(roles) {
  return (req, res, next) => {
    if (!req.session.user) return res.status(401).json({ error: "Unauthorized" });
    if (!roles.includes(req.session.user.role)) return res.status(403).json({ error: "Forbidden" });
    return next();
  };
}

function reqUser(req) {
  return req.session?.user || { username: "anonymous", role: "unknown" };
}

function writeAudit(req, action, targetType, targetId = null, details = {}) {
  const user = reqUser(req);
  insertAuditStmt.run(
    uid(),
    new Date().toISOString(),
    String(user.username || "unknown"),
    String(user.role || "unknown"),
    action,
    targetType,
    targetId,
    reqClientKey(req),
    JSON.stringify(details || {})
  );
}

const allowedSubjectTypes = new Set(["FULL_CIA", "END_SEM"]);

function normalizeSubjectServer(subject) {
  const normalized = { ...subject };
  if (!normalized.id) normalized.id = uid();
  normalized.name = safeString(normalized.name, 140);
  normalized.subjectCode = safeString(normalized.subjectCode, 40);
  normalized.program = safeString(normalized.program, 80);
  normalized.course = safeString(normalized.course, 60);
  normalized.classSection = safeString(normalized.classSection, 20).toUpperCase() || "A";
  normalized.subjectType = allowedSubjectTypes.has(normalized.subjectType) ? normalized.subjectType : "FULL_CIA";
  normalized.teacherUsername = safeString(normalized.teacherUsername, 64);
  normalized.isLca = Boolean(normalized.isLca);
  if (!Array.isArray(normalized.lcaTeacherUsernames)) normalized.lcaTeacherUsernames = [];
  normalized.lcaTeacherUsernames = normalized.lcaTeacherUsernames.map((u) => safeString(u, 64)).filter(Boolean).slice(0, 2);
  return normalized;
}

function validateSubjectPayload(subject) {
  if (!subject.name) return "Subject name is required";
  if (!subject.subjectCode) return "Subject code is required";
  if (!subject.program) return "Program is required";
  if (!subject.course) return "Course is required";
  if (!subject.classSection) return "Class section is required";
  if (!subject.teacherUsername) return "Teacher username is required";
  if (!allowedSubjectTypes.has(subject.subjectType)) return "Invalid subject type";
  if (subject.isLca && (!Array.isArray(subject.lcaTeacherUsernames) || subject.lcaTeacherUsernames.length !== 2)) {
    return "LCA subjects must have exactly 2 in-charge teachers";
  }
  return null;
}

function sanitizeStateForUser(currentState, requestedState, user) {
  const role = user?.role;
  if (["itAdmin", "admin"].includes(role)) {
    return requestedState;
  }

  const sanitized = cloneJson(currentState);
  const teacherWritableKeys = [
    "marks",
    "cutoffs",
    "assignments",
    "events",
    "notifications",
    "profiles",
    "docs",
    "markWarnings"
  ];
  const classTeacherExtraKeys = ["students", "classrooms"];
  const writableKeys = role === "classTeacher"
    ? [...teacherWritableKeys, ...classTeacherExtraKeys]
    : teacherWritableKeys;

  writableKeys.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(requestedState, key)) {
      sanitized[key] = requestedState[key];
    }
  });

  if (Array.isArray(currentState.subjects) && Array.isArray(requestedState.subjects)) {
    const requestedById = new Map(requestedState.subjects.map((subject) => [subject.id, subject]));
    sanitized.subjects = currentState.subjects.map((currentSubject) => {
      const nextSubject = requestedById.get(currentSubject.id);
      if (!nextSubject) return currentSubject;
      if (!canTeacherEditSubject(currentSubject, user)) return currentSubject;
      const merged = { ...currentSubject };
      if (nextSubject.marksPattern && typeof nextSubject.marksPattern === "object") {
        merged.marksPattern = nextSubject.marksPattern;
      }
      return merged;
    });
  }

  return sanitized;
}

app.use(express.json({ limit: "5mb" }));
app.set("trust proxy", 1);
const sessionStore = new SQLiteSessionStore(db);
app.use(session({
  name: "csdept.sid",
  store: sessionStore,
  secret: process.env.SESSION_SECRET || "cs_dept_suite_secret_change_in_prod",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    maxAge: 1000 * 60 * 60 * 12
  }
}));

app.use("/api", (req, res, next) => {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();
  if (req.path === "/auth/login") return next();
  if (req.path.startsWith("/public/")) return next();
  if (!req.session.user) return next();

  const token = req.get("x-csrf-token");
  if (!token || token !== req.session.csrfToken) {
    return res.status(403).json({ error: "Invalid or missing CSRF token" });
  }
  return next();
});

function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body || {};
  const normalizedUsername = safeString(username, 64);
  const normalizedPassword = typeof password === "string" ? password : "";
  if (!normalizedUsername || !normalizedPassword) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const loginKey = `${reqClientKey(req)}:${normalizedUsername.toLowerCase()}`;
  const loginAttempt = registerAttempt(loginAttempts, loginKey, LOGIN_MAX_ATTEMPTS, LOGIN_WINDOW_MS);
  if (loginAttempt.blocked) {
    return res.status(429).json({ error: "Too many login attempts. Try again later.", retryAfterSec: loginAttempt.retryAfterSec });
  }

  const user = db.prepare("SELECT id, username, password_hash, role, name FROM users WHERE username = ?").get(normalizedUsername);
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const ok = bcrypt.compareSync(normalizedPassword, user.password_hash);
  if (!ok) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  clearAttempts(loginAttempts, loginKey);

  req.session.regenerate((regenErr) => {
    if (regenErr) {
      return res.status(500).json({ error: "Unable to create session" });
    }

    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role,
      name: user.name
    };
    const csrfToken = ensureCsrfToken(req);

    return res.json({ user: req.session.user, csrfToken });
  });
});

app.post("/api/auth/logout", requireAuth, (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

app.get("/api/auth/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const csrfToken = ensureCsrfToken(req);
  res.json({ user: req.session.user, csrfToken });
});

app.get("/api/state", requireAuth, (req, res) => {
  const row = db.prepare("SELECT state_json, updated_at FROM app_state WHERE id = 1").get();
  res.json({ state: JSON.parse(row.state_json), updatedAt: row.updated_at });
});

app.get("/api/subjects", requireAuth, (req, res) => {
  const state = loadState();
  const user = reqUser(req);
  const subjects = ["itAdmin", "admin"].includes(user.role)
    ? state.subjects
    : (state.subjects || []).filter((s) => canTeacherEditSubject(s, user));
  res.json({ subjects });
});

app.post("/api/subjects", requireAuth, requireRole(["itAdmin", "admin"]), (req, res) => {
  const state = loadState();
  const incoming = normalizeSubjectServer(req.body || {});
  const validationError = validateSubjectPayload(incoming);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  if ((state.subjects || []).some((s) =>
    (s.subjectCode || "").toLowerCase() === incoming.subjectCode.toLowerCase()
    && (s.program || "") === incoming.program
    && (s.course || "") === incoming.course
    && ((s.classSection || "A").toUpperCase() === incoming.classSection)
  )) {
    return res.status(409).json({ error: "Subject code already exists for the same program, course, and section" });
  }

  state.subjects = state.subjects || [];
  state.subjects.push(incoming);
  saveState(state);
  writeAudit(req, "CREATE_SUBJECT", "subject", incoming.id, {
    subjectCode: incoming.subjectCode,
    subjectType: incoming.subjectType,
    program: incoming.program,
    course: incoming.course,
    classSection: incoming.classSection
  });
  return res.status(201).json({ subject: incoming });
});

app.put("/api/subjects/:id/marks-pattern", requireAuth, (req, res) => {
  const state = loadState();
  const user = reqUser(req);
  const subject = (state.subjects || []).find((s) => s.id === req.params.id);
  if (!subject) return res.status(404).json({ error: "Subject not found" });

  const canEdit = ["itAdmin", "admin"].includes(user.role) || canTeacherEditSubject(subject, user);
  if (!canEdit) return res.status(403).json({ error: "Forbidden" });

  const marksPattern = req.body?.marksPattern;
  if (!marksPattern || !Array.isArray(marksPattern.exams) || !marksPattern.exams.length) {
    return res.status(400).json({ error: "Invalid marksPattern payload" });
  }

  const normalizedExams = marksPattern.exams.map((exam) => ({
    id: safeString(exam.id, 64) || uid(),
    examType: safeString(exam.examType, 30),
    maxMarks: Number(exam.maxMarks || 0),
    scaleTo: Number(exam.scaleTo || 0)
  }));
  if (normalizedExams.some((e) => !e.examType || e.maxMarks <= 0 || e.scaleTo < 0)) {
    return res.status(400).json({ error: "Each exam must include examType, maxMarks > 0 and scaleTo >= 0" });
  }

  subject.marksPattern = { exams: normalizedExams };
  saveState(state);
  writeAudit(req, "UPDATE_MARKS_PATTERN", "subject", subject.id, {
    exams: normalizedExams.map((e) => ({ examType: e.examType, maxMarks: e.maxMarks, scaleTo: e.scaleTo }))
  });
  return res.json({ ok: true, marksPattern: subject.marksPattern });
});

app.get("/api/marks/:subjectId", requireAuth, (req, res) => {
  const state = loadState();
  const user = reqUser(req);
  const subject = (state.subjects || []).find((s) => s.id === req.params.subjectId);
  if (!subject) return res.status(404).json({ error: "Subject not found" });

  const canView = ["itAdmin", "admin"].includes(user.role) || canTeacherEditSubject(subject, user);
  if (!canView) return res.status(403).json({ error: "Forbidden" });

  const marksBySubject = state.marks?.[subject.id] || {};
  return res.json({ subjectId: subject.id, marks: marksBySubject });
});

app.put("/api/marks/:subjectId", requireAuth, (req, res) => {
  const state = loadState();
  const user = reqUser(req);
  const subject = (state.subjects || []).find((s) => s.id === req.params.subjectId);
  if (!subject) return res.status(404).json({ error: "Subject not found" });

  const canEdit = ["itAdmin", "admin"].includes(user.role) || canTeacherEditSubject(subject, user);
  if (!canEdit) return res.status(403).json({ error: "Forbidden" });

  const marks = req.body?.marks;
  if (!marks || typeof marks !== "object") {
    return res.status(400).json({ error: "Invalid marks payload" });
  }

  state.marks = state.marks || {};
  state.marks[subject.id] = marks;
  saveState(state);
  writeAudit(req, "UPDATE_MARKS", "subject", subject.id, { rows: Object.keys(marks).length });
  return res.json({ ok: true });
});

app.get("/api/audit-logs", requireAuth, requireRole(["itAdmin", "admin"]), (req, res) => {
  const limit = Math.min(Math.max(Number(req.query.limit || 100), 1), 500);
  const rows = db.prepare(
    "SELECT id, created_at, username, role, action, target_type, target_id, ip, details_json FROM audit_logs ORDER BY created_at DESC LIMIT ?"
  ).all(limit);
  const logs = rows.map((row) => ({
    id: row.id,
    createdAt: row.created_at,
    username: row.username,
    role: row.role,
    action: row.action,
    targetType: row.target_type,
    targetId: row.target_id,
    ip: row.ip,
    details: JSON.parse(row.details_json || "{}")
  }));
  res.json({ logs });
});

app.put("/api/state", requireAuth, (req, res) => {
  const { state, expectedUpdatedAt } = req.body || {};
  if (!state || typeof state !== "object") {
    return res.status(400).json({ error: "Invalid state payload" });
  }

  const row = db.prepare("SELECT state_json, updated_at FROM app_state WHERE id = 1").get();
  if (expectedUpdatedAt && expectedUpdatedAt !== row.updated_at) {
    return res.status(409).json({ error: "State is outdated. Please reload latest data.", updatedAt: row.updated_at });
  }

  const currentState = JSON.parse(row.state_json);
  const sanitized = sanitizeStateForUser(currentState, state, req.session.user);
  if (!["itAdmin", "admin"].includes(req.session.user.role) && !jsonEquals(sanitized, state)) {
    return res.status(403).json({ error: "You are not allowed to modify one or more requested fields." });
  }

  const now = new Date().toISOString();
  db.prepare("UPDATE app_state SET state_json = ?, updated_at = ? WHERE id = 1")
    .run(JSON.stringify(sanitized), now);

  writeAudit(req, "UPDATE_STATE", "app_state", "1", {
    topLevelKeys: Object.keys(state || {})
  });

  res.json({ ok: true, updatedAt: now });
});

app.get("/api/public/assignment/:id", (req, res) => {
  const state = loadState();
  const assignment = (state.assignments || []).find((a) => a.id === req.params.id);
  if (!assignment) {
    return res.status(404).json({ error: "Assignment not found" });
  }

  res.json({
    assignment: {
      id: assignment.id,
      title: assignment.title,
      description: assignment.description,
      dueDate: assignment.dueDate,
      assignmentType: assignment.assignmentType
    }
  });
});

app.post("/api/public/assignment/:id/submission", (req, res) => {
  const rateKey = `submission:${reqClientKey(req)}:${req.params.id}`;
  const rateAttempt = registerAttempt(publicSubmissionAttempts, rateKey, PUBLIC_SUBMISSION_MAX_ATTEMPTS, PUBLIC_SUBMISSION_WINDOW_MS);
  if (rateAttempt.blocked) {
    return res.status(429).json({ error: "Too many submissions. Try again later.", retryAfterSec: rateAttempt.retryAfterSec });
  }

  const payload = safeSubmissionBody(req.body || {});
  if (!payload) {
    return res.status(400).json({ error: "studentName, regNo and fileName are required" });
  }

  const state = loadState();
  const assignment = (state.assignments || []).find((a) => a.id === req.params.id);
  if (!assignment) {
    return res.status(404).json({ error: "Assignment not found" });
  }

  assignment.submissions = assignment.submissions || [];
  assignment.submissions.push({
    studentName: payload.studentName,
    regNo: payload.regNo,
    fileName: payload.fileName,
    submittedAt: new Date().toISOString()
  });

  saveState(state);
  writeAudit(req, "PUBLIC_ASSIGNMENT_SUBMISSION", "assignment", assignment.id, {
    regNo: payload.regNo,
    studentName: payload.studentName
  });
  res.json({ ok: true });
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "cs-dept-academic-suite", time: new Date().toISOString() });
});

app.use(express.static(__dirname));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.listen(PORT, () => {
  console.log(`CS Dept Academic Suite running on http://localhost:${PORT}`);
});
