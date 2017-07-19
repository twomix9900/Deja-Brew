import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
// import { Route } from 'react-router';
// import FlatButton from 'material-ui/FlatButton';
import actions from '../../actions';
import { connect } from 'react-redux';

const styles = {
  card: {
    'paddingTop': 0
  }
};

class BeerListEntry extends React.Component {
  constructor(props) {
    super(props);
    console.log('props from BeerListEntry' ,props)
    this.state = {
      //locationValue: ''
    };
    this.selectVenue = this.selectVenue.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.navigateToDetailsPage = this.navigateToDetailsPage.bind(this);
  }

  handleClick(e, data) {
    e.preventDefault();
    this.selectVenue();
    this.navigateToDetailsPage();
  }

  selectVenue() {
    this.props.selectVenue(this.props.beer.breweries[0]);
  }

  navigateToDetailsPage () {
    this.props.history.push('/details');
  }

  render() {
    console.log(this.props, 'whats in here?')
    return (
      <Card>
        <CardHeader
          onClick={() => { this.handleClick(event, this) }}
          title={this.props.beer.breweries[0].name}
          subtitle={this.props.beer.name}
          showExpandableButton={true}
          avatar={this.props.beer.breweries[0].images ?
            this.props.beer.breweries[0].images.squareMedium
            : "../../images/No_picture_available.jpg"}
        />
        <CardText
          style={styles.card}
        >
          Website: <a href={this.props.beer.breweries[0].website} target="_blank">
            {this.props.beer.breweries[0].website}
          </a>
        </CardText>
        <CardText
          style={styles.card}
        >
          Phone: {!!this.props.beer.breweries[0].locations ?
            this.props.beer.breweries[0].locations[0].phone : 'No Phone Info'}
        </CardText>
        <CardText
          style={styles.card}
        >
          Located At: {!!this.props.beer.breweries[0].locations[0] ?
            this.props.beer.breweries[0].locations[0].streetAddress : ''}
          <br />
          {!!this.props.beer.breweries[0].locations[0] ?
            this.props.beer.breweries[0].locations[0].locality : ''}
          <br />
          {!!this.props.beer.breweries[0].locations[0] ?
            this.props.beer.breweries[0].locations[0].region : ''}
        </CardText>
        <CardText expandable={true}>
          {this.props.beer.breweries[0].description}
        </CardText>
      </Card>
    );
  }
}

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

export default connect(stateToProps, dispatchToProps)(BeerListEntry);

