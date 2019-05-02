import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect, NavLink } from 'react-router-dom'
import { cancelReservation } from '../store/actions/reservationActions'

class ReservationDetails extends Component {
  cancelHandler() {
    this.props.cancelReservation(this.props.id)
    return <Redirect to="/"/>
  }
  render() {
      const { reservation, auth } = this.props;
      if (!auth.uid) return <Redirect to="/signin"/>;
      if (!reservation) return <div className="container center"><p>Loading reservation...</p></div>;
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
              <NavLink to="/" className="red-text accent-3-text" onClick={() => this.cancelHandler()}><strong>Cancel your reservation</strong></NavLink>
              <NavLink to={"/edit/" + this.props.id} className="amber-text accent-3-text">Change the date of reservation</NavLink>
            </div>
          </div>
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
    auth: state.firebase.auth,
    id: id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      cancelReservation: (key) => dispatch(cancelReservation(key))
  }
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{
    collection: 'reservations'
  }])
)(ReservationDetails)