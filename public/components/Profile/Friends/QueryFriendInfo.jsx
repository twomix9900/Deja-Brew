import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import DialogMsg from '../../Dialog/DialogMsg.jsx';

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
    this.state = {
      friendName: '',
      areacode: '',
      prefix: '',
      SLN: '',
      open: false,
      msgTitle: '',
      msgBody: ''
    };
    this.validate=this.handleValidation.bind(this);
    this.handler=this.handler.bind(this);
    this.handleTextEntry=this.handleTextEntry.bind(this);
  }

  handleValidation(friendName, areacode, prefix, SLN){
    let phoneNum = areacode + prefix + SLN;
    if (friendName === '' || friendName === undefined) {
      this.setState({ open: true });
      this.setState({ msgTitle: 'Friend Info Incomplete'});
      this.setState({ msgBody: 'Some fields are empty, please complete your entry'});
    } else { 
      console.log('logic to validate valid phone number (' + areacode +') ' + prefix + '-' + SLN);
      if (areacode === undefined || prefix === undefined || SLN === undefined || phoneNum.length < 10) {
      this.setState({ open: true });
      this.setState({ msgTitle: 'Incomplete Phone Number'});
      this.setState({ msgBody: 'Some fields are empty, please complete your entry'});
      } else {
        let areaDigit = Number(areacode.substring(0, 1));
        let preDigit = Number(prefix.substring(0, 1));
        if (areaDigit === 0 || areaDigit === 1 || preDigit === 0 || preDigit === 1 || isNaN(phoneNum)) {
          this.setState({ open: true });
          this.setState({ msgTitle: 'Invalid Phone Number'});
          this.setState({ msgBody: 'Please use numbers only \n Areacodes and Prefixes cannot begin with 0 or 1'});
        } else {
          this.props.handleSubmit(friendName, phoneNum);
        }
      }
    }
  }

  handler() {
    this.setState({ open: false })
  }

  handleTextEntry(stateName, e) {
    let stateToSet = {};
    stateToSet[stateName] = e.target.value;
    this.setState(stateToSet);
  }

  render() {
    return (
      <div>
        <span>
          <TextField floatingLabelText="name" floatingLabelFixed={true} style={ styles.name } 
            onChange={(e) => this.handleTextEntry('friendName', e) } />
          (<TextField floatingLabelText="phone" floatingLabelFixed={true} maxLength='3' style={ styles.pre } 
            onChange={(e) => this.handleTextEntry('areacode', e) } />
          )<TextField floatingLabelText=" " maxLength='3' style={ styles.pre } onChange={(e) => this.handleTextEntry('prefix', e) } />          
          -<TextField floatingLabelText=" " maxLength='4' style={ styles.SLN } onChange={(e) => this.handleTextEntry('SLN', e) } />
          <RaisedButton onClick={() => { this.validate(this.state.friendName, this.state.areacode, this.state.prefix, this.state.SLN) }} 
            style={ styles.button } label="Submit" />
          <RaisedButton onClick={() => { this.props.handleSubmit() }} style={ styles.button } label="Cancel" />
        </span>
        <DialogMsg handler={ this.handler } open={ this.state.open } msgTitle={ this.state.msgTitle } msgBody={ this.state.msgBody } />
        </div>
    )
  }
}
