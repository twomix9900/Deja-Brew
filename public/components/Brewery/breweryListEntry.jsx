import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import actions from '../../actions';
import { connect } from 'react-redux';

const styles = {
  card: {
    'paddingTop': 0
  }
};

class BreweryListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationValue: ''
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
    this.props.selectVenue(this.props.brewery);
  }

  navigateToDetailsPage () {
    this.props.history.push('/details');
  }
  
  render() {
    return (
      <Card>
      <CardHeader
        onClick={() => { this.handleClick(event, this) }}
        title={this.props.brewery.name}
        showExpandableButton={true}
        avatar={this.props.brewery.images ? 
                this.props.brewery.images.squareMedium 
                :"../../images/No_picture_available.jpg"}
      />
      <CardText 
      style={styles.card}
      >
        Website: <a href={this.props.brewery.website} target="_blank">
            {this.props.brewery.website}
        </a>
      </CardText>
      <CardText 
      style={styles.card}
      >
        Phone: {!!this.props.brewery.locations ?
          this.props.brewery.locations[0].phone : 'No phone Info'}
      </CardText>
      <CardText 
      style={styles.card}
      >
        {!!this.props.brewery.locations ? 
          this.props.brewery.locations[0].streetAddress : 'No Street Info'}
          <br />
        {!!this.props.brewery.locations ?
          this.props.brewery.locations[0].locality + ', ': ''}
        {!!this.props.brewery.locations ? 
          this.props.brewery.locations[0].region : ''}
      </CardText>
      <CardText expandable={true}>
        {this.props.brewery.description}
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

export default connect(stateToProps, dispatchToProps)(BreweryListEntry);