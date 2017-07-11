import React, { Component } from 'react';
import Search from './Search/search.jsx';
import BreweryList from './Brewery/breweryList.jsx';
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
      searchResults: []
    };
  }

  handleSearch(searchData) {
    this.setState({
      searchResults: searchData
    });
    console.log('searchResults ', this.state.searchResults)
  }

  handleBeerSearch(searchData) {

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
          <Search handleSearch={this.handleSearch.bind(this)} />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <BreweryList breweries={this.state.searchResults} />
        </MuiThemeProvider>
        <AccessGoogle />
      </div>
    );
  }

}

export default App;
