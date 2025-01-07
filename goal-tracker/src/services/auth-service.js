import api from './api-config';

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  register: async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
      });
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    try {
      return await api.get('/auth/me');
    } catch (error) {
      throw error;
    }
  },

  updateProfile: async (userData) => {
    try {
      return await api.put('/auth/profile', userData);
    } catch (error) {
      throw error;
    }
  },
};

export default AuthService;