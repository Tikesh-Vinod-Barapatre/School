


import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import AuthLayout from './AuthLayout';
import SocialAuthButtons from '../components/SocialAuthButtons';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const { name, email, password } = form;
      const { data } = await api.post('/auth/signup', { name, email, password });
      login(data);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  const left = (
    <>
      <Link to="/" className="go-back">Go Back</Link>
      <div className="auth-header">
        <h1 className="brand">WELCOME</h1>
        <h2>Join us today!!</h2>
      </div>
      <SocialAuthButtons />
      <div className="divider"><span>Signup via Email</span></div>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-group">
          <FaUser className="input-icon" />
          <input className="glass-input" name="name" placeholder="Name" onChange={handleChange} required />
        </div>
        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input className="glass-input" name="email" type="email" placeholder="Email" onChange={handleChange} required />
        </div>
        <div className="input-group">
          <FaLock className="input-icon" />
          <input className="glass-input" name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" onChange={handleChange} required />
          <span className="input-eye" onClick={() => setShowPassword(v => !v)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
        </div>
        <div className="input-group">
          <FaLock className="input-icon" />
          <input className="glass-input" name="confirmPassword" type={showConfirm ? 'text' : 'password'} placeholder="Confirm Password" onChange={handleChange} required />
          <span className="input-eye" onClick={() => setShowConfirm(v => !v)}>{showConfirm ? <FaEyeSlash /> : <FaEye />}</span>
        </div>
        <button type="submit" className="btn-primary">Create Account</button>
        {error && <p className="error">{error}</p>}
      </form>
      <div className="auth-links">
        <span>Already have an account? <Link to="/login">Login</Link></span>
      </div>
      <footer className="auth-footer">© 2024 MusicApp</footer>
    </>
  );
  const right = (
    <div className="auth-illustration">
      <img src="https://images.unsplash.com/photo-1483412033650-1015ddeb83d4?auto=format&fit=crop&w=1600&q=80" alt="music art" />
      <div className="overlay" />
    </div>
  );
  return <AuthLayout left={left} right={right} />;
};

export default Signup;
