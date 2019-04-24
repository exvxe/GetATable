import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createReservation } from '../store/actions/reservationActions'

class CreateReservation extends Component {
    state = {
        date: '',
        time: '',
        notices: '',
        tableFor: '',
        tableId: '',
        authorId: this.props.auth.uid
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createReservation(this.state)
    }
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to="/signin"/>
        return (
        <div className="container">
            <form onSubmit={this.handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Create Reservation</h5>
                <div className="input-field">
                    <label htmlFor="date">Date</label>
                    <input type="text" id="date" onChange={this.handleChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="time">Time</label>
                    <input type="text" id="time" onChange={this.handleChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="notices">Additional informations</label>
                    <input type="text" id="notices" onChange={this.handleChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="tableFor">How many people</label>
                    <input type="number" id="tableFor" onChange={this.handleChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="tableId">Table number</label>
                    <input type="number" id="tableId" onChange={this.handleChange}/>
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">Create reservation</button>
                </div>
            </form>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createReservation: (newReservation) => dispatch(createReservation(newReservation))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReservation)
