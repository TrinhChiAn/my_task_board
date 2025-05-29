const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
    SIGNUP: `${API_BASE_URL}/api/user/signup`,
    LOGIN: `${API_BASE_URL}/api/user/login`,
    // Add other endpoints here
};

export default API_BASE_URL; 