// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // You can still keep this if you want to use it for other styles
import './styles/_globals.scss'; // Import global styles
import './styles/Navbar.scss'; // Import global styles
import './styles/App.scss'; // Import global styles
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <Provider store={store}>    <App />
     </Provider>

  </React.StrictMode>
);

