import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://66.42.51.94:8081';

const getToken = () => localStorage.getItem('token');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false // Set to false since we're using token-based auth
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Log the request for debugging
    console.log('Making request to:', config.url, {
      method: config.method,
      headers: config.headers
    });

    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log successful response
    console.log('Received response:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    // Log error response
    console.error('Response error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const login = (credentials) => api.post('/api/user/login', credentials);
export const signup = (userData) => api.post('/api/user/signup', userData);

// Board APIs
export const getBoards = () => api.get('/api/boards/me');
export const getBoardById = (boardId) => api.get(`/api/boards/${boardId}`);
export const createBoard = (data) => api.post('/api/boards', data);
export const updateBoard = (boardId, data) => api.put(`/api/boards/${boardId}`, data);
export const deleteBoard = (boardId) => api.delete(`/api/boards/${boardId}`);

// Task APIs
export const createTask = (boardId, data) => api.post(`/api/tasks/board/${boardId}`, data);
export const getTaskById = (taskId) => api.get(`/api/tasks/${taskId}`);
export const updateTask = (taskId, updateData) => api.put(`/api/tasks/${taskId}`, updateData);
export const deleteTask = (taskId) => api.delete(`/api/tasks/${taskId}`);