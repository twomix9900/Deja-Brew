import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  button: {
    margin: 20,
    height: 20,
    primary: true
  }
}

const DisplayNickname = ({ handleNameClick, nickname }) => {

  return (
    <div>
      <span><h3><strong>{ nickname }</strong></h3>
        <RaisedButton 
          onClick={() => { handleNameClick() }}
          style={styles.button}
          label="Edit"
          />
      </span>
    </div>
  )
}

export default DisplayNickname;
