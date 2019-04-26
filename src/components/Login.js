import React from 'react'

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
    fetch('http://localhost:3000/api/v1/sessions/create', {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(resp => resp.json())
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
    return <div>
      <form onSubmit={this.handleSubmit}>
      <input type='text' name='username' value={this.state.username}
      placeholder="Username" onChange={this.handleChange}
      />
      <input type='password' name='password' value={this.state.password}
      placeholder="Password" onChange={this.handleChange} />
      <input type="submit" value="Login" />

      </form>
    </div>
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
