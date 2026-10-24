import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';

export default function DashboardPage() {
  const { user } = useContext(AuthContext);

  return (
    <DashboardLayout>
      <h1>Welcome to the Dashboard, {user.name}!</h1>
      <p>This is a protected area of the application.</p>
    </DashboardLayout>
  );
}