import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => (
  <div className="landing-hero layout-shell">
    <div className="landing-visual">
      <img className="landing-bg" src="https://images.unsplash.com/photo-1490093158370-1a6be674437b?auto=format&fit=crop&w=1600&q=80" alt="concert" />
      <div className="landing-overlay" />
    </div>
    <div className="landing-content glass float">
      <div className="badge">New</div>
      <h1 className="landing-title">Discover your next favorite song</h1>
      <p className="landing-subtitle">Professional, modern, and smooth. Dive into a world of music with a premium glassmorphism UI.</p>
      <div className="landing-actions">
        <Link to="/login" className="btn-primary">Login</Link>
        <Link to="/signup" className="btn-primary btn-outline">Create account</Link>
      </div>
      <div className="landing-note">No credit card required • Free to start</div>
    </div>
  </div>
);

export default Landing;
