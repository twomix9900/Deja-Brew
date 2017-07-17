import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class FriendAdd extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RaisedButton onClick={(e) => { this.props.handleAddFriendClick() }} label="Add Friend" />
    )
  }
}
