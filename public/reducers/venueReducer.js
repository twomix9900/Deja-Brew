import constants from '../constants'

var initialState = {
  searchedVenueByLocation: '',
  searchedVenueByName: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.SELECT_VENUE:
      return Object.assign({}, state, {
        selectedVenue: action.data,
      });
    
    case constants.SEARCH_VENUE_BY_NAME:
      return Object.assign({}, state, {
        searchedVenueByName: action.data
      });

    case constants.SEARCH_VENUE_BY_LOCATION:
      return Object.assign({}, state, {
        searchedVenueByLocation: action.data
      });

    default:
      return state
  }
}