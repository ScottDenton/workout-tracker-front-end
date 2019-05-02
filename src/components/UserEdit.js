import React from 'react'
import {editUser} from '../helpers/helpers'


class UserEdit extends React.Component {
constructor(){
  super()
  this.state={
    username: '',
    date_of_birth: '',
    units: '',
    height: null,
    weight: null
  }
}

componentDidMount(){
  const{ username, date_of_birth, height, weight, units} = this.props.currentUser
  this.setState({
    username, date_of_birth, height, weight, units})
}

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.authenticateUser() ? this.saveEdit() : alert("you may only edit your account when you are logged in")
  }
  authenticateUser = () => {
    const userId = this.props.currentUser.id
    const localId = Number(localStorage.getItem("user_id"))
    return  userId === localId && userId !== undefined
  }

  saveEdit = () => {
    const id = this.props.currentUser.id
    console.log('id', id)
    const {username, date_of_birth, height, weight, units} = this.state
    const body={username, date_of_birth, height, weight, units}
    editUser(id, body)
    .then(user => {
      this.props.setLoggedInUser(user)
    })
  }



  render () {
    let heightLabel;
    this.state.units === "metric" ?
    heightLabel = "Height (cms)": heightLabel = "Height (inches)"
    let weightLabel;
    this.state.units === "metric" ?
    weightLabel = "Weight (kgs)": weightLabel = "Weight (lbs)"


    return (
      <div className='container'>
        <div className="child_container">
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
              <label>Date of Birth: </label>
              <input
                type='date' name='date_of_birth'
                onChange={this.handleChange}
                value ={this.state.date_of_birth}/>
            </div>
            <div className="form_item">
              <label>Metric or Imperial: </label>
              <select name='units'
                onChange={this.handleChange}
                value={this.state.units}>
                <option value="metric"> Metric (kgs & cms)</option>
                <option value="imperial"> Imperial (lbs & inches)</option>
              </select>
            </div>
            <div className="form_item">
              <label>{heightLabel}: </label>
              <input type='number'
                name='height'
                placeholder= {heightLabel}
                onChange={this.handleChange}
                value={this.state.height}/>
            </div>
            <div className="form_item">
              <label>{weightLabel}: </label>
              <input type='number' name='weight'
                placeholder={weightLabel}
                onChange={this.handleChange}
                value={this.state.weight}/>
            </div>
            <div className="form_item">
            <input className='button small blue'
              type='submit' value="Save Changes"/>
            </div>
          </form>
        </div>
      </div>
    )

  }
}

export default UserEdit;
