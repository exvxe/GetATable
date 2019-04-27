const initialState = {
  authError: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_RESERVATION":
      console.log(action)
    case "LOGIN_SUCCESS":
      return {
        ...state,
        authError: null
      }
    case "LOGIN_ERROR":
      return {
        ...state,
        authError: 'Login failed'
      }
    case "SIGNOUT_SUCCESS":
      return {
        ...state
      }
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        authError: null
      }
    case "SIGNUP_ERROR":
      return {
        ...state,
        authError: action.err.message
      }
    default:
        return state
  }
}

export default authReducer;