# MERN To-Do List App

A full-stack To-Do List application built with the **MERN stack** (MongoDB, Express, React, Node.js) and **JWT authentication**. Users can sign up, log in, and manage their personal tasks.

> Built as part of the Web Development Internship — Task 2

---

## Live Demo

**App URL:** _Add your Replit deployment link here after publishing_

---

## Features

- **User Authentication** — Sign up and log in with email and password
- **JWT-based Security** — Tokens stored in `localStorage` and sent with every API request
- **Password Hashing** — Passwords encrypted with `bcryptjs` before saving
- **Personal Tasks** — Each user only sees their own tasks (scoped by `userId`)
- **Add / Delete Tasks** — Clean, simple task management
- **MongoDB Atlas** — Cloud database for storing users and tasks
- **Responsive UI** — Works on mobile and desktop

---

## Tech Stack

### Frontend
- **React** + **TypeScript**
- **Vite** (build tool)
- **TanStack Query** (data fetching)
- **Wouter** (routing)
- **Tailwind CSS** + **shadcn/ui** (styling)
- **Framer Motion** (animations)

### Backend
- **Node.js** + **Express**
- **MongoDB Atlas** + **Mongoose**
- **JWT** (`jsonwebtoken`) for authentication
- **bcryptjs** for password hashing
- **Zod** for input validation

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create a new user account |
| POST | `/api/auth/login` | Log in and get JWT token |

### Tasks (Protected — requires JWT)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks for the logged-in user |
| POST | `/api/tasks` | Add a new task |
| DELETE | `/api/tasks/:id` | Delete a task |

All `/api/tasks` requests require an `Authorization: Bearer <token>` header.

---

## How It Works

1. **Sign up** → User registers with name, email, password (password is hashed)
2. **Log in** → Server verifies credentials and returns a JWT token
3. **Token saved** → Frontend stores token in `localStorage`
4. **Auto-attach** → Every API call automatically sends the token in headers
5. **Protected routes** → Backend middleware verifies the token before allowing access

---

## Environment Variables

Set these in your environment (Replit Secrets or `.env`):

```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
SESSION_SECRET=your_session_secret
```

---

## Project Structure

```
.
├── artifacts/
│   ├── api-server/         # Express backend
│   │   └── src/
│   │       ├── models/     # Mongoose schemas (User, Task)
│   │       ├── routes/     # auth.ts, tasks.ts
│   │       ├── middlewares/# JWT auth middleware
│   │       └── lib/        # MongoDB connection
│   └── todo-app/           # React frontend
│       └── src/
│           ├── pages/      # login, signup, home
│           └── App.tsx     # Routes + auth setup
└── lib/
    └── api-spec/           # OpenAPI contract
```

---

## Run Locally

```bash
# Install dependencies
pnpm install

# Start the backend
pnpm --filter @workspace/api-server run dev

# Start the frontend
pnpm --filter @workspace/todo-app run dev
```

---

## Author

**Aayush** — Web Development Internship Task 2
