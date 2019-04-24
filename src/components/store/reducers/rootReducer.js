import authReducer from './authReducer'
import reservationsReducer from './reservationsReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    reservations: reservationsReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer;