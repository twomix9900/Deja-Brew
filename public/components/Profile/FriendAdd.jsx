import React, { Component } from 'react';

export default class FriendAdd extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button onClick={(e) => { this.props.handleAddFriendClick() }}>Add Friend
      </button>
    )
  }
}
