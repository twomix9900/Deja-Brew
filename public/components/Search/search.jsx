import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

const styles = {
  button: {
    margin: 20,
  }
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    console.log('props ' ,props)
    this.state = {
      locationValue: '',
      beerBreweryValue: ''
    };
  }

  // autocompleteFocus() {
  //   let autocomplete = new google.maps.places.Autocomplete(
  //   document.getElementById('textBoxLocation'));

  //   google.maps.event.addListener(autocomplete, 'place_changed', function() {
  //     this.setState({locationValue: document.getElementById('textBoxLocation').value});
  //      console.log(document.getElementById('textBoxLocation').value)
  //   })
  // }

  searchDejaBrew() {
    var location = this.state.locationValue;
    console.log('location!!!: ' , location)
    var beerBrewery = this.state.beerBreweryValue;
    var vm = this;

    if(location && !beerBrewery) {
      console.log('location Y, beerBrewery N')
      axios.get('/brewery/breweriesLatLng/' + location)
      .then(function(response) {
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        axios.get('/brewery/breweryLocations/' + lat + '/' + lng)
        .then(function (response) {
          var breweries = response.data.data;
          console.log('searchResults from search.jsx', breweries);
          console.log('vm.props' , vm.props)
          vm.props.handleBreweriesByLocationSearch(breweries);
        })
        .catch(function (error) {
          console.log(error);
        });
      })
      // axios.get('/brewery/breweryLocations/' + lat + '/' + lng)
      // .then(function (response) {
      //   var breweries = response.data.data;
      //   console.log('searchResults from search.jsx', breweries);
      //   console.log('vm.props' , vm.props)
      //   vm.props.handleBreweriesByLocationSearch(breweries);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
    }
    else if (!location && beerBrewery) {
      console.log('no location, beer/brewery set')
      axios.get('/brewery/dejaBrew/' + beerBrewery + '/1' )
      .then(function (response) {
        //check for # of pages
        let dejaBrewResults = response.data.data;
        if(response.data.numberOfPages === 1) {
          vm.separateBeerBrewery(dejaBrewResults, beerBrewery)
        }
        else {
          for (var i = 1; i < response.data.numberOfPages; i++) { 
            var getPage = i+1;
            axios.get('/brewery/dejaBrew/' + beerBrewery + '/' + getPage)
            .then(function(response) {
              for (var i = 0; i < response.data.data.length; i++) {
                dejaBrewResults.push(response.data.data[i])
              }
              if(response.data.numberOfPages === response.data.currentPage) {
                vm.separateBeerBrewery(dejaBrewResults, beerBrewery)
              }
            })
          }  
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else if (location && beerBrewery) {
      console.log(' location, beer set')
       axios.get('/brewery/dejaBrew/' + beerBrewery + '/1' )
      .then(function (response) {
        //check for # of pages
        let dejaBrewResults = response.data.data;
        console.log(dejaBrewResults)
        if(response.data.numberOfPages === 1) {
          console.log('1 page')
          vm.separateBeerBrewery(dejaBrewResults, beerBrewery, location)
        }
        else {
          for (var i = 1; i < response.data.numberOfPages; i++) { 
            var getPage = i+1;
            axios.get('/brewery/dejaBrew/' + beerBrewery + '/' + getPage)
            .then(function(response) {
              for (var i = 0; i < response.data.data.length; i++) {
                dejaBrewResults.push(response.data.data[i])
              }
              if(response.data.numberOfPages === response.data.currentPage) {
                vm.separateBeerBrewery(dejaBrewResults, beerBrewery, location)
              }
            })
          }  
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else {
      alert('Please Fill in a Keyword or Location')
    }
  }

  separateBeerBrewery(dejaBrewResults, beerBrewery, location) {
    let vm = this;
    let beerResults = [];
    let breweryResults = [];
    for (var i = 0; i < dejaBrewResults.length; i++) {
      if(dejaBrewResults[i].type === 'brewery') {
        console.log('4')
        if(beerBrewery.split(' ').length === 1) {
          var upperBrewery = beerBrewery.charAt(0).toUpperCase() + beerBrewery.slice(1); 
        }
        else {
          var upperBeerArr = [];
          var beerArr = beer.split(' ');
          beerArr.forEach(function(word) {
            upperBeerArr.push(word.charAt(0).toUpperCase() + word.slice(1));
          })
          var upperBrewery = upperBeerArr.join(' ');
        }

        if(dejaBrewResults[i].name.includes(upperBrewery)) {
          console.log('5')
          if(location) {
            if(location.split(' ').length === 1) {
              var upperLocation = location.charAt(0).toUpperCase() + location.slice(1); 
            }
            else {
              var upperLocationArr = [];
              var LocationArr = location.split(' ');
              LocationArr.forEach(function(word) {
                upperLocationArr.push(word.charAt(0).toUpperCase() + word.slice(1));
              })
              var upperLocation = upperLocationArr.join(' ');
            }
            console.log('6')
            if(dejaBrewResults[i].locations) {
              console.log('7')
              for(var j = 0; j < dejaBrewResults[i].locations.length; j++) {
                console.log(dejaBrewResults[i].locations[j].locality)
                if(dejaBrewResults[i].locations[j].locality === upperLocation) {
                  console.log('8')
                  breweryResults.push(dejaBrewResults[i]);
                }
              }
            }
          } 
          else {
            //account for multiple names? 
            breweryResults.push(dejaBrewResults[i])
          }
        }
      }
      else if(dejaBrewResults[i].type === 'beer') {
        var upperBeer = beerBrewery.charAt(0).toUpperCase() + beerBrewery.slice(1);
        if(dejaBrewResults[i].name.includes(upperBeer)) {
          if(location) {
            var upperLocation = location.charAt(0).toUpperCase() + location.slice(1); 
            for(var j = 0; j < dejaBrewResults[i].breweries[0].locations.length; j++) {
              if(dejaBrewResults[i].breweries[0].locations[j].locality === upperLocation) {
                beerResults.push(dejaBrewResults[i]);
              }
            }
          }
          else {
            beerResults.push(dejaBrewResults[i])
          }
        }
      }
    }
    vm.props.handleBreweriesByBeerNameSearch(beerResults);
    vm.props.handleBreweriesByBreweryNameSearch(breweryResults);
  }

  wordsToUpperCase(words) {

  }

  handleChange(event) {
    //this.autocompleteFocus();
    this.setState({locationValue: event.target.value});
  }

  handleBeerBreweryChange(event) {
    this.setState({beerBreweryValue: event.target.value})
  }
  
  render() {
    return (
      <div className="search-bar">
        <input
          className="form-control"
          id="textBox"
          type="text"
          onChange={this.handleBeerBreweryChange.bind(this)}
          placeholder="Search By Beer or Brewery Name"
        />
        <input
          className="form-control"
          id="textBoxLocation"
          type="text"
          onChange={this.handleChange.bind(this)}
          placeholder="Search by Location"
        />
        <RaisedButton 
        style={styles.button}
        onClick={this.searchDejaBrew.bind(this)} 
        label="Search"
        />
        
      </div>
    );
  }
}

export default Search;
