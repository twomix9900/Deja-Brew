import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

export default class FriendInfoError extends Component {
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
        onClick={()=> { this.props.friendInfoOK() }}
      />
    ];

    return (
      <div>
        <Dialog
          title="Friend Info Incomplete"
          actions={actions}
          modal={true}
          open={ this.state.open }
        >Some fields are empty, please complete your entry
        </Dialog>
      </div>
    );
  }
}
