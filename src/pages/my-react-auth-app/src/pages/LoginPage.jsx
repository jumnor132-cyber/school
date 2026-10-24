import React from "react";
import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <AuthLayout>
      <h2>Login</h2>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;