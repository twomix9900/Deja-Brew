import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0'
};

class beerStyles extends React.Component {
  constructor(props) {
    super(props);
    console.log('props from beerStyles: ', props)
    this.state = {
      textBoxWidth: 220,
      beerStyles: [],
      beerStyleName: "Beer Style",
      //beerStyleId: 0
      // submitBeer: {
      //   beerStyleName: "Beer Style",
      //   beerStyleId: 0
      // }
    };
  }

  componentWillMount() {
    var vm = this;
    axios.get('/brewery/beerStyles')
      .then(function (response) {
        let data = response.data.data;
        let categories = {};
        for (var i = 0; i < data.length; i++) {
          if (!(data[i].category.name in categories)) {
            let categoryName = data[i].category.name;
            categories[categoryName] = {};
            categories[categoryName].id = data[i].category.id;
            categories[categoryName].styles = [];
          }
          let styles = {};
          styles.name = data[i].name;
          styles.id = data[i].id;
          styles.desc = data[i].description;
          categories[data[i].category.name].styles.push(styles);
        }
        vm.setState({ beerStyles: categories });
      })
  }

  handleStyleChange(styleId, styleName) {
    this.setState({ beerStyleName: styleName })
    //this.setState({beerStyleId: styleId})
    this.props.handleBeerStyleId(styleId)
    this.setState({ textBoxWidth: styleName.length * 8 })
  }

  render() {
    return (
      <div>
        <Paper style={style}>
          <Menu desktop={true} autoWidth={false} width={this.state.textBoxWidth} disableAutoFocus={true}>
            <MenuItem
              primaryText={this.state.beerStyleName}
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
                      //how does MenuItem know onClick is possible? why not onMouseEnter?
                      onClick={this.handleStyleChange.bind(this, style.id, style.name)}
                    />
                  })}
                />
              })}
            />
          </Menu>
        </Paper>
      </div>
    );
  }
}

export default beerStyles
