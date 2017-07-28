import React, { Component } from 'react';
import axios from 'axios';

import DisplayNickname from './DisplayNickname.jsx';
import QueryNickname from './QueryNickname.jsx';

export default class NickName extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayNickName: true,
      nickname: '',
    }
    this.editNickname = this.handleEditNickname.bind(this);
    this.submitNickname = this.handleSubmitName.bind(this);
  };

  componentWillReceiveProps(NextProps) {
    this.setState({ displayNickname: true, nickname: NextProps.nickname });
  }

  handleEditNickname() {
    this.setState({ displayNickname: false });
  }

  handleSubmitName(nameSubmission) {
    if (nameSubmission !== undefined && nameSubmission !== '') {
      axios.put('/users/' + this.props.userId, { nickname: nameSubmission })
        .then(() => {
          let info = JSON.parse(localStorage.getItem('userInfo'));
          info.nickname = nameSubmission;
          localStorage.setItem('userInfo', JSON.stringify(info));
          this.setState({ displayNickname: true, nickname: nameSubmission });
        })
    } else {
      this.setState({ displayNickname: true, nickname: this.state.nickname });
    }
  }

  render() {
    return (
      <div>{
        (this.state.displayNickname) ? (
          <DisplayNickname handleNameClick={this.editNickname} nickname={this.state.nickname} mobileSize={this.props.mobileSize} />
        ) : (
            <QueryNickname handleSubmit={this.submitNickname} mobileSize={this.props.mobileSize} />
          )
      }</div>
    )
  }
}

