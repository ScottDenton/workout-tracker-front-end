import React, {Component} from 'react'
import AutoComplete from './AutoComplete'
import AutoCompleteItems from '../helpers/AutoCompleteItems';
import {findExerciseId} from '../helpers/exerciseIdFinder'
import {setDate} from '../helpers/helpers.js'
import {postNewExercise} from '../helpers/helpers.js'
import {postNewWorkout} from '../helpers/helpers.js'
import {postNewWorkoutExercise} from '../helpers/helpers.js'
import {findWorkoutsExercises} from '../helpers/helpers.js'
import { Link } from "react-router-dom";

class WorkoutShow extends Component {
  constructor(props){
    super(props)
    this.state={
      workout: '',
      exercises: '',
      newWorkout: '',
      newExercises: '',
      date: '',
      weight: '',
      reps: '',
      sets: '',
      notes: '',
      showNewExercise: false
    }
  }

//if a workout is passed in from Link it is saved to state and its assosciated exercises are fetched.
// date is saved in correct format
  componentDidMount(){
    if(this.props.location.state){
      this.setState({
        workout: this.props.location.state.workout
      }, this.fetchExercises)}
    const date = setDate()
    this.setState({date});
  }

//handle changes to form fields
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

//fetches exercises for a particular workout on load
  fetchExercises = () => {
    const body = {id: this.state.workout.id}
    findWorkoutsExercises(body)
    .then(exercises => {
      exercises.map(exercise => {
        this.setState({
          exercises: [...this.state.exercises, {...exercise, showForm: false}]
        })
      })
    })
  }

  // updates exercise thats clicked on to show its form
  updateShowForm = (exercise) => {
    const updatedExercises = this.state.exercises.map(thisExercise => {
      return thisExercise === exercise ?
      {...exercise, showForm: !exercise.showForm}
      : thisExercise
    })
    this.setState({
      exercises: updatedExercises
    })
  }

  renderExercises = () => {
    return this.state.exercises.map(exercise => this.listExercise(exercise))
  }

  listExercise = (exercise) => {
    return (
      <div className="exercise_container">
        <div className="exercise_name">
          {exercise.name} - {exercise.weight}kgs x {exercise.reps} reps
        </div>

        {exercise.showForm === true ?
           this.renderNewExerciseForm(exercise):
           <button
            className="button small blue"
            onClick={() => this.updateShowForm(exercise)}>
            Add to new workout
          </button> }
        </div>
    )
  }

//saves a new version of exercise from users list of previously completed exercises
  saveExercise = (e, exercise) => {
    e.preventDefault();
    const body ={
      user_id: localStorage.getItem("user_id"),
      name: this.state.workout.name,
      date: this.state.date
    }
    this.state.newWorkout === '' ?
    postNewWorkout(body)
    .then(newWorkout => {
      this.setState({
        newWorkout
      })
    })
    .then(this.saveExerciseToWorkout(e, exercise))
    : this.saveExerciseToWorkout(e, exercise)
  }

//creates link between saved exercise and workout
  saveExerciseToWorkout = (e, exercise) =>{
    this.updateShowForm(exercise)
    const weight = e.target.querySelector("[name='weight']").value
    const reps = e.target.querySelector("[name='reps']").value
    const sets = e.target.querySelector("[name='sets']").value
    const notes = e.target.querySelector("[name='notes']").value

    const body={
      user_id: localStorage.getItem("user_id"),
      weight, reps, sets, notes, date:this.state.date, imported_exercise_id: exercise.imported_exercise_id, name: exercise.name
    }
    postNewExercise(body)
      .then(newExercise => {
        this.addExerciseToWorkout(newExercise)
        this.setState({
          newExercises: [...this.state.newExercises, newExercise],
          retrievedExercise: newExercise
        })
      })
   }

   addExerciseToWorkout = (exercise) => {
     const body = {
       workout_id: this.state.newWorkout.id,
       exercise_id: exercise.id
     }
     postNewWorkoutExercise(body)
   }
//renders form for previously completed exercises
  renderNewExerciseForm = (exercise) => {
    return (<div>
      <form className="form_inline"
        onSubmit={(e) => this.saveExercise(e, exercise)}>
        <label> Weight </label>
        <input
          type='number'
          placeholder="Weight"
          name="weight"
        />
        <label> Reps </label>
        <input
          type='number'
          placeholder="Reps"
          name="reps" />
        <label> Sets </label>
        <input
          type='number'
          placeholder="Sets"
          name="sets"
          />
        <label> Notes </label>
        <textarea
          type='text'
          placeholder="Enter Notes"
          name="notes"
          />
        <input
          className="button small green"
          type='submit' value='Save'/>
      </form>
    </div>
    )
  }

//saves input from autocomplete field
  retrieveUserInput = (exercise) => {
    this.setState({exercise})
  }

//saves completely new exercise
  addExercise = (e) => {
    e.preventDefault();
    const {date, weight, reps, sets, notes} = this.state
    const body ={
      user_id: localStorage.getItem("user_id"),
      name: this.state.exercise,
      imported_exercise_id: findExerciseId(this.state.exercise),
      date, weight, reps, sets, notes
    }
    postNewExercise(body)
    .then(newExercise => {
      this.addExerciseToWorkout(newExercise)
      this.setState({
        newExercises: [...this.state.newExercises, newExercise]
      })
    })
  }

//triggered when user clicks to add different exercise
  showNewForm = () => {
    this.setState({showNewExercise: true})
  }
//form for completely new exercise
  renderNewExercise = () => {
    return this.state.showNewExercise ? (
    <div >
      <h4> Add a new Exercise </h4>
      <form
        className='workout_show_form'
        onSubmit={this.addExercise}>
        <div className="left_form_item">
          <label> Exercise </label>
          <AutoComplete
            suggestions={AutoCompleteItems} retrieveUserInput={this.retrieveUserInput} />
        </div>
        <div className=' grid'>
          <div className="form_item">
            <label> Weight </label>
            <input type='number' placeholder="Weight" name="weight"  onChange={this.handleChange}/>
          </div>
          <div className="form_item">
            <label> Reps </label>
            <input type='number' placeholder="Reps" name="reps" onChange={this.handleChange}/>
          </div>
          <div className="form_item">
            <label> Sets </label>
            <input type='number' placeholder="Sets" name="sets" onChange={this.handleChange}/>
          </div>
          <div className="form_item">
            <label> Notes </label>
            <textarea type='text' placeholder="Enter Notes" name="notes" onChange={this.handleChange}/>
          </div>
          <div className="form_item">
          <input className="button small green" type='submit' value='Save' />
        </div>
        </div>
      </form>
    </div>
  ) : <div className="button_div center">
        <button
          className ="button small green"
          onClick={this.showNewForm}> Add a different Exercise
        </button>
      </div>
  }

//decides which exercises to display
  displayExercises = () => {
    return this.state.newExercises !== '' ? <div>
      <h3> Completed Exercises </h3>
      {this.state.newExercises.map(exercise => (<li key={exercise.id}> {exercise.name}</li>))}
    </div> : <div></div>
  }

  render () {
    const {name, date} = this.state.workout
    const exercisesToRender = this.state.exercises !=='' ?
      this.renderExercises() :
      <p>
        It doesnt look like you recorded any exercises for this workout
      </p>

    return(
      <div className='container'>
        <h2>Name: {name} </h2>
        <h3>Date: {date}</h3>
        <div>
          <h3> Completed Exercises For This Workout</h3>
          {exercisesToRender}
        </div>
        {this.renderNewExercise()}
        {this.displayExercises()}
        <div className="center">
          <Link to={"/"}>
            <button className="small button red">End Workout</button>
          </Link>
        </div>
      </div>
    )

  }
}

export default WorkoutShow;
