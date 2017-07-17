import React, { Component } from 'react';
import Search from './Search/search.jsx';
import BreweryList from './Brewery/breweryList.jsx';
import DejaBrewTabs from './Brewery/dejaBrewTabs.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Profile from './Profile/Profile.jsx';
import { Navbar, Button } from 'react-bootstrap';
import AccessGoogle from './GoogleMaps/googlemaps.jsx';
import Details from './Details/Details.jsx';
import Route from 'react-router';

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
      BreweriesByBeerNameArray: searchData,
      BreweriesByLocationArray: []
    });
    console.log('BreweriesByBeerNameArray ', this.state.BreweriesByBeerNameArray)
  }

  handleBreweriesByBreweryNameSearch(searchData) {
    this.setState({
      BreweriesByBreweryNameArray: searchData,
      BreweriesByLocationArray: []
    });
    console.log('BreweriesByBreweryNameArray ', this.state.BreweriesByBreweryNameArray)
  }

    handleBreweriesByLocationSearch(searchData) {
    this.setState({
      BreweriesByLocationArray: searchData,
      BreweriesByBeerNameArray: [],
      BreweriesByBreweryNameArray: []
    });
    console.log('BreweriesByLocationArray ', this.state.BreweriesByLocationArray)
  }

    render() {
      console.log('rendering app', this.props);
      return (
        <div className="backgroundImage">
          <div className="container">
          <h1 className="headerStyle">Welcome to Deja-Brew</h1>
          <MuiThemeProvider>
            <Search
              handleBreweriesByBeerNameSearch={this.handleBreweriesByBeerNameSearch.bind(this)}
              handleBreweriesByBreweryNameSearch={this.handleBreweriesByBreweryNameSearch.bind(this)}
              handleBreweriesByLocationSearch={this.handleBreweriesByLocationSearch.bind(this)}
            />
          </MuiThemeProvider>
          <AccessGoogle 
              beersMarker={this.state.BreweriesByBeerNameArray}
              breweriesMarker={this.state.BreweriesByBreweryNameArray}
              breweryLocationsMarker={this.state.BreweriesByLocationArray}
          />
          <MuiThemeProvider>
            <DejaBrewTabs
              history={this.props.history}
              beers={this.state.BreweriesByBeerNameArray}
              breweries={this.state.BreweriesByBreweryNameArray}
              breweryLocations={this.state.BreweriesByLocationArray}
            />
          </MuiThemeProvider>
          </div>
        </div>
      );
    }

}

export default App;
