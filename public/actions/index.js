import constants from '../constants'

export default {

	selectVenue: (venue) => {
		return {
			type: constants.SELECT_VENUE,
			data: venue
		}
	},

	searchVenueByName: (venue) => {
		return {
			type: constants.SEARCH_VENUE_BY_NAME,
			data: venue
		}
	},

	searchVenueByLocation: (venue) => {
		return {
			type: constants.SEARCH_VENUE_BY_LOCATION,
			data: venue
		}
	}
}
