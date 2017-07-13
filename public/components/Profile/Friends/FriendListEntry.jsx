import React, { Component } from 'react'

const FriendListEntry = ({ handleEditFriendClick, handleDeleteFriendClick, friend, id, idx }) => {

  let formattedPhone = '(' + friend.phone.substring(3, 6) + ') ' + friend.phone.substring(6, 9) + '-' + friend.phone.substring(9);

  return (
    <tr>
      <td>{ friend.name }</td>
      <td>{ formattedPhone }</td>
      <td><button onClick={() => { handleEditFriendClick(id, idx) }}>Edit</button></td>
      <td><button onClick={() => { handleDeleteFriendClick(id, idx) }}>Delete</button></td>
    </tr>
  )
}

export default FriendListEntry;
