import React, { Component} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from './layout/Navbar'
import Dashboard from './dashboard/Dashboard'
import SignIn from './auth/SignIn'
import SignUp from './auth/SignUp'
import ReservationDetails from './reservations/ReservationDetails'
import CreateReservation from './reservations/CreateReservation'


class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <div className="wrapper">
          <Navbar/>
          <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route path='/reservation/:id' component={ReservationDetails} />
            <Route path="/signin" component={SignIn}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/create" component={CreateReservation}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}


export default App;

