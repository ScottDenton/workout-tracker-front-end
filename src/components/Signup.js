import React from 'react'

class Signup extends React.Component {
constructor(){
  super()
  this.state={
    username: '',
    password_digest: '',
    date_of_birth: '',
    units: 'metric',
    height: null,
    weight: null
  }
}

handleChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value
  })
}

handleSubmit = (e) => {
  e.preventDefault();
  fetch("http://localhost:3000/api/v1/users",{
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(this.state)
  }).then(resp => resp.json())
  .then(user => {
    this.props.setLoggedInUser(user)
  })
  this.props.setUnits(this.state.units)
}

  render () {
    let heightLabel;
    this.state.units === "metric" ?
    heightLabel = "Height (cms)": heightLabel = "Height (inches)"
    let weightLabel;
    this.state.units === "metric" ?
    weightLabel = "Weight (kgs)": weightLabel = "Weight (lbs)"


    return (
      <div className="signup_container">
      <p className="signup_disclaimer"> DISCLAIMER: Everything within is to be considered advice only. You should seek medical advice before starting any new exercise routine. Dont blame me if you go to heavy and squish yourself... </p>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username: </label>
            <input type='text' name='username'
              placeholder="username"
              onChange={this.handleChange} />
          </div>
          <div>
            <label>Password: </label>
            <input type='password' name='password_digest'
              placeholder="Password"
              onChange={this.handleChange} />
          </div>

          <div>
            <label>Date of Birth: </label>
            <input type='date' name='date_of_birth'
              onChange={this.handleChange}/>
          </div>
          <div>
            <label>Metric or Imperial: </label>
            <select name='units'
              onChange={this.handleChange}>
              <option value="metric"> Metric (kgs & cms)</option>
              <option value="imperial"> Imperial (lbs & inches)</option>
            </select>
          </div>
          <div>
            <label>Height: </label>
            <input type='number' name='height'
              placeholder= {heightLabel}
              onChange={this.handleChange}/>
          </div>
          <div>
            <label>Weight: </label>
            <input type='number' name='weight'
              placeholder={weightLabel}
              onChange={this.handleChange}/>
          </div>
          <input type='submit' value="signup/edit"/>
        </form>

      </div>

    )

  }
}

export default Signup;
