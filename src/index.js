import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { SidebarContextProvider } from './common/Sidebar/SidebarContext';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter basename="/">
    <Provider store={store}>
      <SidebarContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </SidebarContextProvider>
    </Provider>
  </BrowserRouter>,
);
