import React, { Component } from 'react';
import axios from 'axios';
import BeerStyles from './beerStyles.jsx';
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

class addBeer extends React.Component {
  constructor(props) {
    super(props);
    console.log('props from addBeer', props)
    this.state = {
      showBeerStyles: false
    };
  }

  showBeerStyleMenu() {
    return <BeerStyles/>
    /*const showBeerStyles = props.showBeerStyles;
    if(showBeerStyles) {
      
    }*/
    //this.setState({showBeerStyles: true}); //!showBeerStyles
  }

  componentDidMount() {
    console.log('addBeer componentDidMount')
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="addBeerImage">
          <div className= "container">
            <h1 className="whiteColor">Add A Beer</h1>  
            <TextField 
            floatingLabelStyle={{color:'#00bcd4'}}
            errorText="This field is required."
            floatingLabelText="Beer Name"/><br />
            <TextField 
            className = "beerStyleTextField"
            onClick={this.showBeerStyleMenu.bind(this)}
            floatingLabelStyle={{color:'#00bcd4'}}
            errorText="This field is required."
            floatingLabelText="Beer Style"/><br /> 
            {/* <BeerStyles/> */}
            <TextField 
            floatingLabelStyle={{color:'#00bcd4'}}
            multiLine={true}
            rows={2}
            rowsMax={4}
            floatingLabelText="Beer Description"/><br />
            <TextField 
            floatingLabelStyle={{color:'#00bcd4'}}
            floatingLabelText="Beer ABV"/><br />
            <TextField 
            floatingLabelStyle={{color:'#00bcd4'}}
            floatingLabelText="Beer IBU"/><br />
            <TextField 
            floatingLabelStyle={{color:'#00bcd4'}}
            floatingLabelText="Brewery Associated"/><br /><br />
            <RaisedButton label="Submit" primary={true}/>
          </div>
        </div>
        
      </MuiThemeProvider>
    );
  }
}

export default addBeer

