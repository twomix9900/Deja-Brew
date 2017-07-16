import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

export default class PhoneInvalidError extends Component {
  constructor(props) {
    super(props);
    this.state={
      open: false
    }
  } 

  componentWillReceiveProps(NextProps) {
    this.setState({ open: NextProps.open });
  }

  render() {
    const actions = [
      <RaisedButton
        label="OK"
        primary={true}
        onClick={()=> { this.props.invalidOK() }}
      />
    ];

    return (
      <div>
        <Dialog
          title="Invalid Phone Number"
          actions={actions}
          modal={true}
          open={ this.state.open }
        >Please use numbers only <br/>
        Areacodes and Prefixes cannot begin with 0 or 1
        </Dialog>
      </div>
    );
  }
}
