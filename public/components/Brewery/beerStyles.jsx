import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

const style = {
  menu: {
    margin: 0,
    width: '226px'
  }

};

class beerStyles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        beerStyles: [],
        beerStyleText: "Beer Style"
    };
  }

  componentWillMount() {
    var vm = this;
     axios.get('/brewery/beerStyles')
     .then(function(response) {
       let data = response.data.data;
        let categories = {};
        for(var i = 0; i < data.length; i++) {
          if(!(data[i].category.name in categories)) {
            let categoryName = data[i].category.name;
            categories[categoryName] = {};
            categories[categoryName].id = data[i].category.id;
            categories[categoryName].styles = [];
          }
          let styles = {};
          styles.name = data[i].name;
          styles.id = data[i].id;
          categories[data[i].category.name].styles.push(styles);
        }
        vm.setState({beerStyles: categories}); 
     })
  }

  handleStyleChange(event) {
    console.log('value ', event.target.value)
    this.setState({
    beerStyleText: event.target.value
  })
  console.log(this.state.beerStyleText)
  }

  render() {
    return (
      <div>
        <Menu style={style.menu}>
            <MenuItem
            primaryText={this.state.beerStyleText}
            rightIcon={<ArrowDropRight />}
            menuItems=
            //{<MenuItem primaryText="Select Category"
            {Object.keys(this.state.beerStyles).map((category) => {
              return <MenuItem 
                primaryText={category}   
                rightIcon={<ArrowDropRight />}
                menuItems=
                {this.state.beerStyles[category].styles.map((style) => {
                  return <MenuItem 
                  primaryText={style.name}   
                  onClick={this.handleStyleChange.bind(this)}
                  ref={style.id}
                />
                })}
              /> 
            })}
            />
        </Menu>
      </div>
    );
  }
}

export default beerStyles
