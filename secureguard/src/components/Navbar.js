'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaShieldAlt, FaMoon, FaSun } from 'react-icons/fa';
import "../CSS/Navbar.css";
import "../CSS/darkMode.css"
import { AuthContext } from './AuthProvider.tsx';
import { ThemeContext } from './ThemeProvider.tsx';

const Navbar = () => {
  const { userID } = useContext(AuthContext);
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar" role="navigation">
      <div className="navbar-left">
        <Link href="/" className={`logo ${isActive('/')}`}>
          <FaShieldAlt className="logo-icon" />
          SecureGuard
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <Link href="/features" className={isActive('/features')}>
              Features
            </Link>
          </li>
          <li>
            <Link href="/about" className={isActive('/about')}>
              About
            </Link>
          </li>
          {userID != null && (
            <li>
              <Link href="/security-panel" className={isActive('/security-panel')}>
                Dashboard
              </Link>
            </li>
          )}
          <li>
            <Link href="/contact" className={isActive('/contact')}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>

        {userID == null ? (
          <>
            <Link href="/sign-up" className={`sign-up-btn ${isActive('/sign-up')}`}>
              Sign Up
            </Link>
            <Link href="/log-in" className={`login-btn ${isActive('/log-in')}`}>
              Login
            </Link>
          </>
        ) : (
          <Link href="/log-out" className={`login-btn ${isActive('/log-out')}`}>
            Log Out
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;