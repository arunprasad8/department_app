const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dataDir = path.join(root, "data");
const dbPath = path.join(dataDir, "app.db");
const input = process.argv[2];

if (!input) {
  console.error("Usage: node scripts/restore-db.js <backup-file-path>");
  process.exit(1);
}

const sourcePath = path.resolve(input);
if (!fs.existsSync(sourcePath)) {
  console.error("Backup file not found:", sourcePath);
  process.exit(1);
}

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

try {
  if (fs.existsSync(dbPath)) {
    const preRestore = `${dbPath}.before-restore-${Date.now()}`;
    fs.copyFileSync(dbPath, preRestore);
    console.log("Current DB snapshot:", preRestore);
  }

  fs.copyFileSync(sourcePath, dbPath);

  const walPath = `${dbPath}-wal`;
  const shmPath = `${dbPath}-shm`;
  if (fs.existsSync(walPath)) fs.unlinkSync(walPath);
  if (fs.existsSync(shmPath)) fs.unlinkSync(shmPath);

  console.log("Restore complete from:", sourcePath);
  console.log("Restart the server if it is currently running.");
} catch (err) {
  console.error("Restore failed:", err.message);
  process.exit(1);
}
