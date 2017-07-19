import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Search from '../../components/Search/search.jsx';
import actions from '../../actions';
import { connect, Store } from 'react-redux';
import Paper from 'material-ui/Paper';

class Details extends React.Component {
  constructor(props) {
    console.log('props from Details! = ', props)
    super(props);
  }
  
  componentDidMount() {

  }

  render() {
    console.log('Details->this.props = ', this.props.venue);
    return (
      // <div>HI</div>
      <div>
        <MuiThemeProvider>
          <div>
            <Paper style={style} zDepth={5}>
              <h1>BEER NAME: {this.props.venue.selectedVenue.name}</h1>
              BREWERY ICON: {this.props.venue.selectedVenue.brewery.images ? <img src={this.props.venue.selectedVenue.brewery.images.large} alt="boohoo" className="img-responsive" /> : null}
              <h3>ABV: {this.props.venue.selectedVenue.abv}</h3>
              <h3>BREWERY ID: {this.props.venue.selectedVenue.breweryId}</h3>
              <h3>WEBSITE: {this.props.venue.selectedVenue.brewery.website}</h3>
              <p>{this.props.venue.selectedVenue.brewery.description}</p>
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