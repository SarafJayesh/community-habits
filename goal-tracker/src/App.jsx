import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GoalsProvider } from './context/GoalsContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/common/Layout';
import Dashboard from './app/Dashboard';
import Goals from './app/Goals';
import Groups from './app/Groups';
import Login from './app/auth/Login';
import Register from './app/auth/Register';

function App() {
  return (
    <AuthProvider>
      <GoalsProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="goals" element={<Goals />} />
            <Route path="groups" element={<Groups />} />
          </Route>
        </Routes>
      </GoalsProvider>
    </AuthProvider>
  );
}

export default App;