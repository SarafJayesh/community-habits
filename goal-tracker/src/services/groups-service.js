import api from './api-config';

const GroupsService = {
  // Get all groups for the current user
  getAllGroups: async () => {
    try {
      return await api.get('/groups');
    } catch (error) {
      throw error;
    }
  },

  // Get a specific group by ID
  getGroupById: async (groupId) => {
    try {
      return await api.get(`/groups/${groupId}`);
    } catch (error) {
      throw error;
    }
  },

  // Create a new group
  createGroup: async (groupData) => {
    try {
      return await api.post('/groups', groupData);
    } catch (error) {
      throw error;
    }
  },

  // Update an existing group
  updateGroup: async (groupId, groupData) => {
    try {
      return await api.put(`/groups/${groupId}`, groupData);
    } catch (error) {
      throw error;
    }
  },

  // Delete a group
  deleteGroup: async (groupId) => {
    try {
      return await api.delete(`/groups/${groupId}`);
    } catch (error) {
      throw error;
    }
  },

  // Join a group
  joinGroup: async (groupId) => {
    try {
      return await api.post(`/groups/${groupId}/join`);
    } catch (error) {
      throw error;
    }
  },

  // Leave a group
  leaveGroup: async (groupId) => {
    try {
      return await api.post(`/groups/${groupId}/leave`);
    } catch (error) {
      throw error;
    }
  },

  // Get group members
  getGroupMembers: async (groupId) => {
    try {
      return await api.get(`/groups/${groupId}/members`);
    } catch (error) {
      throw error;
    }
  },

  // Get group leaderboard
  getGroupLeaderboard: async (groupId) => {
    try {
      return await api.get(`/groups/${groupId}/leaderboard`);
    } catch (error) {
      throw error;
    }
  },

  // Sync individual goal with group
  syncGoalWithGroup: async (groupId, goalId) => {
    try {
      return await api.post(`/groups/${groupId}/sync`, { goalId });
    } catch (error) {
      throw error;
    }
  },
};

export default GroupsService;