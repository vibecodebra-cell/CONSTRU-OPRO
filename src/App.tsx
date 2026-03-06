import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider, useAuth } from './components/AuthProvider';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewService from './pages/NewService';
import Proposals from './pages/Proposals';
import Clients from './pages/Clients';
import Settings from './pages/Settings';
import Index from './pages/Index';
import Login from './pages/Login';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();

  if (loading) return <div className="min-h-screen bg-ink flex items-center justify-center text-amber font-bold">Carregando...</div>;
  if (!session) return <Navigate to="/login" />;

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout><Dashboard /></Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/new" element={
              <ProtectedRoute>
                <Layout><NewService /></Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/proposals" element={
              <ProtectedRoute>
                <Layout><Proposals /></Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/clients" element={
              <ProtectedRoute>
                <Layout><Clients /></Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute>
                <Layout><Settings /></Layout>
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;