import React, { Component } from 'react';

const DisplayPhone = ({ handlePhoneClick, phone }) => {
  return (
    <div>
      <span>Phone Number: { phone }
        <button onClick={() => 
          { handlePhoneClick() }
          }>Edit
        </button>
      </span>
    </div>
  )
}

export default DisplayPhone
