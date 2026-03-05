import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewService from './pages/NewService';
import Proposals from './pages/Proposals';

function App() {
  return (
    <AppProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/new" element={<NewService />} />
            <Route path="/proposals" element={<Proposals />} />
            <Route path="/clients" element={<div className="p-10 text-center text-t-2">Tela de Clientes em desenvolvimento...</div>} />
            <Route path="/settings" element={<div className="p-10 text-center text-t-2">Tela de Configurações em desenvolvimento...</div>} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;