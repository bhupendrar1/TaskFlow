# TaskFlow

### Full-Stack Task Management Application

TaskFlow is a full-stack task management application built with the **MERN stack**. It provides a simple and responsive interface for creating, viewing, updating, and deleting tasks while storing task data in MongoDB through a RESTful Node.js/Express backend.

> A portfolio-ready project demonstrating frontend development, REST API integration, MongoDB data management, and full-stack application architecture.

---

## ✨ Features

- Create new tasks
- View all existing tasks
- Mark tasks as completed or pending
- Update task details
- Delete tasks
- Persistent task storage with MongoDB
- RESTful API architecture
- Responsive user interface
- Toast notifications for user actions
- Clean separation between frontend and backend
- Environment-based configuration for database and server settings

---

## 🛠️ Tech Stack

### Frontend

- **React.js**
- **JavaScript (ES6+)**
- **Bootstrap 5**
- **React Icons**
- **React Toastify**
- **Fetch API / REST API integration**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **CORS**
- **dotenv**
- **Nodemon**

---

## 🏗️ Project Architecture

```text
TaskFlow/
│
├── backened/
│   ├── Controllers/
│   │   └── TaskController.js
│   ├── Models/
│   │   ├── TaskModel.js
│   │   └── db.js
│   ├── Routes/
│   │   └── TaskRouter.js
│   ├── index.js
│   ├── package.json
│   └── vercel.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

## 🔄 How It Works

```text
        ┌─────────────────────┐
        │      React UI       │
        │     Frontend        │
        └──────────┬──────────┘
                   │
                   │ HTTP / REST API
                   ▼
        ┌─────────────────────┐
        │   Express + Node.js │
        │      Backend        │
        └──────────┬──────────┘
                   │
                   │ Mongoose
                   ▼
        ┌─────────────────────┐
        │       MongoDB       │
        │   Task Persistence  │
        └─────────────────────┘
```

The React frontend communicates with the Express backend through REST endpoints. The backend handles task operations and uses Mongoose to store and retrieve task data from MongoDB.

---

## 📋 Task Data Model

Each task contains the following fields:

| Field | Type | Required | Description |
|---|---|---|---|
| `taskName` | String | Yes | Name/description of the task |
| `isDone` | Boolean | Yes | Completion status of the task |

---

## 🔌 API Endpoints

The backend exposes REST endpoints for task management.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/...` | Create a task |
| `GET` | `/api/...` | Fetch all tasks |
| `PUT` | `/api/.../:id` | Update a task |
| `DELETE` | `/api/.../:id` | Delete a task |

> The exact route prefix is defined in `backened/Routes/TaskRouter.js` and can be adjusted according to the deployment environment.

---

## 🚀 Getting Started

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

Create a `.env` file inside the `backened` folder and add your MongoDB connection string and server configuration.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

Then start the backend:

```bash
npm start
```

The backend uses Nodemon during development.

### 3. Setup the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

The React development server will start locally.

---

## 🔐 Environment Variables

Do not commit real credentials, database passwords, API keys, or other secrets to GitHub.

Recommended backend environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
PORT = ...
```

If your frontend uses a configurable backend URL, keep that value in a frontend environment file as well.

---

## 🧪 Available Scripts

### Backend

```bash
npm start
```

Starts the Node.js/Express server using Nodemon.

### Frontend

```bash
npm start
```

Runs the React application in development mode.

```bash
npm run build
```

Creates an optimized production build of the React application.

```bash
npm test
```

Runs the frontend test suite.

---

## 📌 Key Learning Outcomes

This project demonstrates practical experience with:

- Building a full-stack MERN application
- Designing and consuming REST APIs
- CRUD operations with MongoDB
- Mongoose schemas and database operations
- React component-based development
- Connecting frontend and backend applications
- Managing asynchronous API requests
- Handling application state and user interactions
- Responsive UI development with Bootstrap
- Environment variable configuration
- Organizing backend code using controllers, models, and routes

---

## 🔮 Future Improvements

Potential improvements for future versions include:

- User authentication and authorization
- User-specific task lists
- Task priorities and categories
- Due dates and reminders
- Search and filtering
- Pagination for large task lists
- Drag-and-drop task organization
- Dark mode
- Automated testing
- CI/CD pipeline

---

## 👨‍💻 Author

**Bhupendra Singh**

B.Tech Computer Science & Engineering | Full-Stack Developer

- GitHub: [@bhupendrar1](https://github.com/bhupendrar1)
- Repository: [TaskFlow](https://github.com/bhupendrar1/TaskFlow)

---

## 📄 License

This project is available for educational and portfolio purposes.

---

⭐ If you find this project useful, consider giving it a star!
