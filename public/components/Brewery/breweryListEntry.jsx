import React, { Component } from 'react';

var BreweryListEntry = ({brewery}) => (
  <div>
    {console.log('brew ' , brewery)}
    {brewery.id}
  </div>
);

BreweryListEntry.propTypes = {
  brewery: React.PropTypes.object.isRequired
};

export default BreweryListEntry