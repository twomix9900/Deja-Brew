import React, { Component } from 'react';
import DisplayPhone from './DisplayPhone.jsx';
import QueryPhone from './QueryPhone.jsx';

export default class Phone extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayPhone: null
    }
    this.addPhone=this.handleAddPhone.bind(this);
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ displayPhone: <DisplayPhone handlePhoneClick={ this.addPhone } phone={ nextProps.phone } />});
  }

  handleAddPhone() {
    this.setState({ displayPhone: <QueryPhone /> });
  }
  
  render() {
    return (
      <div>
        { this.state.displayPhone }
      </div>
    )
  }
}
