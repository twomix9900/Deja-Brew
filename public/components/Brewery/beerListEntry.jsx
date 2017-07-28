import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import actions from '../../actions';
import { connect } from 'react-redux';
import axios from 'axios';
import ThumbsUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbsDown from 'material-ui/svg-icons/action/thumb-down';
import Badge from 'material-ui/Badge';
import { blue500, red500, yellow500 } from 'material-ui/styles/colors';
import DialogMsg from '../Dialog/DialogMsg.jsx';

const styles = {
  card: {
    'paddingTop': 0
  }
};

class BeerListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beerLike: 0,
      beerDislike: 0,
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
    this.props.selectVenue(this.props.beer.breweries[0]);
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
    axios.get('/beerRatings/' + this.props.beerId)
      .then((data) => {
        let numberOfEntries = data.data.length;
        for (let idx = 0; idx < numberOfEntries; idx++) {
          data.data[idx].beerRating === 1 && likeCount++;
          data.data[idx].beerRating === -1 && dislikeCount++;
          if (data.data[idx].userId === userId) {
            opinion = data.data[idx].beerRating;
          }
        }
        this.setState({ beerLike: likeCount, beerDislike: dislikeCount, userOpinion: opinion })
      })
  }

  handleUpClick() {
    if (!this.state.opinionClick) {
      this.setState({ opinionClick: true });
      let userId;
      if (this.state.userInfo) {
        userId = this.state.userInfo.id;
      } else {
        userId = undefined;
      }
      if (userId) {
        axios.put('/beerRatings/' + userId + '?beerId=' + this.props.beerId, { beerRating: 1 })
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
      this.setState({ opinionClick: true });
      let userId;
      if (this.state.userInfo) {
        userId = this.state.userInfo.id;
      } else {
        userId = undefined;
      }
      if (userId) {
        axios.put('/beerRatings/' + userId + '?beerId=' + this.props.beerId, { beerRating: -1 })
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
          title={this.props.beer.breweries[0].name}
          subtitle={this.props.beer.name}
          showExpandableButton={true}
          avatar={this.props.beer.breweries[0].images ?
            this.props.beer.breweries[0].images.squareMedium
            : "../../images/No_picture_available.jpg"}
        />
        <CardText
          style={styles.card}
        >
          Website: <a href={this.props.beer.breweries[0].website} target="_blank">
            {this.props.beer.breweries[0].website}
          </a>
        </CardText>
        <CardText
          style={styles.card}
        >
          Phone: {!!this.props.beer.breweries[0].locations ?
            this.props.beer.breweries[0].locations[0].phone : 'No Phone Info'}
        </CardText>
        <CardText
          style={styles.card}
        >
          Located At: {!!this.props.beer.breweries[0].locations[0] ?
            this.props.beer.breweries[0].locations[0].streetAddress : ''}
          <br />
          {!!this.props.beer.breweries[0].locations[0] ?
            this.props.beer.breweries[0].locations[0].locality : ''}
          <br />
          {!!this.props.beer.breweries[0].locations[0] ?
            this.props.beer.breweries[0].locations[0].region : ''}
        </CardText>
        <CardText expandable={true}>
          {this.props.beer.breweries[0].description}
        </CardText>

        <ThumbsUp onClick={() => { this.handleUpClick() }} color={(this.state.userOpinion === 1) ? (blue500) : ('')} />
        ({this.state.beerLike}) ? (
          <Badge badgeContent={this.state.beerLike} />
        ) : ()
        <ThumbsDown onClick={() => { this.handleDownClick() }} color={(this.state.userOpinion === -1) ? (red500) : ('')} />
        ({this.state.beerDisLike}) ? (
            <Badge badgeContent={this.state.beerDislike} />
        ) : ()
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

export default connect(stateToProps, dispatchToProps)(BeerListEntry);

