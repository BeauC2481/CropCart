// src/auth/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../../services/api'; // Axios instance for making HTTP requests

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  // Check for token in local storage and validate on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setAuthState({
        isAuthenticated: true,
        user: decoded,
        token: token,
      });
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api.post('/login', { username, password });
      const { token } = response.data;
      const decoded = jwtDecode(token);

      localStorage.setItem('token', token);
      setAuthState({
        isAuthenticated: true,
        user: decoded,
        token: token,
      });
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
