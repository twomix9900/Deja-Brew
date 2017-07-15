import React, { Component } from 'react';import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const styles={
  pre: {
    width: '28px'
  },
  SLN: {
    width: '40px'
  },
  button: {
    marginTop: 8,
    height: 32,
    color: '#FFF'
  },
  invalid: false,
  incomplete: false,
}

export default class QueryPhone extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.validate=this.handleValidation.bind(this);
  }

  handleValidation(areacode, prefix, SLN){
    console.log('logic to validate valid phone number (' + areacode +') ' + prefix + '-' + SLN);
    if (areacode === undefined || prefix === undefined || SLN === undefined) {
      alert('phone number incomplete'); // temporary placeholder alert
    } else {
      let areaDigit = Number(areacode.substring(0, 1));
      let preDigit = Number(prefix.substring(0, 1));
      let phoneNum = areacode + prefix + SLN;
      if (areaDigit === 0 || areaDigit === 1 || preDigit === 0 || preDigit === 1 || phoneNum.length < 10 || isNaN(phoneNum)) {
        alert('not a valid phone number'); // temporary placeholder alert
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
      <div>
        <AppBar title={ <span>
          (<TextField floatingLabelText="Phone Number" floatingLabelFixed={true} maxLength='3' style={ styles.pre } onChange={(e) => areacode = e.target.value } />
          )<TextField floatingLabelText=" " maxLength='3' style={ styles.pre } onChange={(e) => prefix = e.target.value } />          
          -<TextField floatingLabelText=" " maxLength='4' style={ styles.SLN } onChange={(e) => SLN = e.target.value } />
        </span> } 
        showMenuIconButton={false} 
        iconElementRight={ 
          <div>
            <FlatButton onClick={() => { this.validate(areacode, prefix, SLN) }}
              style={styles.button}
              label="Submit" /> 
            <FlatButton onClick={() => { this.props.handleSubmit() }}
              style={styles.button}
              label="Cancel" /> 
          </div> 
        } />
      </div>
    )
  }
}
