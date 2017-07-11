import React, { Component } from 'react';
import axios from 'axios';
import DisplayNickname from './DisplayNickname.jsx';
import QueryNickname from './QueryNickname.jsx';

export default class NickName extends Component {

  constructor(props) {
    super(props);
    this.state = {
      DisplayNickname: null,
      Nickname: ''
    }
    this.editNickname=this.handleEditNickname.bind(this);
    this.submitNickname=this.handleSubmitName.bind(this);
  };

  componentWillReceiveProps(NextProps) {
    this.setState({ Nickname: NextProps.nickname })
    this.setState({ DisplayNickname: <DisplayNickname handleNameClick={ this.editNickname } nickname={ NextProps.nickname } /> });
  }

  handleEditNickname() {
    this.setState({ DisplayNickname: <QueryNickname handleSubmit={ this.submitNickname } /> });
  }

  handleSubmitName(nameSubmission) {
    if (nameSubmission !== undefined && nameSubmission !== '') {
      this.setState({ Nickname: nameSubmission });
      axios.put('/users/' + this.props.userId, { nickname: nameSubmission })
      .then(() => {
        this.setState({ DisplayNickname: <DisplayNickname handleNameClick={ this.editNickname } nickname={ nameSubmission } /> });
      })
    console.log('*** inside handleSubmitName ***');
    console.log('Nickname', this.state.Nickname);
    console.log('name submission', nameSubmission);
    } else {
      this.setState({ DisplayNickname: <DisplayNickname handleNameClick={ this.editNickname } nickname={ this.state.Nickname } /> });
    }
  }

  render() {
    return (
      <div>
        { this.state.DisplayNickname }
      </div>
    )
  }
}

