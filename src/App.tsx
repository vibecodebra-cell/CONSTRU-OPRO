import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Index from './pages/Index';
import Tools from './pages/Tools';
import Proposals from './pages/Proposals';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Layout>
        <Routes>
          <Route path="/" element={ <Index /> } />
          <Route path="/tools" element={ <Tools /> } />
          <Route path="/proposals" element={ <Proposals /> } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;