import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const styles={
  button: {
    height: 32
  }
}

const DisplayNickname = ({ handleNameClick, nickname }) => {

  return (
    <div>
      <AppBar title={ <span>{ (nickname) ? (nickname) : ('your nickname') }</span> } showMenuIconButton={false} 
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
