import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

export default class UserImageDrop extends Component {
  constructor(props) {
    super(props);  
    this.state = {}
  }

  onDrop (files) {
    console.log('received files: ', files);
  }

  render() {
    return (
      <div>
        <Dropzone
          accept='image/jpeg, image/jpg, image/gif, image/png' 
          onDrop={ this.onDrop }>
          <div>Drop image (*.jpeg, *.gif, *.png) file here, or click to add file</div>
        </Dropzone>
      </div>
    )
  }
}
