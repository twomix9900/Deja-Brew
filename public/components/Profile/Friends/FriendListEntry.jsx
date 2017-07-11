import React, { Component } from 'react'

const FriendListEntry = ({ friend }) => {

  let formattedPhone = '(' + friend.phone.substring(3, 6) + ') ' + friend.phone.substring(6, 9) + '-' + friend.phone.substring(9);

return (
  <tr>
    <td>{ friend.name }</td>
    <td>{ formattedPhone }</td>
  </tr>
  )
}

export default FriendListEntry;
