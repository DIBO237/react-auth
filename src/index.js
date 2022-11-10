import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthProvider from './utils/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import store from './Redux/Store';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <AuthProvider>
    <App />
    </AuthProvider>
    </Provider>
  </React.StrictMode>
);

