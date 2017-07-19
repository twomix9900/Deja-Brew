import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import LinearProgress from 'material-ui/LinearProgress';
import axios from 'axios';
import Details from '../Details/Details.jsx';
import DialogMsg from '../Dialog/DialogMsg.jsx';
import actions from '../../actions';
import { connect } from 'react-redux';


const styles = {
  button: {
    margin: 20,
    height: 40
  },
  linearBar: {
    height: 15
  }
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationValue: '',
      beerBreweryValue: '',
      value: 10,
      open: false,
      msgTitle: 'Fill in a Field Mutha Fracker',
      msgBody: 'Byatch! Please Fill in a Keyword or Location',
      completed: 0
    };
    this.handler=this.handler.bind(this);
    this.searchVenueByName = this.searchVenueByName.bind(this);
    this.searchVenueByLocation = this.searchVenueByLocation.bind(this);
  }

  componentWillUnmount() {
    this.searchVenueByName(this.state.beerBreweryValue);
    this.searchVenueByLocation(this.state.locationValue);
    this.setState({ showDetails: false });
  }

  componentDidMount() {
    if (!!this.props.venue.searchedVenueByLocation) {
      this.setState({ locationValue: this.props.venue.searchedVenueByLocation });
      this.searchDejaBrew();
    }

    if (!!this.props.venue.searchedVenueByName) {
      this.setState({ beerBreweryValue: this.props.venue.searchedVenueByName });
      this.searchDejaBrew();
    }

  }

  searchVenueByName(data) {
    this.props.searchVenueByName(data);
  }

  searchVenueByLocation(data) {
    this.props.searchVenueByLocation(data);
  }

  handleChange(event) {
    this.autocompleteFocus();
    this.setState({locationValue: event.target.value}); 
  }

  handleBeerBreweryChange(event) {
    this.setState({beerBreweryValue: event.target.value}) 
  }

  autocompleteFocus() {
    var vm = this;
    let autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('textBoxLocation'));

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      vm.setState({locationValue: document.getElementById('textBoxLocation').value});
      console.log(document.getElementById('textBoxLocation').value)
    })
  }

  searchDejaBrew() {
    // var location = this.wordsToUpperCase(this.state.locationValue);
    var location = this.wordsToUpperCase(this.state.locationValue || this.props.venue.searchedVenueByLocation);
    console.log('location!: ' , location)
    // var beerBrewery = this.state.beerBreweryValue;
    var beerBrewery = this.state.beerBreweryValue || this.props.venue.searchedVenueByName;
    var radius = parseInt(this.state.value);
    console.log(radius)
    var vm = this;

    let config = {
      onDownloadProgress: (progressEvent) => {
        this.setState({
          completed: Math.floor((progressEvent.loaded * 100) / progressEvent.total),
          showDetails: true
        })
      }
    }

    if(location && !beerBrewery) {
      console.log('location Y, beerBrewery N')

      axios.get('/brewery/breweriesLatLng/' + location, config)
      .then(function(response) {
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        axios.get('/brewery/breweryLocations/' + lat + '/' + lng + '/' + radius)
        .then(function (response) {
          var breweries = response.data.data;
          console.log('searchResults from search.jsx', breweries);
          vm.props.handleBreweriesByLocationSearch(breweries);
          //get all beers as well?
        })
        .catch(function (error) {
          console.log(error);
        });
      })
    }
    else if (!location && beerBrewery) {
      console.log('location N, beerBrewery Y')
      //logic: get request for first keyword, save the second+ somewhere here, then 
      //use second+ to filter
      vm.getBeerBrewery(beerBrewery);
    }
    else if (location && beerBrewery) {
      console.log('location Y, beerBrewery Y')
      vm.getBeerBrewery(beerBrewery, location);
    }
    else {
      this.setState({ open: true });
//      alert('Please Fill in a Keyword or Location')
    }
  }

  getBeerBrewery(beerBrewery, location) {
    var vm = this;
    var restOfKeywordsArr = [];
    var upperBeerBrewery = this.wordsToUpperCase(beerBrewery);
    if(upperBeerBrewery.constructor === Array && upperBeerBrewery.length > 1) {
      var temp = upperBeerBrewery.shift();
      restOfKeywordsArr = upperBeerBrewery;
      upperBeerBrewery = temp;
    }

    let config = {
      onDownloadProgress: (progressEvent) => {
        vm.setState({
          completed: Math.floor(progressEvent.loaded * 100 / progressEvent.total)
        })
      }
    }

    axios.get('/brewery/dejaBrew/' + upperBeerBrewery + '/1')
    .then(function (response) {
      //check for # of pages
      let dejaBrewResults = response.data.data;
      if(response.data.numberOfPages === 1) {
        vm.setState({
          completed: 100
        })
        vm.separateBeerBrewery(dejaBrewResults, upperBeerBrewery, location, restOfKeywordsArr)
      }
      else {
        // vm.setState({
        //   completed: 0
        // })
        for (var i = 1; i < response.data.numberOfPages; i++) { //4, i is 1 ,2 3 
          let multiConfig = {
            onDownloadProgress: (progressEvent) => {
              vm.setState({
                completed: (Math.floor((progressEvent.loaded * 100) / progressEvent.total)) / (response.data.numberOfPages - i)
              })
            }
          }
          var getPage = i+1;
          axios.get('/brewery/dejaBrew/' + upperBeerBrewery + '/' + getPage, multiConfig)
          .then(function(response) {
            for (var i = 0; i < response.data.data.length; i++) {
              dejaBrewResults.push(response.data.data[i])
            }
            if(response.data.numberOfPages === response.data.currentPage) {
              vm.separateBeerBrewery(dejaBrewResults, upperBeerBrewery, location, restOfKeywordsArr)
            }
          })
        }  
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  separateBeerBrewery(dejaBrewResults, upperBeerBrewery, location, restOfKeywordsArr) {
    console.log(dejaBrewResults)
    console.log(
      ' upperBeerBrewery: ' + upperBeerBrewery 
      + ' location: ' + location + ' restOfKeywordsArr: ' + restOfKeywordsArr
    )
    let vm = this;
    let beerResults = [];
    let breweryResults = [];
    let filteredName = true;

    for (var i = 0; i < dejaBrewResults.length; i++) {
      if(dejaBrewResults[i].name.includes(upperBeerBrewery)) { 
        if(restOfKeywordsArr.length) {
          for (var j = 0; j < 1; j++) {
            if(dejaBrewResults[i].name.includes(restOfKeywordsArr[j])) { 
              if(dejaBrewResults[i].type === 'brewery') {
                if(location && dejaBrewResults[i].locations) { //check for location
                  //for(var k = 0; k < dejaBrewResults[i].locations.length; k++) {
                    //console.log(dejaBrewResults[i].locations[j].locality)
                    if(dejaBrewResults[i].locations[0].locality === location) {
                      console.log("once PLEASE")
                      breweryResults.push(dejaBrewResults[i]);
                    }
                  //}
                }
                else {
                  breweryResults.push(dejaBrewResults[i])
                }

              }
              else if (dejaBrewResults[i].type === 'beer') {
                if(location) {
                  //for(var j = 0; j < dejaBrewResults[i].breweries[0].locations.length; j++) {
                    if(dejaBrewResults[i].breweries[0].locations[0].locality === location) {
                      beerResults.push(dejaBrewResults[i]);
                    }
                  //}
                }
                else {
                  beerResults.push(dejaBrewResults[i])
                }

              }
            }
          }
        }
        else {
          if(dejaBrewResults[i].type === 'brewery') {
            if(location) { //check for location
              //for(var k = 0; k < dejaBrewResults[i].locations.length; k++) {
                //check for multiple locations as well , handle it on client side instead
                console.log(dejaBrewResults[i].locations[0].locality)
                if(dejaBrewResults[i].locations[0].locality === location) {
                  breweryResults.push(dejaBrewResults[i]);
                }
              //}
            }
            else {
              console.log('ONCE PLEASE ' , dejaBrewResults[i])
              breweryResults.push(dejaBrewResults[i])
            }
          }
          else if (dejaBrewResults[i].type === 'beer') {
            if(location) {
              //for(var j = 0; j < dejaBrewResults[i].breweries[0].locations.length; j++) {
                if(dejaBrewResults[i].breweries[0].locations[0].locality === location) {
                  beerResults.push(dejaBrewResults[i]);
                }
              //}
            }
            else {
              beerResults.push(dejaBrewResults[i])
            }
          }
        }
      }
    }



    vm.props.handleBreweriesByBeerNameSearch(beerResults);
    vm.props.handleBreweriesByBreweryNameSearch(breweryResults);
  }

  wordsToUpperCase(words) {
    if(words.split(' ').length === 1) {
      return words.charAt(0).toUpperCase() + words.slice(1); 
    }
    else {
      var upperWordsArr = [];
      var lowerWordsArr = words.split(' ');
      lowerWordsArr.forEach(function(word) {
        upperWordsArr.push(word.charAt(0).toUpperCase() + word.slice(1));
      })
      console.log('UPPERCASE TWO WORDS: ' , upperWordsArr)
      return upperWordsArr;
    }
  }

  handleRadiusChange(event, index, value) {
    this.setState ({
      value
    })
  }

  handler() {
    this.setState({ open: false });
  }
  
  render() {
    console.log('this.props from search = ', this.props)
    return (
      <div className="search-bar">
        <input
          className="form-control"
          id="textBox"
          type="text"
          onChange={this.handleBeerBreweryChange.bind(this)}
          placeholder='Search By Beer or Brewery Name'
          value={this.state.beerBreweryValue}
        />
        <input
          className="form-control"
          id="textBoxLocation"
          type="text"
          onChange={this.handleChange.bind(this)}
          placeholder='Search By Location'
          value={this.state.locationValue}
        />
        <DropDownMenu 
        className="dropDown"
        value={this.state.value} 
        onChange={this.handleRadiusChange.bind(this)}
        >
          <MenuItem value={5} primaryText="5 miles" />
          <MenuItem value={10} primaryText="10 miles" />
          <MenuItem value={25} primaryText="25 miles" />
          <MenuItem value={50} primaryText="50 miles" />
        </DropDownMenu>
        <RaisedButton 
        style={styles.button}
          onClick={this.searchDejaBrew.bind(this)}
          label="Search"
        />
        <LinearProgress
          style={styles.linearBar}
          mode="determinate"
          value={this.state.completed}
        />
        <LinearProgress
          style={styles.linearBar}
          mode="determinate"
          value={this.state.completed}
        />
        <DialogMsg handler={ this.handler } open={ this.state.open } msgTitle={ this.state.msgTitle } msgBody={ this.state.msgBody } />
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    venue: state.venue
  }
}

const dispatchToProps = (dispatch) => {
  return {
    searchVenueByName: (venue) => {
      dispatch(actions.searchVenueByName(venue));
    },
    searchVenueByLocation: (venue) => {
      dispatch(actions.searchVenueByLocation(venue));
    }
  }
}

export default connect(stateToProps, dispatchToProps)(Search);