import React from 'react'

class Navbar extends React.Component {

  signedOut = () => {
    return (
      <div className="float_right">
        <a href="#" className="left_nav_item nav_item"> Signup </a>
        <a href="#" className="nav_item"> About </a>
      </div>
    )
  }

  signedIn = () => {
    return (
      <div className="float_right">
        <a href="#" className="left_nav_item nav_item"> Home </a>
        <a href="#" className="nav_item"> Logout </a>
      </div>
    )
  }
  render () {
    // throw an if statement to decide which nav to render
    return(
      <div className="navbar_container">
      {this.signedOut()}
      </div>

    )

  }
}

export default Navbar;
