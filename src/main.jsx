import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, MemoryRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/global.css';

/* HashRouter works on any static host (GitHub Pages, custom domains,
   local files) with no server configuration. In sandboxed previews
   (srcdoc/blob iframes) the page has no usable URL, so we fall back to
   MemoryRouter, which keeps routing entirely in JS.
   If you later move to a host with URL rewrites (Netlify, Vercel), an
   engineer can switch to BrowserRouter for clean URLs. */
function hashRoutingAvailable() {
  try {
    // Throws when the document base can't anchor a URL (about:srcdoc, blob:).
    void new URL('/', window.location.href);
    return true;
  } catch {
    return false;
  }
}

const Router = hashRoutingAvailable() ? HashRouter : MemoryRouter;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
