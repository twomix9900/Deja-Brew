import React, { Component } from 'react';
import axios from 'axios';
import AppBar from 'material-ui/AppBar';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';

import FriendListEntry from '../Profile/Friends/FriendListEntry.jsx';
import FriendAdd from '../Profile/Friends/FriendAdd.jsx';
import QueryFriendInfo from '../Profile/Friends/QueryFriendInfo.jsx';

export default class drinkBuddy extends Component {
  
  constructor(props) {
    super(props);
    this.state={
      friendList: []
    };
  }

  componentDidMount() {
    userInfo=JSON.parse(localStorage.getItem('userInfo'));
    axios.get('/friends/' + userInfo.userId)
    .then((data) => {
      return data.data
    })
    .then((data) => {
      this.setState({ friendList: data });
      this.sortFriendList();
    })
  }

  sortFriendList() {
  let sortedFriendList = this.state.friendList
    .slice()
    .sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return +1;
      return 0;
      })
  this.setState({ friendList: sortedFriendList })
  }
  
  render() {
    return (
      <div>



      </div>
    )
  }

}