import React, { Component } from 'react';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  animateValue(id, start, duration) {
    var end = parseInt(document.getElementById(id).textContent, 10);
    var range = end - start;
    var current = start;
    var increment = end > start ? 1 : -1;
    var obj = document.getElementById(id);
    var startTime = new Date();
    var offset = 1;
    var remainderTime = 0;
    
    var step = function() {
      current += increment;
      obj.innerHTML = current;
      
      if (current != end) {
        setTimeout(step, duration/range);
      }
      else {
        console.log('Easing: ', duration/range);
        console.log('Elapsed time: ', new Date() - startTime)
        console.log('');
      }
    };
  
  setTimeout(step, duration/range);
}

  showSecondPage() {
    if($('.headerLeftPrimary').css('display') == 'block') { 
      $('.headerLeftPrimary').hide().removeClass('animated fadeInUp').addClass('animated fadeOutDown');
      $('.headerLeftInfo').show().removeClass('animated fadeOutDown').addClass('animated fadeInDown');
      $('.btnCustom').css('margin-top', 0);
      this.animateValue("sortsNum", 64000, 10000);
      this.animateValue("typesNum", 9000, 10000);
      this.animateValue("stylesNum", 0, 10000);
      this.animateValue("countriesNum", 0, 10000);
    }
    else {
      $('.headerLeftInfo').hide().removeClass('animated fadeInDown').addClass('animated fadeOutDown');
      $('.headerLeftPrimary').show().removeClass('animated fadeOutDown').addClass('animated fadeInUp');
      $('.btnCustom').css('margin-top', 20);
    }
  }

  render () {
    return (
      <div className="landingPage">
        {/* <audio id="my_audio" src="../../images/lucky.mp3" loop="loop"></audio> */}
        <div className="container whiteFont">
          <div className="grid">
            <div className="headerLeft headerLeftPrimary">
              <h1 className="header">DÉJÀ BREW</h1>
              <h2 className="subHeader">YOUR SOURCE TO FIND BEER, BREWERIES, & MORE.</h2>
              <h3 className="subHeader">
                Déjà Brew finds breweries on the map.<br/><br/>
                Déjà Brew finds beer on the map.<br/><br/>
                Déjà Brew finds them on the map so you don't have to.
                <button type="button" className="btnCustom" onClick={this.showSecondPage.bind(this)}>
                  <span className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
                </button>
              </h3>
            </div>
            <div className="headerLeft headerLeftInfo">
              <h1 className="header">DÉJÀ BREW</h1>
              <h3 className="subHeader blackColor">
                <div id="sortsNum">65527</div> SORTS OF BEER<br/><br/>
                <div id="typesNum">9134</div> NAMES OF BREWERIES<br/><br/>
                <div id="stylesNum">170</div> STYLES OF BEER<br/><br/>
                <div id="countriesNum">160</div>+ COUNTRIES AVAILABLE<br/><br/>
                <button type="button" className="btnCustom" onClick={this.showSecondPage.bind(this)}>
                  <span className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
                </button>
              </h3>
            </div>
          </div>
          <div className="images-container">
            <img src="../../images/layer-1.png" className="cabbage" id="layer-1"/>
            <img src="../../images/layer-2.png" className="cabbage" id="layer-2"/>
            <img src="../../images/layer-3.png" className="cabbage" id="layer-3"/>
            <img src="../../images/layer-4.png" className="cabbage" id="layer-4"/>
            <img src="../../images/layer-5.png" className="cabbage" id="layer-5"/>
            <img src="../../images/layer-6.png" className="cabbage" id="layer-6"/>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing;