import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const styles={
  button: {
    height: 32
  }
}

const DisplayEmail = ({ handleEmailClick, email }) => {

  return (
    <div>
      <AppBar showMenuIconButton={false} title={ <span>email:{ ' ' + email }</span> }
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
