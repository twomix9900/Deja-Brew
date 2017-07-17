import React, { Component } from 'react';
import BeerListEntry from './beerListEntry.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const BeerList = ({beers, history}) => (
  <div>
    {console.log('beers from blist ', beers)}
    {beers.map((beer, i) => 
        <BeerListEntry
          history={history}
          key={i}
          beer={beer}
        />
    )}
  </div>
);

export default BeerList
