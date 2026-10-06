import { toast } from 'react-toastify';

export const notify = (message, type) => {
    if (toast[type]) {
        toast[type](message);
    } else {
        toast(message);
    }
};

// Connects to local Express server by default, or VITE_API_URL env variable in production
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';