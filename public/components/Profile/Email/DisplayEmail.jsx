import React, { Component } from 'react';

const DisplayEmail = ({ handleEmailClick, email }) => {

  console.log('inside displayemail ', email)
  return (
    <div>
       <span>Email: { email }
         <button onClick={() => 
          { handleEmailClick() }
          }>Edit
        </button> 
      </span> 
    </div>
  )
}

export default DisplayEmail
