import React, { Component } from 'react';
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
    this.NickName = this.handleNameChange.bind(this);
    this.Phone = this.handlePhoneChange.bind(this);
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

render() {
  return (
    <div>Welcome to Profile Page
      <UserImage handleImageClick={ this.handleChangeImage } />
      <Email />
      <NickName handleNameClick={ this.handleNameChange } />
      <Phone handlePhoneClick={ this.handlePhoneChange } />
      <FriendList />
    </div>
  )}
}