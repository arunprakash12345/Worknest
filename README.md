# WorkNest

A task management platform for mentor-student cohorts. Mentors create batches, assign tasks, track progress. Students see what's due and get it done.

**[Live Demo](https://worknest-psi-nine.vercel.app/auth)** • **[Report Bug](https://github.com/arunprakash12345/Worknest/issues)**

![WorkNest Login](src/assets/loginWorknest.png)

![WorkNest Dashboard](src/assets/homeWorkNest.png)

---

## Why I Built This

Managing cohorts is chaotic. Assignments get lost in Slack, deadlines slip, feedback loops are slow. I wanted one place where mentors can assign work and students can track it — no noise, just clarity.

---

## Features

- **Role-based access** — Mentors and students see different dashboards
- **Batch management** — Create cohorts, add/remove members, track progress
- **Task workflow** — Create → Assign → Track → Complete with per-assignee status
- **Discussion threads** — Comments on each task for feedback
- **Calendar view** — Never miss a deadline
- **Analytics** — Charts showing completion rates, task distribution
- **Global search** — Find any batch or task instantly
- **Dark mode** — Because we code at night

---

## Tech Stack

| Frontend | Backend | Database |
|----------|---------|----------|
| React 19 | Express 5 | MongoDB |
| Redux Toolkit | JWT Auth | Mongoose |
| React Router v7 | RBAC Middleware | |
| Tailwind CSS | Node.js | |
| Recharts | | |

---

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

## API Endpoints

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

## What's Next

- [ ] Real-time notifications
- [ ] File attachments
- [ ] GitHub PR integration
- [ ] Email notifications on assignment

---

## Author

**Arun Prakash** — [LinkedIn](https://www.linkedin.com/in/arunprakashux/)

---

*Built to solve a real problem I faced while mentoring.*
