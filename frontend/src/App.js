import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthProvider } from './components/Auth/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SupplierDashboard from './pages/SupplierDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import TransporterDashboard from './pages/TransporterDashboard';
import { checkAuth } from './services/authService';
import { loginSuccess } from './store/authSlice';
import GlobalStyles from './styles/GlobalStyles';

// Custom PrivateRoute for Role-Based Protection
const PrivateRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  if (!isAuthenticated) return <Navigate to="/login" />;
  return allowedRoles.includes(role) ? children : <Navigate to="/" />;
};

const App = () => {
  const dispatch = useDispatch();

  // On component mount, verify if the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify the token and user details from the backend
      checkAuth(token).then((data) => {
        if (data) {
          dispatch(
            loginSuccess({
              user: data.user,
              token,
              role: data.role,
            })
          );
        }
      });
    }
  }, [dispatch]);

  return (
    <AuthProvider>
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
            path="/dashboard"
            element={
              <PrivateRoute allowedRoles={['Supplier', 'Buyer', 'Transporter']}>
              </PrivateRoute>
            }
          />
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
    </AuthProvider>
  );
};

export default App;
