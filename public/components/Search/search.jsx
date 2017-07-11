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
        vm.props.handleBreweriesByLocationSearch(breweries);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else if (!location && beer) {
      console.log('no location, beer/brewery set')
      axios.get('/brewery/dejaBrew/' + beer + '/1' )
      .then(function (response) {
        //check for # of pages
        let dejaBrewResults = response.data.data;
        if(response.data.numberOfPages === 1) {
          vm.separateBeerBrewery(dejaBrewResults, beer)
        }
        else {
          for (var i = 1; i < response.data.numberOfPages; i++) { 
            var getPage = i+1;
            axios.get('/brewery/dejaBrew/' + beer + '/' + getPage)
            .then(function(response) {
              for (var i = 0; i < response.data.data.length; i++) {
                dejaBrewResults.push(response.data.data[i])
              }
              if(response.data.numberOfPages === response.data.currentPage) {
                vm.separateBeerBrewery(dejaBrewResults, beer)
              }
            })
          }  
        }
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

  separateBeerBrewery(dejaBrewResults, beer) {
    let vm = this;
    let beerResults = [];
    let breweryResults = [];
    for (var i = 0; i < dejaBrewResults.length; i++) {
      if(dejaBrewResults[i].type === 'brewery') {
        //console.log(dejaBrewResults[i].name)
        var upperBrewery = beer.charAt(0).toUpperCase() + beer.slice(1);
        if(dejaBrewResults[i].name.includes(upperBrewery)) {
          breweryResults.push(dejaBrewResults[i])
        }
      }
      else if(dejaBrewResults[i].type === 'beer') {
          //console.log(dejaBrewResults[i].name)
          var upperBeer = beer.charAt(0).toUpperCase() + beer.slice(1);
        if(dejaBrewResults[i].name.includes(upperBeer)) {
          beerResults.push(dejaBrewResults[i])
        }
      }
    }
    vm.props.handleBreweriesByBeerNameSearch(beerResults);
    vm.props.handleBreweriesByBreweryNameSearch(breweryResults);
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
