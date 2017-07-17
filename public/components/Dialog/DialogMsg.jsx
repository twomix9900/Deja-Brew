import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

export default class DialogMsg extends Component {
  constructor(props) {
    super(props);
    this.state={
      open: false
    }
  } 

  componentWillReceiveProps(NextProps) {
    this.setState({ open: NextProps.open });
    this.setState({ msgTitle: NextProps.msgTitle });
    this.setState({ msgBody: NextProps.msgBody });
    this.setState({ handler: NextProps.handler });
  }

  render() {
    const actions = [
      <RaisedButton
        label="OK"
        primary={true}
        onClick={()=> { this.state.handler() }}
      />
    ];

    return (
      <div>
        <Dialog
          title={ this.state.msgTitle }
          actions={actions}
          modal={true}
          open={ this.state.open }
        >{ this.state.msgBody }
        </Dialog>
      </div>
    );
  }
}
