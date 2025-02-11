// import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from './redux/store';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <BrowserRouter basename="/">
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </BrowserRouter>,
  // </React.StrictMode>,
);
