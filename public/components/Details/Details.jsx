import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Search from '../../components/Search/search.jsx';
import actions from '../../actions';
import { connect, Store } from 'react-redux';
import Paper from 'material-ui/Paper';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import Pagination from '../Brewery/pagination.jsx';




class Details extends React.Component {
  constructor(props) {
    super(props);
    console.log('props from Details! = ', props)
    this.state = {
      userInfo: {},
      beersFromBrewery: [],
      pageOfItems: []
    }
    this.sendDirections = this.sendDirections.bind(this);
    this.getBeersFromBrewery = this.getBeersFromBrewery.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.renderBeerList = this.renderBeerList.bind(this);
  }
  
  componentWillMount() {
    console.log(this.state.beersFromBrewery)
    let info = JSON.parse(localStorage.getItem('userInfo'));
    this.setState({ userInfo: info });
    console.log('props in details beers brew-->',this.props.venue.selectedVenue.id);
    this.getBeersFromBrewery();
    // phone={ this.state.userInfo.phone }
  }

  getBeersFromBrewery() {
    axios.get('/brewery/beers/' + this.props.venue.selectedVenue.id)
    .then((data) => {
      //console.log('data from getBeersFromBrewery = ', data.data.data)
      this.setState({
        beersFromBrewery: data.data.data
      })
    })
    .catch((err) => console.log('getBeersFromBrewery err = ', err))
  }

  renderBeerList() {
    let beers = [];
    beers = this.state.beersFromBrewery.map((beer, idx) => {
      return (
        <div key={idx}>
          <li>Name: {beer.name}</li>
          <li>Type: {beer.style.name}</li>
          <li>Abv: {beer.abv}</li>
        </div>
      )
    })
    return beers;
  }

  onChangePage(pageOfItems) {
    //console.log('pageOfItems: ', pageOfItems)
      // update state with new page of items
      this.setState({ pageOfItems: this.state.beersFromBrewery });
  }

  sendDirections() {
    let queryName;

    this.props.venue.selectedVenue.name !== 'Main Brewery' ? queryName = this.props.venue.selectedVenue.name.split(' ').join('+') : queryName = this.props.selectedVenue.brewery.name.split(' ').join('+');

    // if (this.props.venue.selectedVenue.name !== 'Main Brewery') {
    //   queryName = this.props.venue.selectedVenue.name.split(' ').join('+');
    // } else {
    //   queryName = this.props.selectedVenue.brewery.name.split(' ').join('+');
    // }
    axios.get('/users/sendDirections/' + this.state.userInfo.phone.slice(3) + queryName)
    .then((data) => {
      console.log('data from sendDirections = ', data)  
    })
  }

  render() {
    console.log('beersFrBreweryDATA-->', this.state.beersFromBrewery);
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Paper style={style} zDepth={5}>              
              <h1>Brewery Name: {this.props.venue.selectedVenue.name || this.props.venue.selectedVenue.brewery.name}</h1>
              Brewery Icon: {this.props.venue.selectedVenue.images ? <img src={this.props.venue.selectedVenue.images.large} alt="boohoo" className="img-responsive" /> : null || this.props.venue.selectedVenue.brewery.images.large}
              <h3>Hours: {this.props.venue.selectedVenue.hoursOfOperation || this.props.venue.selectedVenue.locations.hoursOfOperation}</h3>
              <h3>Brewery Id: {this.props.venue.selectedVenue.id || this.props.venue.selectedVenue.breweryId}</h3>
              <h3>Website: {this.props.venue.selectedVenue.website || this.props.venue.selectedVenue.brewery.website}</h3>
              <p>Description: {this.props.venue.selectedVenue.description || this.props.venue.selectedVenue.brewery.description}</p>
              <h3>Beer List:</h3>
              <ul>
               {this.renderBeerList()}
              </ul> 
              <RaisedButton
                style={style.button}
                onClick={this.sendDirections.bind(this)}
                label='Get Directions'
              >
                <span className="Get Directions" />
              </RaisedButton>              
            </Paper>
            <Pagination items={this.state.beersFromBrewery} onChangePage={this.onChangePage}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
  
const style = {
  height: 2000,
  width: 1200,
  margin: 40,
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