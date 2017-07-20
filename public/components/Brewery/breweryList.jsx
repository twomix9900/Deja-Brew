import React, { Component } from 'react';
import BreweryListEntry from './breweryListEntry.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Pagination from './pagination.jsx'

class BreweryList extends React.Component {
  constructor() {
    super();

    this.state = {
        pageOfItems: []
    };
  
    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageOfItems) {
    console.log('pageOfItems: ', pageOfItems)
      // update state with new page of items
      this.setState({ pageOfItems: pageOfItems });
  }

  render() {
    return (
      <div>
        <div className="text-center">
            {this.state.pageOfItems.map((brewery, i) => 
              <BreweryListEntry
                key={i}
                brewery={brewery}
                history={this.props.history}
                breweryId={brewery.id}
              />
            )}
            <Pagination items={this.props.breweries} onChangePage={this.onChangePage } />
        </div>
        <hr />
      </div>
    );
  }
}

export default BreweryList
