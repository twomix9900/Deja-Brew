import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class addBrewery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breweryName: '',
      breweryWebsite: '',
      breweryDescription: '',
      yearEstablished: ''
    };
    this.handleBreweryEntry = this.handleBreweryEntry.bind(this);
  }

  handleBreweryEntry(stateName, e) {
    let stateToSet = {};
    stateToSet[stateName] = e.target.value;
    this.setState(stateToSet);
  }

  submitBrewery() {
    let vm = this;
    axios.post('/brewery/brewery', {
      breweryName: encodeURIComponent(this.state.breweryName),
      breweryDescription: encodeURIComponent(this.state.breweryDescription),
      breweryWebsite: encodeURIComponent(this.state.breweryWebsite)
    })
      .then(function (response) {
        let userId = JSON.parse(localStorage.getItem('userInfo')).id;
        let breweryId = response.data.data.id;
        axios.post('/brewery/breweryDatabase', {
          breweryId: breweryId,
          userId: userId
        })
          .then(function (response) {
            vm.props.history.replace('/pendingDejaBrew')
          })

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="addBreweryImage">
          <div className="container floatRight images-container">
            <h1 className="whiteColor">Submit A Brewery</h1>
            <TextField
              floatingLabelStyle={{ color: '#00bcd4' }}
              errorText="This field is required."
              onChange={(e) => this.handleBreweryEntry('breweryName', e)}
              floatingLabelText="Brewery Name" /><br />
            <TextField
              floatingLabelStyle={{ color: '#00bcd4' }}
              onChange={(e) => this.handleBreweryEntry('breweryWebsite', e)}
              floatingLabelText="Brewery Website" /><br />
            <TextField
              floatingLabelStyle={{ color: '#00bcd4' }}
              multiLine={true}
              rows={2}
              rowsMax={4}
              onChange={(e) => this.handleBreweryEntry('breweryDescription', e)}
              floatingLabelText="Brewery Description" /><br />
            <TextField
              floatingLabelStyle={{ color: '#00bcd4' }}
              onChange={(e) => this.handleBreweryEntry('yearEstablished', e)}
              floatingLabelText="Year Established" /><br /><br />
            <RaisedButton label="Submit" primary={true} onClick={this.submitBrewery.bind(this)} />
          </div>
        </div>

      </MuiThemeProvider>
    );
  }
}

export default addBrewery