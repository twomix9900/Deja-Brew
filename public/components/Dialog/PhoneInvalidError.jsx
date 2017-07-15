import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

export default class PhoneInvalidError extends Component {

  constructor(props) {
    super(props);
    this.state={
      open: true,
    };
    this.Open=this.handleOpen.bind(this);
    this.Close=this.handleClose.bind(this);
    }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <RaisedButton
        label="OK"
        primary={true}
        onClick={this.Close}
      />
    ];

    return (
      <div>
        <Dialog
          title="Invalid Phone Number"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          Areacodes and Prefixes cannot begin with 0 or 1
        </Dialog>
      </div>
    );
  }
}