import React, { Component } from 'react';

const UserImage = ({ handleImageClick }) => {
  return (
    <div onClick={(e) => 
      { handleImageClick() }
      }>** Image/Photo Here **
    </div>
  )
}

export default UserImage;