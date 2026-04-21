# 🚀 MERN Task Tracker

<p align="center">
  <b>Full-Stack Task Management App with Secure Authentication 🔐</b><br/>
  Built using MERN Stack + JWT + Modern UI
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Database-MongoDB-darkgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge" />
</p>

---

## 🌐 Live Demo

🔗 https://mern-task-tracker--friendly89018.replit.app

---

## 🎥 Demo Preview

👉 Add your screen recording here (use Loom / ScreenRec)

```id="eaf0ep"
![Demo](your-demo-gif-link)
```

---

## 📸 Screenshots

### 🔐 Login Page

```id="8ym0q8"
![Login](your-login-screenshot)
```

### 📝 Dashboard

```id="mb1fhq"
![Dashboard](your-dashboard-screenshot)
```

### ➕ Add Task

```id="r3qtcy"
![Add Task](your-add-task-screenshot)
```

---

## ✨ Features

* 🔐 Secure Authentication (Signup/Login)
* 🛡️ JWT Protected Routes
* 🔑 Password Hashing (bcrypt)
* 👤 User-specific Tasks
* ➕ Add Tasks
* ❌ Delete Tasks
* ⚡ Fast API with Express
* ☁️ MongoDB Atlas Integration
* 📱 Fully Responsive UI

---

## 🧰 Tech Stack

### ⚛️ Frontend

* React + TypeScript
* Vite
* TanStack Query
* Wouter
* Tailwind CSS + shadcn/ui
* Framer Motion

### 🟢 Backend

* Node.js + Express
* MongoDB Atlas + Mongoose
* JWT Authentication
* bcryptjs
* Zod Validation

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| POST   | /api/auth/signup | Register user     |
| POST   | /api/auth/login  | Login & get token |

---

### 📋 Tasks (Protected)

| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| GET    | /api/tasks     | Get user tasks |
| POST   | /api/tasks     | Add new task   |
| DELETE | /api/tasks/:id | Delete task    |

📌 Requires:
Authorization → `Bearer <token>`

---

## ⚙️ Environment Variables

```id="5ptnn2"
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
SESSION_SECRET=your_session_secret
```

---

## 📁 Project Structure

```id="pdwz0j"
artifacts/
 ├── api-server/
 └── todo-app/

lib/
 └── api-spec/
```

---

## ▶️ Run Locally

```bash id="wrdt4o"
pnpm install
pnpm --filter @workspace/api-server run dev
pnpm --filter @workspace/todo-app run dev
```

---

## 🧠 What I Learned

* Full-stack architecture (Frontend ↔ Backend ↔ DB)
* Authentication using JWT
* Secure password handling
* API integration with React
* State management with TanStack Query

---

## 👨‍💻 Author

**Aayush**
🎓 Web Development Internship – Task 2

---

## ⭐ Support

If you found this project helpful:
👉 Give it a ⭐ on GitHub
👉 Share with others

---
