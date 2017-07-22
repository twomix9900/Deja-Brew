import React, { Component } from 'react'
import {
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton'

const FriendListEntry = ({ handleEditFriendClick, handleDeleteFriendClick, friend, id, idx, editable }) => {

  let formattedPhone = '(' + friend.phone.substring(3, 6) + ') ' + friend.phone.substring(6, 9) + '-' + friend.phone.substring(9);

  return (
    <TableRow key={ idx }>
      <TableRowColumn>{ friend.name }</TableRowColumn>
      <TableRowColumn>{ formattedPhone }</TableRowColumn>
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
