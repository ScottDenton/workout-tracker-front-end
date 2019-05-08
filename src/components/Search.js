import React, {Component} from 'react'
import {findUsersWorkouts} from '../helpers/helpers'
import {findUsersExercises} from '../helpers/helpers'
import {SearchForm} from '../helpers/forms'
import ExerciseCard from './ExerciseCard'
import WorkoutCard from './WorkoutCard'

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

  //clears the inputs and reloads the results
  clickedSearchAgain = () => {
    this.fetchWorkouts();
    this.fetchExercises();
    this.setState({
      date: '',
      filteredWorkout: '',
      filteredExercise: ''
    })
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
    const body = {user_id: this.props.currentUser.id}
    findUsersWorkouts(body)
    .then(workouts => {
      this.setState({workouts})
    })
  }

  //fetch of all of users exercises
  fetchExercises = () => {
    const body = {user_id: this.props.currentUser.id}
    findUsersExercises(body)
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

  deleteWorkout = (workoutToDelete) => {
    const workouts = this.state.workouts.filter(workout => {
      return workout.id !== workoutToDelete.id
    })
    this.setState({ workouts })
  }

  renderWorkoutList = () => {
    const filteredWorkouts = this.state.filteredWorkout === '' ?
    this.state.workouts :
    this.state.workouts.filter(workout => (
      workout.name.includes(this.state.filteredWorkout)
    ))

    return this.state.workouts ?
      <div >
        <h1 className="center"> My Completed Workouts</h1>
        {window.innerWidth < 380 ? <h4> Scroll on an individual workout to see more details</h4> : <div> </div>}
        <div>
        {this.filterByDate(filteredWorkouts).map(workout => {
          return(
            <div
              className ="search_list"
              key={workout.id}>
              <WorkoutCard
                workout={workout}
                deleteWorkout={this.deleteWorkout}
                />
            </div>
          )
        })}
        </div>
      </div>
      : <div> ...loading </div>
  }
  renderExerciseList = () => {
    const filteredExercises = this.state.filteredExercise === '' ?
    this.state.exercises :
    this.state.exercises.filter(exercise => {
      return exercise.name ? exercise.name.includes(this.state.filteredExercise) : exercise.name
    })

    return this.state.exercises ?
      <div>
        <h1 className="center"> My Completed Exercises</h1>
        <h5 className="center justified"> <span className='blue_highlight'>Click </span>on an exercise to see a suggested weight and rep scheme based on your last recorded workout for that exercise.</h5>
        <div>
        {this.filterByDate(filteredExercises).reverse().map(exercise => {
        return (
          <div
            className="search_list"
            key={exercise.id}>
            <ExerciseCard
              exercise={exercise}
              currentUser={this.props.currentUser}/>
          </div>
          )
        })}
      </div>
      </div>
      : <div> ...loading </div>
  }

  filterByDate = (array) => {
    return  this.state.date === '' ? array : array.filter(exercise => new Date(exercise.date) - new Date(this.state.date) > 0)
  }

  render () {
    const nameSearch = this.state.searchSelection === 'workout' ?
    this.workoutNameSearch() : this.exerciseNameSearch()

    const resultsToRender = this.state.searchSelection === 'workout' ?
    this.renderWorkoutList() : this.renderExerciseList()

    return(
      <div className="container">
        <h1 className='center'> Search</h1>
        <SearchForm
          handleCriteriaChange={this.handleCriteriaChange}
          nameSearch={nameSearch}
          date={this.state.date}
          handleChange={this.handleChange}/>
        <button className="button small green"
          onClick={this.clickedSearchAgain}> Search
        </button>
        <hr />
        <div className="search_container">
          {resultsToRender}
        </div>
      </div>
    )
  }
}

export default Search;
