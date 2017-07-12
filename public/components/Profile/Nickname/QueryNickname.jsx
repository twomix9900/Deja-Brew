import React, { Component } from 'react';

const QueryNickname = ({ handleSubmit }) => {
  let text;

  return (
    <div>Nickname:
      <input type='text' onChange={(e) => text = e.target.value }></input>
      <button onClick={() => { handleSubmit(text) }}>Submit</button>
      <button onClick={() => { handleSubmit() }}>Cancel</button>
    </div>
  )
}

export default QueryNickname
