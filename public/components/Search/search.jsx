import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    console.log('props ' ,props)
    this.state = {
      
    };
  }

  searchDejaBrew() {
    var vm = this;
    axios.get('/brewery/breweryLocations')
    .then(function (response) {
      var searchResults = response.data.data;
      console.log('searchResults from search.jsx', searchResults);
      console.log('vm.props' , vm.props)
      vm.props.handleSearch(searchResults);
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
