import React, { Component } from 'react';
import DisplayNickname from './DisplayNickname.jsx';
import QueryNickname from './QueryNickname.jsx';

export default class NickName extends Component {

  constructor(props) {
    super(props);
    this.state = {
      DisplayNickname: null
    }
    this.addNickname=this.handleAddNickname.bind(this);
  };

  componentWillReceiveProps(NextProps) {
    this.setState({ DisplayNickname: <DisplayNickname handleNameClick={ this.addNickname } nickname={ NextProps.nickname } /> });
  }

  handleAddNickname () {
    this.setState({ DisplayNickname: <QueryNickname /> });
  }

  render() {
    return (
      <div>
        { this.state.DisplayNickname }
      </div>
    )
  }
}

