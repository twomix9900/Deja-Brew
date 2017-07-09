import React, { Component } from 'react';
import axios from 'axios';

import UserImage from './UserImage.jsx';
import Email from './Email.jsx';
import NickName from './NickName.jsx';
import Phone from './Phone.jsx';
import FriendList from './FriendList.jsx';
import FriendAdd from './FriendAdd.jsx'

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
    this.NickName = this.handleNameChange.bind(this);
    this.Phone = this.handlePhoneChange.bind(this);
    this.FriendAdd = this.handleAddFriend.bind(this);
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

  handleNameChange () {
    console.log('inside handle name change');
  }

  handlePhoneChange() {
    console.log('inside handle phone change');
  }

  handleAddFriend() {
    console.log('inside handle add friend');
  }

render() {
  return (
    <div>Welcome to Profile Page
      <UserImage handleImageClick={ this.handleChangeImage } />
      <Email />
      <NickName handleNameClick={ this.handleNameChange } nickname={ this.state.userInfo.nickname } />
      <Phone handlePhoneClick={ this.handlePhoneChange } phone={ this.state.userInfo.phone } />
      <FriendList />
      <FriendAdd handleAddFriendClick={ this.handleAddFriend } />
    </div>
  )}
}
