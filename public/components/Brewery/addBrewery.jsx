import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

const style = {
  menu: {
    margin: 0,
    width: '226px'
  }
};

class addBrewery extends React.Component {
  constructor(props) {
    super(props);
    //console.log('props from addBeer', props)
    this.state = {
      showBeerStyles: false,
      beerStyleId: '',
      beerName: '',
      beerDescription: '',
      beerABV: '',
      beerIBU: '',
      breweryAssociated: ''
    };
    this.handleBeerEntry=this.handleBeerEntry.bind(this);
  }

  showBeerStyleMenu() {
    if(!this.state.showBeerStyles) {
      this.setState({showBeerStyles: true}); 
    }
  }

  componentDidMount() {
    console.log('addBeer componentDidMount')
  }

  handleBeerStyleId(id) {
    console.log('id from beerStyles to addBeer: ', id)
    this.setState({beerStyleId: id}); 
  }

  handleBeerEntry(stateName, e) {
    if(stateName === 'beerIBU' || stateName === 'beerABV') {
      let numbers = '0123456789.';
      if(numbers.indexOf(e.target.value[e.target.value.length -1]) === -1) {
        e.target.value = e.target.value.slice(0, -1)
      }
    }
    let stateToSet = {};
    stateToSet[stateName] = e.target.value;
    this.setState(stateToSet);
  }

  submitBeer() {
    console.log('submitBeer')
    axios.post('/brewery/beer', {
      beerStyleId: this.state.beerStyleId,
      beerName: encodeURIComponent(this.state.beerName),
      beerDescription: encodeURIComponent(this.state.beerDescription),
      beerABV: this.state.beerABV,
      beerIBU: this.state.beerIBU,
      breweryAssociated: this.state.breweryAssociated
    })
    .then(function(response) {
      let userId = JSON.parse(localStorage.getItem('userInfo')).id;
      let beerId = response.data.data.id;
      axios.post('/brewery/beerDatabase', {
        beerId: beerId,
        userId: userId
      })
      .then(function(response) {
        console.log("successfuly added to db.")
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
          <div className= "container floatRight">
            <h1 className="whiteColor">Add A Brewery</h1>  
            <TextField 
            floatingLabelStyle={{color:'#00bcd4'}}
            errorText="This field is required."
            onChange={(e) => this.handleBeerEntry('beerName', e)}
            floatingLabelText="Beer Name"/><br />
            {/* <TextField 
            className = "beerStyleTextField"
            onClick={this.showBeerStyleMenu.bind(this)}
            floatingLabelStyle={{color:'#00bcd4'}}
            errorText="This field is required."
            floatingLabelText="Beer Style"/><br />  */}
            <TextField 
            floatingLabelStyle={{color:'#00bcd4'}}
            multiLine={true}
            rows={2}
            rowsMax={4}
            onChange={(e) => this.handleBeerEntry('beerDescription', e)}
            floatingLabelText="Beer Description"/><br />
            <TextField 
            floatingLabelStyle={{color:'#00bcd4'}}
            onChange={(e) => this.handleBeerEntry('beerABV', e)}
            floatingLabelText="Beer ABV"/><br />
            <TextField 
            floatingLabelStyle={{color:'#00bcd4'}}
            onChange={(e) => this.handleBeerEntry('beerIBU', e)}
            floatingLabelText="Beer IBU"/><br />
            <TextField 
            floatingLabelStyle={{color:'#00bcd4'}}
            onChange={(e) => this.handleBeerEntry('breweryAssociated', e)}
            floatingLabelText="Brewery Associated (ID)"/><br /><br />
            <RaisedButton label="Submit" primary={true} onClick={this.submitBeer.bind(this)}/>
          </div>
        </div>
        
      </MuiThemeProvider>
    );
  }
}

export default addBrewery

