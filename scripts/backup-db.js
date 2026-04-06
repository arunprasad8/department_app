const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

const root = path.resolve(__dirname, "..");
const dataDir = path.join(root, "data");
const dbPath = path.join(dataDir, "app.db");
const backupDir = path.join(root, "data", "backups");

if (!fs.existsSync(dbPath)) {
  console.error("Database file not found:", dbPath);
  process.exit(1);
}

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const outFile = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(backupDir, `app-${timestamp}.db`);

const db = new Database(dbPath, { fileMustExist: true });

db.backup(outFile)
  .then(() => {
    db.close();
    console.log("Backup created:", outFile);
  })
  .catch((err) => {
    try { db.close(); } catch (_e) {}
    console.error("Backup failed:", err.message);
    process.exit(1);
  });
