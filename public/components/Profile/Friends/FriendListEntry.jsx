import React, { Component } from 'react'
import {
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton'

const FriendListEntry = ({ handleEditFriendClick, handleDeleteFriendClick, friend, id, idx, editable, mobileSize }) => {

  let formattedPhone = '(' + friend.phone.substring(3, 6) + ') ' + friend.phone.substring(6, 9) + '-' + friend.phone.substring(9);
  let fontSize;
  console.log('inside FriendList Entry, what is mobileSize', mobileSize);
  ( mobileSize ) ? ( fontSize='9px' ) : ( fontSize='12px');    
  return (
    <TableRow key={ idx }>
      <TableRowColumn style={{ fontSize: fontSize }}>{ friend.name }</TableRowColumn>
      <TableRowColumn style={{ fontSize: fontSize }}>{ formattedPhone }</TableRowColumn>
      {(editable) ? (
        <TableRowColumn><RaisedButton onClick={() => { handleEditFriendClick(id, idx) }} label="Edit" /></TableRowColumn>
      ) : (<div></div>)}
      {(editable) ? (
        <TableRowColumn><RaisedButton onClick={() => { handleDeleteFriendClick(id, idx) }} label="Delete"/></TableRowColumn>
      ) : (<div></div>)}
    </TableRow>
  )
}

export default FriendListEntry;
