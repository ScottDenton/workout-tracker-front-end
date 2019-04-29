import React, {Component} from 'react'
import AutoComplete from './AutoComplete'
import RepCalculator from './RepCalculator'
import AutoCompleteItems from '../helpers/AutoCompleteItems';

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
    }
      )
  }

  renderExercises = () => {
    return this.state.exercises.map(exercise => this.listExercise(exercise))
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

  listExercise = (exercise) => {
    return (
      <div>
        <h5> {exercise.name}</h5>
        <h5>{exercise.weight}kgs x {exercise.reps} reps(s)</h5>
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
      this.setState({newWorkout})
    }, this.saveExerciseToWorkout(e, exercise))
    : this.saveExerciseToWorkout(e, exercise)
  }

  saveExerciseToWorkout = (e, exercise) =>{
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
      // .then(console.log)
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

  render () {
    const {name, date} = this.state.workout

    const exercisesToRender = this.state.exercises !=='' ?
      this.renderExercises() :
      <p> It doesnt look like you recorded any exercises for this workout</p>
    return(
      <div>
        <h2>{name} </h2>
        <h5>{date} </h5>
        {exercisesToRender}


      </div>
    )

  }
}

export default WorkoutShow;
