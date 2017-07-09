import React, { Component } from 'react';
import Search from './Search/search.jsx';
import BreweryList from './Brewery/breweryList.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: []
    };
  }

  handleSearch(searchData) {
    this.setState({
      searchResults: searchData
    });
    console.log('searchResults ', this.state.searchResults)
  }

  render() {
    return (
      <div>
        <h1>Welcome to Deja-Brew</h1>
        <MuiThemeProvider>
          <Search handleSearch={this.handleSearch.bind(this)}/>
        </MuiThemeProvider>
          <BreweryList breweries={this.state.searchResults}/>
      
      <Profile />
      
      
      </div>
    );
  }

}

export default App;
