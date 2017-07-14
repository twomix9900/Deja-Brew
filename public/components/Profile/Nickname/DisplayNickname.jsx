import React, { Component } from 'react';

const DisplayNickname = ({ handleNameClick, nickname }) => {

  return (
    <div>
      <span>Nickname: { nickname }
        <button onClick={() => 
          { handleNameClick() }
          }>Edit
        </button>
      </span>
    </div>
  )
}

export default DisplayNickname
