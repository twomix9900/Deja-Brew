import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const styles={
  button: {
    height: 32,
    color: '#FFF'
  },
  very_light_amber: { 
    backgroundColor: '#FFB300'
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

const DisplayNickname = ({ handleNameClick, nickname, mobileSize }) => {
  let fontSize;
  ( mobileSize ) ? ( fontSize='16px' ) : ( fontSize='32px' );
  return (
    <div>
      <AppBar className="profileText"
        style={styles.very_light_amber}
        titleStyle={{ fontSize: fontSize }}
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
