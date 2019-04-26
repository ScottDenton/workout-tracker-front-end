import React from 'react'
import Login from './Login'

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showLogin: false
    }
  }

renderLogin = () => {
  return this.state.showLogin ? <Login setLoggedInUser={this.props.setLoggedInUser} /> :
    <div>
      <button onClick={() => this.setState({showLogin: true})}> Login </button>
    </div>
}

renderUserOptionsButtons = () => {
  return <div>
    <button>Search</button>
    <button>Log New Workout</button>
    <button>Log new Exercise</button>
  </div>
}

whichButtonsToRender = () => {
  return this.props.userLoggedIn ?
    <div> {this.renderUserOptionsButtons()} </div> :
    <div> {this.renderLogin()}</div>
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
