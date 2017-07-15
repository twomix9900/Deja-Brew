import React, { Component } from 'react';

const QueryNickname = ({ handleSubmit }) => {
  let text;

  return (
    <div>
      <h3><input type='text' onChange={(e) => text = e.target.value }></input></h3>
      <button onClick={() => { handleSubmit(text) }}>Submit</button>
      <button onClick={() => { handleSubmit() }}>Cancel</button>
    </div>
  )
}

export default QueryNickname
