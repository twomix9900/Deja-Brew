import React, { Component } from 'react';
import BreweryLocationsListEntry from './breweryLocationsListEntry.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Pagination from './pagination.jsx';

class BreweryLocationsList extends React.Component {
  constructor() {
    super();

    this.state = {
      pageOfItems: []
    };

    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageOfItems) {
    this.setState({ pageOfItems: pageOfItems });
  }

  render() {
    return (
      <div>
        <div className="text-center">
          {this.state.pageOfItems.map((brewery, i) =>
            <BreweryLocationsListEntry
              key={i}
              brewery={brewery}
              history={this.props.history}
            />
          )}
          <Pagination items={this.props.breweries} onChangePage={this.onChangePage} />
        </div>
        <hr />
      </div>
    );
  }
}

export default BreweryLocationsList
