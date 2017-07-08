import React, { Component } from 'react'

const FriendListEntry = ({ friend }) => {

return (
  <tr>
    <td>{friend.name}</td>
    <td>{friend.phone}</td>
  </tr>
  )
}

export default FriendListEntry;
