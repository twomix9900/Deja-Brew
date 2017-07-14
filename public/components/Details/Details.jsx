import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Search from '../../components/Search/search.jsx'

class Details extends React.Component {
  constructor(props) {
    // console.log('props from Details! = ', props)
    super(props);
  }

  render() {
    console.log('this.props = ', this.props);
    return (
      <div>
        DETAILS PAGE SCAFFOLDING
      </div>
      // <div>
      //     <MuiThemeProvider>
      //       <Search
      //         handleBreweriesByBeerNameSearch={this.handleBreweriesByBeerNameSearch.bind(this)}
      //         handleBreweriesByBreweryNameSearch={this.handleBreweriesByBreweryNameSearch.bind(this)}
      //         handleBreweriesByLocationSearch={this.handleBreweriesByLocationSearch.bind(this)}
      //       />
      //     </MuiThemeProvider>
      // </div>
    );
  }
}

export default Details;