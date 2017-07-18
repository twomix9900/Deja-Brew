import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

const styles = {
  card: {
    'paddingTop': 0
  }
};

class BreweryListEntry extends React.Component {
  constructor(props) {
    super(props);
    console.log('props from BreweryListEntry' ,props)
    this.state = {
      locationValue: ''
    };
  }
  
  render() {
    return (
      <Card>
      <CardHeader
        
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

export default BreweryListEntry;
