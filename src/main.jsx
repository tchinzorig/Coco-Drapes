import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, MemoryRouter } from 'react-router-dom';
import App from './App.jsx';
import { HASH_ROUTING } from './utils/routing.js';
import './styles/global.css';

/* See src/utils/routing.js for why we pick HashRouter vs MemoryRouter. */
const Router = HASH_ROUTING ? HashRouter : MemoryRouter;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
