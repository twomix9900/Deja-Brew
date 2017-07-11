import React, { Component } from 'react';
import {
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

class BeerListEntry extends React.Component {
  constructor(props) {
    super(props);
    console.log('props from BeerListEntry' ,props)
    this.state = {
      locationValue: ''
    };
  }

  render() {
    return (
        <TableRow>
          <TableRowColumn>
           {this.props.beer.name}
          </TableRowColumn>
          {/*<TableRowColumn>{this.props.breweries[0].id}</TableRowColumn>*/}
          <TableRowColumn>
            <img src={this.props.beer.breweries[0].images ? 
             this.props.beer.breweries[0].images.icon 
            :"../../images/No_picture_available.jpg"}/>
          </TableRowColumn>
          <TableRowColumn>
           {this.props.beer.breweries[0].name}
          </TableRowColumn>
          <TableRowColumn>
            <a href={this.props.beer.breweries[0].website}>
            {this.props.beer.breweries[0].website}
            </a>
            </TableRowColumn>
          <TableRowColumn>
            {!!this.props.beer.breweries[0].locations ?
             this.props.beer.breweries[0].locations[0].phone : ''}
          </TableRowColumn>
           <TableRowColumn>
            {!!this.props.beer.breweries[0].locations[0] ? 
             this.props.beer.breweries[0].locations[0].streetAddress : ''}, 
            {!!this.props.beer.breweries[0].locations[0] ?
            this.props.beer.breweries[0].locations[0].locality : ''},
            {!!this.props.beer.breweries[0].locations[0] ? 
            this.props.beer.breweries[0].locations[0].region : ''}
          </TableRowColumn> 
        </TableRow>
    );
  }
}

export default BeerListEntry;
