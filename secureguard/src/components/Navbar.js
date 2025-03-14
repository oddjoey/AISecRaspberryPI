import React from 'react';
import Link from 'next/link'
import { FaShieldAlt} from 'react-icons/fa';
import "../CSS/Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar" role="navigation">
      <div className="navbar-left">
        <Link href="/" className="logo">
          <FaShieldAlt className="logo-icon" />
          SecureGuard
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <Link href="/features">Features</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <Link href="/sign-up" className="sign-up-btn">
          Sign Up
        </Link>
        <Link href="/login" className="login-btn">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;