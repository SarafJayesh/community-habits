// For now, we'll use a mock API service with localStorage
// When backend is ready, uncomment and use the axios configuration

// import axios from 'axios';
// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const api = {
    auth: {
      login: async (email, password) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // For demo, accept any email/password combo
        const user = {
          id: '1',
          name: email.split('@')[0],
          email
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        return { user };
      },
      
      register: async (userData) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const user = {
          id: Date.now().toString(),
          ...userData
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        return { user };
      },
      
      logout: () => {
        localStorage.removeItem('user');
      }
    }
  };
  
  export default api;