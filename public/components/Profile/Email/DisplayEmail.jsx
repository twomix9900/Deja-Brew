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

const DisplayEmail = ({ handleEmailClick, email, mobileSize }) => {
  let fontSize;
  ( mobileSize ) ? ( fontSize='16px' ) : ( fontSize='28px');
  return (
    <div>
      <AppBar 
        style={styles.light_amber} 
        showMenuIconButton={false} 
        title={ <span>email:{ ' ' + email }</span> }
        titleStyle={{ fontSize: fontSize }}
        iconElementRight={<FlatButton 
          onClick={() => { handleEmailClick() }}
          style={styles.button}
          label="Edit" 
        />}     
      />
    </div>
  )
}

export default DisplayEmail
