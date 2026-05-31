# WorkNest

> The collaboration platform where mentors and students get things done.

[Live Demo](#) · [Report Bug](../../issues) · [Request Feature](../../issues)

---

## The Problem

Managing cohort-based learning is messy. Mentors juggle dozens of students, deadlines fall through the cracks, and feedback gets lost in chat threads. Students have no single place to track what's assigned, what's due, and what needs review.

WorkNest fixes that.

---

## What It Does

WorkNest is a full-stack task management platform purpose-built for mentor–student cohorts. Mentors create structured batches, assign tasks with deadlines, and monitor progress at a glance. Students get a personal workspace that shows exactly what needs attention — no ambiguity, no lost assignments.

| For Mentors                        | For Students                          |
| ---------------------------------- | ------------------------------------- |
| Create & manage cohort batches     | Personal "My Tasks" workspace         |
| Assign tasks with deadlines        | Track progress across all assignments |
| Review submissions & give feedback | Participate in task discussions       |
| Monitor cohort analytics           | View calendar of upcoming deadlines   |
| Role-scoped resource access        | Submit GitHub, PR & Figma links       |

---

## Architecture

```
worknest/
├── client/                   # React frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── features/         # Redux slices (auth, tasks, batches)
│   │   ├── pages/            # Route-level views
│   │   └── hooks/            # Custom React hooks
├── server/                   # Express backend
│   ├── controllers/          # Route handlers
│   ├── middleware/            # Auth, RBAC, error handling
│   ├── models/               # Mongoose schemas
│   └── routes/               # API route definitions
└── README.md
```

---

## Tech Stack

**Frontend** — React 18, Redux Toolkit, React Router v6, Tailwind CSS, Recharts

**Backend** — Node.js, Express.js, JWT Authentication, Role-Based Access Control

**Database** — MongoDB Atlas, Mongoose ODM

---

## Key Features

**JWT Auth + RBAC** — Stateless authentication with role-scoped resource access. Mentors and students see only what they're authorized to see.

**Batch Management** — Mentors can spin up cohorts, add members, and manage the entire lifecycle of a batch from a single dashboard.

**Task Lifecycle** — Full task workflow: create → assign → submit → review → close. Supports GitHub PR links, Figma URLs, and inline feedback.

**Analytics Dashboard** — Recharts-powered visualizations for tracking cohort progress, submission rates, and individual performance.

**Task Calendar** — Interactive calendar view so students never miss a deadline.

**Dark / Light Theme** — System-aware theme with manual override. Persisted across sessions.

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas URI (or local MongoDB)

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/worknest.git
cd worknest

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### Environment Setup

Create a `.env` file in `/server`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

### Run Locally

```bash
# Start the backend (from /server)
npm run dev

# Start the frontend (from /client)
npm start
```

App runs at `http://localhost:3000` · API at `http://localhost:5000`

---

## API Overview

| Method  | Endpoint                  | Access  | Description          |
| ------- | ------------------------- | ------- | -------------------- |
| `POST`  | `/api/auth/register`      | Public  | Register a new user  |
| `POST`  | `/api/auth/login`         | Public  | Login & receive JWT  |
| `GET`   | `/api/batches`            | Mentor  | List all batches     |
| `POST`  | `/api/batches`            | Mentor  | Create a new batch   |
| `GET`   | `/api/tasks/my`           | Student | Get assigned tasks   |
| `POST`  | `/api/tasks`              | Mentor  | Create & assign task |
| `PATCH` | `/api/tasks/:id/submit`   | Student | Submit task          |
| `GET`   | `/api/analytics/:batchId` | Mentor  | Batch analytics      |

---

## Roadmap

- [x] JWT auth with RBAC
- [x] Batch & member management
- [x] Task creation, assignment & tracking
- [x] Task discussions with external links
- [x] Analytics dashboard
- [x] Dark/light theme
- [ ] Real-time notifications (WebSockets)
- [ ] File attachments on submissions
- [ ] Activity timeline per task
- [ ] GitHub integration (auto-fetch PR status)
- [ ] AI-powered progress insights
- [ ] Microsoft Teams / Slack notifications

---

## Contributing

Contributions are welcome. Please open an issue first to discuss what you'd like to change.

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Commit with conventional commits
git commit -m "feat: add real-time notifications"

# Open a pull request
```

---

## Author

**Arun Prakash** — Building scalable products that solve real problems.

- GitHub: [your-username](https://github.com/your-username)
- LinkedIn: [your-profile](https://linkedin.com/in/your-profile)

---

_Built with focus. Designed for learning teams._
