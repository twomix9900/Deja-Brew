import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  apiStart = 'http://api.brewerydb.com/v2/';

  searchDejaBrew() {
    axios({
      method:'GET',
      url: '/locations',
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // handleInputChange(e) {
  //   this.props.handleSearchInputChange(e.target.value);
  //   this.setState({
  //     value: e.target.value
  //   });
  // }
  

  render() {
    return (
      <div className="search-bar">
        <input
          className="form-control beerTextBox"
          type="text"
          placeholder="Search By Beer or Brewery Name"
        />
        <input
          className="form-control beerTextBox"
          type="text"
          placeholder="Search by Location"
        />
        <RaisedButton onClick={this.searchDejaBrew.bind(this)} label="Search"/>
      </div>
    );
  }
}

export default Search;
