# 🚀 TaskFlow — Full-Stack Task Management Platform

TaskFlow is a full-stack task management application built with the **MERN stack**. It provides a simple and responsive interface for creating, managing, updating, completing, searching, and deleting tasks.

The project demonstrates how a React frontend communicates with a Node.js/Express REST API backed by MongoDB and Mongoose.

## ✨ Features

- ➕ Create new tasks
- 📋 View all tasks
- ✏️ Update existing tasks
- ✅ Mark tasks as completed
- 🗑️ Delete tasks
- 🔍 Search tasks
- 🔔 Toast notifications for user actions
- 📱 Responsive frontend interface
- 🌐 RESTful backend API
- ☁️ Deployment-ready backend configuration

## 🛠️ Tech Stack

### Frontend

- **React.js** — UI development
- **Bootstrap 5** — responsive styling
- **React Icons** — interface icons
- **React Toastify** — notifications

### Backend

- **Node.js** — server-side runtime
- **Express.js** — REST API framework
- **MongoDB** — database
- **Mongoose** — MongoDB object modeling
- **CORS** — cross-origin requests
- **dotenv** — environment configuration

## 📁 Project Structure

```text
TaskFlow/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backened/
│   ├── Controllers/
│   ├── Models/
│   ├── Routes/
│   ├── index.js
│   ├── package.json
│   └── vercel.json
│
├── .gitignore
└── README.md
```

## 🔌 REST API

The backend exposes the following task endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/tasks` | Fetch all tasks |
| `POST` | `/tasks` | Create a new task |
| `PUT` | `/tasks/:id` | Update a task |
| `DELETE` | `/tasks/:id` | Delete a task |

## ⚙️ Getting Started

Follow these steps to run TaskFlow locally.

### 1. Clone the repository

```bash
git clone https://github.com/bhupendrar1/TaskFlow.git
cd TaskFlow
```

### 2. Setup the backend

```bash
cd backened
npm install
```

Create a `.env` file inside the `backened` folder:

```env
PORT=8080
DB_URL=your_mongodb_connection_string
```

Start the backend:

```bash
npm start
```

The backend will run on `http://localhost:8080`.

### 3. Setup the frontend

Open a new terminal from the project root:

```bash
cd frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000`.

## 🔐 Environment Variables

Do not commit real credentials or database connection strings to GitHub.

Backend `.env` example:

```env
PORT=8080
DB_URL=your_mongodb_connection_string
```

If the frontend uses an environment variable for the backend API URL, configure it according to the frontend configuration before running the application.

## 🌐 Deployment

TaskFlow is structured as separate frontend and backend applications, making it suitable for deployment using platforms such as **Vercel** or **Netlify**.

For production deployment:

1. Deploy the backend API.
2. Configure the production MongoDB connection string.
3. Deploy the React frontend.
4. Update the frontend API URL to point to the deployed backend.
5. Configure environment variables in the deployment platform.

## 🧠 What This Project Demonstrates

- Building a full-stack application using the MERN architecture
- Designing and consuming REST APIs
- CRUD operations with MongoDB and Mongoose
- Connecting a React frontend with an Express backend
- Managing environment variables securely
- Structuring backend code using routes, controllers, and models
- Handling frontend API interactions and user notifications

## 🔮 Future Enhancements

- 🔐 User authentication and authorization with JWT
- 👥 User-specific task management
- 🎯 Task priorities and categories
- 📅 Due dates and reminders
- 📊 Productivity dashboard and task analytics
- 🌙 Dark mode
- 🔎 Advanced filtering and sorting

## 👨‍💻 Author

**Bhupendra Singh**  
MERN / Full-Stack Developer

- GitHub: [@bhupendrar1](https://github.com/bhupendrar1)

---

⭐ If you find TaskFlow useful, consider giving the repository a star!
