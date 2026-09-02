import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

// Registro del service worker (lo genera Workbox en el build de producción):
// instala la PWA y sirve la web sin conexión tras la primera visita.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  const base = import.meta.env.BASE_URL;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${base}sw.js`, { scope: base }).catch(() => {});
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary label="la web">
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
