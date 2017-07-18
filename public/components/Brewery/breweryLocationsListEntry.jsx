import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import actions from '../../actions';
import { connect } from 'react-redux';

const styles = {
  card: {
    'paddingTop': 0
  }
};

class BreweryLocationsListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.selectVenue = this.selectVenue.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.navigateToDetailsPage = this.navigateToDetailsPage.bind(this);
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
                :"../../images/No_picture_available.jpg"}
      />
      <CardText 
      style={styles.card}
      >
        Website: <a href={this.props.brewery.brewery.website}>
            {this.props.brewery.brewery.website}
        </a>
      </CardText>
      <CardText 
      style={styles.card}
      >
        Phone: {!!this.props.brewery.phone ?
          this.props.brewery.phone : 'No Phone Info'}
      </CardText>
      <CardText 
      style={styles.card}
      >
        {!!this.props.brewery.streetAddress ? 
          this.props.brewery.streetAddress : 'No Street Info'}
          <br />
        {!!this.props.brewery.locality ?
          this.props.brewery.locality + ', ': ''} 
        {!!this.props.brewery.region ? 
          this.props.brewery.region : ''}
      </CardText>
      <CardText expandable={true}>
        {this.props.brewery.brewery.description}
      </CardText>
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

// import React, { Component } from 'react';
// import {
//   TableRow,
//   TableRowColumn
// } from 'material-ui/Table';

// class BreweryLocationsListEntry extends React.Component {
//   constructor(props) {
//     super(props);
//     console.log('props from BreweryLocationsListEntry' ,props)
//     this.state = {
//       locationValue: ''
//     };
//   }
  
//   render() {
//     return (
//         <TableRow>
//           <TableRowColumn>
//             <img src={this.props.brewery.brewery.images ? this.props.brewery.brewery.images.icon 
//             : "../../images/No_picture_available.jpg"}
//             />
//           </TableRowColumn>
//           {/*<TableRowColumn>{this.props.brewery.id}</TableRowColumn>*/}
//           <TableRowColumn>{this.props.brewery.brewery.name}</TableRowColumn>
//           <TableRowColumn>
//             <a href={this.props.brewery.brewery.website ? 
//             this.props.brewery.brewery.website 
//             : "No Website"}>
//             {this.props.brewery.brewery.website ? this.props.brewery.brewery.website 
//             : "No Website"}
//             </a>
//             </TableRowColumn>
//             {/*account for multiple locations later*/}
//           <TableRowColumn>{this.props.brewery.locality}</TableRowColumn>
//           <TableRowColumn>{this.props.brewery.phone}</TableRowColumn>
//           <TableRowColumn>{this.props.brewery.streetAddress}</TableRowColumn>
//         </TableRow>
//     );
//   }
// }

// export default BreweryLocationsListEntry;
