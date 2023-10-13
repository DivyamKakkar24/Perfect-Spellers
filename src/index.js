import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/auth-context';
import { Provider } from 'react-redux';
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
    <AuthContextProvider>
      <Provider store={store}><App /></Provider>
    </AuthContextProvider>
  
);

