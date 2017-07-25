import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Search from '../../components/Search/search.jsx';
import actions from '../../actions';
import { connect, Store } from 'react-redux';
import Paper from 'material-ui/Paper';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import DrinkBuddy from '../DrinkBuddy/drinkBuddy.jsx';
import DetailsBeerList from '../Brewery/detailsBeerList.jsx';
import Pagination from '../Brewery/pagination.jsx';
import DetailsGoogleMaps from '../GoogleMaps/detailsGoogleMaps.jsx';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      beersFromBrewery: [],
      pageOfItems: []
    }
    this.sendDirections = this.sendDirections.bind(this);
    this.getBeersFromBrewery = this.getBeersFromBrewery.bind(this);
    this.renderBeerList = this.renderBeerList.bind(this);
    this.renderBrewInfo = this.renderBrewInfo.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
  }

  componentWillMount() {
    let info = JSON.parse(localStorage.getItem('userInfo'));
    this.setState({ userInfo: info });
    let brewInfo = this.props.venue.selectedVenue;
  }

  componentDidMount() {
    console.log('DETAILS THIS \n', this)
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
        <h1>{brewInfo.brewery ? brewInfo.brewery.name : brewInfo.name}</h1>
        <h5>
          {!brewInfo.images ? ' ' : <img src={brewInfo.images.squareMedium} alt=" " className="img-responsive" /> || brewInfo.brewery.images.squareMedium}
        </h5>
        <h3>
          {!brewInfo.hoursOfOperation ? ' ' : brewInfo.hoursOfOperation}
        </h3>
        <h4>
        </h4>
        <h4>
          <a href={brewInfo.website || brewInfo.brewery.website} target='_blank'>{brewInfo.website || brewInfo.brewery.website}</a>
        </h4>
        <p>
          {(brewInfo.description ? brewInfo.description : null) || (brewInfo.brewery ? brewInfo.brewery.description : ' ')}
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
  }

  onChangePage(pageOfItems) {
    this.setState({ pageOfItems: pageOfItems });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Paper style={style} zDepth={0}>
              {this.renderBrewInfo()}
              <h3>Beers by this brewery: </h3>
            </Paper>
            {this.state.pageOfItems.map((brewery, i) =>
              <DetailsBeerList
                key={i}
                brewery={brewery}
                history={this.props.history}
                breweryId={brewery.id}
              />
            )}
            <Pagination items={this.state.beersFromBrewery} onChangePage={this.onChangePage} />
            {this.props.venue.selectedVenue.locations.latitude ? <DetailsGoogleMaps venue={this.props.venue} style={style} /> : null}
            {<RaisedButton
              style={style.button}
              onClick={this.sendDirections.bind(this)}
              label='Get Directions'
            >
              <span className="Get Directions" />
            </RaisedButton>}
            {(this.state.userInfo && this.props.venue.selectedVenue.locations.latitude) ?
              <DrinkBuddy style={style} />
              : null}
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