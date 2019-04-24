const initialState = {}

const reservationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_RESERVATION":
      return state;
    case "CREATE_RESERVATION_ERROR":
      return state;
    default:
        return state
  }
}

export default reservationReducer;