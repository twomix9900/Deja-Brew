import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import FormData from 'form-data';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton'

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
    let options = {
      headers: {
        'Content-Type': imageFile.type
      }
    };
    let imageType = imageFile.type.substring(6);
    axios.get('/images/' + imageFile.name + '/' + imageType)
    .then((result) => {
      let signedUrl = result.data;

      var options = {
        headers: {
          'Content-Type': imageFile.type
        }
      };
      this.setState({ profileImage: signedUrl.substring(0,signedUrl.indexOf('?')) });
      axios.put('/users/' + this.props.userId, { image: signedUrl.substring(0, signedUrl.indexOf('?')) })
      return axios.put(signedUrl, imageFile, options)
    })
    .then(() => {
      console.log('image successfully written to AWS S3')
    })
    .catch((err) => {
      console.log('error in writing to AWS S3', err);
    })
  }
  
  handleImageRemove(){
    console.log('inside handleImageRemove')
    axios.put('/users/' + this.props.userId, { image: '' })
      .then(() => {
        this.setState({ profileImage: '' });
      })
  }

  render() {
    return (
      <div>
        { (this.state.profileImage) ? (
          <div>
            <img src={ this.state.profileImage } style={{height: 200, width: 200}} />
            <RaisedButton onClick={() => { this.ImageRemove() }} label="Remove" />
          </div>
        ) : (
          <Dropzone
            accept='image/jpeg, image/jpg, image/gif, image/png'
            multiple={ false } 
            onDropAccepted={ this.onDropAccepted }>
            <div>Drop image (*.jpeg, *.gif, *.png) file here, or click to add file</div>
          </Dropzone>
        )}
      </div>
    )
  }
}
