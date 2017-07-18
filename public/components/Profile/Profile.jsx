import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Email from './Email/Email.jsx';
import NickName from './Nickname/NickName.jsx';
import Phone from './Phone/Phone.jsx';
import FriendList from './Friends/FriendList.jsx';
import UserImageDrop from './UserImage/UserImage_Dropzone.jsx';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {}
    }
  }

  componentWillMount() {
    let auth0Id = localStorage.getItem('auth0Id');

    // axios.post('/users', { auth0Id: auth0Id })
    //   .then(() => {
        axios.get('/users/' + auth0Id)
        .then((data) => {
          console.log('*** successfully retrieved user data ***', data.data[0]);
          this.setState({ userInfo: data.data[0]});
        })    
    // })
    // axios.get('/users/' + auth0Id)
    // .then((data) => {
    //   console.log('successfully retrieved user data', data.data[0]);
    //   this.setState({ userInfo: data.data[0]});
    // })
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
        <div>
          <NickName userId={ this.state.userInfo.id } nickname={ this.state.userInfo.nickname } />
          <UserImageDrop userId={ this.state.userInfo.id} image={ this.state.userInfo.image } />
          <Email userId={ this.state.userInfo.id } email={ this.state.userInfo.email } />
          <Phone userId={ this.state.userInfo.id } phone={ this.state.userInfo.phone } />
          <FriendList userId={ this.state.userInfo.id } />
        </div>
        </MuiThemeProvider>
      </div>
    )
  }
}
