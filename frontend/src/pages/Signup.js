// File: /src/pages/Signup.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthContext';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // Default to an empty string
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (role === '') {
      setError('Please select a role before signing up.');
      return;
    }

    try {
      await signup(username, email, password, role);

      // Redirect to the specific dashboard based on the role
      navigate(`/${role.toLowerCase()}-dashboard`);
    } catch (error) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ display: 'block', margin: '10px 0', width: '100%', padding: '8px' }}
        />
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
        
        {/* Dropdown for role selection with a default placeholder */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ display: 'block', margin: '10px 0', width: '100%', padding: '8px' }}
        >
          <option value="" disabled>
            -- Select a Role --
          </option>
          <option value="Buyer">Buyer</option>
          <option value="Supplier">Supplier</option>
          <option value="Transporter">Transporter</option>
        </select>

        <button type="submit" style={{ padding: '10px 15px', marginTop: '10px' }}>Sign Up</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      
      {/* "Already have an account?" link */}
      <p style={{ marginTop: '20px' }}>
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
};

export default Signup;
