import React from 'react'

const ReservationSummary = ({reservation}) => {
  return (
    <div className="card z-depth-0">
      <div className="card-content z-depth-4 indigo darken-2 white-text">
        <span className="card-title">{reservation.date} {reservation.time}</span>
        <p>Table number: {reservation.tableId}</p>
        <p>How many people: {reservation.tableFor}</p>
        <p>Additional informations: {reservation.notices}</p>
        </div>
    </div>
  )
}

export default ReservationSummary