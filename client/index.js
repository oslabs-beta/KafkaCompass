//entry point for react app

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app.jsx';
import ReactDOM from 'react-dom/client';


// import styles from './styles/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    </div>
)