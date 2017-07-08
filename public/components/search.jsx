import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      results: null
    };
  }

  searchDejaBrew() {
    axios.get('/brewery/breweryLocations')
    .then(function (response) {
      console.log(response.data.data);
      this.setState({
        results: response.data.data
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
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
