import React, {Component} from 'react'
import { Link } from "react-router-dom";


class Navbar extends Component {

  signedOut = () => {
    return (
      <div className="navbar ">
        <div>
          <Link to={"/"} className=' nav_item'>
            Home
          </Link>
        </div>
        <div>
          <Link to={"/signup"}className=" nav_item">SignUp
          </Link>
        </div>
        <div>
        <Link to={"/"}className=" nav_item">About
          </Link>
          </div>
      </div>
    )
  }

  signedIn = () => {
    return (
      <div className="navbar ">
        <div>
          <Link to={"/"} className="nav_item">Home
          </Link>
        </div>
        <div>
          <Link to={"/myaccount"}className=" nav_item">My Account
          </Link>
        </div>
        <div>
          <Link to={"/"} onClick={this.props.signOut} className="nav_item">Logout
          </Link>
        </div>
      </div>
    )
  }

  navToRender = () => {
    const userId = this.props.currentUser.id
    const localId = Number(localStorage.getItem("user_id"))
    if (userId === localId && userId !== undefined){
      return this.signedIn()
    } else {
      return this.signedOut();
    }
  }
  render () {
    return(
      <div>
        {this.navToRender()}
      </div>
    )
  }
}

export default Navbar;
