import React, { Component } from 'react';

export default class Phone extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div onClick={(e) => 
        { this.props.handlePhoneClick() }
        }>Phone Number: { this.props.phone }
      </div>
    )
  }
}
