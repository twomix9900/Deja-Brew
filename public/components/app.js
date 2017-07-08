import React, { Component } from 'react';

import Profile from './Profile/Profile.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div><strong>Welcome to Deja-Brew</strong>
      <Profile />
      
      
      </div>
      );
    }

}

export default App;
