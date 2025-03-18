"use client";

import React, { useState, useContext } from 'react';
import Link from 'next/link'
import { FaShieldAlt } from 'react-icons/fa';
import "../CSS/Navbar.css"
import { getSession } from '@/backend/sessions';
import { AuthContext } from './AuthProvider.tsx';

const Navbar = () => {
  const { userID, setUserID } = useContext(AuthContext);

  return (
    <>
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
            { userID != null ? 
            <>
              <li>
                <Link href="/security-panel">Dashboard</Link>
              </li>
            </> : <></>}
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-right">
          {userID == null ? 
          <>
            <Link href="/sign-up" className="sign-up-btn">
              Sign Up
            </Link>
            <Link href="/log-in" className="login-btn">
              Login
            </Link>
          </> :
          <>
            <Link href="/log-out" className="login-btn">
              Log Out
            </Link>
          </>}
        </div>
      </nav>
    </>
  );
};

export default Navbar;