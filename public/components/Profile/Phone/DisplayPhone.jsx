import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const styles={
  button: {
    height: 32
  }
}

const DisplayPhone = ({ handlePhoneClick, phone }) => {

  console.log('phone length', phone.length);
  let formattedPhone = '';
  (phone.length) ? 
  (formattedPhone = '(' + phone.substring(3, 6) + ') ' + phone.substring(6, 9) + '-' + phone.substring(9) ) :
  (formattedPhone = '' )
  
  return (
    <div>
      <AppBar showMenuIconButton={false} title={ <span>Phone Number:{ ' ' + formattedPhone }</span> }
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
