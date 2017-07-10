import React, { Component } from 'react';
import BreweryListEntry from './breweryListEntry.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';


const BreweryList = ({breweries}) => (
  <div>
    <Table>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>Image</TableHeaderColumn>
          <TableHeaderColumn>ID</TableHeaderColumn>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>website</TableHeaderColumn>
          <TableHeaderColumn>City</TableHeaderColumn>
          <TableHeaderColumn>Phone</TableHeaderColumn>
          <TableHeaderColumn>Address</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody >
        {console.log('breweries from blist ', breweries)}
        {breweries.map((brewery, i) => 
          
            <BreweryListEntry
              key={i}
              brewery={brewery}
            />
          
        )}
      </TableBody>
    </Table>
  </div>
);

export default BreweryList
