import React, { Component } from 'react';
import axios from 'axios';

import UserImage from './UserImage.jsx';
import Email from './Email.jsx';
import NickName from './NickName.jsx';
import Phone from './Phone.jsx';
import FriendList from './FriendList.jsx';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   image: 'IMAGE_URL',
    //   nickname: 'USER NICKNAME',
    //   email: 'USER EMAIL'
    //   phone: 'USER PHONE'
    // };
    this.UserImage = this.handleChangeImage.bind(this);
    this.state = {
      userInfo: {}
    }

  }

  componentWillMount() {
    let userId = 1; // dummy data

    axios.get('/users/' + userId)
    .then((data) => {
      console.log('successfully retrieved user data', data.data[0]);
      this.setState({ userInfo: data.data[0]});
    })
  }

  handleChangeImage () {
    console.log('inside handle change image');
  }

render() {
  return (
    <div>Welcome to Profile Page
      <UserImage handleImageClick={ this.UserImage } />
      <Email email={ this.state.userInfo.email } />
      <NickName nickname={ this.state.userInfo.nickname } />
      <Phone phone={ this.state.userInfo.phone } />
      <FriendList />
    </div>
  )}
}
