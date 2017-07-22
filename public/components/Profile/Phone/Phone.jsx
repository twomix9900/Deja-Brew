import React, { Component } from 'react';
import axios from 'axios';
import DisplayPhone from './DisplayPhone.jsx';
import QueryPhone from './QueryPhone.jsx';

export default class Phone extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayPhone: true,
      handlePhoneClick: this.editPhone,
      phone: ''
    }
    this.editPhone=this.handleEditPhone.bind(this);
    this.submitPhone=this.handleSubmitPhone.bind(this);
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ PhoneNum: nextProps.phone })
    this.setState({ 
      displayPhone: true, 
      handlePhoneClick: this.editPhone, 
      phone: nextProps.phone
    });
  }

  handleEditPhone() {
    this.setState({ 
      displayPhone: false,
    });
  }

  handleSubmitPhone(phoneSubmission) {
    if (phoneSubmission !== undefined) {
      phoneSubmission = '+1 ' + phoneSubmission;
      this.setState({ PhoneNum: phoneSubmission });
      axios.put('/users/' + this.props.userId, { phone: phoneSubmission })
      .then(() => {
        let info = JSON.parse(localStorage.getItem('userInfo'));
        info.phone = phoneSubmission;
        localStorage.setItem('userInfo', JSON.stringify(info));
        this.setState({ 
          displayPhone: true, 
          handlePhoneClick:  this.editPhone,
          phone: phoneSubmission 
        });
      })
    } else {
      this.setState({ 
        displayPhone: true,
        handlePhoneClick: this.editPhone,
        phone: this.state.PhoneNum  
      });
    }
  }
  
  render() {
    return (
      <div>
        ({ this.state.displayPhone }) ? (
          <DisplayPhone handlePhoneClick={ this.state.handlePhoneClick } phone={ this.state.phone } />
        ) : (
          <QueryPhone handleSubmit={ this.submitPhone } />
        )
      </div>
    )
  }
}
