import React, { useEffect, useState } from 'react';
import {
    FaCheck,
    FaCheckCircle,
    FaClock,
    FaExclamationCircle,
    FaFilter,
    FaListAlt,
    FaMoon,
    FaPencilAlt,
    FaPlus,
    FaSearch,
    FaSun,
    FaTasks,
    FaTimes,
    FaTrash
} from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { CreateTask, DeleteTaskById, GetAllTasks, UpdateTaskById } from './api';
import { notify } from './utils';

function TaskManager() {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'pending' | 'completed'
    const [updateTask, setUpdateTask] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Dark / Light Theme state with localStorage persistence
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('taskflow_theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('taskflow_theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('taskflow_theme', 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    const fetchAllTasks = async () => {
        try {
            setIsLoading(true);
            const response = await GetAllTasks();
            const items = Array.isArray(response)
                ? response
                : Array.isArray(response?.data)
                    ? response.data
                    : [];

            setTasks(items);
        } catch (err) {
            console.error(err);
            notify('Failed to fetch tasks', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllTasks();
    }, []);

    useEffect(() => {
        if (updateTask) {
            setInput(updateTask.taskName);
        }
    }, [updateTask]);

    const handleTask = async () => {
        const trimmed = input.trim();
        if (!trimmed) {
            notify('Task description cannot be empty', 'warning');
            return;
        }

        if (updateTask) {
            const obj = {
                taskName: trimmed,
                isDone: updateTask.isDone,
                _id: updateTask._id
            };
            await handleUpdateItem(obj);
            setUpdateTask(null);
        } else {
            await handleAddTask(trimmed);
        }
        setInput('');
    };

    const handleAddTask = async (taskName) => {
        const obj = {
            taskName: taskName || input.trim(),
            isDone: false
        };
        try {
            const { success, message } = await CreateTask(obj);
            if (success) {
                notify(message || 'Task added successfully!', 'success');
            } else {
                notify(message || 'Failed to add task', 'error');
            }
            fetchAllTasks();
        } catch (err) {
            console.error(err);
            notify('Failed to add task', 'error');
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            const { success, message } = await DeleteTaskById(id);
            if (success) {
                notify(message || 'Task deleted successfully', 'success');
            } else {
                notify(message || 'Failed to delete task', 'error');
            }
            if (updateTask && updateTask._id === id) {
                setUpdateTask(null);
                setInput('');
            }
            fetchAllTasks();
        } catch (err) {
            console.error(err);
            notify('Failed to delete task', 'error');
        }
    };

    const handleCheckAndUncheck = async (item) => {
        const { _id, isDone, taskName } = item;
        const obj = {
            taskName,
            isDone: !isDone
        };
        try {
            const { success, message } = await UpdateTaskById(_id, obj);
            if (success) {
                notify(!isDone ? 'Task marked as completed! 🎉' : 'Task marked as pending', 'success');
            } else {
                notify(message || 'Failed to update status', 'error');
            }
            fetchAllTasks();
        } catch (err) {
            console.error(err);
            notify('Failed to update task', 'error');
        }
    };

    const handleUpdateItem = async (item) => {
        const { _id, isDone, taskName } = item;
        const obj = {
            taskName,
            isDone
        };
        try {
            const { success, message } = await UpdateTaskById(_id, obj);
            if (success) {
                notify(message || 'Task updated successfully!', 'success');
            } else {
                notify(message || 'Failed to update task', 'error');
            }
            fetchAllTasks();
        } catch (err) {
            console.error(err);
            notify('Failed to update task', 'error');
        }
    };

    const cancelUpdate = () => {
        setUpdateTask(null);
        setInput('');
    };

    // Productivity Analytics Metrics
    const totalCount = tasks.length;
    const completedCount = tasks.filter((t) => t.isDone).length;
    const pendingCount = totalCount - completedCount;
    const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    // Filter & Search Logic
    const filteredTasks = tasks.filter((item) => {
        const matchesSearch = item.taskName?.toLowerCase().includes(searchTerm.toLowerCase());
        if (!matchesSearch) return false;

        if (filterStatus === 'pending') return !item.isDone;
        if (filterStatus === 'completed') return item.isDone;
        return true;
    });

    return (
        <div className='app-container'>
            {/* Ambient Background Glowing Blobs */}
            <div className='ambient-blob blob-1'></div>
            <div className='ambient-blob blob-2'></div>
            <div className='ambient-blob blob-3'></div>

            <main className='main-shell'>
                {/* Header */}
                <header className='app-header'>
                    <div className='brand-wrapper'>
                        <div className='brand-icon-box'>
                            <FaTasks />
                        </div>
                        <div>
                            <h1 className='brand-title'>TaskFlow</h1>
                            <p className='brand-subtitle'>Productivity & Task Management Hub</p>
                        </div>
                    </div>

                    {/* Dark/Light Theme Switcher */}
                    <button
                        onClick={toggleTheme}
                        className='theme-toggle-btn'
                        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        type='button'
                    >
                        {isDarkMode ? <FaSun className='text-warning' /> : <FaMoon className='text-primary' />}
                        <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                </header>

                {/* Productivity Stats Dashboard */}
                <section className='stats-grid'>
                    <div className='stat-card stat-total'>
                        <div className='stat-info'>
                            <h3>{totalCount}</h3>
                            <p>Total Tasks</p>
                        </div>
                        <div className='stat-icon'>
                            <FaListAlt />
                        </div>
                    </div>

                    <div className='stat-card stat-pending'>
                        <div className='stat-info'>
                            <h3>{pendingCount}</h3>
                            <p>Pending</p>
                        </div>
                        <div className='stat-icon'>
                            <FaClock />
                        </div>
                    </div>

                    <div className='stat-card stat-completed'>
                        <div className='stat-info'>
                            <h3>{completedCount}</h3>
                            <p>Completed</p>
                        </div>
                        <div className='stat-icon'>
                            <FaCheckCircle />
                        </div>
                    </div>
                </section>

                {/* Progress Bar */}
                <div className='progress-container'>
                    <div className='progress-header'>
                        <span className='progress-title'>Progress Overview</span>
                        <span className='progress-percentage'>
                            {completionPercentage}% {completionPercentage === 100 && totalCount > 0 ? '🎉 All Done!' : 'Completed'}
                        </span>
                    </div>
                    <div className='progress-track'>
                        <div
                            className='progress-fill'
                            style={{ width: `${completionPercentage}%` }}
                        ></div>
                    </div>
                </div>

                {/* Action Bar: Input Form */}
                <section className='action-bar'>
                    <div className='input-container'>
                        <input
                            type='text'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleTask();
                                if (e.key === 'Escape') cancelUpdate();
                            }}
                            className='task-input'
                            placeholder={updateTask ? 'Edit task name (Press Enter ↵ to save)...' : 'Add a new task (Press Enter ↵)...'}
                            autoFocus={!!updateTask}
                        />

                        <button
                            onClick={handleTask}
                            className='btn-gradient'
                            title={updateTask ? 'Save Changes' : 'Add Task'}
                            type='button'
                        >
                            {updateTask ? <FaCheck /> : <FaPlus />}
                            <span>{updateTask ? 'Save Task' : 'Add Task'}</span>
                        </button>

                        {updateTask && (
                            <button
                                onClick={cancelUpdate}
                                className='btn-cancel'
                                title='Cancel Editing (Esc)'
                                type='button'
                            >
                                <FaTimes />
                                <span className='d-none d-sm-inline ms-1'>Cancel</span>
                            </button>
                        )}
                    </div>

                    {/* Controls Row: Search & Status Filter Tabs */}
                    <div className='controls-row'>
                        <div className='search-box'>
                            <FaSearch className='search-icon' />
                            <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className='search-input'
                                type='text'
                                placeholder='Search tasks...'
                            />
                        </div>

                        <div className='filter-tabs'>
                            <button
                                className={`filter-tab ${filterStatus === 'all' ? 'active' : ''}`}
                                onClick={() => setFilterStatus('all')}
                                type='button'
                            >
                                All <span className='tab-badge'>{totalCount}</span>
                            </button>
                            <button
                                className={`filter-tab ${filterStatus === 'pending' ? 'active' : ''}`}
                                onClick={() => setFilterStatus('pending')}
                                type='button'
                            >
                                Pending <span className='tab-badge'>{pendingCount}</span>
                            </button>
                            <button
                                className={`filter-tab ${filterStatus === 'completed' ? 'active' : ''}`}
                                onClick={() => setFilterStatus('completed')}
                                type='button'
                            >
                                Completed <span className='tab-badge'>{completedCount}</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Task Items List */}
                <section className='task-list'>
                    {isLoading ? (
                        <div className='empty-state'>
                            <div className='spinner-border text-primary' role='status'>
                                <span className='visually-hidden'>Loading tasks...</span>
                            </div>
                            <p className='empty-desc mt-2'>Loading your tasks...</p>
                        </div>
                    ) : filteredTasks.length === 0 ? (
                        <div className='empty-state'>
                            <div className='empty-icon'>
                                {searchTerm ? <FaSearch /> : <FaCheckCircle />}
                            </div>
                            <h3 className='empty-title'>
                                {searchTerm
                                    ? 'No matching tasks found'
                                    : filterStatus === 'completed'
                                        ? 'No completed tasks yet'
                                        : filterStatus === 'pending'
                                            ? 'No pending tasks left!'
                                            : 'No tasks yet!'}
                            </h3>
                            <p className='empty-desc'>
                                {searchTerm
                                    ? `Could not find any tasks matching "${searchTerm}"`
                                    : 'Add your first goal or task above to get started.'}
                            </p>
                        </div>
                    ) : (
                        filteredTasks.map((item) => (
                            <div
                                key={item._id}
                                className={`task-item ${item.isDone ? 'completed' : ''} ${
                                    updateTask?._id === item._id ? 'editing' : ''
                                }`}
                            >
                                <div className='task-left'>
                                    {/* Circular Check Button */}
                                    <button
                                        onClick={() => handleCheckAndUncheck(item)}
                                        className={`check-toggle-btn ${item.isDone ? 'checked' : ''}`}
                                        title={item.isDone ? 'Mark as Pending' : 'Mark as Completed'}
                                        type='button'
                                    >
                                        <FaCheck />
                                    </button>

                                    {/* Task Name & Status Label */}
                                    <div className='task-content'>
                                        <span className={`task-title ${item.isDone ? 'done' : ''}`}>
                                            {item.taskName}
                                        </span>
                                        <span className='task-status-badge'>
                                            {item.isDone ? (
                                                <span className='status-badge-completed'>● Completed</span>
                                            ) : (
                                                <span className='status-badge-pending'>● Pending</span>
                                            )}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className='task-actions'>
                                    <button
                                        onClick={() => setUpdateTask(item)}
                                        className='action-btn action-btn-edit'
                                        title='Edit Task'
                                        type='button'
                                    >
                                        <FaPencilAlt />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTask(item._id)}
                                        className='action-btn action-btn-delete'
                                        title='Delete Task'
                                        type='button'
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </section>

                <footer className='app-footer'>
                    <span>TaskFlow • Built with React, Vite & Node.js</span>
                </footer>
            </main>

            <ToastContainer
                position='top-right'
                autoClose={2500}
                hideProgressBar={false}
                theme={isDarkMode ? 'dark' : 'light'}
            />
        </div>
    );
}

export default TaskManager;