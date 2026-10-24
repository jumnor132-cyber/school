import React from 'react';
import './AuthLayout.css'; // Assuming you have some styles for the layout

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <h1 className="auth-title">Welcome to Our App</h1>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;