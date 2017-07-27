import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const styles={
  button: {
    marginTop: 8,
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

const QueryNickname = ({ handleSubmit, mobileSize }) => {
  let text;
  let fontSize;
  ( mobileSize ) ? ( fontSize='16px' ) : ( fontSize='32px' )
  return (
    <div>
      <AppBar 
        style={styles.very_light_amber}
        titleStyle={{ fontSize: fontSize }}
        title={ <span><TextField id="nickname" onChange={(e) => text = e.target.value } /></span> } 
        showMenuIconButton={false} 
        iconElementRight={ 
          <div>
            <FlatButton onClick={() => { handleSubmit(text) }}
              style={styles.button}
              label="Submit" /> 
            <FlatButton onClick={() => { handleSubmit() }}
              style={styles.button}
              label="Cancel" /> 
          </div> 
        } 
      />
    </div>
  )
}

export default QueryNickname
