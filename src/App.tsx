import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import GlobalStyle from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './contexts/AuthContext';
import { Routers } from './services/routes'

// App Component
function App() {
  const clientId = "1044824281549-0rcnflv2sh7r6tvtcat3juju5hqauee2.apps.googleusercontent.com";

  return (
    <>
      <AuthProvider>
        <GoogleOAuthProvider clientId={clientId}>
          <GlobalStyle />
          <Router>
              <Routers />
          </Router>
        </GoogleOAuthProvider>
      </AuthProvider>
    </>
  );
}

export default App;
