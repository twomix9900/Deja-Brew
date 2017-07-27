import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';


class DejaBrewNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle () {
    this.setState({open: !this.state.open});
  }

  handleClose () {
    this.setState({open: false});
  }


  goTo(route) {
    this.handleToggle();
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    // return (
    //   <div>
    //     <Navbar fluid style={{backgroundColor: 'transparent'}} className='navbar navbar-fixed-top'>
    //     <div className='container'>
    //       <Navbar.Header>
    //         {
    //           !this.props.auth.isAuthenticated() && (
    //             <Button
    //               className="btn btn-link"
    //               onClick={this.login.bind(this)}
    //             >
    //               Log In
    //               </Button>
    //           )
    //         }
    //         {
    //           this.props.auth.isAuthenticated() && (
    //             <Button
    //               className='btn btn-link'
    //               onClick={this.logout.bind(this)}
    //             >
    //               Log Out
    //               </Button>
    //           )
    //         }
    //         <Button
    //           className="btn btn-link"
    //           onClick={this.goTo.bind(this, 'home')}
    //         >
    //           Home
    //         </Button>
    //         {
    //           this.props.auth.isAuthenticated() && (
    //             <Button
    //               className="btn btn-link"
    //               onClick={this.goTo.bind(this, 'profile')}
    //             >
    //               Profile
    //               </Button>
    //           )
    //         }
    //       </Navbar.Header>
    //       </div>
    //     </Navbar>
    //   </div>
    // );

    
    return (
      <MuiThemeProvider>
        <div>
          <div className='container'>
          <RaisedButton
            label="MENU"
            onTouchTap={this.handleToggle.bind(this)}
          />
          <Drawer
            docked={false}
            width={300}
            open={this.state.open}
            onRequestChange={(open) => this.setState({ open })}
          >
            { !this.props.auth.isAuthenticated() && (<MenuItem onTouchTap={this.login.bind(this)}>Log in</MenuItem>) }
            { this.props.auth.isAuthenticated() && (<MenuItem onTouchTap={this.logout.bind(this)}>Log out</MenuItem>) }
            <MenuItem onTouchTap={this.goTo.bind(this, 'home')}>Home</MenuItem>
            { this.props.auth.isAuthenticated() && (<MenuItem onTouchTap={this.goTo.bind(this, 'profile')}>Profile</MenuItem>) }
            { this.props.auth.isAuthenticated() && (<MenuItem onTouchTap={this.goTo.bind(this, 'addBeer')}>Submit Beer</MenuItem>) }
            { this.props.auth.isAuthenticated() && (<MenuItem onTouchTap={this.goTo.bind(this, 'addBrewery')}>Submit Brewery</MenuItem>) }
            { this.props.auth.isAuthenticated() && (<MenuItem onTouchTap={this.goTo.bind(this, 'pendingDejaBrew')}>Pending DejaBrews...</MenuItem>) }
            <MenuItem onTouchTap={this.goTo.bind(this, 'faq')}>FAQs</MenuItem>
          </Drawer>
          </div>
        </div>
      </MuiThemeProvider>
    );

  }
}

export default DejaBrewNavBar;
