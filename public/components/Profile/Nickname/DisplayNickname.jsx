import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const styles={
  button: {
    height: 32,
    color: '#FFF'
  },
  light_amber: {
    backgroundColor: '#FFA000'
  },
  medium_amber: {
    backgroundColor: '#FF8F00'
  },
  dark_amber: {
    backgroundColor: '#FF6F00'
  }
}

const DisplayNickname = ({ handleNameClick, nickname }) => {

  return (
    <div>
      <AppBar 
        style={styles.light_amber} 
        title={ <span>{ (nickname) ? (nickname) : ('your nickname') }</span> } 
        showMenuIconButton={false} 
        iconElementRight={<FlatButton 
          onClick={() => { handleNameClick() }}
          style={styles.button}
          label="Edit" 
        />} 
      />
    </div>
  )
}

export default DisplayNickname;
