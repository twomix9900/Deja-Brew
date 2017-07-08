import React, { Component } from 'react';
import Search from './search.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      breweries: []
    }
  }

  handleBrewerySearch() {
    this.setState = {

    }
  }

  render() {
    return (
      <div><strong>Welcome to Deja-Brew</strong>
      <MuiThemeProvider>
        <Search results = {this.state.results} />
      </MuiThemeProvider>
      <breweryList breweries={this.state.results}/>

      </div>
    );
  }

}

export default App;
