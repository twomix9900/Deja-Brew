import React, { Component } from 'react';
import axios from 'axios';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import {
  connect,
  Store
} from 'react-redux';

import FriendListEntry from '../Profile/Friends/FriendListEntry.jsx';
import FriendAdd from '../Profile/Friends/FriendAdd.jsx';
import QueryFriendInfo from '../Profile/Friends/QueryFriendInfo.jsx';
import DialogMsg from '../Dialog/DialogMsg.jsx';

class DrinkBuddy extends Component {

  constructor(props) {
    super(props);
    this.state = {
      friendList: [],
      newFriendQuery: true,
      selected: [],
      open: false,
      msgTitle: 'Incomplete Profile',
      msgBody: 'Your friends would like to know who they will be sharing a cold one with.  Please complete your profile and try again.',
      selectAll: true
    }
    this.handleFriendAdd = this.handleFriendAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.sortFriendList = this.sortFriendList.bind(this);
    this.formatPhone = this.formatPhone.bind(this);
    this.handleSendDirections = this.handleSendDirections.bind(this);
    this.handleNoName = this.handleNoName.bind(this);
  }

  componentWillMount() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    axios.get('/friends/' + userInfo.id)
      .then((data) => {
        return data.data
      })
      .then((data) => {
        for (let i = 0; i < data.length; i++) { data[i].selected = false }
        this.setState({ friendList: data });
        this.sortFriendList();
      })
  }

  sortFriendList() {
    let sortedFriendList = this.state.friendList
      .slice()
      .sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return +1;
        return 0;
      })
    this.setState({ friendList: sortedFriendList })
  }

  formatPhone(phone) {
    return '(' + phone.substring(3, 6) + ') ' + phone.substring(6, 9) + '-' + phone.substring(9);
  }

  isSelected(idx) {
    return this.state.selected.indexOf(idx) !== -1;
  }

  handleFriendAdd() {
    this.setState({ newFriendQuery: false })
  }

  handleSubmit(friendName, phone) {
    if (friendName === undefined && phone === undefined) {
      this.setState({ newFriendQuery: true })
    } else {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'));
      let list = this.state.friendList;
      list.forEach((obj) => { obj.selected = false });
      let selectedArr = this.state.selected;
      if (selectedArr === 'none') {
        selectedArr = []
      } else if (selectedArr === 'all') {
        list.forEach((obj) => { obj.selected = true });
      } else {
        selectedArr.forEach((i) => { list[i].selected = true });
      }
      list.push({ name: friendName, phone: '+1 ' + phone, selected: true });
      this.setState({ friendList: list })
      axios.put('friends/' + userInfo.id, { name: friendName, phone: '+1 ' + phone })
        .then(() => {
          this.sortFriendList();
          let newFriendArr = [];
          let list = this.state.friendList;
          for (let i = 0; i < list.length; i++) {
            if (list[i].selected) { newFriendArr.push(i) }
          }
          this.setState({ selected: newFriendArr, newFriendQuery: true });
        })
    }
  }

  handleRowSelection(selectedRows) {
    let list = this.state.friendList;
    if (selectedRows === 'none') {
      selectedRows = [];
    } else if (selectedRows === 'all') {
      selectedRows = [];
      list.map((cur, i) => { selectedRows.push(i) });
    }
    let selectToggle = !(selectedRows.length === list.length)
    this.setState({ selected: selectedRows, selectAll: selectToggle });
  }

  handleSendDirections() {
    let queryName;
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo.nickname === '' || userInfo.nickname === undefined) {
      this.setState({ open: true })
    } else {
      if (this.props.venue.selectedVenue.name !== 'Main Brewery') {
        queryName = this.props.venue.selectedVenue.name.split(' ').join('+');
      } else {
        queryName = this.props.selectedVenue.brewery.name.split(' ').join('+');
      }
      let list = this.state.friendList;
      let selectedArr = this.state.selected.slice();
      for (let i = 0; i < selectedArr.length; i++) {
        let friendNumber = list[selectedArr[i]].phone.slice(3);
        axios.get('/directions/friend/' + userInfo.nickname + '/' + friendNumber + queryName)
          .catch((err) => {
            console.log('error sending Directions', err);
          })
      }
    }
  }

  handleNoName() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div style={{ minWidth: '500px', maxWidth: '1600px' }}>
        <AppBar
          title="Drinking Buddies"
          showMenuIconButton={false}
          iconElementRight={
            <RaisedButton
              onClick={(e) => { this.handleSendDirections() }}
              label='Brew Beacon'
            />
          }
        />
        {(this.state.friendList.length) ? (
          <AppBar
            iconElementLeft={(this.state.selectAll) ? (
              <FlatButton
                onClick={(e) => { this.handleRowSelection('all') }}
                label='select all' />
            ) : (
                <FlatButton
                  onClick={(e) => { this.handleRowSelection('none') }}
                  label='unselect all' />
              )}
          />
        ) : (
            <div></div>
          )}
        <Table multiSelectable={true} onRowSelection={this.handleRowSelection}>
          <TableHeader displaySelectAll={false} enableSelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Phone Number</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {this.state.friendList.map((friend, i) =>
              <TableRow
                key={i}
                selected={this.isSelected(i)}
              >
                <TableRowColumn>{friend.name}</TableRowColumn>
                <TableRowColumn>{this.formatPhone(friend.phone)}</TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {(this.state.newFriendQuery) ? (
          <FriendAdd handleAddFriendClick={this.handleFriendAdd} />
        ) : (
            <QueryFriendInfo handleSubmit={this.handleSubmit} />
          )}
        <DialogMsg handler={this.handleNoName} open={this.state.open} msgTitle={this.state.msgTitle} msgBody={this.state.msgBody} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    venue: state.venue
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectVenue: (venue) => {
      dispatch(actions.selectVenue(venue));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrinkBuddy);
