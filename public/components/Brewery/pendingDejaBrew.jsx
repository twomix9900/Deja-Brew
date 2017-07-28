import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


class pendingDejaBrew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beerStatus: [],
      breweryStatus: []
    };
  }

  componentWillMount() {
    let vm = this;
    let userId = JSON.parse(localStorage.getItem('userInfo')).id
    axios.get('/brewery/beerStatus/' + userId)
      .then(function (response) {
        let setStateBeer = [];
        let count = 0;
        for (var i = 0; i < response.data.length; i++) {
          count++;
          axios.get('/brewery/beerStatusAPI/' + response.data[i].uniqId)
            .then(function (res) {
              setStateBeer.push(res.data.data)
              if (response.data.length === count) {
                vm.setState({ beerStatus: setStateBeer });
              }
            })
        }
      })

    axios.get('/brewery/breweryStatus/' + userId)
      .then(function (response) {
        let setStateBrewery = [];
        let count = 0;
        for (var i = 0; i < response.data.length; i++) {
          count++
          axios.get('/brewery/breweryStatusAPI/' + response.data[i].uniqId)
            .then(function (res) {
              setStateBrewery.push(res.data.data)
              if (response.data.length === count) {
                vm.setState({ breweryStatus: setStateBrewery });
              }
            })
        }
      })

  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="pendingDejaBrewImage">
          <div className="images-container">
            <div className="container">
              <h1 className="whiteColor">BREWERY STATUS</h1>
              <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>ID</TableHeaderColumn>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>Description</TableHeaderColumn>
                    <TableHeaderColumn>Website</TableHeaderColumn>
                    <TableHeaderColumn>Status</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {this.state.breweryStatus.map((brewery, i) =>
                    <TableRow key={i}>
                      <TableRowColumn>{brewery.id}</TableRowColumn>
                      <TableRowColumn>{brewery.name}</TableRowColumn>
                      <TableRowColumn>{brewery.description}</TableRowColumn>
                      <TableRowColumn><a href={brewery.website} target="_blank">{brewery.website}</a></TableRowColumn>
                      <TableRowColumn>{brewery.statusDisplay}</TableRowColumn>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <br /><br /><br /><br />
              <h1 className="whiteColor">BEER STATUS</h1>
              <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>Category</TableHeaderColumn>
                    <TableHeaderColumn>Style</TableHeaderColumn>
                    <TableHeaderColumn>Description</TableHeaderColumn>
                    <TableHeaderColumn>IBU Range</TableHeaderColumn>
                    <TableHeaderColumn>ABV Range</TableHeaderColumn>
                    <TableHeaderColumn>Status</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {this.state.beerStatus.map((beer, i) =>
                    <TableRow key={i}>
                      <TableRowColumn>{beer.name}</TableRowColumn>
                      <TableRowColumn>{beer.style.category.name}</TableRowColumn>
                      <TableRowColumn>{beer.style.name}</TableRowColumn>
                      <TableRowColumn>{beer.style.description}</TableRowColumn>
                      <TableHeaderColumn>{beer.style.ibuMin} - {beer.style.ibuMax}</TableHeaderColumn>
                      <TableHeaderColumn>{beer.style.abvMin} - {beer.style.abvMax}</TableHeaderColumn>
                      <TableRowColumn>{beer.statusDisplay}</TableRowColumn>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

      </MuiThemeProvider>
    );
  }
}

export default pendingDejaBrew
