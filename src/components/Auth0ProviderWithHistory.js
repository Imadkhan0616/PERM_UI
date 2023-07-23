/*import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";


const Auth0ProviderWithHistory = ({ children }) => {
  const navigate = useNavigate();
 

  const onRedirectCallback = (appState) => {
    navigate.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
     domain = 'dev-u1te5s3mbwu4tv5f.us.auth0.com'
     clientId = '8WisnLlIMF7mcWTwkxYIdtBpqIr4Ssjv'
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback} >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;*/