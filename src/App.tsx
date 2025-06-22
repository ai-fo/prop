import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ApplicationDetail } from './pages/ApplicationDetail';
import { Login, Register } from './pages/Auth';
import { SellerDashboard, BuyerDashboard } from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              IP Marketplace
            </Link>
            <div className="nav-links">
              <Link to="/catalog" className="nav-link">Catalogue</Link>
              <Link to="/login" className="nav-link">Connexion</Link>
              <Link to="/register" className="nav-link nav-link-primary">S'inscrire</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/app/:id" element={<ApplicationDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/seller" element={<SellerDashboard />} />
          <Route path="/dashboard/buyer" element={<BuyerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;