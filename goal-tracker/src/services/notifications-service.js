import api from './api-config';

const NotificationsService = {
  // Get all notifications for the current user
  getAllNotifications: async () => {
    try {
      return await api.get('/notifications');
    } catch (error) {
      throw error;
    }
  },

  // Get unread notifications count
  getUnreadCount: async () => {
    try {
      return await api.get('/notifications/unread/count');
    } catch (error) {
      throw error;
    }
  },

  // Mark notification as read
  markAsRead: async (notificationId) => {
    try {
      return await api.put(`/notifications/${notificationId}/read`);
    } catch (error) {
      throw error;
    }
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    try {
      return await api.put('/notifications/read-all');
    } catch (error) {
      throw error;
    }
  },

  // Update notification preferences
  updatePreferences: async (preferences) => {
    try {
      return await api.put('/notifications/preferences', preferences);
    } catch (error) {
      throw error;
    }
  },

  // Get notification preferences
  getPreferences: async () => {
    try {
      return await api.get('/notifications/preferences');
    } catch (error) {
      throw error;
    }
  },
};

export default NotificationsService;