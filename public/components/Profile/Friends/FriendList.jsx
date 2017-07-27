import React, { Component } from 'react';
import axios from 'axios';
import AppBar from 'material-ui/AppBar';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';

import FriendListEntry from './FriendListEntry.jsx';
import FriendAdd from './FriendAdd.jsx';
import QueryFriendInfo from './QueryFriendInfo.jsx';
import EditFriendEntry from './EditFriendEntry.jsx';

const styles={
  light_amber: {
    backgroundColor: '#FFA000'
  },
  medium_amber: {
    backgroundColor: '#FF8F00'
  },
  dark_amber: {
    backgroundColor: '#FF6F00'
  }
}

export default class FriendList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      friendList: [],
      newFriendQuery: true
    }
    this.FriendAdd=this.handleAddFriend.bind(this);
    this.FriendEdit=this.handleEditFriend.bind(this);
    this.FriendDelete=this.handleDeleteFriend.bind(this);
    this.handleSubmit=this.handleSubmitFriend.bind(this);
    this.handleEditSubmit=this.handleEditSubmit.bind(this);
    this.sortFriendList=this.sortFriendList.bind(this);

    };

    componentWillReceiveProps(NextProps) {
    axios.get('/friends/' + NextProps.userId)
    .then((data) => {
      return data.data;
    })
    .then((data) => {
      this.setState({ friendList: data });
      this.sortFriendList();
    })  
  };

  getFriendData() {
    axios.get('/friends/' + this.props.userId)
    .then((data) => {
      return data.data;
    })
    .then((data) => {
      this.setState({ friendList: data });
      this.sortFriendList();
    })
  }

  componentWillMount() {
    this.setState({ newFriendQuery: true })
  }

  handleAddFriend() {
    console.log('inside handle add friend');
    this.setState({ newFriendQuery: false })
  }

  handleEditFriend(id, idx) {
    let friends = this.state.friendList.slice();
    friends[idx].edit = 1;
    this.setState({ friendList: friends });
    this.sortFriendList();
    console.log('friend',id,'to be changed', friends);
  }

  handleDeleteFriend(id, idx) {
    console.log('friend',id,'has been selected for termination')
    axios.delete('/friends/' + this.props.userId + '/' + id)
      .then(() => {
        let friends = this.state.friendList.slice();
        friends.splice(idx, 1);
        this.setState({ friendList: friends})
        console.log('ex-friend has been successfully removed')
      })
      .catch((err) => {
        console.log('cannot get rid of your friend', err)
      })
  }

  handleSubmitFriend(friendName, phone) {
    if (friendName === undefined && phone === undefined) {
      this.setState({ newFriendQuery: true })
    } else {
      axios.put('friends/' + this.props.userId, { name: friendName, phone: '+1 ' + phone })
      .then(() => {
        this.getFriendData()
        this.setState({ newFriendQuery: true })
      })
    }
  }

  handleEditSubmit(friendName, phone, id, idx) {
    let friends = this.state.friendList.slice();
    friends[idx].edit = 0;
    if (friendName === undefined && phone === undefined) {
      this.setState({ friendList: friends });
      this.sortFriendList();
    } else {
      axios.put('friends/' + this.props.userId + '?id=' + id, { name: friendName, phone: '+1 ' + phone })
      .then(() => {
      friends[idx].name = friendName;
      friends[idx].phone = '+1 ' + phone;
      this.setState({ friendList: friends });
      this.sortFriendList();
      })
    }
  }

  sortFriendList() {
    let sortedFriendList = this.state.friendList
      .slice()
      .sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return +1;
        return 0;
        })
    this.setState({ friendList: sortedFriendList})
  }

  render() {
  let fontSize;
  ( this.props.mobileSize ) ? ( fontSize='16px' ) : ( fontSize='28px');    
    return (
      <div><AppBar
        style={styles.dark_amber} 
        title="Friends List"
        titleStyle={{ fontSize: fontSize }}
        showMenuIconButton={false} />
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false} >
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Phone Number</TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody stripedRows={true}>
            { this.state.friendList.map((friend, i) => 
              (friend.edit === 0 || friend.edit === undefined) ? (
                <FriendListEntry 
                handleEditFriendClick={ this.FriendEdit }
                handleDeleteFriendClick={ this.FriendDelete }
                friend={ friend }
                key={ i } 
                id={ friend.id } 
                idx={ i }
                editable={true}
                mobileSize={ this.props.mobileSize }/>
              ) : (
                <EditFriendEntry 
                handleEditSubmit={ this.handleEditSubmit }
                key={ i }
                id={ friend.id }
                idx={ i }
                mobileSize={ this.props.mobileSize }/>
              )
            )}
          </TableBody>
        </Table>
        { (this.state.newFriendQuery) ? (
            <FriendAdd handleAddFriendClick={ this.FriendAdd } />
          ) : (
            <QueryFriendInfo handleSubmit={ this.handleSubmit } />
          ) }
      </div>
    );
  }
}