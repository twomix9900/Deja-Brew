import React, { Component } from 'react';
import {
  Table,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import DialogMsg from '../../Dialog/DialogMsg.jsx';

const styles = {
  name: {
    width: '220px'
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

export default class EditFriendEntry extends Component {

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
    this.validate = this.handleValidation.bind(this);
    this.handler = this.handler.bind(this);
    this.handleTextEntry = this.handleTextEntry.bind(this);
  }

  handleValidation(friendName, areacode, prefix, SLN) {
    let phoneNum = areacode + prefix + SLN;
    if (friendName === '' || friendName === undefined) {
      this.setState({ open: true });
      this.setState({ msgTitle: 'Friend Info Incomplete' });
      this.setState({ msgBody: 'Some fields are empty, please complete your entry' });
    } else {
      if (areacode === undefined || prefix === undefined || SLN === undefined || phoneNum.length < 10) {
        this.setState({ open: true });
        this.setState({ msgTitle: 'Incomplete Phone Number' });
        this.setState({ msgBody: 'Some fields are empty, please complete your entry' });
      } else {
        let areaDigit = Number(areacode.substring(0, 1));
        let preDigit = Number(prefix.substring(0, 1));
        let phoneNum = areacode + prefix + SLN;
        if (areaDigit === 0 || areaDigit === 1 || preDigit === 0 || preDigit === 1 || isNaN(phoneNum)) {
          this.setState({ open: true });
          this.setState({ msgTitle: 'Invalid Phone Number' });
          this.setState({ msgBody: 'Please use numbers only \n Areacodes and Prefixes cannot begin with 0 or 1' });
        } else {
          this.props.handleEditSubmit(friendName, phoneNum, this.props.id, this.props.idx);
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
        <TableRow>
          <TableRowColumn>
            <TextField floatingLabelText="name" floatingLabelFixed={true} style={styles.name}
              onChange={(e) => this.handleTextEntry('friendName', e)} />
          </TableRowColumn>
          <TableRowColumn>
            (<TextField floatingLabelText="phone" floatingLabelFixed={true} maxLength='3' style={styles.pre}
              onChange={(e) => this.handleTextEntry('areacode', e)} />
            )<TextField floatingLabelText=" " maxLength='3' style={styles.pre} onChange={(e) => this.handleTextEntry('prefix', e)} />
            -<TextField floatingLabelText=" " maxLength='4' style={styles.SLN} onChange={(e) => this.handleTextEntry('SLN', e)} />
          </TableRowColumn>
          <TableRowColumn><RaisedButton onClick={() => { this.validate(this.state.friendName, this.state.areacode, this.state.prefix, this.state.SLN) }}
            label="Submit" /></TableRowColumn>
          <TableRowColumn><RaisedButton onClick={() => { this.props.handleEditSubmit(undefined, undefined, this.props.id, this.props.idx) }}
            label="Cancel" /></TableRowColumn>
        </TableRow>

        <DialogMsg handler={this.handler} open={this.state.open} msgTitle={this.state.msgTitle} msgBody={this.state.msgBody} />
      </div>
    )
  }
}
