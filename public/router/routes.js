import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import App from '../components/app';
import Home from '../Auth/Home/Home';
import Callback from '../Auth/Callback/Callback';
import Auth from '../Auth/Auth';
import history from '../Auth/history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}



export const makeMainRoutes = () => {
  // let userId = null;
  // if (auth.isAuthenticated()) {
  //   // sets the localStorage to the user sub
  //   // so we can post the user sub to the database
  //   // if they are not in the database
  //   auth.getUserInfo().client.userInfo(localStorage.access_token, function (err, user) {
  //     // sets the userId 
  //     userId = user.sub
  //     postNewUser(user.sub)
  //       .then((res) => {
  //         getOneUser(user.sub)
  //           .then((res) => {
  //             localStorage.setItem('userId', res.data[0].id)
  //             localStorage.setItem('userSub', res.data[0].idToken)
  //           })
  //           .catch(err => console.log(err))
  //       })
  //       .catch(err => console.log(err))
  //   })
  // }


  return (
      <BrowserRouter history={history} component={App}>
        <div>
          <Route path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Home auth={auth} userId={localStorage.userId} {...props} />
          }}/>
        </div>
      </BrowserRouter>
  );
}

            // <Home auth={auth} {...props} /> 