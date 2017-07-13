import React, { Component } from 'react';

export default class FriendAdd extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('what is friend props', this.props)
    return (
      <button onClick={(e) => { this.props.handleAddFriendClick() }}>Add Friend
      </button>
    )
  }
}
