import React from 'react';
import AuthLayout from '../components/AuthLayout';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  return (
    <AuthLayout>
      <h2>Register</h2>
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;