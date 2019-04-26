import React, {Component} from 'react'

class Navbar extends Component {

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
        <button  className="left_nav_item nav_item"> My Account </button>
        <button className="nav_item" onClick={this.props.signOut}> Logout </button>
      </div>
    )
  }

  navToRender = () => {
    const userId = this.props.currentUser.id
    const localId = Number(localStorage.getItem("user_id"))
    console.log('user id', userId)
    console.log('local id', localId)
    if (userId === localId && userId !== undefined){
      return this.signedIn()
    } else {
      return this.signedOut();
    }
  }
  render () {
    return(
      <div className="navbar_container">
      {this.navToRender()}
      </div>
    )
  }
}

export default Navbar;
