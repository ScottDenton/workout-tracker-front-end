import React from 'react'
import Login from './Login'
import { Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showLogin: false
    }
  }

renderLoginForm = () => {
  return this.state.showLogin ?
    <Login setLoggedInUser={this.props.setLoggedInUser} /> :
    <div>
      <button className=" small button blue" onClick={() => this.setState({showLogin: true})}> Login </button>
    </div>
}

renderUserOptionsButtons = () => {
  return <div>
    <Link to={"/search"}>
      <button className="small button blue">Search</button>
    </Link>
    <Link to={"/workout"}>
      <button className="small button blue">Log New Workout</button>
    </Link>
    <Link to={"/exercise"}>
      <button className="small button blue">Log New Exercise</button>
    </Link>
  </div>
}

whichButtonsToRender = () => {
  return this.props.userLoggedIn ?
    <div> {this.renderUserOptionsButtons()} </div> :
    <div> {this.renderLoginForm()}</div>
}

  render () {
    return(
      <div className="container">
        <div className="child_container">
          <h1> Workout Tracker </h1>
          <p>
            Login below or signup for a new account to start tracking your workouts.
          </p>
          <p>
          Once logged in you can create a new workout and select from a collection of 200 different exercises to add to your workout.
          </p>
          <p>
            When you complete an exervise for the first time you will be shown suggested weights and reps to help you continue your progression in your next workout.
          </p>
          <p>
            If you dont want to log a full workout, you can just log a one off exercise and it will still be saved for your next workout.
          </p>
          <hr />
          {this.whichButtonsToRender()}
        </div>
    </div>
  )
  }
}

export default Home;
