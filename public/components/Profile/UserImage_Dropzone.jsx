import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import FormData from 'form-data';
import axios from 'axios';

export default class UserImageDrop extends Component {
  constructor(props) {
    super(props);  
    this.state = {}
  }

  componentWillReceiveProps(NextProps) {
    // console.log('incoming props', NextProps);
    // this.setState({ userId: NextProps });
  }

  componentDidMount() {
    // console.log('component has mounted', this.props, this.state);
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
      console.log('*** signedUrl ***', signedUrl)

      var options = {
        headers: {
          'Content-Type': imageFile.type
        }
      };
      this.setState({ profileImage: signedUrl })
      return axios.put(signedUrl, imageFile, options);
    })
    .then((result) => {
      console.log('image successfully put to aws s3')
    })
    .catch((err) => {
      console.log('error in Image', err);
    })
  }

  showImage() {
    const { files } = this.state;
    return (
      <div>
        <img src={ files[0] } style={{height: 100, width: 100}} />
      </div>

    )
  }

  render() {
    return (
      <div>
        <Dropzone
          accept='image/jpeg, image/jpg, image/gif, image/png'
          multiple={ false } 
          onDropAccepted={ this.onDropAccepted }>
          <div>Drop image (*.jpeg, *.gif, *.png) file here, or click to add file</div>
        </Dropzone>
          {  this.state.profileImage  ? (
            <div>
              <img src={ this.state.profileImage } style={{height: 100, width: 100}} />
            </div>
          ) : (
            <div></div>
          )}
      </div>
    )
  }
}
