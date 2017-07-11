import React, { Component } from 'react';
import BeerListEntry from './beerListEntry.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';

const BeerList = ({beers}) => (
  <div>
    <Table>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
        <TableHeaderColumn>Beer Name</TableHeaderColumn>
          <TableHeaderColumn>Image</TableHeaderColumn>
          {/*<TableHeaderColumn>ID</TableHeaderColumn>*/}
          <TableHeaderColumn>Brewery Name</TableHeaderColumn>
          <TableHeaderColumn>website</TableHeaderColumn>
          <TableHeaderColumn>Phone</TableHeaderColumn>
          <TableHeaderColumn>Address</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody >
        {console.log('beers from blist ', beers)}
        {beers.map((beer, i) => 
            <BeerListEntry
              key={i}
              beer={beer}
            />
        )}
      </TableBody>
    </Table>
  </div>
);

export default BeerList
