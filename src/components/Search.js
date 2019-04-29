import React, {Component} from 'react'
import AutoComplete from './AutoComplete'
import AutoCompleteItems from '../helpers/AutoCompleteItems';
import {findExerciseId} from '../helpers/exerciseIdFinder'
import {workoutFinder} from '../helpers/WorkoutFinder'


class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchSelection: 'workout',
      filteredExercise: '',
      filteredWorkout: '',
      workouts: '',
      exercises: '',
      date: ''
    }
  }

//fetch a users exercises and workouts on load
//should save some load time when selections are made to filter
  componentDidMount(){
    this.fetchWorkouts();
    this.fetchExercises();
  }

  handleCriteriaChange = (e) => {
    const searchSelection = e.target.value
    this.setState({ searchSelection })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

// fetch all of a users workouts
  fetchWorkouts = () => {
    fetch("http://localhost:3000/api/v1/all_exercises/userWorkouts", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({user_id: this.props.currentUser.id})
    })
    .then(resp => resp.json())
    .then(workouts => {
      this.setState({workouts})
    })
  }
  //fetch of all of users exercises
  fetchExercises = () => {
    fetch("http://localhost:3000/api/v1/all_exercises/userExercises", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({user_id: this.props.currentUser.id})
    })
    .then(resp => resp.json())
    .then(exercises => {
      this.setState({exercises})
    })
  }

//renders workout name search input
  workoutNameSearch = () => {
    return (
    <div>
      <label> Find By Name: </label>
        <input type='text' name='filteredWorkout'
          value={this.state.filteredWorkout}
          onChange={this.handleChange}
          placeholder="Search By Workout Name"/>
    </div>
    )
  }
//render exercise name search-autocomplete input
  exerciseNameSearch = () => {
    return (
      <div>
        <label> Find By Exercise: </label>
          <input type='text' name='filteredExercise'
            value={this.state.filteredExercise}
            onChange={this.handleChange}
            placeholder="Exercise Name"/>
      </div>
    )
  }

//takes users choice from autocomplete field and saves it
  // retrieveUserInput = (filteredExercise) => {
  //   this.setState({filteredExercise})
  // }

  renderWorkoutList = () => {
    const filteredWorkouts = this.state.filteredWorkout === '' ?
    this.state.workouts :
    this.state.workouts.filter(workout => {
      return workout.name.toLowerCase().includes(this.state.filteredWorkout.toLowerCase())
    })

    return this.state.workouts ?
      <div>
        <ul>
        {this.filterByDate(filteredWorkouts).map(workout => {
          return(
            <li
              key={workout.id}
              onClick={() => {this.handleClickOnWorkout(workout)}}>
              {workout.name}
            </li>
          )
        })}
        </ul>
      </div>
      : <div> ...loading </div>
  }
  renderExerciseList = () => {
    const filteredExercises = this.state.filteredExercise === '' ?
    this.state.exercises :
    this.state.exercises.filter(exercise => {
      return exercise.name.toLowerCase().includes(this.state.filteredExercise.toLowerCase())
    })

    return this.state.exercises ?
      <div>
        <ul>
        {this.filterByDate(filteredExercises).map(exercise => {
          return (
            <li
              key={exercise.id}
              onClick={() => {this.handleClickOnExercise(exercise)}}>
              {exercise.name}
            </li>
          )
        })}
        </ul>
      </div>
      : <div> ...loading </div>
  }

  filterByDate = (array) => {
  return  this.state.date == '' ? array : array.filter(exercise => new Date(exercise.date) - new Date(this.state.date) > 0)
  }

  handleClickOnExercise = (exercise) => {
      console.log('clicked on ', exercise)
  }
  handleClickOnWorkout = (workout) => {
      console.log('clicked on ', workout)
  }

  render () {
    const nameSearch = this.state.searchSelection === 'workout' ?
    this.workoutNameSearch() : this.exerciseNameSearch()

    const resultsToRender = this.state.searchSelection === 'workout' ?
    this.renderWorkoutList() : this.renderExerciseList()

    return(
      <div>
        <form>
          <label> Search by: </label>
          <select onChange={this.handleCriteriaChange}>
            <option value='workout'> Workout </option>
            <option value = 'exercise'> Execise </option>
          </select>
          {nameSearch}
          <label> Date From: </label>
          <input type='date' name='date'
            value={this.state.date}
            onChange={this.handleChange}/>
        </form>
        <hr />
        {resultsToRender}
      </div>
    )
  }
}

export default Search;

//if there is an exercise saved to state, then show list
