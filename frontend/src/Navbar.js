import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar" role="navigation">
      <div className="navbar-left">
        <Link to="/" className ="logo">
        SafeGuard
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <Link to="/live">LIVE</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <Link to="/account" className="user-icon">
        <i className="fas fa-user"></i> <span className="user-text">User</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;