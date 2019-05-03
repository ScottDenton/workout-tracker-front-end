import React from 'react'
import {createSession} from '../helpers/helpers'
import {LoginForm} from '../helpers/forms'
import Swal from 'sweetalert2'

class Login extends React.Component {
  constructor(props){
    super(props)
    this.state={
      username: '',
      password: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    createSession(this.state)
    .then(user => {
      if(user.status === 500 || user.errors){
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'The credentials you entered were  incorrect!',
          position: 'center'
        })
      } else {
        localStorage.setItem("user_id", user.id )
        this.props.setLoggedInUser(user)
        Swal.fire({
          type: 'success',
          title: `Welcome back ${user.username}`,
          showConfirmButton: false,
          timer: 1100,
          position: 'center'
        })
      }
    })
  }

  loginForm = () => {
    return (
      <div>
        <LoginForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          username={this.state.username}
          password={this.state.password}
          />
      </div>
    )
  }
  render () {
    return(
      <div>
        {this.loginForm()}
      </div>
    )
  }
}

export default Login;
