import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShieldAlt} from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar" role="navigation">
      <div className="navbar-left">
        <Link to="/" className="logo">
          <FaShieldAlt className="logo-icon" />
          SecureGuard
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <Link to="/features">Features</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <Link to="/sign-up" className="sign-up-btn">
          Sign Up
        </Link>
        <Link to="/login" className="login-btn">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;