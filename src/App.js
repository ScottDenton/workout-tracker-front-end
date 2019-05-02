import React, {Component} from 'react';
import './scripts/App.css';
import './scripts/AutoComplete.css';
import './scripts/Card.css';
import './scripts/button.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Search from './components/Search';
import Workout from './components/Workout';
import Exercise from './components/Exercise';
import WorkoutShow from './components/WorkoutShow';
import ExerciseShow from './components/ExerciseShow';
import UserEdit from './components/UserEdit';
import { BrowserRouter as Router, Route } from "react-router-dom";


class App extends Component {
  constructor(props){
    super()
    this.state={
      measurementUnits: "metric",
      currentUser: {},
      userLoggedIn: false,
      allExercises: [],
    }
  }

//BELOW USED FOR INITIAL SEED. ONLY KEEPING FOR TESTING BACKEND
  // componentDidMount(){
  //   fetch("http://localhost:3000/api/v1/imported_exercises")
  //   .then(resp => resp.json())
  //   .then( data => {
  //     data.results.map(exercise => {
  //        this.createNewImportedExercise(exercise)
  //     })
  //   })
  // }

// retrieving list of names and ids for autocomplete
// data.map(exercise => {
  // this.setState({
  //   allExerciseNames: [...this.state.allExerciseNames, {exercise.name, exercise.id]
  //   })

//retrieves user from local storage and sets as current user
  componentDidMount(){
    const id = localStorage.getItem("user_id")
    if(id){
      fetch(`http://localhost:3000/api/v1/users/${id}`)
      .then(resp => resp.json())
      .then(currentUser => {
        this.setState({currentUser, userLoggedIn: true})
      })

    }
  }

  // createNewImportedExercise = (data) => {
  //   const body ={
  //       "imported_exercise_id": data.id,
  //       "description": data.description,
  //       "name": data.name,
  //       "category": data.category,
  //       "muscles": data.muscles,
  //       "equipment": data.equipment
  //     }
  //   fetch("http://localhost:3000/api/v1/imported_exercises", {
  //     method: "POST",
  //     headers: {
  //       "accept": "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(body)
  //   }).then(resp => resp.json())
  // }

  setUnits = (measurementUnits) =>{
    this.setState({measurementUnits})
  }

  setLoggedInUser = (currentUser) =>{
    this.setState({currentUser, userLoggedIn: true})
  }

  signOut = () => {
    this.setState({
      currentUser: {},
      userLoggedIn: false,
    })
    localStorage.removeItem("user_id")
  }

  authenticateUser = () => {
    const userId = this.state.currentUser.id
    const localId = Number(localStorage.getItem("user_id"))
    return  userId === localId && userId !== undefined
  }

  render(){
    return (
      <Router>
        <React.Fragment>
          <Route
            path='/'
            render={props => (
              <Navbar {...props}
                signOut={this.signOut}
                currentUser={this.state.currentUser}
                />
            )}
          />
          <Route
            exact
            path='/'
            render={props => (
              <Home {...props}
                setLoggedInUser={this.setLoggedInUser}
                userLoggedIn={this.state.userLoggedIn}
                />
            )}
          />
          <Route
            exact
            path='/workout'
            render={props => (
              <Workout {...props}
                currentUser={this.state.currentUser}
                units={this.state.measurementUnits}
                />
            )}
          />
          <Route
            exact
            path='/exercise'
            render={props => (
              <Exercise {...props}
                currentUser={this.state.currentUser}
                units={this.state.measurementUnits}
                />
            )}
          />
          <Route
            path='/signup'
            render={props => (
              <Signup {...props}
                setUnits={this.setUnits}
                setLoggedInUser={this.setLoggedInUser}
                />
            )}
          />
          <Route
            path='/search'
            render={props => (
              <Search {...props}
                currentUser={this.state.currentUser}
                units={this.state.measurementUnits}
                />
            )}
          />
          <Route
            exact
            path='/workout/:id'
            render={props => (
              this.authenticateUser() ?
              <WorkoutShow {...props}
                currentUser={this.state.currentUser}
                units={this.state.measurementUnits}
                /> :
              <Home {...props}
                setLoggedInUser={this.setLoggedInUser}
                userLoggedIn={this.state.userLoggedIn}
              />
            )}
          />
          <Route
            exact
            path='/exercise/:id'
            render={props => (
              <ExerciseShow {...props}
                currentUser={this.state.currentUser}
              />
            )}
          />
          <Route
            exact
            path='/myaccount'
            render={props => (
              this.authenticateUser() ?
              <UserEdit {...props}
                currentUser={this.state.currentUser}
                units={this.state.measurementUnits}
                setLoggedInUser={this.setLoggedInUser}
                /> :
              <Home {...props}
                setLoggedInUser={this.setLoggedInUser}
                userLoggedIn={this.state.userLoggedIn}
              />

            )}
          />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;


// <Login setLoggedInUser={this.setLoggedInUser}/>
// <Exercise currentUser={this.state.currentUser}/>
// <Signup
//   setUnits={this.setUnits}
//   setLoggedInUser={this.setLoggedInUser}/>
// <Workout currentUser={this.state.currentUser}/>
// <RepCalculator />
// <AutoComplete suggestions={AutoCompleteItems}/>
