//entry point for react app

import React from 'react';
import { render } from 'react-dom';
import { MemoryRouter } from 'react-router';
import App from './app.jsx';
import ReactDOM from 'react-dom/client';

// import styles from './styles/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <React.StrictMode>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </React.StrictMode>
  </div>
);
