import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import actions from '../../actions';
import { connect } from 'react-redux';
import axios from 'axios'

import ThumbsUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbsDown from 'material-ui/svg-icons/action/thumb-down';
import Badge from 'material-ui/Badge';
import { blue500, red500, yellow500 } from 'material-ui/styles/colors';
import DialogMsg from '../Dialog/DialogMsg.jsx';

const styles = {
  card: {
    'paddingTop': 0
  },
  hoursOfOperation: {
    'padding': '0px 16px 16px 0px',
    'float': 'right',
    'maxWidth': '260'
  }
};

class BreweryLocationsListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breweryLike: 0,
      breweryDislike: 0,
      userOpinion: 0,
      open: false,
      msgTitle: 'Please sign in',
      msgBody: 'Users must be signed in to vote',
      userInfo: {},
      opinionClick: false
    };
    this.selectVenue = this.selectVenue.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.navigateToDetailsPage = this.navigateToDetailsPage.bind(this);
    this.handleUpClick = this.handleUpClick.bind(this);
    this.handleDownClick = this.handleDownClick.bind(this);
    this.dialogHandler = this.dialogHandler.bind(this);
  }

  handleClick(e, data) {
    e.preventDefault();
    this.selectVenue();
    this.navigateToDetailsPage();
  }

  selectVenue() {
    this.props.selectVenue(this.props.brewery);
  }

  navigateToDetailsPage() {
    this.props.history.push('/details');
  }

  componentWillMount() {
    this.tallyLikes();
  }

  componentDidMount() {
    let info = JSON.parse(localStorage.getItem('userInfo'));
    this.setState({ userInfo: info });
    this.tallyLikes(info);
  }

  tallyLikes(info) {
    let likeCount = 0;
    let dislikeCount = 0;
    let userId;
    if (info) {
      userId = info.id;
    } else {
      userId = undefined;
    }
    let opinion = 0;
    axios.get('/breweryRatings/' + this.props.breweryId)
      .then((data) => {
        let numberOfEntries = data.data.length;
        for (let idx = 0; idx < numberOfEntries; idx++) {
          data.data[idx].breweryRating === 1 && likeCount++;
          data.data[idx].breweryRating === -1 && dislikeCount++;
          if (data.data[idx].userId === userId) {
            opinion = data.data[idx].breweryRating;
          }
        }
        this.setState({ breweryLike: likeCount, breweryDislike: dislikeCount, userOpinion: opinion })
      })
  }

  handleUpClick() {
    if (!this.state.opinionClick) {
      this.setState({ opinionClick: true })
      let userId;
      if (this.state.userInfo) {
        userId = this.state.userInfo.id;
      } else {
        userId = undefined;
      }
      if (userId) {
        axios.put('/breweryRatings/' + userId + '?breweryId=' + this.props.breweryId, { breweryRating: 1 })
          .then(() => {
            this.setState({ opinionClick: false })
            this.tallyLikes(this.state.userInfo);
          })
      } else {
        this.setState({ opinionClick: false, open: true });
      }
    }
  }

  handleDownClick() {
    if (!this.state.opinionClick) {
      this.setState({ opinionClick: true })
      let userId;
      if (this.state.userInfo) {
        userId = this.state.userInfo.id;
      } else {
        userId = undefined;
      }
      if (userId) {
        axios.put('/breweryRatings/' + userId + '?breweryId=' + this.props.breweryId, { breweryRating: -1 })
          .then(() => {
            this.setState({ opinionClick: false })
            this.tallyLikes(this.state.userInfo);
          })
      } else {
        this.setState({ opinionClick: false, open: true });
      }
    }
  }

  dialogHandler() {
    this.setState({ open: false })
  }

  render() {
    return (
      <Card>
        <CardHeader
          onClick={() => { this.handleClick(event, this) }}
          title={this.props.brewery.brewery.name}
          showExpandableButton={true}
          avatar={this.props.brewery.brewery.images ?
            this.props.brewery.brewery.images.squareMedium
            : "../../images/No_picture_available.jpg"}
        />
        <CardText style={styles.hoursOfOperation}>
          {this.props.brewery.hoursOfOperation}
        </CardText>
        <CardText style={styles.card}>
          Website: <a href={this.props.brewery.brewery.website} target="_blank">
            {this.props.brewery.brewery.website}
          </a>
        </CardText>
        <CardText style={styles.card}>
          Phone: {!!this.props.brewery.phone ?
            this.props.brewery.phone : 'No Phone Info'}
        </CardText>
        <CardText style={styles.card}>
          {!!this.props.brewery.streetAddress ?
            this.props.brewery.streetAddress : 'No Street Info'}
          <br />
          {!!this.props.brewery.locality ?
            this.props.brewery.locality + ', ' : ''}
          {!!this.props.brewery.region ?
            this.props.brewery.region : ''}
        </CardText>
        <CardText expandable={true}>
          {this.props.brewery.brewery.description}
        </CardText>
        <ThumbsUp onClick={() => { this.handleUpClick() }} color={(this.state.userOpinion === 1) ? (blue500) : ('')} />
        <Badge badgeContent={this.state.breweryLike} />
        <ThumbsDown onClick={() => { this.handleDownClick() }} color={(this.state.userOpinion === -1) ? (red500) : ('')} />
        <Badge badgeContent={this.state.breweryDislike} />
        <DialogMsg open={this.state.open} handler={this.dialogHandler} msgTitle={this.state.msgTitle} msgBody={this.state.msgBody} />
      </Card>
    );
  }
}

const stateToProps = (state) => {
  return {
    venue: state.venue
  }
}

const dispatchToProps = (dispatch) => {
  return {
    selectVenue: (venue) => {
      dispatch(actions.selectVenue(venue));
    }
  }
}

export default connect(stateToProps, dispatchToProps)(BreweryLocationsListEntry);

