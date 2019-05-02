import React from 'react'
import {createNewUser} from '../helpers/helpers.js'
import {createSession} from '../helpers/helpers'

import {Redirect} from 'react-router'

class Signup extends React.Component {
constructor(){
  super()
  this.state={
    username: '',
    password: '',
    date_of_birth: '',
    units: 'metric',
    height: null,
    weight: null,
    success: false
  }
}

handleChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value
  })
}

handleSubmit = (e) => {
  e.preventDefault();
  createNewUser(this.state)
  .then(newUser => {
    if(newUser.id !== null){
      this.setState({success: true})
      createSession({
        username:this.state.username,
        password: this.state.password})
        .then(user => {
          localStorage.setItem("user_id", user.id)
          this.props.setLoggedInUser(user)
        })
    } else {
      alert("That username is already taken")
    }
  })
  this.props.setUnits(this.state.units)
}

  render () {
    if(this.state.success){
      alert("Welcome")
      return(<Redirect to="/"/>)
    }

    let heightLabel;
    this.state.units === "metric" ?
    heightLabel = "Height (cms)": heightLabel = "Height (inches)"
    let weightLabel;
    this.state.units === "metric" ?
    weightLabel = "Weight (kgs)": weightLabel = "Weight (lbs)"


    return (
      <div className='container'>
        <div className="child_container">
          <p className="signup_disclaimer">
            DISCLAIMER: Everything within is to be considered advice only. You should seek medical advice before starting any new exercise routine. Dont blame me if you go to heavy and squish yourself...
          </p>
          <form className = 'form'
            onSubmit={this.handleSubmit}>
            <div className="form_item">
              <label>Username: </label>
              <input type='text' name='username'
                placeholder="Username"
                onChange={this.handleChange}
                value={this.state.username} />
            </div>
            <div className="form_item">
              <label>Password: </label>
              <input type='password' name='password'
                placeholder="Password"
                onChange={this.handleChange}
                value={this.state.password} />
            </div>
            <div className="form_item">
              <label>Date of Birth: </label>
              <input type='date' name='date_of_birth'
                onChange={this.handleChange}/>
            </div>
            <div className="form_item">
              <label>Metric or Imperial: </label>
              <select name='units'
                onChange={this.handleChange}>
                <option value="metric"> Metric (kgs & cms)</option>
                <option value="imperial"> Imperial (lbs & inches)</option>
              </select>
            </div>
            <div className="form_item">
              <label>Height: </label>
              <input type='number' name='height'
                placeholder= {heightLabel}
                onChange={this.handleChange}/>
            </div>
            <div className="form_item">
              <label>Weight: </label>
              <input type='number' name='weight'
                placeholder={weightLabel}
                onChange={this.handleChange}/>
            </div>
            <div className="form_item">
            <input className='button small blue'
              type='submit' value="Signup"/>
            </div>
          </form>
        </div>
      </div>
    )

  }
}

export default Signup;
