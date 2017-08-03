import history from './history';
import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';

import axios from 'axios';

export default class Auth {

  constructor() {
    this.service = new auth0.WebAuth({
      domain: AUTH_CONFIG.domain,
      clientID: AUTH_CONFIG.clientId,
      redirectUri: AUTH_CONFIG.callbackUrl,
      audience: `https://${AUTH_CONFIG.domain}/userinfo`,
      responseType: 'token id_token',
      scope: 'openid profile email'
    });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    this.service.authorize();
  }

  handleAuthentication() {
    this.service.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
//        history.replace('/home');
      } else if (err) {
        history.replace('/home');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    console.log('setting session')
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('auth0Id', authResult.idTokenPayload.sub);
    localStorage.setItem('expires_at', expiresAt);
    axios.post('/users', { auth0Id: authResult.idTokenPayload.sub })
    // navigate to the home route
    .then(() => {
      axios.get('/users/' + authResult.idTokenPayload.sub)
      .then((data) => {
        localStorage.setItem('userInfo', JSON.stringify(data.data[0]));
        history.replace('/home');
      })
    })
    .catch((err) => {
      console.log('error in setting user info', err);
      history.replace('/home');
    })
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('auth0Id');
    localStorage.removeItem('userInfo');
    // navigate to the home route
    history.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
