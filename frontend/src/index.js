import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import App from './App';
import { AuthProvider } from './components/Auth/AuthContext'; // Import AuthProvider
import { Provider } from 'react-redux';
import store from './store';
import './index.css';

// Use createRoot instead of ReactDOM.render
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Wrap the entire app with AuthProvider */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>,
  </React.StrictMode>
);
