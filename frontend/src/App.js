import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import SecurityPanel from './components/SecurityPanel';
import DetectionData from './components/DetectionData';
import LiveFeed from './components/LiveFeed';
import Guests from './components/Guests';
import Recordings from './components/Recordings';
import AccountSettings from './components/AccountSettings';
import SystemSettings from './components/SystemSettings';
import SignUp from './components/SignUp';
import Login from './components/Login';

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
          <Route path="/detection-data" element={<DetectionData />} />
          <Route path="/live-feed" element={<LiveFeed />} />
          <Route path="/guests" element={<Guests />} />
          <Route path="/recordings" element={<Recordings />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/system-settings" element={<SystemSettings />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;