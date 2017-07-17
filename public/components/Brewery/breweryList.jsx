import React, { Component } from 'react';
import BreweryListEntry from './breweryListEntry.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Pagination from './pagination.jsx'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';

class BreweryList extends React.Component {
  constructor() {
    super();
    // an example array of items to be paged
    //var exampleItems = _.range(1, 151).map(i => { return { id: i, name: 'Item ' + i }; });
    this.state = {
        pageOfItems: []
    };
  
    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageOfItems) {
      // update state with new page of items
      this.setState({ pageOfItems: pageOfItems });
  }

  render() {
    return (
      <div>
        <div className="text-center">
            {this.props.breweries.map((brewery, i) => 
              <BreweryListEntry
                key={i}
                brewery={brewery}
              />
            )}
            <Pagination items={this.props.breweries} onChangePage={this.onChangePage} />
        </div>
        <hr />
      </div>
    );
  }
}

export default BreweryList
