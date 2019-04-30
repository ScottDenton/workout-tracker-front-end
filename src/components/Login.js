import React from 'react'
import {createSession} from '../helpers/helpers'
import {LoginForm} from '../helpers/forms'

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
        alert('Invalid credentials')
      } else {
        localStorage.setItem("user_id", user.id )
        this.props.setLoggedInUser(user)
        alert(`Welcome back ${user.username}`)
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
