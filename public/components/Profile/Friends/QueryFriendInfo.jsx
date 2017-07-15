import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const styles = {
  name: {
    width: '320px'
  },
  pre: {
    width: '28px'
  },
  SLN: {
    width: '40px'
  },
  button: {
    margin: 5,
    height: 24
  }
}

export default class QueryFriendInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.validate=this.handleValidation.bind(this);
  }

  handleValidation(friendName, areacode, prefix, SLN){
    if (friendName === '' || friendName === undefined) {
      alert('friend info incomplete');
      return;
    } 
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
        this.props.handleSubmit(friendName, phoneNum);
      }
    }
  }

  render() {
    let friendName;
    let areacode;
    let prefix;
    let SLN;
    return (
      <div>
        <span>
          <TextField floatingLabelText="name" floatingLabelFixed={true} style={ styles.name } onChange={(e) => friendName = e.target.value } />
          (<TextField floatingLabelText="phone" floatingLabelFixed={true} maxLength='3' style={ styles.pre } onChange={(e) => areacode = e.target.value } />
          )<TextField floatingLabelText=" " maxLength='3' style={ styles.pre } onChange={(e) => prefix = e.target.value } />          
          -<TextField floatingLabelText=" " maxLength='4' style={ styles.SLN } onChange={(e) => SLN = e.target.value } />
          <RaisedButton onClick={() => { this.validate(friendName, areacode, prefix, SLN) }} style={ styles.button } label="Submit" />
          <RaisedButton onClick={() => { this.props.handleSubmit() }} style={ styles.button } label="Cancel" />
        </span>
      </div>
    )
  }
}
