import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

import ReservationList from '../reservations/ReservationList'



class Dashboard extends Component {
    render() {
        const { reservations, auth } = this.props;
        if (!auth.uid) return <Redirect to="/signin"/>
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <ReservationList reservations={reservations} auth={auth}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        reservations: state.firestore.ordered.reservations,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'reservations' }
    ])
  )(Dashboard)