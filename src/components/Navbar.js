import React, {Component} from 'react'
import { Link } from "react-router-dom";


class Navbar extends Component {

  signedOut = () => {
    return (
      <div className="float_right">
        <Link to={"/"}>
          <a className="left_nav_item nav_item">Home</a>
        </Link>
        <Link to={"/signup"}>
          <a className="left_nav_item nav_item">SignUp</a>
        </Link>
        <Link to={"/"}>
          <a className=" nav_item">About</a>
        </Link>
      </div>
    )
  }

  signedIn = () => {
    return (
      <div className="float_right">
        <Link to={"/"}>
          <a className="left_nav_item nav_item">Home</a>
        </Link>
        <Link to={"/"}>
          <a className="left_nav_item nav_item">My Account</a>
        </Link>
        <Link to={"/"} onClick={this.props.signOut}>
          <a className="nav_item">Logout</a>
        </Link>
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
