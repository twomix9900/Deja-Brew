import React, { Component } from 'react';
import axios from 'axios';
import DisplayEmail from './DisplayEmail.jsx';
import QueryEmail from './QueryEmail.jsx';

export default class Email extends Component {

  constructor(props) {
    super(props);
    this.state={
      displayEmail: true,
      email: ''
    }
    this.editEmail=this.handleEditEmail.bind(this);
    this.submitEmail=this.handleSubmitEmail.bind(this);
  }

  componentWillReceiveProps(NextProps) {
    // this.setState({ email: NextProps.email })
    // this.setState({ DisplayEmail: <DisplayEmail handleEmailClick={ this.editEmail } email={ NextProps.email } /> });
    this.setState({ displayEmail: true, email: NextProps.email });
  }

  handleEditEmail() {
    // this.setState({ DisplayEmail: <QueryEmail handleSubmit={ this.submitEmail } /> });
    this.setState({ displayEmail: false });
  }

  handleSubmitEmail(emailSubmission) {
    if (emailSubmission !== undefined && emailSubmission !== '') {
      this.setState({ email: emailSubmission });
      axios.put('/users/' + this.props.userId, { email: emailSubmission })
      .then(() => {
        // this.setState({ DisplayEmail: <DisplayEmail handleEmailClick={ this.editEmail } email={ emailSubmission } /> });
        this.setState({ displayEmail: true, email: emailSubmission });
      })
    } else {
      // this.setState({ DisplayEmail: <DisplayEmail handleEmailClick={ this.editEmail } email={ this.state.email } /> });
      this.setState({ displayEmail: true, email: this.state.email });
    }
  }

  render() {
    return (
      <div>
        {/* { this.state.DisplayEmail } */}
        ({ this.state.displayEmail }) ? (
          <DisplayEmail handleEmailClick={ this.editEmail } email={ this.state.email } />
        ) : (
          <QueryEmail handleSubmit={ this.submitEmail } />
        )
      </div>
    )
  }
}
