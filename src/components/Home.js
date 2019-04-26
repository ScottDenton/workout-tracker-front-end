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
  console.log(this.props)
  return this.state.showLogin ? <Login setLoggedInUser={this.props.setLoggedInUser} /> : <div> </div>
}


  render () {
    return(
      <div className="container">
        <div className="home_container">
          <h1> Workout Tracker </h1>
          <p> Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod  maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
          </p>
          <hr />
          <button onClick={() => this.setState({showLogin: true})}> Login  </button>
          {this.renderLogin()}
        </div>
    </div>
  )
  }
}

export default Home;
