


import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import AuthLayout from './AuthLayout';
import SocialAuthButtons from '../components/SocialAuthButtons';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', form);
      login(data);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const left = (
    <>
      <Link to="/" className="go-back">Go Back</Link>
      <div className="auth-header">
        <h1 className="brand">WELCOME</h1>
        <h2>Login to your account</h2>
      </div>
      <SocialAuthButtons />
      <div className="divider"><span>Login via Email</span></div>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input className="glass-input" name="email" type="email" placeholder="Email" onChange={handleChange} required />
        </div>
        <div className="input-group">
          <FaLock className="input-icon" />
          <input className="glass-input" name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" onChange={handleChange} required />
          <span className="input-eye" onClick={() => setShowPassword(v => !v)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
        </div>
        <button type="submit" className="btn-primary">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
      <div className="auth-links">
        <span>Don't have an account? <Link to="/signup">Sign Up</Link></span>
      </div>
      <footer className="auth-footer">© 2024 MusicApp</footer>
    </>
  );
  const right = (
    <div className="auth-illustration">
      <img src="https://images.unsplash.com/photo-1464375117522-1311d6a5b81a?auto=format&fit=crop&w=1600&q=80" alt="music art" />
      <div className="overlay" />
    </div>
  );
  return <AuthLayout left={left} right={right} />;
};

export default Login;
