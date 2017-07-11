import React, { Component } from 'react';

export default class NickName extends Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.addNickname=this.handleAddNickname.bind(this);
  };

  handleAddNickname () {
    console.log('inside handle nickname')
  }

  render() {
    return (
      <div>
        <span>nickname:{ this.props.nickname }
          <button onClick={() => 
            { this.addNickname() }
            }>Edit
          </button>
        </span>
      </div>
    )
  }
}

