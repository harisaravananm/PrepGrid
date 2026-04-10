import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';

import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import DashboardPage from '@/pages/DashboardPage';
import PracticePage from '@/pages/PracticePage';
import CodeEditorPage from '@/pages/CodeEditorPage';
import InterviewPage from '@/pages/InterviewPage';
import TestPage from '@/pages/TestPage';
import LeaderboardPage from '@/pages/LeaderboardPage';
import ProfilePage from '@/pages/ProfilePage';
import BillingPage from '@/pages/BillingPage';
import AdminPage from '@/pages/AdminPage';
import Navbar from '@/components/Navbar';

const PrivateRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="min-h-screen bg-background">
      {isAuthenticated && <Navbar />}
      <main className={isAuthenticated ? "pt-16" : ""}>
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="/practice" element={<PrivateRoute><PracticePage /></PrivateRoute>} />
            <Route path="/practice/:id" element={<PrivateRoute><CodeEditorPage /></PrivateRoute>} />
            <Route path="/interview" element={<PrivateRoute><InterviewPage /></PrivateRoute>} />
            <Route path="/test" element={<PrivateRoute><TestPage /></PrivateRoute>} />
            <Route path="/leaderboard" element={<PrivateRoute><LeaderboardPage /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/billing" element={<PrivateRoute><BillingPage /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute adminOnly><AdminPage /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppLayout>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
