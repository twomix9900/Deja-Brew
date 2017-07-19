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
                Déjà Brew finds breweries on the map.<br/>
                Déjà Brew finds beer on the map.<br/>
                Déjà Brew finds them on the map so you don't have to.
              </h3>
            </div>
          </div>
          <div className="images-container">
            <img src="../../../images/layer-1.png" className="cabbage" id="layer-1"/>
            <img src="../../../images/layer-2.png" className="cabbage" id="layer-2"/>
            <img src="../../../images/layer-3.png" className="cabbage" id="layer-3"/>
            <img src="../../../images/layer-4.png" className="cabbage" id="layer-4"/>
            <img src="../../../images/layer-5.png" className="cabbage" id="layer-5"/>
            <img src="../../../images/layer-6.png" className="cabbage" id="layer-6"/>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing;