import React, { Component } from 'react';
import axios from 'axios';
import FriendListEntry from './FriendListEntry.jsx';
import FriendAdd from './FriendAdd.jsx'

export default class FriendList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      friendList: [],
    }
    this.FriendAdd=this.handleAddFriend.bind(this)

   
    let userId = 1; // dummy data

    axios.get('/friends/' + userId)
    .then((data) => {
      return data.data;
    })
    .then((data) => {
      this.setState({ friendList: data });
    })
    
  };

  handleAddFriend() {
    console.log('inside handle add friend');
  }

  render() {
    return (
      <div>Friends List
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {this.state.friendList.map((friend, i) => (
              <FriendListEntry
                friend={ friend }
                key={ i } />
              ))}
          </tbody>
        </table>
        <FriendAdd handleAddFriendClick={ this.FriendAdd } />
      </div>
    );
  }
}