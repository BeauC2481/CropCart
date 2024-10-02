// File: /src/services/authService.js

// Synchronous version of checkAuth
export const checkAuth = () => {
    const token = localStorage.getItem('token');
    return !!token; // Return true if token exists, otherwise false
  };
  