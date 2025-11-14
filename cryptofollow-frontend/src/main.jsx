// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importar
import App from './App.jsx';
import './index.css'; // CSS Global

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Envolve o App */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);