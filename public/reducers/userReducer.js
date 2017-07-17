import constants from '../constants'

var initialState = {
	all: null,
	currentUser: null // signed in user
}

export default (state = initialState, action) => {
	let newState = Object.assign({}, state)

	switch (action.type) {

		default:
			return state
	}
}