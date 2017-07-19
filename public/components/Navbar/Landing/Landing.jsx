import React, { Component } from 'react';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div className="landingPage">
        <audio id="my_audio" src="../../../images/lucky.mp3" loop="loop"></audio>
        <div className="container whiteFont">
          <div className="grid">
            <div className="headerLeft">
              <h1 className="header">DÉJÀ BREW</h1>
              <h2 className="subHeader">YOUR SOURCE TO FIND BEER, BREWERIES, & MORE.</h2>
              <h3 className="subHeader">
                Déjà Brew finds breweries on the map.<br/><br/>
                Déjà Brew finds beer on the map.<br/><br/>
                Déjà Brew finds them on the map so you don't have to.<br/><br/>
              </h3>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing;