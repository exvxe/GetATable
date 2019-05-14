import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { createReservation } from '../store/actions/reservationActions'
import moment from 'moment'

class CreateReservation extends Component {
    state = {
        date: null,
        time: null,
        notices: null,
        tableFor: null,
        tableId: null,
        authorId: this.props.auth.uid,
        dateValid: true,
        timeValid: true,
        error: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
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
            if(this.props.reservations.find(x => x.tableId == this.state.tableId && x.date == this.state.date && x.time == this.state.time) == null) {
                this.props.createReservation(this.state);
                this.props.history.push('/');
            } else {
                this.setState({
                    error: "Data jest zajęta"
                })
            }
        }
    }
    handleClick = (e) => {
        this.setState({
            tableId: Number(e.currentTarget.getAttribute("tableid")),
            tableFor: this.props.tables.find(x => x.tableId == e.currentTarget.getAttribute("tableid")).tableFor
        })
    }
    render() {
        const { auth, tables } = this.props;
        if (!auth.uid) return <Redirect to="/signin"/>
        return (
        <div className="container">
            <form onSubmit={this.handleSubmit} className="white">
                <h4 className="grey-text text-darken-3">Create Reservation</h4>
                <div className="input-field">
                    <label htmlFor="date">Date (YYYY-MM-DD)</label>
                    <input type="text" id="date" onChange={this.handleChange}/>
                    {this.state.dateValid == true ? '' : <span className="red-text">Wrong date</span>}
                </div>
                <div className="input-field">
                    <label htmlFor="time">Time (HH:mm)</label>
                    <input type="text" id="time" onChange={this.handleChange}/>
                    {this.state.timeValid == true ? '' : <span className="red-text">Wrong time</span>}
                </div>
                <div className="input-field">
                    <label htmlFor="notices">Additional informations</label>
                    <input type="text" id="notices" onChange={this.handleChange}/>
                </div>
                <div>
                    <p htmlFor="tableId">Table Number: {this.state.tableId}</p>
                    <p htmlFor="tableFor">How many people: {this.state.tableId != null ? tables.find(x => x.tableId == this.state.tableId).tableFor : ''}</p>
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">Create reservation</button>
                    {<span className="red-text">{this.state.error}</span>}
                </div>
            </form>
            <div>
            
            <h5 className="grey-text text-darken-3">Select table:</h5>
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

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        tables: state.firestore.ordered.tables,
        reservations: state.firestore.ordered.reservations
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createReservation: (newReservation) => dispatch(createReservation(newReservation))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: 'tables' }]),
    firestoreConnect([{ collection: 'reservations' }]),
  )(CreateReservation)
