import React, {Component} from 'react'
import AutoComplete from './AutoComplete'
import AutoCompleteItems from '../helpers/AutoCompleteItems';
import {findExerciseId} from '../helpers/exerciseIdFinder'
import {setDate} from '../helpers/helpers.js'

class WorkoutShow extends Component {
  constructor(props){
    super(props)
    this.state={
      workout: '',
      exercises: '',
      newWorkout: '',
      date: '',
      weight: '',
      reps: '',
      sets: '',
      notes: ''
    }
  }

  componentDidMount(){
    if(this.props.location.state){
    this.setState({
      workout: this.props.location.state.workout
    }, this.fetchExercises)}
    const date = setDate()
    this.setState({date});
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  fetchExercises = () => {
    fetch("http://localhost:3000/api/v1/all_exercises/exercisesByWorkout", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({id: this.state.workout.id})
    })
    .then(resp => resp.json())
    .then(exercises => {
      exercises.map(exercise => {
        this.setState({
          exercises: [...this.state.exercises, {...exercise, showForm: false}]
        })
      })
    })
  }


  updateShowForm = (exercise) => {
    const updatedExercises = this.state.exercises.map(ex => {
      return ex === exercise ?
      {...exercise, showForm: !exercise.showForm} :
      ex
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
        <div className="exercise_name"> {exercise.name} - {exercise.weight}kgs x {exercise.reps} reps(s)</div>

          {exercise.showForm === true ? this.renderNewExerciseForm(exercise) : <button onClick={() => this.updateShowForm(exercise)}> Add to workout </button> }
      </div>
    )
  }

  saveExercise = (e, exercise) => {
    e.preventDefault();
    const body ={
      user_id: localStorage.getItem("user_id"),
      name: this.state.workout.name,
      date: this.state.date
    }

    this.state.newWorkout === '' ?
    fetch("http://localhost:3000/api/v1/workouts", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(newWorkout => {
      this.setState({
        newWorkout
      })
    })
    .then(this.saveExerciseToWorkout(e, exercise))

    : this.saveExerciseToWorkout(e, exercise)
  }

  saveExerciseToWorkout = (e, exercise) =>{
    this.updateShowForm(exercise)
    const weight = e.target.querySelector("[name='weight']").value
    const reps = e.target.querySelector("[name='reps']").value
    const sets = e.target.querySelector("[name='sets']").value
    const notes = e.target.querySelector("[name='notes']").value

    const body={
      user_id: localStorage.getItem("user_id"),
      weight, reps, sets, notes, date:this.state.date, imported_id: exercise.imported_id, name: exercise.name
    }
    fetch("http://localhost:3000/api/v1/exercise", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)})
      .then(resp=> resp.json())
      .then(exercise => {
        this.addExerciseToWorkout(exercise)
      })
   }

   addExerciseToWorkout = (exercise) => {
     const body = {
       workout_id: this.state.newWorkout.id,
       exercise_id: exercise.id
     }
     console.log('fetch body', body)

     fetch("http://localhost:3000/api/v1/workout_exercises", {
       method: "POST",
       headers: {
         "accept": "application/json",
         "Content-Type": "application/json"
       },
       body: JSON.stringify(body)
     })
       .then(resp => resp.json())
       .then(console.log)

   }


  renderNewExerciseForm = (exercise) => {
    return (<div>
      <form onSubmit={(e) => this.saveExercise(e, exercise)}>
        <label> Weight </label>
        <input type='number'
          placeholder="Weight" name="weight"
        />
        <label> Reps </label>
        <input type='number'
          placeholder="Reps" name="reps" />
        <label> Sets </label>
        <input type='number'
          placeholder="Sets" name="sets"
          />
        <label> Notes </label>
        <textarea type='text'
          placeholder="Enter Notes" name="notes"

          />
        <input type='submit' value='Save'/>
      </form>
    </div>
    )
  }

  retrieveUserInput = (exercise) => {
    this.setState({exercise})
  }

  addExercise = (e) => {
    e.preventDefault();
    const {date, weight, reps, sets, notes} = this.state
    const body ={
      user_id: localStorage.getItem("user_id"),
      name: this.state.exercise,
      imported_id: findExerciseId(this.state.exercise),
      date, weight, reps, sets, notes
    }
    fetch("http://localhost:3000/api/v1/exercise", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)})
      .then(resp=> resp.json())
      .then(exercise => {
        this.addExerciseToWorkout(exercise)
      })
  }

  renderNewExercise = () => {
    return (
    <div>
      <h4> Add a new Exercise </h4>
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

  render () {
    const {name, date} = this.state.workout

    const exercisesToRender = this.state.exercises !=='' ?
      this.renderExercises() :
      <p> It doesnt look like you recorded any exercises for this workout</p>
    return(
      <div>
        <h2>{name} - <span className='small'>{date} </span> </h2>

        {exercisesToRender}
        {this.renderNewExercise()}
      </div>
    )

  }
}

export default WorkoutShow;
