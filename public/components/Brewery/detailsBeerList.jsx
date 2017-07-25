import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import axios from 'axios';
import { blue500, red500, yellow500 } from 'material-ui/styles/colors';

class DetailsBeerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card>
        <CardHeader
          title={this.props.beer ? this.props.beer.breweries[0].name : this.props.brewery.name}
          showExpandableButton={true}
          subtitle={this.props.brewery ? this.props.brewery.style.name : 'N/A'}
        />
        <CardText expandable={true}>
          {this.props.beer ? this.props.beer.breweries[0].description : this.props.brewery.style.description}
          <br />
          <br />
          <br />
          ABV: {this.props.brewery ? this.props.brewery.abv : 'N/A'}
        </CardText>
      </Card>
    );
  }
}

export default DetailsBeerList;

