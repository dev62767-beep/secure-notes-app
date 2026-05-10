# 🔐 Secure Notes App

A full-stack MERN application with secure authentication, role-based access control, and notes management.

## 🚀 Features

* 🔐 JWT Authentication (Login/Register)
* 🍪 Cookie-based Authentication
* 📝 Create, Read, Update, Delete Notes
* 🔒 Protected Routes
* 👤 Role-Based Access Control (User/Admin)
* 🛡 Input Validation using Express Validator
* ⚡ Responsive UI with React + Tailwind CSS
* 📦 RESTful API Structure
* 🧩 Modular Backend Architecture

---

## 🛠 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication
* bcrypt
* express-validator

---

## 📂 Project Structure

```bash
project/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── services/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   └── src/
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/dev62767-beep/secure-notes-app.git

cd secure-notes-app
```

---

### 2. Backend Setup

```bash
cd backend

npm install

npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside backend folder:

```env
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## 🔐 API Routes

### Authentication

* `POST /api/v1/auth/register`
* `POST /api/v1/auth/login`

### Notes

* `GET /api/v1/notes`
* `POST /api/v1/notes`
* `PUT /api/v1/notes/:id`
* `DELETE /api/v1/notes/:id`

### Admin

* `GET /api/v1/admin/users`
* `GET /api/v1/admin/notes`

---

## 👨‍💻 Author

Developed by Devang Saxena

