import constants from '../constants'

export default {

	selectVenue: (venue) => {
		return {
			type: constants.SELECT_VENUE,
			data: venue
		}
	}
}
