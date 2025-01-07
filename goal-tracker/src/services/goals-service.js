import api from './api-config';

const GoalsService = {
  // Get all goals for the current user
  getAllGoals: async () => {
    try {
      return await api.get('/goals');
    } catch (error) {
      throw error;
    }
  },

  // Get a specific goal by ID
  getGoalById: async (goalId) => {
    try {
      return await api.get(`/goals/${goalId}`);
    } catch (error) {
      throw error;
    }
  },

  // Create a new goal
  createGoal: async (goalData) => {
    try {
      return await api.post('/goals', goalData);
    } catch (error) {
      throw error;
    }
  },

  // Update an existing goal
  updateGoal: async (goalId, goalData) => {
    try {
      return await api.put(`/goals/${goalId}`, goalData);
    } catch (error) {
      throw error;
    }
  },

  // Delete a goal
  deleteGoal: async (goalId) => {
    try {
      return await api.delete(`/goals/${goalId}`);
    } catch (error) {
      throw error;
    }
  },

  // Log daily progress
  logProgress: async (goalId, progressData) => {
    try {
      return await api.post(`/goals/${goalId}/progress`, progressData);
    } catch (error) {
      throw error;
    }
  },

  // Get progress history for a goal
  getProgressHistory: async (goalId) => {
    try {
      return await api.get(`/goals/${goalId}/progress`);
    } catch (error) {
      throw error;
    }
  },

  // Get goal statistics
  getGoalStats: async (goalId) => {
    try {
      return await api.get(`/goals/${goalId}/stats`);
    } catch (error) {
      throw error;
    }
  },
};

export default GoalsService;