import React, { Component } from 'react';
import {
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

class BreweryLocationsListEntry extends React.Component {
  constructor(props) {
    super(props);
    console.log('props from BreweryLocationsListEntry' ,props)
    this.state = {
      locationValue: ''
    };
  }
  
  render() {
    return (
        <TableRow>
          <TableRowColumn>
            <img src={this.props.brewery.brewery.images ? this.props.brewery.brewery.images.icon 
            : "../../images/No_picture_available.jpg"}
            />
          </TableRowColumn>
          {/*<TableRowColumn>{this.props.brewery.id}</TableRowColumn>*/}
          <TableRowColumn>{this.props.brewery.brewery.name}</TableRowColumn>
          <TableRowColumn>
            <a href={this.props.brewery.brewery.website ? 
            this.props.brewery.brewery.website 
            : "No Website"}>
            {this.props.brewery.brewery.website ? this.props.brewery.brewery.website 
            : "No Website"}
            </a>
            </TableRowColumn>
            {/*account for multiple locations later*/}
          <TableRowColumn>{this.props.brewery.locality}</TableRowColumn>
          <TableRowColumn>{this.props.brewery.phone}</TableRowColumn>
          <TableRowColumn>{this.props.brewery.streetAddress}</TableRowColumn>
        </TableRow>
    );
  }
}

export default BreweryLocationsListEntry;
