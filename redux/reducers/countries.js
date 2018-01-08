const countries = (state = [], action) => {
	switch (action.type) {
		case "SET_COUNTRIES":
			return action.countries;
		default:
			return state;
	}
};

export default countries