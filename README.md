# WorkNest – Full-Stack Task Management Platform

WorkNest is a full-stack task management platform built with React, Node.js, Express, and MongoDB that streamlines task assignment, collaboration, and progress tracking through secure JWT-based authentication and role-based access control.

**[Live Demo](https://worknest-psi-nine.vercel.app/auth)** • **[Report Bug](https://github.com/arunprakash12345/Worknest/issues)**

## Login Screen
![WorkNest Login](src/assets/loginWorknest.png)

## Dashboard
![WorkNest Dashboard](src/assets/homeWorkNest.png)

---

## Why I Built This

Managing mentor-student cohorts often involves scattered communication, missed deadlines, and limited visibility into progress. WorkNest was built to centralize task assignment, collaboration, and progress tracking in a single application.

---

### Key Capabilities

- Secure JWT-based authentication
- Role-based dashboards for mentors and students
- Task assignment and progress tracking
- RESTful backend with MongoDB persistence
- Responsive UI built with React

  
## Features

- **Role-based access** — Mentors and students see different dashboards
- **Batch management** — Create cohorts, add/remove members, track progress
- **Task workflow** — Create → Assign → Track → Complete with per-assignee status
- **Discussion threads** — Comments on each task for feedback
- **Calendar view** — Never miss a deadline
- **Analytics** — Charts showing completion rates, task distribution
- **Global search** — Find any batch or task instantly
- **Dark mode** — Enhanced usability in low-light environments

## Highlights
✔ JWT Authentication
✔ Role-Based Access Control (RBAC)
✔ Protected Routes
✔ Responsive Design
✔ RESTful APIs
✔ Redux Toolkit State Management
✔ MongoDB Persistence


## Tech Stack

| Frontend | Backend | Database |
|----------|---------|----------|
| React 19 | Express 5 | MongoDB |
| Redux Toolkit | JWT Auth | Mongoose |
| React Router v7 | RBAC Middleware | |
| Tailwind CSS | Node.js | |
| Recharts | | |
| Deployment | Vercel, Render |

---
## Architecture

React Client
      │
      ▼
Express REST API
      │
      ▼
JWT Authentication
      │
      ▼
MongoDB Database

## Run Locally

```bash
# Clone
git clone https://github.com/arunprakash12345/Worknest.git
cd Worknest

# Install dependencies
npm install
cd backend && npm install

# Set up environment variables
# Root .env: VITE_API_URL=http://localhost:5000/api
# backend/.env: MONGO_URI, JWT_SECRET, PORT=5000

# Run
cd backend && npm start   # API on :5000
cd .. && npm run dev      # Frontend on :5173
```

---

## Project Structure

```
├── src/
│   ├── components/    # UI components
│   ├── pages/         # Route pages
│   ├── features/      # Redux slices
│   └── utils/         # API helpers
├── backend/
│   ├── controllers/   # Route handlers
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API endpoints
│   └── middleware/    # Auth, validation
```

---

## REST API Overview

```
POST   /api/auth/register     # Sign up
POST   /api/auth/login        # Sign in
GET    /api/batches           # List batches
POST   /api/batches           # Create batch
GET    /api/tasks?batch=:id   # Get batch tasks
POST   /api/tasks             # Create task
PUT    /api/tasks/:id/status  # Update status
GET    /api/tasks/my-tasks    # User's assigned tasks
```

---

## Challenges & Learnings

During this project I learned how to:

- Design secure authentication using JWT.
- Implement Role-Based Access Control (RBAC).
- Structure a scalable Express backend with modular routing.
- Manage complex client-side state using Redux Toolkit.
- Build and consume RESTful APIs between frontend and backend.

## What's Next

- [ ] Real-time notifications
- [ ] File attachments
- [ ] Activity timeline
- [ ] Audit logs
- [ ] Email notifications
- [ ] GitHub PR integration
      

---

## Connect

**Arun Prakash** — [LinkedIn](https://www.linkedin.com/in/arunprakashux/)

---
## License
This project is licensed under the MIT License.

*Built to explore scalable task management workflows, secure authentication, and collaborative project management using a modern full-stack architecture.*
