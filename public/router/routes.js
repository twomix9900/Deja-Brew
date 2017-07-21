import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import App from '../components/app';
import Callback from '../auth/Callback/Callback';
import Auth from '../auth/Auth';
import Profile from '../components/Profile/Profile.jsx';
import history from '../auth/history';
import DejaBrewNavBar from '../components/Navbar/DejaBrewNavBar.jsx';
import Landing from '../components/Navbar/Landing/Landing.jsx';
import Details from '../components/Details/Details.jsx';
import store from '../stores';
import { Provider } from 'react-redux';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Provider store={store.configure(null)}>
      <BrowserRouter history={history}>
        <div>
          <Route path='/' render={(props) => <DejaBrewNavBar auth={auth} {...props} />} />
          <Switch>
            <Route path="/home" render={(props) => <App auth={auth} {...props} />} />
            <Route path="/profile" render={(props) => <Profile auth={auth} {...props} />} />
            <Route path="/details" render={(props) => <Details {...props} />} />
            <Route path="/callback" render={(props) => {
              handleAuthentication(props);
              return <Callback auth={auth} userId={localStorage.userId} {...props} />
            }}/>
            <Route path="/*" render={(props) => <Landing auth={auth} {...props} />} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}