import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
/*import { Auth0Provider } from "@auth0/auth0-react";




ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

ReactDOM.render(
  <Auth0Provider
    domain="dev-u1te5s3mbwu4tv5f.us.auth0.com"
    clientId="8WisnLlIMF7mcWTwkxYIdtBpqIr4Ssjv"
    redirectUri={window.location.origin}
  >
    <BrowserRouter>    <App />
</BrowserRouter>
  </Auth0Provider>,
  document.getElementById("root")
);
*/
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);


