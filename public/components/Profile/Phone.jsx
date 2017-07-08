import React, { Component } from 'react';

const Phone = ({ handlePhoneClick }) => {
  return (
    <div onClick={(e) => 
      { handlePhoneClick() }
      }>** User Phone Number Here **
    </div>
  )
}

export default Phone;