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
import DialogMsg from '../Dialog/DialogMsg.jsx'

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      beersFromBrewery: [],
      pageOfItems: [],
      open: false,
      msgTitle: 'Incomplete Profile',
      msgBody: 'Missing phone number.  Cannot send directions to nobody.  Please complete your profile and try again.'
    }
    this.sendDirections = this.sendDirections.bind(this);
    this.getBeersFromBrewery = this.getBeersFromBrewery.bind(this);
    this.renderBrewInfo = this.renderBrewInfo.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.handler = this.handler.bind(this);
  }

  componentWillMount() {
    if (!this.props.venue.selectedVenue) { this.props.history.push('/home'); }
    let info = JSON.parse(localStorage.getItem('userInfo'));
    this.setState({ userInfo: info });
  }

  componentDidMount() {
    console.log('DETAILS THIS', this);
    if (this.props.venue.selectedVenue || this.props.venue.selectedVenue.brewery) {
      this.getBeersFromBrewery();
    } else {
      this.props.history.push('home');
    }
  
  }

  getBeersFromBrewery() {
    let beersData;
    beersData = this.props.venue.selectedVenue.brewery || this.props.venue.selectedVenue;
    if (beersData) {
      console.log('this.props.venue.selectedVenue.brewery \n', beersData)
      axios.get('/brewery/beers/' + beersData.id)
        .then((data) => {
          console.log('1 data \n', data)
          this.setState({
            beersFromBrewery: data.data.data
          })
        })
        .catch((err) => console.log('getBeersFromBrewery err = ', err))
    }
  }

  renderBrewInfo() {
    if (!this.props.venue.selectedVenue) { this.props.history.push('/home'); }
    else {
      let brewInfo = this.props.venue.selectedVenue.brewery || this.props.venue.selectedVenue ;
      let website = brewInfo.website; 
      return (
        <div>
          <div><h1>{brewInfo.brewery ? brewInfo.brewery.name : brewInfo.name}</h1></div>
          <div className='maps-container' style={{ display: 'flex', justifyContent: 'space-between', minWidth: '500px', maxWidth: '1600px' }}>
            <div style={{ order: '1', width: '45%', minHeight: '300px', height: 'auto' }}><h3>
              {!brewInfo.images ? ' ' : <img src={brewInfo.images.squareMedium} alt=" " className="img-responsive" /> || brewInfo.brewery.images.squareMedium}
            </h3></div>
            <div style={{ order: '2', width: '45%', minHeight: '300px', height: 'auto' }}><h3>
              {this.props.venue.selectedVenue ? <DetailsGoogleMaps venue={this.props.venue} style={style} /> : null}
            </h3></div>
            <div style={{ justifyContent: 'flex-end', order: '3' }}>
            <RaisedButton
              style={style.button}
              onClick={this.sendDirections.bind(this)}
              label='Directions'
              fullWidth='true'
            >
            </RaisedButton></div>
          </div>
          <div><h3>
            {!brewInfo.hoursOfOperation ? ' ' : brewInfo.hoursOfOperation}
          </h3></div>
          <div><h4>
               <a href={website || ' '} target='_blank'>{website || ' '}</a>   
          </h4></div>
          <div><p>
            {(brewInfo.description ? brewInfo.description : null) || (brewInfo.brewery ? brewInfo.brewery.description : ' ')}
          </p></div>
        </div>
      )

    }
  }

  sendDirections() {
    if (this.state.userInfo.phone) {
      let queryName;
      this.props.venue.selectedVenue.name !== 'Main Brewery' ? queryName = this.props.venue.selectedVenue.name.split(' ').join('+') : queryName = this.props.selectedVenue.brewery.name.split(' ').join('+');
      axios.get('/directions/user/' + this.state.userInfo.phone.slice(3) + queryName)
    } else {
      this.setState({ open: true })
    }
  }

  onChangePage(pageOfItems) {
    this.setState({ pageOfItems: pageOfItems });
  }

  handler() {
    this.setState({ open: false })
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div className='container' style={{minWidth: '500px', maxWidth: '1600px'}}>
            <Paper style={style} zDepth={0}>
              {this.renderBrewInfo()}
              <h3>Beers by this brewery: </h3>
            </Paper>
            <br/>
            {this.state.pageOfItems.map((brewery, i) =>
              <div style={{ minWidth: '500px', maxWidth: '1600px' }}>
                <DetailsBeerList
                  key={i}
                  brewery={brewery}
                  history={this.props.history}
                  breweryId={brewery.id}
                />
              </div>
            )}
            <div className='pagination-container' style={{display: 'flex'}}>
              <div style={{justifyContent: 'flex-start', order: '1'}}><Pagination items={this.state.beersFromBrewery || []} onChangePage={this.onChangePage} /></div>
            </div>
            {this.state.userInfo ?
              <DrinkBuddy style={style} />
              : null}
            <DialogMsg open={ this.state.open} handler={ this.handler } msgTitle={ this.state.msgTitle } msgBody={ this.state.msgBody }/> 
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