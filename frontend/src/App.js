// File: /src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AuthProvider, useAuth } from './components/Auth/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SupplierDashboard from './pages/SupplierDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import TransporterDashboard from './pages/TransporterDashboard';
import { loginSuccess } from './store/authSlice';
import GlobalStyles from './styles/GlobalStyles';

// Custom PrivateRoute for Role-Based Protection
const PrivateRoute = ({ children, allowedRoles }) => {
  const { authState, loading } = useAuth();

  // If loading, don't render anything until authState is ready
  if (loading) return null;

  if (!authState.isAuthenticated) return <Navigate to="/login" />;

  return allowedRoles.includes(authState.role) ? children : <Navigate to="/" />;
};


const App = () => {
  const dispatch = useDispatch();
  const { setAuthState } = useAuth();

  useEffect(() => {
    // Set auth state based on local storage values
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    if (token && user && role) {
      setAuthState({
        isAuthenticated: true,
        user: JSON.parse(user),
        token: token,
        role: role,
      });
      dispatch(
        loginSuccess({
          token: token,
          user: JSON.parse(user),
          role: role,
        })
      );
    }
  }, [dispatch, setAuthState]);

  return (
    <Router>
      <GlobalStyles />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Role-Based Protected Routes */}
        <Route
          path="/supplier-dashboard"
          element={
            <PrivateRoute allowedRoles={['Supplier']}>
              <SupplierDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/buyer-dashboard"
          element={
            <PrivateRoute allowedRoles={['Buyer']}>
              <BuyerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/transporter-dashboard"
          element={
            <PrivateRoute allowedRoles={['Transporter']}>
              <TransporterDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

const WrappedApp = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default WrappedApp;
