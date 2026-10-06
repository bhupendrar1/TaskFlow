import { API_URL } from "./utils";

export const CreateTask = async (taskObj) => {
    const url = `${API_URL}/tasks`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskObj)
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        return { success: false, message: err.message || 'Failed to create task' };
    }
};

export const GetAllTasks = async () => {
    const url = `${API_URL}/tasks`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        return { success: false, message: err.message || 'Failed to fetch tasks', data: [] };
    }
};

export const DeleteTaskById = async (id) => {
    const url = `${API_URL}/tasks/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        return { success: false, message: err.message || 'Failed to delete task' };
    }
};

export const UpdateTaskById = async (id, reqBody) => {
    const url = `${API_URL}/tasks/${id}`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        return { success: false, message: err.message || 'Failed to update task' };
    }
};