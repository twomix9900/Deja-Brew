import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

const styles = {
  card: {
    'paddingTop': 0
  },
  hoursOfOperation: {
    'padding': '0px 16px 16px 0px',
    'float': 'right',
    'maxWidth' : '260'
  }
};

class BreweryLocationsListEntry extends React.Component {
  constructor(props) {
    super(props);
    console.log('props from BreweryLocationsListEntry' ,props)

  }
  
  render() {
    return (
      <Card>
      <CardHeader
        title={this.props.brewery.brewery.name}
        showExpandableButton={true}
        avatar={this.props.brewery.brewery.images ? 
                this.props.brewery.brewery.images.squareMedium 
                :"../../images/No_picture_available.jpg"}
      />
      <CardText style={styles.hoursOfOperation}>
      {this.props.brewery.hoursOfOperation ? Hours: <br /> {this.props.brewery.hoursOfOperation} : ''}
      </CardText>
      <CardText style={styles.card}>
        Website: <a href={this.props.brewery.brewery.website} target="_blank">
            {this.props.brewery.brewery.website}
        </a>
      </CardText>
      <CardText style={styles.card}>
        Phone: {!!this.props.brewery.phone ?
        this.props.brewery.phone : 'No Phone Info'}
      </CardText>
      <CardText style={styles.card}>
        {!!this.props.brewery.streetAddress ? 
        this.props.brewery.streetAddress : 'No Street Info'}
        <br />
        {!!this.props.brewery.locality ?
        this.props.brewery.locality + ', ': ''} 
        {!!this.props.brewery.region ? 
        this.props.brewery.region : ''}
      </CardText>
      <CardText expandable={true}>
        {this.props.brewery.brewery.description}
      </CardText>
    </Card>
    );
  }
}

export default BreweryLocationsListEntry;
