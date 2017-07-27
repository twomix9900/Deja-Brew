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
      userInfo: {},
      mobileSize: false
    }
  }

  componentWillMount() {
    let width = document.getElementById('app').offsetWidth;
    console.log('width of profile', width)
    if (width <= 420 ) {
      this.setState({ mobileSize: true })
    } else {
      this.setState({ mobileSize: false })
    }
  }

  componentDidMount() {
    let info = JSON.parse(localStorage.getItem('userInfo'));
    let auth0 = info.auth0Id;
    axios.get('/users/' + auth0)
    .then((data) => {
      this.setState({ userInfo: data.data[0] });
    })
  }

  render() {
    return (
      <div className='container'>
        <MuiThemeProvider>
        <div className='profile-container'>
          <UserImageDrop userId={ this.state.userInfo.id} image={ this.state.userInfo.image } />
          <NickName 
            userId={ this.state.userInfo.id } 
            nickname={ this.state.userInfo.nickname } 
            mobileSize={ this.state.mobileSize }/>
          <Email 
            userId={ this.state.userInfo.id } 
            email={ this.state.userInfo.email } 
            mobileSize={ this.state.mobileSize }/>
          <Phone 
            userId={ this.state.userInfo.id } 
            phone={ this.state.userInfo.phone } 
            mobileSize={ this.state.mobileSize }/>
          <FriendList userId={ this.state.userInfo.id } 
            mobileSize={ this.state.mobileSize }/>
        </div>
        </MuiThemeProvider>
      </div>
    )
  }
}
