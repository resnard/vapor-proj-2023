import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux'
import store from './store'
import App from './App';

import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <Provider store={store}>
     <GoogleOAuthProvider clientId="462166371047-894rt6jnhp563vur2hen3qei3ufmpem2.apps.googleusercontent.com">
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
    </GoogleOAuthProvider>
  </Provider>
 
);



