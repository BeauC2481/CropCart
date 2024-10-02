import React from 'react';
import { useAuth } from '../components/Auth/AuthContext';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 2rem;
  text-align: center;
`;

const RoleMessage = styled.div`
  margin-top: 2rem;
  background: #e0e0e0;
  padding: 1.5rem;
  border-radius: 8px;
`;

const Dashboard = () => {
  const { authState } = useAuth();

  const renderRoleContent = () => {
    switch (authState.user.role) {
      case 'Supplier':
        return <RoleMessage>Welcome, Supplier! Here you can manage your product listings and track orders.</RoleMessage>;
      case 'Buyer':
        return <RoleMessage>Welcome, Buyer! Explore available products and manage your purchase requests.</RoleMessage>;
      case 'Transporter':
        return <RoleMessage>Welcome, Transporter! View available delivery tasks and manage your logistics profile.</RoleMessage>;
      default:
        return <RoleMessage>Welcome! Please select a role to get started.</RoleMessage>;
    }
  };

  return (
    <DashboardContainer>
      <h1>Dashboard</h1>
      <p>Logged in as: <strong>{authState.user.username}</strong></p>
      <p>Your Role: <strong>{authState.user.role}</strong></p>
      {renderRoleContent()}
    </DashboardContainer>
  );
};

export default Dashboard;
