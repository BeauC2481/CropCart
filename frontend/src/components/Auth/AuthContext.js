// File: /src/components/Auth/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
    role: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');

    if (storedToken && storedUser && storedRole) {
      const parsedUser = JSON.parse(storedUser);
      setAuthState({
        isAuthenticated: true,
        user: parsedUser,
        token: storedToken,
        role: storedRole,
      });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      console.log("Attempting to log in with:", { email, password }); // Debug payload
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      console.log("Server Response:", response); // Log the server response
      const { token, user, role } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', role);

      setAuthState({
        isAuthenticated: true,
        user: user,
        token: token,
        role: role,
      });
    } catch (error) {
      console.error("Login failed - Error details:", error.response || error.message);
      console.error("Error Response Data:", error.response?.data); // Log the detailed error
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');

    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      role: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, loading, setAuthState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
