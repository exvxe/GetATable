import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { editReservation } from '../store/actions/reservationActions'
import moment from 'moment'

class EditReservation extends Component {
    state = {
        dateValid: true,
        timeValid: true
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
            authorId: this.props.auth.uid
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        if (moment(this.state.time, 'HH:mm', true).isValid() && this.state.time != null) {
            this.setState({
                timeValid: true
            })
        } else {
            this.setState({
                timeValid: false
            })
        }
        if (moment(this.state.date, 'YYYY-MM-DD', true).isValid() && this.state.date != null) {
            this.setState({
                dateValid: true
            })
        } else {
            this.setState({
                dateValid: false
            })
        }
        if (this.state.dateValid == true && this.state.timeValid == true && this.state.tableId != null) {
            let {dateValid, timeValid, ...filteredState} = this.state;
            this.props.editReservation(this.props.id, filteredState)
            this.props.history.push('/');
        }
    }
    handleClick = (e) => {
        this.setState({
            tableId: Number(e.currentTarget.getAttribute("tableid")),
            tableFor: this.props.tables.find(x => x.tableId == e.currentTarget.getAttribute("tableid")).tableFor
        })
    }
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to="/signin"/>
        if (!this.props.reservation) return (<div>Loading...</div>)
        if (auth.uid != this.props.reservation.authorId) return <Redirect to="/"/>
        return (
        <div className="container">
            <form onSubmit={this.handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Edit Reservation</h5>
                <div className="input-field">
                    <label htmlFor="date">{this.props.reservation ? '' : 'Date (YYYY-MM-DD)'}</label>
                    <input type="text" id="date" onChange={this.handleChange} defaultValue={this.props.reservation ? this.props.reservation.date : ''}/>
                    {this.state.dateValid == true ? '' : <span className="red-text">Wrong date</span>}
                </div>
                <div className="input-field">
                    <label htmlFor="time">{this.props.reservation ? '' : 'Time (HH:mm)'}</label>
                    <input type="text" id="time" onChange={this.handleChange} defaultValue={this.props.reservation ? this.props.reservation.time : ''}/>
                    {this.state.timeValid == true ? '' : <span className="red-text">Wrong time</span>}
                </div>
                <div className="input-field">
                    <label htmlFor="notices">{this.props.reservation ? '' : 'Additional informations'}</label>
                    <input type="text" id="notices" onChange={this.handleChange} defaultValue={this.props.reservation ? this.props.reservation.notices : ''}/>
                </div>
                <div>
                    <p htmlFor="tableId">Table Number: {this.state.tableId == null && this.props.reservation ? this.props.reservation.tableId : this.state.tableId}</p>
                    <p htmlFor="tableFor">How many people: {this.state.tableFor == null && this.props.reservation ? this.props.reservation.tableFor : this.state.tableFor}</p>
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">Save reservation</button>
                </div>
            </form>

            <div>
            <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
                <a onClick={this.handleClick} tableid="1">
                    <polyline points="10,10 60,10 60,60 10,60 10,10" fill="black"/>
                    <text textAnchor="middle" x="35" y="35" fill="white" fontSize="0.4em">1(3 seats)</text>
                </a>
                <a onClick={this.handleClick} tableid="2">
                    <polyline points="70,10 120,10 120,60 70,60 70,10" fill="black"/>
                    <text textAnchor="middle" x="95" y="35" fill="white" fontSize="0.4em">2(6 seats)</text>
                </a>
            </svg>
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
        auth: state.firebase.auth,
        tables: state.firestore.ordered.tables,
        id: id,
        reservation: reservation
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editReservation: (id, changes) => dispatch(editReservation(id, changes))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: 'tables' }]),
    firestoreConnect([{ collection: 'reservations' }]),
  )(EditReservation)
