import React, { Component } from 'react';import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import DialogMsg from '../../Dialog/DialogMsg.jsx'

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
  light_amber: {
    backgroundColor: '#FFA000'
  },
  medium_amber: {
    backgroundColor: '#FF8F00'
  },
  dark_amber: {
    backgroundColor: '#FF6F00'
  }
}

export default class QueryPhone extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      areacode: '',
      prefix: '',
      SLN: '',
    };
    this.validate=this.handleValidation.bind(this);
    this.handleInvalidOK=this.handleInvalidOK.bind(this);
    this.handleIncompleteOK=this.handleIncompleteOK.bind(this);
    this.handler=this.handler.bind(this);
    this.handleTextEntry=this.handleTextEntry.bind(this);
  }

  handleValidation(areacode, prefix, SLN){
    let phoneNum = areacode + prefix + SLN;
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
        this.props.handleSubmit(phoneNum);
      }
    }
  }

  handleInvalidOK() {
    this.setState({ invalid: false });
  }

  handleIncompleteOK() {
    this.setState({ incomplete: false })
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
        <AppBar 
          style={styles.medium_amber}
          title={ <span>
            (<TextField floatingLabelText="Phone Number" floatingLabelFixed={true} maxLength='3' style={ styles.pre } 
              onChange={(e) => this.handleTextEntry('areacode', e) } />
            )<TextField floatingLabelText=" " maxLength='3' style={ styles.pre } onChange={(e) => this.handleTextEntry('prefix', e) } />          
            -<TextField floatingLabelText=" " maxLength='4' style={ styles.SLN } onChange={(e) => this.handleTextEntry('SLN', e) } />
          </span> } 
          showMenuIconButton={false} 
          iconElementRight={ 
            <div>
              <FlatButton onClick={() => { this.validate(this.state.areacode, this.state.prefix, this.state.SLN) }}
                style={styles.button}
                label="Submit" /> 
              <FlatButton onClick={() => { this.props.handleSubmit() }}
                style={styles.button}
                label="Cancel" /> 
            </div> 
          } />
        <DialogMsg handler={ this.handler } open={ this.state.open } msgTitle={ this.state.msgTitle } msgBody={ this.state.msgBody } />
      </div>
    )
  }
}
