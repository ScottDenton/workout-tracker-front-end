import React, {Component} from 'react'
import AutoComplete from './AutoComplete'
import RepCalculator from './RepCalculator'
import AutoCompleteItems from '../helpers/AutoCompleteItems';
import {findExerciseId} from '../helpers/exerciseIdFinder'
import {setDate} from '../helpers/helpers'
import {postNewExercise} from '../helpers/helpers'
import {postNewWorkoutExercise} from '../helpers/helpers'
import {postNewWorkout} from '../helpers/helpers'
import {NewExerciseForm} from '../helpers/forms.js'
import { Link } from "react-router-dom";



class Workout extends Component {
  constructor(props){
    super(props)
    this.state={
      name: '',
      exercise: '',
      retrievedExercise: '',
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
    const date = setDate()
    this.setState({date})
  }

  handleChange =(e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  retrieveUserInput = (exercise) => {
    this.setState({exercise})
  }

  createWorkout = (e) => {
    e.preventDefault();
    const body ={
      user_id: localStorage.getItem("user_id"),
      name: this.state.name,
      date: this.state.date
    }
    postNewWorkout(body)
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
    this.setState({exercise},
    this.saveExerciseToWorkout(e))
  }

  saveExerciseToWorkout = (e) => {
    const {date, weight, reps, sets, notes} = this.state
    const body ={
      user_id: localStorage.getItem("user_id"),
      name: this.state.exercise,
      imported_exercise_id: findExerciseId(this.state.exercise),
      date, weight, reps, sets, notes
    }
    postNewExercise(body)
      .then(newExercise => {
        this.setState({
          exercises: [...this.state.exercises, newExercise],
          retrievedExercise: newExercise,
          notes: ''
        })
        this.createNewWorkoutExercise(newExercise.id)
      })
      e.target.reset();
  }

  createNewWorkoutExercise = (id) => {
    const body = {
      workout_id: this.state.workoutId,
      exercise_id: id
    }
    postNewWorkoutExercise(body)
  }

  renderNewWorkoutForm = () => {
    return (
    <form className='form'
      onSubmit={this.createWorkout}>
      <div className='form_item'>
        <label htmlFor="name"> Name this workout </label>
        <input type="text" name="name"
          placeholder="Workout Name" onChange={this.handleChange}/>
      </div>
      <div className='form_item'>
        <input className='button small blue' type="submit" value="Start Working" />
      </div>
    </form>
    )
  }

  renderNewExerciseForm = () => {
    return (<div>
      <h4> Add new Exercise </h4>
        <NewExerciseForm
          onSubmit={this.addExercise}
          onChange={this.handleChange}
          retrieveUserInput={this.retrieveUserInput}/>
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

  renderRepCalculator = () => {
     if(this.state.retrievedExercise !== '') {
      return <RepCalculator
      exercise={this.state.exercise}
      retrievedExercise={this.state.retrievedExercise}
      date={this.state.date} />
    }
  }

  render () {
    return(
      <div className='container'>
        <h1 className='center'>{this.state.workoutName} </h1>
        <div className='container grid'>
          {this.itemsToRender()}
          {this.renderRepCalculator()}
        </div>
          {this.displayExercises()}
        <Link to={"/"}>
          <button className="small button red">End Workout</button>
        </Link>
      </div>


    )

  }
}

export default Workout;
