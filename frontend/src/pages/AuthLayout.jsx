import React from 'react';
import './AuthLayout.css';

const AuthLayout = ({ left, right }) => (
  <div className="auth-layout">
    <div className="auth-left">{left}</div>
    <div className="auth-right">
      <div className="auth-illustration" />
      {right}
    </div>
  </div>
);

export default AuthLayout;
