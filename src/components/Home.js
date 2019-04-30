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
      <button onClick={() => this.setState({showLogin: true})}> Login </button>
    </div>
}

renderUserOptionsButtons = () => {
  return <div>
    <Link to={"/search"}>
      <button>Search</button>
    </Link>
    <Link to={"/workout"}>
      <button>Log New Workout</button>
    </Link>
    <Link to={"/exercise"}>
      <button>Log New Exercise</button>
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
        <div className="home_container">
          <h1> Workout Tracker </h1>
          <p> Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod  maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
          </p>
          <hr />
          {this.whichButtonsToRender()}
        </div>
    </div>
  )
  }
}

export default Home;
