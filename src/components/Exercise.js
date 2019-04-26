import React, {Component} from 'react'
import AutoComplete from './AutoComplete'
import AutoCompleteItems from '../helpers/AutoCompleteItems';
import {findExerciseId} from '../helpers/exerciseIdFinder'

class Exercise extends Component {
  constructor(props){
    super(props)
    this.state={
      name: '',
      exercise: '',
      date: '',
      weight: '',
      reps: '',
      sets: '',
      notes: ' '
    }
  }

  handleChange =(e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

//passed into autocomple component to retrieve the users choice
  retrieveUserInput = (exercise) => {
    this.setState({exercise})
  }

// retrieves the selected workout name/id from autocomplete component, saves it to state then completes fetch only when that is done.
  addExercise = (e) => {
    e.preventDefault();
    const exercise = document.querySelector("[name=exercise]").value
    this.setState({
      exercise
    }, this.saveExercise(e))
  }

// *** user ID is still hardcoded until login is done
  saveExercise = (e) => {
    const {date, weight, reps, sets, notes} = this.state
    const body ={
      user_id: 1, // will need to be changed to acticve users id
      name: this.state.exercise,
      imported_id: findExerciseId(this.state.exercise),
      date,
      weight,
      reps,
      sets,
      notes
    }
    fetch("http://localhost:3000/api/v1/exercise", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)})
      e.target.reset();
  }

  renderNewExerciseForm = () => {
    return (<div>
      <h4> Add new Exercise </h4>
      <form onSubmit={this.addExercise}>
        <label> Date </label>
        <input type='date' name='date' onChange={this.handleChange}/>
        <label> Exercise </label>
        <AutoComplete suggestions={AutoCompleteItems} retrieveUserInput={this.retrieveUserInput} />
        <label> Weight </label>
        <input type='number' placeholder="Weight" name="weight"  onChange={this.handleChange}/>
        <label> Reps </label>
        <input type='number' placeholder="Reps" name="reps" onChange={this.handleChange}/>
        <label> Sets </label>
        <input type='number' placeholder="Sets" name="sets" onChange={this.handleChange}/>
        <label> Notes </label>
        <textarea type='text' placeholder="Enter Notes" name="notes" onChange={this.handleChange}/>
        <input type='submit' value='Save' />
      </form>
    </div>
    )
  }


  render () {
    return(
      <div>
        <h1>Add a new workout </h1>
        {this.renderNewExerciseForm()}
      </div>


    )

  }
}

export default Exercise;
