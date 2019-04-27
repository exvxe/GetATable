export const createReservation = (reservation) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
     const firestore = getFirestore();
     firestore.collection('reservations').add({
       authorId: reservation.authorId,
       createdAt: "14.04.2019",
       date: reservation.date,
       notices: reservation.notices,
       tableFor: reservation.tableFor,
       tableId: reservation.tableId,
       time: reservation.time,
       canceled: false
     }).then(()=> {
       dispatch({ type: 'CREATE_RESERVATION', reservation})
     }).catch((err) => {
      dispatch({ type: 'CREATE_RESERVATION_ERROR', err})
     })
    }
}

export const cancelReservation = (key, canceled=true) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.update(`reservations/${key}`, { canceled }).then(()=> {
      dispatch({ type: 'CANCEL_RESERVATION', key})
    })
  }
}