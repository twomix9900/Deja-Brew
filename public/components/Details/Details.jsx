import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Search from '../../components/Search/search.jsx';
import actions from '../../actions';
import { connect, Store } from 'react-redux';
import Paper from 'material-ui/Paper';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';

class Details extends React.Component {
  constructor(props) {
    super(props);
    console.log('props from Details! = ', props)
    this.state = {
      userInfo: {}
    }
    this.sendDirections = this.sendDirections.bind(this);
  }
  
  componentDidMount() {
    let info = JSON.parse(localStorage.getItem('userInfo'));
    this.setState({ userInfo: info });
    // phone={ this.state.userInfo.phone }
  }

  sendDirections() {
    let queryName;
    if (this.props.venue.selectedVenue.name !== 'Main Brewery') {
      queryName = this.props.venue.selectedVenue.name.split(' ').join('+');
    } else {
      queryName = this.props.selectedVenue.brewery.name.split(' ').join('+');
    }
    console.log('Button pressed, this.props.venue.selectedVenue.name = ', this.props.venue.selectedVenue.name);
    console.log('queryName from Details page = ', queryName)
    axios.get('/users/sendDirections/' + this.state.userInfo.phone.slice(3) + queryName)
    .then((data) => {
      console.log('data from sendDirections = ', data)  
    })
  }

  render() {
    console.log('Details->this.props = ', this.props.venue);
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Paper style={style} zDepth={5}>
              {/* <h1>BEER NAME: {this.props.venue.selectedVenue.name}</h1>
               BREWERY ICON: {this.props.venue.selectedVenue.brewery.images ? <img src={this.props.venue.selectedVenue.brewery.images.large} alt="boohoo" className="img-responsive" /> : null} 
              <h3>ABV: {this.props.venue.selectedVenue.abv}</h3>
              <h3>BREWERY ID: {this.props.venue.selectedVenue.breweryId}</h3>
              <h3>WEBSITE: {this.props.venue.selectedVenue.brewery.website}</h3>
              <p>{this.props.venue.selectedVenue.brewery.description}</p>   */}
              <RaisedButton
                style={style.button}
                onClick={this.sendDirections.bind(this)}
                label='Get Directions'
              >
                <span className="Get Directions" />
              </RaisedButton>
            </Paper>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
  
const style = {
  height: 1000,
  width: 1000,
  margin: 20,
  textAlign: 'left',
  display: 'inline-block',
  backgroundColor: '#FFCC80',
  button: {
    margin: 20,
    height: 40
  }
};

const stateToProps = (state) => {
  return {
    venue: state.venue
  }
}

const dispatchToProps = (dispatch) => {
  return {
    selectVenue: (venue) => {
      dispatch(actions.selectVenue(venue));
    }
  }
}

export default connect(stateToProps, dispatchToProps)(Details);