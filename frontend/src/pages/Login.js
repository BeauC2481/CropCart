// File: /src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // Verify if fields are not empty
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    try {
      await login(email, password);
      
      // Redirect based on the role after successful login
      const role = localStorage.getItem('role');
      if (role) {
        navigate(`/${role.toLowerCase()}-dashboard`);
      } else {
        navigate('/');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: 'block', margin: '10px 0', width: '100%', padding: '8px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: 'block', margin: '10px 0', width: '100%', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '10px 15px', marginTop: '10px' }}>Login</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      
      <p style={{ marginTop: '20px' }}>
        Don't have an account? <Link to="/signup">Sign up here</Link>.
      </p>
    </div>
  );
};

export default Login;
