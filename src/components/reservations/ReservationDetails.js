import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

const ReservationDetails = (props) => {
  const { reservation, auth } = props;
  if (!auth.uid) return <Redirect to="/signin"/>
  if (reservation) {
    return (
      <div className="container section">
        <div className="card z-depth-4 indigo darken-2 white-text">
          <div className="card-content">
            <p className="card-title">Your reservation: </p>
            <p>Date: {reservation.date}</p>
            <p>Time: {reservation.time}</p>
            <p>Table number: {reservation.tableId}</p>
            <p>How many people: {reservation.tableFor}</p>
            <p>Booked on the day: {reservation.createdAt}</p>
            <p>Additional informations: {reservation.notices}</p>
          </div>
          <div className="card-action">
            <a href="#" className="red-text accent-3-text"><strong>Cancel your reservation</strong></a>
            <a href="#" className="amber-text accent-3-text">Change the date of reservation</a>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container center">
        <p>Loading reservation...</p>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const reservations = state.firestore.data.reservations;
  const reservation = reservations ? reservations[id] : null
  return {
    reservation: reservation,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'reservations'
  }])
)(ReservationDetails)