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
    console.log('PROPS from dejaBrewTabs ' ,props)
    this.state = {
      locationValue: ''
    };
  }

  searchDejaBrew() {
   
  }

  handleActive(tab) {
    console.log(`${tab.props['data-route']}`)
  }
  
  render() {
    return (
      <Tabs>
        <Tab label="Breweries by Beer Name" data-route="/breweriesForBeerName">
          <div>
            <BeerList beers={this.props.beers} />
          </div>
        </Tab>
        <Tab label="Breweries by Brewery Name" data-route="/breweriesForBreweryName">
          <div>
            {console.log('breweries dejabrew: ' , this.props.breweries)}
            <BreweryList breweries={this.props.breweries} />
          </div>
        </Tab>
        <Tab label="Breweries by Location" data-route="/BreweriesForBeerType">
          <div>
            <BreweryLocationsList breweries={this.props.breweryLocations} />
          </div>
        </Tab>
      </Tabs>
    );
  }
}

export default dejaBrewTabs;








// function handleActive(tab) {
//   console.log(`${tab.props['data-route']}`)
// }

// const dejaBrewTabs = () => (
//   <Tabs>
//     <Tab label="Breweries by Beer Name"
//       data-route="/breweriesForBeerName"
//       onActive={handleActive}
//     >
//       <div>
//         <h2 style={styles.headline}>Breweries by Beer Name</h2>
//         <p>
//         <MuiThemeProvider>
//           <BreweryList breweries={this.state.searchResults} />
//         </MuiThemeProvider>
//         </p>
//       </div>
//     </Tab>
//     <Tab
//       label="Breweries by Brewery Name"
//       data-route="/breweriesForBreweryName"
//       onActive={handleActive}
//     >
//       <div>
//         <h2 style={styles.headline}>Breweries by Brewery Name</h2>
//         <p>
//           Tab 2
//         </p>
//       </div>
//     </Tab>
//     <Tab
//       label="Breweries by Beer Type"
//       data-route="/BreweriesForBeerType"
//       onActive={handleActive}
//     >
//       <div>
//         <h2 style={styles.headline}>Breweries by Beer Type</h2>
//         <p>
//           Tab 3
//         </p>
//       </div>
//     </Tab>
//   </Tabs>
// );

// export default dejaBrewTabs;