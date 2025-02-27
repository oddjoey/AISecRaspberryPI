// components/Home.js
import React from 'react';
import './home.css';


const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Protect What Matters Most</h1>
        <p>Advanced home security solutions for your peace of mind</p>
        <button className="cta-button">Get Started</button>
      </section>

      <section className="features">
        <h2>Why Choose SafeGuard?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <i className="fas fa-video"></i>
            <h3>24/7 Monitoring</h3>
            <p>Real-time surveillance and alerts</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-mobile-alt"></i>
            <h3>Mobile Control</h3>
            <p>Manage your security from anywhere</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-shield-alt"></i>
            <h3>Smart Protection</h3>
            <p>AI-powered threat detection</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Secure Your Home?</h2>
        <p>Get started with SafeGuard today</p>
        <button className="cta-button">Contact Us</button>
      </section>
    </div>
  );
};

export default Home;