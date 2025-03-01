import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import SecurityPanel from './components/SecurityPanel';

import Home from './components/home';
import Live from './components/live';
import About from './components/about';
import Account from './components/account';
import Dashboard from './components/dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/live" element={<Live />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route path="/security-panel" element={<SecurityPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;