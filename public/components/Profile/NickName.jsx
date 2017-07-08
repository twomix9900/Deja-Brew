import React, { Component } from 'react';

const NickName = ({ handleNameClick }) => {
  return (
    <div onClick={(e) => 
      { handleNameClick() }
      }>** User Nickname Here **
    </div>
  )
}

export default NickName;