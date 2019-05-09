import React, {Component} from 'react'
import AutoComplete from './AutoComplete'
import AutoCompleteItems from '../helpers/AutoCompleteItems';
import {findExerciseId} from '../helpers/exerciseIdFinder'
import {setDate} from '../helpers/helpers.js'
import {postNewExercise} from '../helpers/helpers.js'
import {postNewWorkout} from '../helpers/helpers.js'
import {postNewWorkoutExercise} from '../helpers/helpers.js'
import {findWorkoutsExercises} from '../helpers/helpers.js'
import {findExerciseById} from '../helpers/helpers.js'
import {NoDateExerciseForm} from '../helpers/forms.js'
import {checkUnits} from '../helpers/helpers'
import RepCalculator from './RepCalculator';
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
      showNewExercise: false,
      exerciseFormToDisplay: ''
    }
  }

  //if a workout is passed in from Link it is saved to state and its assosciated exercises are fetched.
  // date is saved in correct format
  componentDidMount(){
    if(this.props.location.state){
      const date = setDate()
      this.setState({
        workout: this.props.location.state.workout,
        date
      }, this.fetchExercises)}
  }
  //creates a new instance of a workout on page load
  createNewWorkout = () => {
    const body ={
      user_id: localStorage.getItem("user_id"),
      name: this.state.workout.name,
      date: this.state.date
    }
    postNewWorkout(body)
    .then(newWorkout => {
      this.setState({
        newWorkout,
        exerciseFormToDisplay: ''
      })
    })
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
      exercises.forEach(exercise => {
        this.setState({
          exercises: [...this.state.exercises, {...exercise, showForm: false}]
        })
      })
    })
    this.createNewWorkout()
  }

  // updates exercise thats clicked on to show its form
  updateShowForm = (exercise) => {
    const updatedExercises = this.state.exercises.map(thisExercise => {
      return thisExercise === exercise ?
      {...exercise, showForm: !exercise.showForm}
      : thisExercise
    })
    //hides form if button clicked on again when already showing
    const formToDisplay = this.state.exerciseFormToDisplay.name === exercise.name ? '' : exercise
    this.setState({
      exercises: updatedExercises,
      exerciseFormToDisplay: formToDisplay
    })
  }

  renderExercises = () => {
    return this.state.exercises.map(exercise => this.listExercise(exercise))
  }

  listExercise = (exercise) => {
    const style = this.state.exerciseFormToDisplay.name === exercise.name ? "card short active" : "card short"
    const weightUnits = checkUnits(exercise)
    return (
      <div className={style} key={exercise.id}>
        <h4 className="card-title"> {exercise.name} </h4>
        <h5
          className='card-subtitle'> {exercise.weight}{weightUnits} x {exercise.reps} reps
        </h5>
         <button
          className="button small blue"
          onClick={() => this.updateShowForm(exercise)}>
          Add to new workout
        </button>
      </div>
    )
  }

//saves a new version of exercise from users list of previously completed exercises
  saveExercise = (e, exercise) => {
    e.preventDefault();
    this.setState({
      exerciseFormToDisplay: ''},
      this.saveExerciseToWorkout(e, exercise))
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
      weight, reps, sets, notes,
      date:this.state.date,
      imported_exercise_id: exercise.imported_exercise_id,
      name: exercise.name,
      units: this.props.currentUser.units
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

//saves the new exercise to the current workout
   addExerciseToWorkout = (exercise) => {
     const body = {
       workout_id: this.state.newWorkout.id,
       exercise_id: exercise.id
     }

     postNewWorkoutExercise(body)
   }
//renders form for previously completed exercises
  renderNewExerciseForm = (exercise) => {
    const submit = (e) => this.saveExercise(e, exercise)
    return (
    <div>
      <h2 className="center">{exercise.name}</h2>
      <div className='grid'>
        <NoDateExerciseForm onSubmit={submit} />
        <RepCalculator
        exercise={exercise.name}
        retrievedExercise={exercise}
         />
      </div>
    </div>
    )
  }

//saves input from autocomplete field
  retrieveUserInput = (exercise) => {

    this.setState({exercise})
  }

  //find exercise details by name for rep calculator
  findExercise = (name) => {
    const id = findExerciseId(name)
    return findExerciseById(id)
  }

//saves completely new exercise
  addExercise = (e) => {
    e.preventDefault();
    const {date, weight, reps, sets, notes} = this.state
    const body ={
      user_id: localStorage.getItem("user_id"),
      name: this.state.exercise,
      imported_exercise_id: findExerciseId(this.state.exercise),
      units: this.props.currentUser.units,
      date, weight, reps, sets, notes
    }
    postNewExercise(body)
    .then(newExercise => {
      this.addExerciseToWorkout(newExercise)
      this.setState({
        newExercises: [...this.state.newExercises, newExercise],
        date: '',
        weight: '',
        reps: '',
        sets: '',
        notes: '',
      })
    })
  }

//triggered when user clicks to add different exercise
  showNewForm = () => {
    this.setState({showNewExercise: true})
  }
//form for completely new exercise
  renderNewExercise = () => {
    const exercise = this.findExercise(this.state.exercise)
    return this.state.showNewExercise ? (
  <div className='grid'>
    <div>
      <h4 className='center'> Add a new Exercise </h4>
      <form
        className='form'
        onSubmit={this.addExercise}>
        <div className="form_item">
          <label> Exercise </label>
          <AutoComplete
            suggestions={AutoCompleteItems} retrieveUserInput={this.retrieveUserInput} />
        </div>

          <div className="form_item">
            <label> Weight </label>
            <input
              type='number'
              placeholder="Weight"
              name="weight"
              value={this.state.weight}
              onChange={this.handleChange}/>
          </div>
          <div className="form_item">
            <label> Reps </label>
            <input
              type='number'
              placeholder="Reps"
              name="reps"
              value={this.state.reps}
              onChange={this.handleChange}/>
          </div>
          <div className="form_item">
            <label> Sets </label>
            <input
              type='number'
              placeholder="Sets"
              name="sets"
              value={this.state.sets}
              onChange={this.handleChange}/>
          </div>
          <div className="form_item">
            <label> Notes </label>
            <textarea
              type='text'
              placeholder="Enter Notes"
              name="notes"
              value={this.state.notes}
              onChange={this.handleChange}/>
          </div>
          <div className="form_item">
          <input className="button small green" type='submit' value='Save' />
        </div>
      </form>
    </div>
    <RepCalculator
    exercise={this.state.exercise}
    retrievedExercise={exercise}
     />
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

      const formToRender = this.state.exerciseFormToDisplay === '' ? <div> </div> : this.renderNewExerciseForm(this.state.exerciseFormToDisplay)

    return(
      <div className='container'>
        <h2 className='center'>Name: {name} </h2>
        <h3 className='center'>Date: {date}</h3>
        <h3 className='center'> Completed Exercises For This Workout</h3>
        {window.innerWidth < 420 ? <p> Click on an exercise, then scroll down to add details and see rep calculator. <br/>The active exercise will show in <span className="blue_text"> blue </span>. </p>: <p> </p> }
        <div className="small_grid">
          {exercisesToRender}
        </div>
        {formToRender}
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
