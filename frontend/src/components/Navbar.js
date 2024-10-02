// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from './Auth/AuthContext';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #333;
  padding: 1rem;
`;

const NavLinks = styled.div`
  a {
    color: #fff;
    margin: 0 1rem;
    text-decoration: none;

    &:hover {
      color: #4caf50;
    }
  }
`;

const Navbar = () => {
  // State to track if the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { authState, logout } = useAuth();

  // Simulate checking login status
  useEffect(() => {
    // Placeholder for real login status check (e.g., API call or localStorage check)
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <NavbarContainer>
      <h1 style={{ color: '#fff' }}>CropCart</h1>
      <NavLinks>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
          {authState.isAuthenticated ? (
          <>
            <Link to="/profile">Profile ({authState.user.role})</Link>
            <Link to="/" onClick={logout}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
