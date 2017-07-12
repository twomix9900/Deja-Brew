import React, { Component } from 'react';
import Search from './Search/search.jsx';
import BreweryList from './Brewery/breweryList.jsx';
import DejaBrewTabs from './Brewery/dejaBrewTabs.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Profile from './Profile/Profile.jsx';
import { Navbar, Button } from 'react-bootstrap';
import AccessGoogle from './GoogleMaps/googlemaps.jsx';

injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      BreweriesByLocationArray: [],
      BreweriesByBeerNameArray: [],
      BreweriesByBreweryNameArray: []
    };
  }

  handleBreweriesByBeerNameSearch(searchData) {
    this.setState({
      BreweriesByBeerNameArray: searchData
    });
    console.log('BreweriesByBeerNameArray ', this.state.BreweriesByBeerNameArray)
  }

  handleBreweriesByBreweryNameSearch(searchData) {
    this.setState({
      BreweriesByBreweryNameArray: searchData
    });
    console.log('BreweriesByBreweryNameArray ', this.state.BreweriesByBreweryNameArray)
  }

    handleBreweriesByLocationSearch(searchData) {
    this.setState({
      BreweriesByLocationArray: searchData
    });
    console.log('BreweriesByLocationArray ', this.state.BreweriesByLocationArray)
  }

    render() {
      return (
        <div>
          <h1>Welcome to Deja-Brew</h1>
          <MuiThemeProvider>
            <Search
              handleBreweriesByBeerNameSearch={this.handleBreweriesByBeerNameSearch.bind(this)}
              handleBreweriesByBreweryNameSearch={this.handleBreweriesByBreweryNameSearch.bind(this)}
              handleBreweriesByLocationSearch={this.handleBreweriesByLocationSearch.bind(this)}
            />
          </MuiThemeProvider>
          <MuiThemeProvider>
            <DejaBrewTabs
              beers={this.state.BreweriesByBeerNameArray}
              breweries={this.state.BreweriesByBreweryNameArray}
              breweryLocations={this.state.BreweriesByLocationArray}
            />
          </MuiThemeProvider>
          <AccessGoogle />
        </div>
      );
    }

}

export default App;
