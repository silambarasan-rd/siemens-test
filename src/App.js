import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthProvider } from './features/auth/context/AuthContext';
import ProtectedRoute from './shared/components/ProtectedRoute';
import Header from './shared/components/Header';

import LoginPage from './features/auth/pages/LoginPage';
import DashboardPage from './features/dashboard/pages/DashboardPage';
import CreateTaskPage from './features/tasks/pages/CreateTaskPage';
import EditTaskPage from './features/tasks/pages/EditTaskPage';

import './App.css';
import ListTasksPage from './features/tasks/pages/ListTasksPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <DashboardPage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <ListTasksPage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks/create"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <CreateTaskPage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks/edit/:id"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <EditTaskPage />
                </>
              </ProtectedRoute>
            }
          />

          {/* Default route */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
