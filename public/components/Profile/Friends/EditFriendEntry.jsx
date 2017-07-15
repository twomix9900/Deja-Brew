import React, { Component } from 'react';
import {
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton'

export default class EditFriendEntry extends Component {

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
        this.props.handleEditSubmit(friendName, phoneNum, this.props.id, this.props.idx);
      }
    }
  }

  render() {
    let friendName;
    let areacode;
    let prefix;
    let SLN;
    return (
        <TableRow>
          <TableRowColumn>
          <input type='text' onChange={(e) => friendName = e.target.value }></input></TableRowColumn>
          <TableRowColumn>(<input type='text' maxLength='3' size='1' onChange={(e) => areacode = e.target.value } ></input>
          )<input type='text' maxLength='3' size='1' onChange={(e) => prefix = e.target.value } ></input>          
          -<input type='text' maxLength='4' size='2' onChange={(e) => SLN = e.target.value } ></input></TableRowColumn>
          <TableRowColumn><RaisedButton onClick={() => { this.validate(friendName, areacode, prefix, SLN) }} label="Submit"/></TableRowColumn>
          <TableRowColumn><RaisedButton onClick={() => { this.props.handleEditSubmit(undefined, undefined, this.props.id, this.props.idx) }} label="Cancel" /></TableRowColumn>
        </TableRow>
    )
  }
}
