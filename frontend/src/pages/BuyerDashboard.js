import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const BuyerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome to the Buyer Dashboard</h1>
      <p>You are logged in as a Buyer. Here you can browse supplier listings and place new orders.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default BuyerDashboard;
