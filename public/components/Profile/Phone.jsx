import React, { Component } from 'react';
import DisplayPhone from './DisplayPhone.jsx';
import QueryPhone from './QueryPhone.jsx';

export default class Phone extends Component {

  constructor(props) {
    super(props);
    this.addPhone=this.handleAddPhone.bind(this);
    console.log('props of Phone', this.props);
    this.state = {
      displayPhone: '',
      rendered: false
    }
  };

  componentWillReceiveProps(nextProps) {
    console.log('props.phone will receive', nextProps);
  this.setState({ displayPhone: <DisplayPhone handlePhoneClick={ this.addPhone } phone={ nextProps.phone } />})
  }

  handleAddPhone() {
    console.log('inside handle add phone');
    this.setState({ displayPhone: <QueryPhone />, rendered: false })
    // this.setState({ rendered: false })  
    console.log('what is state', this.state);
  }
  
  render() {
    return (
      <div>
        { this.state.displayPhone }
      </div>
    )
  }
}
