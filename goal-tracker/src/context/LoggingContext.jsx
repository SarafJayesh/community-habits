import { createContext, useContext, useState } from 'react';
import LoggingService from '../services/logging-service';
import { useNotifications } from './NotificationsContext';

const LoggingContext = createContext({});

export function LoggingProvider({ children }) {
  const [loggingHistory, setLoggingHistory] = useState({});
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotifications();

  // Log progress for a goal (handles both individual and group goals)
  const logProgress = async (goalId, data) => {
    try {
      setLoading(true);
      const response = await LoggingService.logUnifiedProgress(goalId, data);
      
      // Update local state
      setLoggingHistory(prev => ({
        ...prev,
        [goalId]: [...(prev[goalId] || []), response]
      }));

      // Send notification
      addNotification({
        title: 'Progress Logged',
        message: 'Your progress has been successfully recorded',
        type: 'progress_update'
      });

      return response;
    } catch (error) {
      addNotification({
        title: 'Error Logging Progress',
        message: error.message,
        type: 'error'
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get logging history for a goal
  const getHistory = async (goalId) => {
    try {
      setLoading(true);
      const history = await LoggingService.getLoggingHistory(goalId);
      setLoggingHistory(prev => ({
        ...prev,
        [goalId]: history
      }));
      return history;
    } catch (error) {
      addNotification({
        title: 'Error Fetching History',
        message: error.message,
        type: 'error'
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update a log entry
  const updateLog = async (logId, data) => {
    try {
      setLoading(true);
      const updated = await LoggingService.updateLogEntry(logId, data);
      
      // Update local state
      setLoggingHistory(prev => {
        const newHistory = { ...prev };
        Object.keys(newHistory).forEach(goalId => {
          newHistory[goalId] = newHistory[goalId].map(log =>
            log.id === logId ? updated : log
          );
        });
        return newHistory;
      });

      return updated;
    } catch (error) {
      addNotification({
        title: 'Error Updating Log',
        message: error.message,
        type: 'error'
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete a log entry
  const deleteLog = async (logId, goalId) => {
    try {
      setLoading(true);
      await LoggingService.deleteLogEntry(logId);
      
      // Update local state
      setLoggingHistory(prev => ({
        ...prev,
        [goalId]: prev[goalId].filter(log => log.id !== logId)
      }));

      addNotification({
        title: 'Log Deleted',
        message: 'The log entry has been deleted',
        type: 'info'
      });
    } catch (error) {
      addNotification({
        title: 'Error Deleting Log',
        message: error.message,
        type: 'error'
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    loggingHistory,
    loading,
    logProgress,
    getHistory,
    updateLog,
    deleteLog
  };

  return (
    <LoggingContext.Provider value={value}>
      {children}
    </LoggingContext.Provider>
  );
}

export const useLogging = () => {
  const context = useContext(LoggingContext);
  if (!context) {
    throw new Error('useLogging must be used within a LoggingProvider');
  }
  return context;
};