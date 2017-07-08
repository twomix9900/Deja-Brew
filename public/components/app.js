import React, { Component } from 'react';
import Search from './search.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div><strong>Welcome to Deja-Brew</strong>
      <MuiThemeProvider>
        <Search />
      </MuiThemeProvider>

      </div>
    );
  }

}

export default App;
