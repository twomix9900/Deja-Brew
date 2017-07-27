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
    backgroundColor: '#FF8F00',
  },
  dark_amber: {
    backgroundColor: '#FF6F00'
  }
}

const DisplayPhone = ({ handlePhoneClick, phone, mobileSize }) => {

  let formattedPhone = '';
  (phone.length) ? 
  (formattedPhone = '(' + phone.substring(3, 6) + ') ' + phone.substring(6, 9) + '-' + phone.substring(9) ) :
  (formattedPhone = '' )

  let fontSize;
  ( mobileSize ) ? ( fontSize='16px' ) : ( fontSize='28px');
  
  return (
    <div>
      <AppBar
        style={styles.medium_amber} 
        showMenuIconButton={false} 
        title={ <span>Phone Number:{ ' ' + formattedPhone }</span> }
        titleStyle={{ fontSize: fontSize }}
        iconElementRight={ <FlatButton 
          onClick={() => { handlePhoneClick() }}
          style={styles.button}
          label="Edit" 
        /> }     
      />
    </div>
  )
}

export default DisplayPhone
