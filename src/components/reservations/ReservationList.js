import React from 'react'

import { Link } from 'react-router-dom'

import ReservationSummary from './ReservationSummary'

const ReservationList = ({reservations}) => {
    return (
        <div className="reservation-list section">
            {
                reservations && reservations.map(reservation => {
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