import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BreweryList from './breweryList.jsx';
import BeerList from './beerList.jsx';
import BreweryLocationsList from './breweryLocationsList.jsx';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class dejaBrewTabs extends React.Component {
  constructor(props) {
    super(props);
  }

  // handleActive(tab) {
  //   console.log(`${tab.props['data-route']}`)
  // }
  
  render() {
    console.log('whats this got access to ,', this.props);
    return (
      <Tabs>
        {this.props.beers.length ? 
        <Tab label="Breweries by Beer Name" data-route="/breweriesForBeerName">
          <div>
            <BeerList history={this.props.history} beers={this.props.beers} />
          </div>
        </Tab>
        : null}

        {this.props.breweries.length ? 
        <Tab label="Breweries by Brewery Name" data-route="/breweriesForBreweryName">
          <div>
            <BreweryList breweries={this.props.breweries} />
          </div>
        </Tab>
        : null}

        {this.props.breweryLocations.length ? 
        <Tab label="Breweries by Location" data-route="/BreweriesForBeerType">
          <div>
            <BreweryLocationsList breweries={this.props.breweryLocations} />
          </div>
        </Tab>
        : null}
      </Tabs>
    );
  }
}

export default dejaBrewTabs;
