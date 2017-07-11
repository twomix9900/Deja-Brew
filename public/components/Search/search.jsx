import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    console.log('props ' ,props)
    this.state = {
      locationValue: '',
      beerValue: ''
    };
  }

  searchDejaBrew() {
    var location = this.state.locationValue;
    var beer = this.state.beerValue;
    var vm = this;
    if(location && !beer) {
      console.log('location, no beer set')
      axios.get('/brewery/breweryLocations/' + location)
      .then(function (response) {
        var breweries = response.data.data;
        console.log('searchResults from search.jsx', breweries);
        console.log('vm.props' , vm.props)
        vm.props.handleSearch(breweries);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else if (!location && beer) {
      let beerResults = [];
      let breweryResults = [];
      console.log('no location, beer/brewery set')
      axios.get('/brewery/dejaBrew/' + beer + '/1' )
      .then(function (response) {
        //check for # of pages
        let dejaBrewResults = response.data.data;
        for (var i = 1; i < response.data.numberOfPages; i++) { 
          var getPage = i + 1;
          axios.get('/brewery/dejaBrew/' + beer + '/' + getPage)
          .then(function(response) {
            for (var i = 0; i < response.data.data.length; i++) {
              dejaBrewResults.push(response.data.data[i])
            }
            if(response.data.numberOfPages === response.data.currentPage) {
              for (var i = 0; i < dejaBrewResults.length; i++) {
                dejaBrewResults[i].type === 'brewery' ? breweryResults.push(dejaBrewResults[i]) : beerResults.push(dejaBrewResults[i]) 
              }
              console.log('breweryResults: ', breweryResults);
              console.log('beerResults: ' , beerResults)
            }
          })
        }  
        //vm.props.handleSearch(breweries);
      })
      
      .catch(function (error) {
        console.log(error);
      });
    }
    else if (location && beer) {
      console.log(' location, beer set')
    }
    else {
      console.log('no beer or location, default get')
    }
  }

  handleChange(event) {
    this.setState({locationValue: event.target.value})
  }

  handleBeerChange(event) {
    this.setState({beerValue: event.target.value})
  }
  
  render() {
    return (
      <div className="search-bar">
        <input
          className="form-control beerTextBox"
          type="text"
          onChange={this.handleBeerChange.bind(this)}
          placeholder="Search By Beer or Brewery Name"
        />
        <input
          className="form-control beerTextBox"
          type="text"
          onChange={this.handleChange.bind(this)}
          placeholder="Search by Location"
        />
        <RaisedButton onClick={this.searchDejaBrew.bind(this)} label="Search"/>
        
      </div>
    );
  }
}

export default Search;
