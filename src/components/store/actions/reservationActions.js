export const createReservation = (reservation) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
     const firestore = getFirestore();
     firestore.collection('reservations').add({
       ...reservation,
       authorId: reservation.authorId,
       createdAt: "14.04.2019",
       date: reservation.date,
       notices: reservation.notices,
       tableFor: reservation.tableFor,
       tableId: reservation.tableId,
       time: reservation.time
     }).then(()=> {
       dispatch({ type: 'CREATE_RESERVATION', reservation})
     }).catch((err) => {
      dispatch({ type: 'CREATE_RESERVATION_ERROR', err})
     })
    }
}

export const cancelReservation = (reservation) => {
  return (dispatch, getState) => {
    dispatch({type: "CANCEL_RESERVATION", reservation})
  }
}