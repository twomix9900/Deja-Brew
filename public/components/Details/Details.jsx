import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Search from '../../components/Search/search.jsx';
import actions from '../../actions';
import { connect, Store } from 'react-redux';
import Paper from 'material-ui/Paper';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import DrinkBuddy from '../DrinkBuddy/drinkBuddy.jsx'


class Details extends React.Component {
  constructor(props) {
    super(props);
    console.log('props from Details! = ', props)
    this.state = {
      userInfo: {},
      beersFromBrewery: []
    }
    this.sendDirections = this.sendDirections.bind(this);
    this.getBeersFromBrewery = this.getBeersFromBrewery.bind(this);
    this.renderBeerList = this.renderBeerList.bind(this);
    this.renderBrewInfo = this.renderBrewInfo.bind(this);
  }
  
  componentWillMount() {
    console.log(this.state.beersFromBrewery)
    let info = JSON.parse(localStorage.getItem('userInfo'));
    this.setState({ userInfo: info });
    let brewInfo = this.props.venue.selectedVenue;
    console.log('props in details beers brew-->', brewInfo);
    this.getBeersFromBrewery();
  }
 
  getBeersFromBrewery() {
    axios.get('/brewery/beers/' + this.props.venue.selectedVenue.id)
    .then((data) => {
      this.setState({
        beersFromBrewery: data.data.data
      })
    })
    .catch((err) => console.log('getBeersFromBrewery err = ', err))
  }

  renderBrewInfo() {
    let brewInfo = this.props.venue.selectedVenue;
      return (
        <div>
          <h1>Name: {brewInfo.brewery ? brewInfo.brewery.name : brewInfo.name}</h1>
          <h5>Icon: 
            {/*{(brewInfo.brewery.images ? brewInfo.brewery.images.large : 'no pic') || (brewInfo.images ? brewInfo.images.large : 'no pic')} */}
            {!brewInfo.images ? 'No photo found' : <img src={brewInfo.images.squareMedium} alt="boohoo" className="img-responsive" /> || brewInfo.brewery.images.squareMedium}
          </h5>
          <h3>
            Hours: {!brewInfo.hoursOfOperation ? 'No hours listed' : brewInfo.hoursOfOperation}
          </h3>
          <h4>
            BreweryId: {(brewInfo.breweryId ? brewInfo.breweryId : brewInfo.id) || (brewInfo.id ? brewInfo.id : 'No id')}
          </h4>
          <h4>
            Website:{/*{(brewInfo.brewery.website ? brewInfo.brewery.website : brewInfo.website) || (brewInfo.website ? brewInfo.website : 'no website')}*/}
            {brewInfo.website || brewInfo.brewery.website}
          </h4>
          <p>
            Description:{/*{(brewInfo.brewery.description ? brewInfo.brewery.description : 'no description') || (brewInfo.description ? brewInfo.description : 'no description')}*/}
            {brewInfo.description || brewInfo.brewery.description}
          </p>
        </div>
      )
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

  sendDirections() {
    let queryName;

    this.props.venue.selectedVenue.name !== 'Main Brewery' ? queryName = this.props.venue.selectedVenue.name.split(' ').join('+') : queryName = this.props.selectedVenue.brewery.name.split(' ').join('+');

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
              {this.renderBrewInfo()}
              <h3>Beer List: </h3>
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
              {( this.state.userInfo ) ? (
                <DrinkBuddy />
              ) : (
                <div></div>
              )}
            </Paper>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
  
const style = {
  height: 'auto',
  width: 'auto',
  margin: 'auto',
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