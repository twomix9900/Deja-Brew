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

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }


  render() {
    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Auth0 - React</a>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </Button>
            {
              !this.props.auth.isAuthenticated() && (
                <Button
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.login.bind(this)}
                >
                  Log In
                  </Button>
              )
            }
            {
              this.props.auth.isAuthenticated() && (
                <Button
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.logout.bind(this)}
                >
                  Log Out
                  </Button>
              )
            }
          </Navbar.Header>
        </Navbar>
        <h1>Welcome to Deja-Brew</h1>
        <Profile />
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

  
        <AccessGoogle 
        beersMarker={this.state.BreweriesByBeerNameArray}
        breweriesMarker={this.state.BreweriesByBreweryNameArray}
        breweryLocationsMarker={this.state.BreweriesByLocationArray}/>
      </div>
    );
  }

}

export default App;
