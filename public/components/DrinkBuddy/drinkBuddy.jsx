import React, { Component } from 'react';
import axios from 'axios';
import AppBar from 'material-ui/AppBar';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

import FriendListEntry from '../Profile/Friends/FriendListEntry.jsx';
import FriendAdd from '../Profile/Friends/FriendAdd.jsx';
import QueryFriendInfo from '../Profile/Friends/QueryFriendInfo.jsx';

export default class drinkBuddy extends Component {
  
  constructor(props) {
    super(props);
    this.state={
      friendList: [],
      newFriendQuery: true
    }
    this.handleFriendAdd=this.handleFriendAdd.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.sortFriendList=this.sortFriendList.bind(this);
    this.formatPhone=this.formatPhone.bind(this);
  }

  componentWillMount() {
    let userInfo=JSON.parse(localStorage.getItem('userInfo'));
    axios.get('/friends/' + userInfo.id)
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

  getFriendData() {
    let userInfo=JSON.parse(localStorage.getItem('userInfo'));
    axios.get('/friends/' + userInfo.id)
    .then((data) => {
      return data.data;
    })
    .then((data) => {
      this.setState({ friendList: data });
      this.sortFriendList();
    })
  }  
  
  formatPhone(phone) {
    return '(' + phone.substring(3, 6) + ') ' + phone.substring(6, 9) + '-' + phone.substring(9);
  }

  handleFriendAdd() {
    this.setState({ newFriendQuery: false })
  }

  handleSubmit(friendName, phone) {
    if (friendName === undefined && phone === undefined) {
      this.setState({ newFriendQuery: true })
    } else {
      let userInfo=JSON.parse(localStorage.getItem('userInfo'));
      let list=this.state.friendList;
      list.push({ name: friendName, phone: '+1 ' + phone });
      this.setState({ friendList: list })
      axios.put('friends/' + userInfo.id, { name: friendName, phone: '+1 ' + phone })
      .then(() => {
        this.sortFriendList()
        this.setState({ newFriendQuery: true })
      })
    }
  }

  render() {
    return (
      <div><AppBar title="my drinking buddies" showMenuIconButton={false} />
        <Table multiSelectable={true}>
          <TableHeader enableSelectAll={true}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Phone Number</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            { this.state.friendList.map((friend, i) =>
            <TableRow key = { i }>
              <TableRowColumn>{ friend.name }</TableRowColumn>
              <TableRowColumn>{ this.formatPhone(friend.phone) }</TableRowColumn>
            </TableRow>
            )} 
            </TableBody>
        </Table>
        { (this.state.newFriendQuery) ? (
            <FriendAdd handleAddFriendClick={ this.handleFriendAdd } />
          ) : (
            <QueryFriendInfo handleSubmit={ this.handleSubmit } />
          ) }      
      </div>
    )
  }

}