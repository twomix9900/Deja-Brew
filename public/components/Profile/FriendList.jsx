import React, { Component } from 'react';
import axios from 'axios';

const FriendList = () => {

let userId = 1; // dummy data

let friendList = axios.get('/friends/' + userId)
  .then((data) => {
    console.log('data returned ', data);
    return data;
  })
}

export default FriendList;