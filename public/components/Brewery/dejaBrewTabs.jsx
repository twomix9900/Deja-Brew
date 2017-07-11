import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

function handleActive(tab) {
  alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
}

const dejaBrewTabs = () => (
  <Tabs>
    <Tab label="Breweries by Beer Name"
      data-route="/breweriesForBeerName"
      onActive={handleActive}
    >
      <div>
        <h2 style={styles.headline}>Breweries by Beer Name</h2>
        <p>
          Tab 1
        </p>
      </div>
    </Tab>
    <Tab
      label="Breweries by Brewery Name"
      data-route="/breweriesForBreweryName"
      onActive={handleActive}
    >
      <div>
        <h2 style={styles.headline}>Breweries by Brewery Name</h2>
        <p>
          Tab 2
        </p>
      </div>
    </Tab>
    <Tab
      label="Breweries by Beer Type"
      data-route="/BreweriesForBeerType"
      onActive={handleActive}
    >
      <div>
        <h2 style={styles.headline}>Breweries by Beer Type</h2>
        <p>
          Tab 3
        </p>
      </div>
    </Tab>
  </Tabs>
);

export default dejaBrewTabs;