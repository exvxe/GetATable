import React from 'react'

import { Link } from 'react-router-dom'

import ReservationSummary from './ReservationSummary'

const ReservationList = ({reservations, auth}) => {
    let filteredReservations = reservations != null ? reservations.filter(x => x.authorId == auth.uid && x.canceled == false) : '';
    return (
        <div className="reservation-list section">
            {
                filteredReservations && filteredReservations.map(reservation => {
                    return (
                        <Link to={'/reservation/' + reservation.id} key={reservation.id}>
                            <ReservationSummary reservation={reservation}/>
                        </Link>
                    )
            })}
        </div>
    )
}

export default ReservationList
