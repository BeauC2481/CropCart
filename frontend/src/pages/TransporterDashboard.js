import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const TransporterDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome to the Transporter Dashboard</h1>
      <p>You are logged in as a Transporter. Here you can view available delivery tasks and manage your transport routes.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default TransporterDashboard;
