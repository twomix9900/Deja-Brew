import React, { Component } from 'react';
import axios from 'axios';
import FriendListEntry from './FriendListEntry.jsx';

export default class FriendList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      friendList: [],
    }
   
   let userId = 1; // dummy data

    axios.get('/friends/' + userId)
    .then((data) => {
      return data.data;
    })
    .then((data) => {
      this.setState({ friendList: data });
    })
  };

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
      </div>
    );
  }
}