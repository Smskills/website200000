
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// SECURITY: Suppress console logs in production-like environments to prevent information leakage
if (window.location.hostname !== 'localhost') {
  console.log = () => {};
  console.debug = () => {};
  console.info = () => {};
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
