import api from './api-config';

const LoggingService = {
  // Log progress for individual goal
  logIndividualProgress: async (goalId, data) => {
    try {
      return await api.post(`/goals/${goalId}/progress`, {
        ...data,
        type: 'individual'
      });
    } catch (error) {
      throw error;
    }
  },

  // Log progress for group goal
  logGroupProgress: async (groupId, goalId, data) => {
    try {
      return await api.post(`/groups/${groupId}/goals/${goalId}/progress`, {
        ...data,
        type: 'group'
      });
    } catch (error) {
      throw error;
    }
  },

  // Unified logging for both individual and synced group goals
  logUnifiedProgress: async (goalId, data) => {
    try {
      return await api.post('/logging/unified', {
        goalId,
        ...data
      });
    } catch (error) {
      throw error;
    }
  },

  // Get logging history for a goal
  getLoggingHistory: async (goalId) => {
    try {
      return await api.get(`/logging/history/${goalId}`);
    } catch (error) {
      throw error;
    }
  },

  // Get unified logging stats
  getUnifiedStats: async (goalId) => {
    try {
      return await api.get(`/logging/stats/${goalId}`);
    } catch (error) {
      throw error;
    }
  },

  // Update existing log entry
  updateLogEntry: async (logId, data) => {
    try {
      return await api.put(`/logging/${logId}`, data);
    } catch (error) {
      throw error;
    }
  },

  // Delete log entry
  deleteLogEntry: async (logId) => {
    try {
      return await api.delete(`/logging/${logId}`);
    } catch (error) {
      throw error;
    }
  }
};

export default LoggingService;