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
        <button  className="left_nav_item nav_item"> Home </button>
        <button className="nav_item" onClick={this.props.signOut}> Logout </button>
      </div>
    )
  }

  render () {
    const navToRender = this.props.userLoggedIn ? this.signedIn() : this.signedOut();

    return(
      <div className="navbar_container">
      {navToRender}
      </div>
    )
  }
}

export default Navbar;
