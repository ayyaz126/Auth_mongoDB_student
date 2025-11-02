#  Node.js Authentication System (Express + MongoDB)

A secure and scalable authentication & authorization system built with **Node.js**, **Express**, and **MongoDB**, supporting **JWT access/refresh tokens**, **role-based access control**, and **HTTP-only cookies**.

---

##  Features
- User Registration & Login
- Secure Password Hashing (bcrypt)
- JWT Authentication (Access + Refresh Tokens)
- Role-Based Authorization (User/Admin)
- Protected Routes
- Cookie-Based Token Storage
- Zod Validation Support (optional)
- Modular & Scalable Folder Structure

---

##  Tech Stack
- **Node.js + Express**
- **MongoDB (Mongoose)**
- **JWT**
- **bcrypt**
- **cookie-parser**
- **dotenv**
- **morgan**
- **nodemon**

---

##  Installation

### 1️ Clone the repository
```bash
git clone <your-repo-link>
cd auth-system
auth-system/
├── .env
├── .gitignore
├── package.json
│
├── src/
│   ├── app.js                # Express app setup (middlewares + routes mount)
│   ├── server.js             # Entry point (connect DB + app.listen)
│
│   ├── config/               # All configuration files
│   │   ├── db.js             # MongoDB connection setup
│   │   └── env.js            # Load and export environment variables
│
│   ├── modules/              # Feature-based modules
│   │   └── auth/             # Authentication module
│   │       ├── controllers/
│   │       │   ├── register.controller.js
│   │       │   ├── login.controller.js
│   │       │   ├── logout.controller.js
│   │       │   ├── refreshToken.controller.js
│   │       │   └── protected.controller.js
│   │       │
│   │       ├── routes/
│   │       │   └── auth.routes.js
│   │       │
│   │       ├── services/
│   │       │   └── auth.service.js
│   │       │
│   │       ├── models/
│   │       │   └── user.model.js
│   │       │
│   │       └── dto/
│   │           └── auth.zod.js
│
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   ├── error.middleware.js
│   │   └── asyncHandler.js
│
│   ├── utils/
│   │   ├── jwt.js
│   │   ├── bcrypt.js
│   │   └── constants.js
│
│   └── tests/
│       └── auth.test.js
│
└── README.md
