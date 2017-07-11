import React, { Component } from 'react';

const DisplayPhone = ({ handlePhoneClick, phone }) => {

  let formattedPhone = '(' + phone.substring(3, 6) + ') ' + phone.substring(6, 9) + '-' + phone.substring(9);

  return (
    <div>
      <span>Phone Number: { formattedPhone }
        <button onClick={() => 
          { handlePhoneClick() }
          }>Edit
        </button>
      </span>
    </div>
  )
}

export default DisplayPhone
