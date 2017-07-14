import React, { Component } from 'react';

const QueryEmail = ({ handleSubmit }) => {
  let text;

  return (
    <div>Email:
      <input type='text' onChange={(e) => text = e.target.value }></input>
      <button onClick={() => { handleSubmit(text) }}>Submit</button>
      <button onClick={() => { handleSubmit() }}>Cancel</button>
    </div>
  )
}

export default QueryEmail
