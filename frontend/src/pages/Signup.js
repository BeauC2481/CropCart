import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Updated the URL to point to the correct backend server
      await axios.post('http://localhost:5000/api/auth/signup', { username, email, password, role });
      alert('Signup Successful');
    } catch (err) {
      alert('Signup Failed: ' + err.response.data);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="Supplier">Supplier</option>
          <option value="Buyer">Buyer</option>
          <option value="Transporter">Transporter</option>
        </select>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
