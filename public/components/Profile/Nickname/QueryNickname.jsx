import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const styles={
  button: {
    marginTop: 8,
    height: 32,
    color: '#FFF'
  }
}

const QueryNickname = ({ handleSubmit }) => {
  let text;

  return (
    <div>
      <AppBar title={ <span><TextField id="nickname" onChange={(e) => text = e.target.value } /></span> } showMenuIconButton={false} 
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
