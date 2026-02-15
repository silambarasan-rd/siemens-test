import api from '../../../shared/utils/api';

export const authService = {
  login: async (username, password) => {
    const response = await api.post('/login', { username, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};
