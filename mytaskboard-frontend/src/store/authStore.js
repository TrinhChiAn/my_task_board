import { create } from 'zustand';
import { login, signup } from '../services/api';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  
  login: async (credentials) => {
    try {
      const response = await login(credentials);
      const { token, username, userId } = response.data;
      const userData = { username, userId };
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      set({ user: userData, token, isAuthenticated: true });
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  signup: async (userData) => {
    try {
      const response = await signup(userData);
      const { token, username, userId } = response.data;
      const userInfo = { username, userId };
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userInfo));
      set({ user: userInfo, token, isAuthenticated: true });
      return response.data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

export default useAuthStore; 