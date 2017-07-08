import React, { Component } from 'react';
import BreweryListEntry from './breweryListEntry.jsx'

const BreweryList = ({breweries}) => (
  <div>
  {console.log('breweries from blist ', breweries)}
  {breweries.map((brewery) => 
    <BreweryListEntry
      key={brewery.breweryId}
      brewery={brewery}
    />
  )}
  </div>
);

BreweryList.propTypes = {
  breweries: React.PropTypes.array.isRequired
};

export default BreweryList
