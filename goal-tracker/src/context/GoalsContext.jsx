import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const GoalsContext = createContext({});

export function GoalsProvider({ children }) {
  const [goals, setGoals] = useState([]);
  const { user } = useAuth();

  // Load goals from localStorage on mount and when user changes
  useEffect(() => {
    if (user) {
      const storedGoals = localStorage.getItem('goals');
      setGoals(storedGoals ? JSON.parse(storedGoals) : []);
    } else {
      setGoals([]);
    }
  }, [user]);

  // Save goals to localStorage whenever they change
  useEffect(() => {
    if (goals.length > 0) {
      localStorage.setItem('goals', JSON.stringify(goals));
    }
  }, [goals]);

  const addGoal = (goalData) => {
    const newGoal = {
      id: Date.now().toString(),
      userId: user.id,
      progress: 0,
      streak: 0,
      status: 'active',
      createdAt: new Date().toISOString(),
      ...goalData
    };
    setGoals(prev => [...prev, newGoal]);
    return newGoal;
  };

  const updateGoal = (goalId, updates) => {
    setGoals(prev =>
      prev.map(goal =>
        goal.id === goalId
          ? { ...goal, ...updates }
          : goal
      )
    );
  };

  const deleteGoal = (goalId) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  const logProgress = (goalId, status) => {
    const now = new Date().toISOString();
    setGoals(prev =>
      prev.map(goal => {
        if (goal.id === goalId) {
          const newProgress = goal.progress + (status === 'completed' ? 1 : 0);
          const newStreak = status === 'completed' ? goal.streak + 1 : 0;
          
          return {
            ...goal,
            progress: newProgress,
            streak: newStreak,
            lastUpdated: now,
            logs: [...(goal.logs || []), { date: now, status }]
          };
        }
        return goal;
      })
    );
  };

  return (
    <GoalsContext.Provider value={{
      goals,
      addGoal,
      updateGoal,
      deleteGoal,
      logProgress
    }}>
      {children}
    </GoalsContext.Provider>
  );
}

export const useGoals = () => {
  const context = useContext(GoalsContext);
  if (!context) {
    throw new Error('useGoals must be used within a GoalsProvider');
  }
  return context;
};