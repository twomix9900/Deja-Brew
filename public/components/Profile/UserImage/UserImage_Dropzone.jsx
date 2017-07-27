import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import FormData from 'form-data';
import axios from 'axios';
import uuid from 'uuid';
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

export default class UserImageDrop extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      profileImage: ''
    }
    this.onDropAccepted=this.onDropAccepted.bind(this);
    this.ImageRemove=this.handleImageRemove.bind(this);
  }

  componentWillReceiveProps(NextProps) {
    this.setState({ profileImage: NextProps.image })
  }

  onDropAccepted (files) {
    let imageFile = files[0];
    let imageType = imageFile.type.substring(6);
    let keyName = 'image-' + uuid.v4() + "." + imageType
    Object.defineProperty(imageFile, 'name', { value: keyName });
    console.log('keyName', imageFile.name);
    let options = {
      headers: {
        'Content-Type': imageFile.type
      }
    };
    axios.get('/images/' + keyName + '/' + imageType)
    .then((result) => {
      let signedUrl = result.data;
      console.log('signedUrl', signedUrl);

      var options = {
        headers: {
          'Content-Type': imageFile.type
        }
      };
      axios.put('/users/' + this.props.userId, { image: signedUrl.substring(0, signedUrl.indexOf('?')) })
      axios.put(signedUrl, imageFile, options)
      .then(() => {
        this.setState({ profileImage: signedUrl.substring(0,signedUrl.indexOf('?')) });
      })
    })
    .then(() => {
      console.log('image successfully written to AWS S3')
    })
    .catch((err) => {
      console.log('error in writing to AWS S3', err);
    })
  }
  
  handleImageRemove(){
    console.log('inside handleImageRemove', this.state.profileImage);
    let keyName = this.state.profileImage.substring(this.state.profileImage.indexOf('image'));
    console.log('key to delete', keyName);
    axios.delete('/images/' + keyName)
      .then(() => {
        console.log('image successfully removed')
        this.setState({ profileImage: '' });
      })
  }

  render() {
    return (
      <div className='image-container' style={{ display: 'flex', justifyContent: 'center' }}>
        { (this.state.profileImage) ? (
          <div>
            <img src={ this.state.profileImage } style={{height: 200, width: 200, alignSelf: 'center'}} />
            <RaisedButton onClick={() => { this.ImageRemove() }} label="Remove" />
          </div>
        ) : (
          <div>
            <Dropzone
              accept='image/jpeg, image/jpg, image/gif, image/png'
              multiple={ false } 
              onDropAccepted={ this.onDropAccepted }>
              <div>Drop image (*.jpeg, *.gif, *.png) file here, or click to add file</div>
            </Dropzone>
          </div>
        )}
      </div>
    )
  }
}
