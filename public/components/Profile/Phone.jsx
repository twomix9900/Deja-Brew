import React, { Component } from 'react';

export default class Phone extends Component {

  constructor(props) {
    super(props);
    this.addPhone=this.handleAddPhone.bind(this);
  };

  handleAddPhone() {
    console.log('inside handle add phone');
  }

  render() {
    return (
      <div>
        <span>Phone Number: { this.props.phone }
          <button onClick={(e) => 
            { this.addPhone() }
            }>Edit
          </button>
        </span>
      </div>
    )
  }
}
