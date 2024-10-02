// src/components/Auth/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const { authState } = useAuth();

  return (
    <Route
      {...rest}
      element={
        authState.isAuthenticated && allowedRoles.includes(authState.user.role) ? (
          <Component />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
