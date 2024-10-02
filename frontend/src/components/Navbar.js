// File: /src/components/Navbar.js
import React, { useEffect } from 'react';
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
  const { authState, logout } = useAuth();

  useEffect(() => {
    // Log the current authState to check when role is set
    console.log("Navbar Rendered - Auth State:", authState);
  }, [authState]);

  return (
    <NavbarContainer>
      <h1 style={{ color: '#fff' }}>CropCart</h1>
      <NavLinks>
        <Link to="/">Home</Link>
        {authState.isAuthenticated && authState.user ? (
          <>
            {/* Use authState.role instead of authState.user.role */}
            {authState.role ? (
              <Link to={`/${authState.role.toLowerCase()}-dashboard`}>{authState.user.username}</Link>
            ) : (
              <span style={{ color: '#fff' }}>Role not set in Navbar</span>
            )}
            <Link to="/" onClick={logout}>Logout</Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
