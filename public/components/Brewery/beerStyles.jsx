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

class beerStyles extends React.Component {
  constructor(props) {
    super(props);
    console.log('props from addBeer', props)
    this.state = {
        beerStyles : ""
    };
  }

  componentDidMount() {
    //here vs up there? 
    var vm = this;
    console.log('beerStyles did mount')
     axios.get('/brewery/beerStyles')
     .then(function(response) {
       console.log('response: ' , response)
        vm.setState({beerStyles: response.data.data}); 
        console.log(vm.state.beerStyles[0].category.name)
        //why does this work?
     })
  }

// {this.state.pageOfItems.map((beer, i) => 
//   <BeerListEntry
//     history={this.props.history}
//     key={i}
//     beer={beer}
//     beerId={beer.id}
//   />
// )}

  render() {
    return (
      <div>
        <Menu style={style.menu}>
            <MenuItem
            primaryText="Beer Style"
            rightIcon={<ArrowDropRight />}


            /*
            let categories = ['<MenuItem primaryText="Categories" />']
            
            
            
            
            
            menuItems={categories}




            */
            /*menuItems={[
                <MenuItem primaryText="Categories" />,

                <MenuItem
                primaryText={this.state.beerStyles.length ? this.state.beerStyles[0].category.name : ""}

                //this.state.beerStyles[0].category.name
                //this.state.beerStyles[0].name



                rightIcon={<ArrowDropRight />}
                menuItems={[
                  <MenuItem primaryText="Styles"/>,
                  <MenuItem primaryText="1 Style"/>,
                  <MenuItem primaryText="2 Style"/>,
                  <MenuItem primaryText="3 Style"/>,
                  <MenuItem primaryText="4 Style"/>,
                ]}
                />,
                <MenuItem
                primaryText="2 Category"
                rightIcon={<ArrowDropRight />}
                menuItems={[
                  <MenuItem primaryText="Styles"/>,
                  <MenuItem primaryText="1 Style"/>,
                  <MenuItem primaryText="2 Style"/>,
                  <MenuItem primaryText="3 Style"/>,
                  <MenuItem primaryText="4 Style"/>,
                ]}
                />
            ]}*/
            />
        </Menu>
      </div>
    );
  }
}

export default beerStyles

