import React, { Component } from 'react';
import {
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

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
        <TableRow>
          <TableRowColumn>
            <img src={this.props.brewery.images ? this.props.brewery.images.icon 
            : "../../images/No_picture_available.jpg"}
            />
          </TableRowColumn>
          {/*<TableRowColumn>{this.props.brewery.id}</TableRowColumn>*/}
          <TableRowColumn>{this.props.brewery.name}</TableRowColumn>
          <TableRowColumn>
            <a href={this.props.brewery.website ? 
            this.props.brewery.website 
            : "No Website"}>
            {this.props.brewery.website ? this.props.brewery.website 
            : "No Website"}
            </a>
            </TableRowColumn>
            {/*account for multiple locations later*/}
          <TableRowColumn>{this.props.brewery.locations[0].locality}</TableRowColumn>
          <TableRowColumn>{this.props.brewery.locations[0].phone}</TableRowColumn>
          <TableRowColumn>{this.props.brewery.locations[0].streetAddress}</TableRowColumn>
        </TableRow>
    );
  }
}

export default BreweryListEntry;
