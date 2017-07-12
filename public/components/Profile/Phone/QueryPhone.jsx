import React, { Component } from 'react';

export default class QueryPhone extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.validate=this.handleValidation.bind(this);
  }

  handleValidation(areacode, prefix, SLN){
    console.log('logic to validate valid phone number (' + areacode +') ' + prefix + '-' + SLN);
    if (areacode === undefined || prefix === undefined || SLN === undefined) {
      alert('phone number incomplete');
    } else {
      let areaDigit = Number(areacode.substring(0, 1));
      let preDigit = Number(prefix.substring(0, 1));
      let phoneNum = areacode + prefix + SLN;
      if (areaDigit === 0 || areaDigit === 1 || preDigit === 0 || preDigit === 1 || phoneNum.length < 10 || isNaN(phoneNum)) {
        alert('not a valid phone number'); // temporary alert
      } else {
        this.props.handleSubmit(phoneNum);
      }
    }
  }

  render() {
    let areacode;
    let prefix;
    let SLN;
    return (
      <div>Phone Number:
        <span>
          (<input type='text' maxLength='3' size='1' onChange={(e) => areacode = e.target.value } style={{border: 0}}></input>
          )<input type='text' maxLength='3' size='1' onChange={(e) => prefix = e.target.value } style={{border: 0}}></input>          
          -<input type='text' maxLength='4' size='2' onChange={(e) => SLN = e.target.value } style={{border: 0}}></input>
          <button onClick={() => { this.validate(areacode, prefix, SLN) }}>Submit</button>
          <button onClick={() => { this.props.handleSubmit() }}>Cancel</button>
        </span>
      </div>
    )
  }
}
