import React, {Component} from 'react'
import AutoComplete from './AutoComplete'
import AutoCompleteItems from '../helpers/AutoCompleteItems';
import {findExerciseId} from '../helpers/exerciseIdFinder'

class Workout extends Component {
  constructor(props){
    super(props)
    this.state={
      name: '',
      exercise: '',
      date: '',
      workoutName: 'Start a new workout',
      workoutId: null,
      exercises: [],
      weight: '',
      reps: '',
      sets: '',
      notes: ' '
    }
  }

  componentDidMount(){
    this.setDate();
  }

  setDate = () => {
    const today = new Date();
    const year = today.getFullYear()
    const month = (today.getMonth() + 1) < 10 ?
      `0${today.getMonth() + 1}` :  today.getMonth() +1
    const day = today.getDate() < 10 ?
      `0${today.getDate()}` : today.getDate()
    const date = `${year}-${month}-${day}`

    this.setState({date})
  }

  handleChange =(e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  retrieveUserInput = (exercise) => {
    console.log('retrieved', exercise)
    this.setState({exercise})
  }

// **** user id is currently hardcoded
  createWorkout = (e) => {
    e.preventDefault();
    const body ={
      user_id: 1,
      name: this.state.name,
      date: this.state.date
    }
    fetch("http://localhost:3000/api/v1/workouts", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)})
    .then(resp => resp.json())
    .then(workout => {
      this.setState({
        workoutId: workout.id,
        workoutName: workout.name
      })
    })
  }

  addExercise = (e) => {
    e.preventDefault();
    const exercise = document.querySelector("[name=exercise]").value
    this.setState({
      exercise
    }, this.saveExerciseToWorkout(e))
  }

// *** user ID is still hardcoded until login is done
  saveExerciseToWorkout = (e) => {
    const {date, weight, reps, sets, notes} = this.state
    const body ={
      user_id: 1,
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
      .then( resp => resp.json())
      .then(newExercise => {
        this.setState({
          exercises: [...this.state.exercises, newExercise]
        })
        this.createNewWorkoutExercise(newExercise.id)
      })
      e.target.reset();
  }

  createNewWorkoutExercise = (id) => {
    fetch("http://localhost:3000/api/v1/workout_exercises", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        workout_id: this.state.workoutId,
        exercise_id: id
      })
    }).then(resp => resp.json())
    .then(console.log)
  }

  renderNewWorkoutForm = () => {
    return (
    <form onSubmit={this.createWorkout}>
      <label htmlFor="name"> Name this workout </label>
      <input type="text" name="name" placeholder="Give this workout a name to find it easier later" onChange={this.handleChange}/>
      <input type="submit" value="Start Working" />
    </form>
    )
  }

  renderNewExerciseForm = () => {
    return (<div>
      <h4> Add new Exercise </h4>
      <form onSubmit={this.addExercise}>
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

  itemsToRender = () => {
    return this.state.workoutId === null ? this.renderNewWorkoutForm(): this.renderNewExerciseForm();
  }

  displayExercises = () => {
    if(this.state.workoutId !== null){
      return <div>
        <h3> Completed Exercises </h3>
        {this.state.exercises.map(exercise => (<li key={exercise.id}> {exercise.name}</li>))}
        </div>
      }
  }


  render () {
    return(
      <div>
        <h1>{this.state.workoutName} </h1>
        {this.itemsToRender()}
        {this.displayExercises()}
        <button> Finish Workout </button>
      </div>


    )

  }
}

export default Workout;
