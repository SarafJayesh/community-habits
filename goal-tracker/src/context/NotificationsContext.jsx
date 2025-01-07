import { createContext, useContext, useState, useEffect } from 'react';
import NotificationsService from '../services/notifications-service';
import { useAuth } from './AuthContext';

const NotificationsContext = createContext({});

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const data = await NotificationsService.getAllNotifications();
      setNotifications(data);
      updateUnreadCount(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate unread count
  const updateUnreadCount = (notifs) => {
    const count = notifs.filter(notif => !notif.read).length;
    setUnreadCount(count);
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      await NotificationsService.markAsRead(notificationId);
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId
            ? { ...notif, read: true }
            : notif
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      await NotificationsService.markAllAsRead();
      setNotifications(prev =>
        prev.map(notif => ({ ...notif, read: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  // Add new notification
  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
    if (!notification.read) {
      setUnreadCount(prev => prev + 1);
    }
  };

  // Initial fetch when user is authenticated
  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  // Set up WebSocket connection for real-time notifications
  useEffect(() => {
    if (user) {
      // TODO: Implement WebSocket connection
      // const ws = new WebSocket(WEBSOCKET_URL);
      // ws.onmessage = (event) => {
      //   const notification = JSON.parse(event.data);
      //   addNotification(notification);
      // };
      // return () => ws.close();
    }
  }, [user]);

  const value = {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    addNotification,
    fetchNotifications
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};