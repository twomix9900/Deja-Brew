import constants from '../constants'

var initialState = {
  selectedVenue: null
}

export default (state = {}, action) => {
	// let newState = Object.assign({}, state)

	switch (action.type) {
    case constants.SELECT_VENUE:
      // console.log('SELECT_VENUE:', JSON.stringify(action.data));
      // newState['selectedVenue'] = action.data;
      // return newState;
      console.log(action.data);
      return Object.assign({}, state, {
        selectedVenue: action.data,
      });

		default:
			return state
	}
}