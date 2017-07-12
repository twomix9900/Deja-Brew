import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
// import Auth from '../../auth/Auth'

class DejaBrewNavBar extends React.Component {
  constructor(props) {
    super(props);
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
              <a href="#">Deja-Brew</a>
            </Navbar.Brand>

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
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </Button>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'profile')}
            >
              Profile
            </Button>
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}

export default DejaBrewNavBar;