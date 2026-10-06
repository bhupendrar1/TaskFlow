# TaskFlow

### Full-Stack Task Management Application

TaskFlow is a full-stack task management application built with **React, Vite, Node.js, Express.js, and MongoDB**. It provides a modern productivity dashboard for creating, searching, filtering, updating, completing, and deleting tasks.

The frontend communicates with a REST API built with Express.js, while MongoDB stores task data through Mongoose.

---

## ✨ Features

### Task Management
- Create new tasks
- Edit existing tasks
- Mark tasks as completed or pending
- Delete tasks
- View all tasks

### Productivity Dashboard
- Total task count
- Pending task count
- Completed task count
- Completion percentage with progress bar

### Search & Filtering
- Search tasks by name
- Filter by:
  - All
  - Pending
  - Completed

### User Experience
- Dark / Light mode
- Theme preference saved in localStorage
- Toast notifications
- Loading state while fetching tasks
- Responsive interface
- Keyboard support:
  - **Enter** → Add/Save task
  - **Escape** → Cancel editing

---

## 🛠️ Tech Stack

### Frontend

- **React 19**
- **Vite**
- **JavaScript (ES6+)**
- **Bootstrap 5**
- **React Icons**
- **React Toastify**
- **Fetch API**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **CORS**
- **dotenv**
- **Nodemon**

---

## 📁 Project Structure

The repository is organized into separate frontend and backend applications:

```text
TaskFlow/
│
├── backened/
│   ├── Controllers/
│   │   └── TaskController.js
│   │
│   ├── Models/
│   │   ├── TaskModel.js
│   │   └── db.js
│   │
│   ├── Routes/
│   │   └── TaskRouter.js
│   │
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   └── vercel.json
│
├── frontend/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   │
│   ├── src/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── TaskManager.jsx
│   │   ├── api.js
│   │   ├── index.css
│   │   ├── logo.svg
│   │   ├── main.jsx
│   │   └── utils.js
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

> **Note:** `node_modules` folders are generated dependencies and should not normally be committed to GitHub.

---

## 🧩 Backend Architecture

The backend follows a simple **Routes → Controllers → Models → MongoDB** structure.

### Controllers

`backened/Controllers/TaskController.js`

Contains the business logic for:

- Creating tasks
- Fetching tasks
- Updating tasks
- Deleting tasks

### Models

`backened/Models/TaskModel.js`

Defines the MongoDB/Mongoose task schema:

| Field | Type | Required | Description |
|---|---|---|---|
| `taskName` | String | Yes | Name or description of the task |
| `isDone` | Boolean | Yes | Whether the task is completed |

### Database

`backened/Models/db.js`

Connects the Express application to MongoDB using the `DB_URL` environment variable.

### Routes

`backened/Routes/TaskRouter.js`

Defines the REST API endpoints for task operations.

---

## 🔌 REST API

The backend mounts the task router at:

```text
/tasks
```

### Available Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/tasks` | Fetch all tasks |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

### Example Task Object

```json
{
  "taskName": "Complete project documentation",
  "isDone": false
}
```

---

## ⚙️ Frontend Architecture

### `App.jsx`

The main React component that renders the TaskFlow application.

### `TaskManager.jsx`

The main application component responsible for:

- Task state management
- API operations
- Search
- Filtering
- Task statistics
- Progress calculation
- Dark/light theme
- Task creation, editing, completion, and deletion

### `api.js`

Contains frontend functions for communicating with the backend:

- `CreateTask()`
- `GetAllTasks()`
- `UpdateTaskById()`
- `DeleteTaskById()`

### `utils.js`

Contains toast notification logic and the API base URL configuration.

### `main.jsx`

The React entry point. It loads React, Bootstrap, React Toastify, and renders the application.

---

## 🔄 Application Flow

```text
┌──────────────────────────┐
│       TaskFlow UI        │
│        React + Vite      │
└────────────┬─────────────┘
             │
             │ Fetch API
             │ HTTP Requests
             ▼
┌──────────────────────────┐
│     Express.js API       │
│       Node.js Server     │
└────────────┬─────────────┘
             │
             │ Mongoose
             ▼
┌──────────────────────────┐
│         MongoDB          │
│      Task Database       │
└──────────────────────────┘
```

### Request Flow

For example, when a user creates a task:

```text
User
  ↓
TaskManager.jsx
  ↓
CreateTask()
  ↓
POST /tasks
  ↓
TaskRouter.js
  ↓
TaskController.js
  ↓
TaskModel.js
  ↓
MongoDB
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/bhupendrar1/TaskFlow.git
cd TaskFlow
```

---

### 2. Setup the Backend

Open a terminal:

```bash
cd backened
npm install
```

Create a `.env` file inside the `backened` folder:

```env
DB_URL=your_mongodb_connection_string
PORT=8080
```

Then start the backend:

```bash
npm start
```

The backend runs using Nodemon.

---

### 3. Setup the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm start
```

The frontend uses **Vite** and is configured to run on:

```text
http://localhost:3000
```

---

## 🔐 Frontend Environment Variable

The frontend supports a configurable backend URL through Vite environment variables.

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:8080
```

The frontend reads this value through:

```js
import.meta.env.VITE_API_URL
```

If `VITE_API_URL` is not provided, the current frontend code falls back to:

```text
http://localhost:8080
```

---

## 📜 Available Scripts

### Backend

From the `backened` directory:

```bash
npm start
```

Starts the Express server using Nodemon.

### Frontend

From the `frontend` directory:

```bash
npm start
```

Starts the Vite development server.

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## ☁️ Deployment

The repository contains separate Vercel configuration files:

- `backened/vercel.json` → Backend deployment configuration
- `frontend/vercel.json` → Frontend SPA rewrite configuration

For a deployed frontend, set:

```env
VITE_API_URL=your_deployed_backend_url
```

in the frontend deployment environment.

---

## 🔒 Security

Do not commit sensitive information such as:

- MongoDB connection strings
- Database passwords
- API keys
- Access tokens
- Private credentials

Use environment variables and keep local `.env` files out of version control.

---

## 🎯 Key Learning Outcomes

TaskFlow demonstrates practical experience with:

- React component-based development
- Vite-based frontend development
- REST API integration
- CRUD operations
- Express.js routing
- Controller-based backend architecture
- MongoDB and Mongoose
- Asynchronous JavaScript
- React state and effects
- Search and filtering
- Responsive UI development
- Dark/light theme persistence
- Environment variable configuration
- Full-stack frontend/backend integration

---

## 👨‍💻 Author

**Bhupendra Singh**

B.Tech Computer Science & Engineering

GitHub: [@bhupendrar1](https://github.com/bhupendrar1)

---

## 📄 License

This project is available for educational and portfolio purposes.

---

⭐ If you find TaskFlow useful, consider giving the repository a star!
