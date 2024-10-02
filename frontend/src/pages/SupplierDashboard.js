import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const SupplierDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome to the Supplier Dashboard</h1>
      <p>You are logged in as a Supplier. Here you can manage your product listings and view orders.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default SupplierDashboard;
