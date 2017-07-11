import React, { Component } from 'react';

const QueryNickname = ({ handleSubmit }) => {
  let text;
  return (
    <div>
      <input type='text' className='NicknameQuery' onChange={(event) => text = event.target.value}></input>
      <button onClick={() => { handleSubmit(text) }}>Submit</button>
    </div>
  )
}

export default QueryNickname
