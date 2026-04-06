# CS Department Academic Suite

Full-stack role-based academic operations platform for a Computer Science Department.

## Features

- Secure authentication with hashed passwords and server-side sessions
- Role-based access: IT Admin, Admin, Class Teacher, Teacher
- Academic setup: teachers, programs, classrooms, subjects
- Exam scheduling and mark transformation logic
- Analytics dashboards with Chart.js
- Assignment workflow with student submission page
- Event lifecycle, approvals, and post-event docs flow
- Document generation (DOCX)
- Notification center
- AI Teacher Assistant module

## Tech Stack

- Frontend: HTML, CSS, Vanilla JavaScript
- Backend: Node.js, Express
- Database: SQLite (better-sqlite3)
- Auth: bcryptjs + express-session

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start server:

```bash
npm start
```

3. Open:

```text
http://localhost:3000
```

## Operations

- Backup database:

```bash
npm run backup:db
```

- Restore database (provide backup path):

```bash
npm run restore:db -- ./data/backups/app-YYYY-MM-DDTHH-mm-ss-sssZ.db
```

Note: Stop the server before restore, then start it again after restore completes.

## Default Credentials

- IT Admin: `it_admin / itadmin123`
- HOD: `hod_rajesh / hod123456`
- Program Coordinator: `pc_priya / pc123456`
- Class Teacher: `ct_amit / ct123456`
- Teacher: `teacher_anil / teacher123456`

See `credentials.txt` for the full list.

## Notes

- Application data is persisted in `data/app.db`.
- Frontend and backend are served from the same project root.
- This is a deployable foundation; production hardening should include HTTPS, stronger secret management, and CSRF protection.
