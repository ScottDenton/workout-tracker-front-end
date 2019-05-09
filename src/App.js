import React, {Component} from 'react';
import './scripts/App.css';
import './scripts/AutoComplete.css';
import './scripts/Responsive.css';
import './scripts/Card.css';
import './scripts/button.css';
import Home from './containers/Home';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Search from './components/Search';
import Workout from './containers/Workout';
import Exercise from './containers/Exercise';
import WorkoutShow from './components/WorkoutShow';
import UserEdit from './components/UserEdit';
import AboutPage from './components/About';
import { BrowserRouter as Router, Route } from "react-router-dom";


class App extends Component {
  constructor(props){
    super()
    this.state={
      currentUser: {},
      userLoggedIn: false,
      allExercises: [],
    }
  }



//retrieves user from local storage and sets as current user
  componentDidMount(){
    const id = localStorage.getItem("user_id")
    if(id){
      fetch(`https://workout-tracker-backend.herokuapp.com/api/v1/users/${id}`)
      .then(resp => resp.json())
      .then(currentUser => {
        this.setState({currentUser, userLoggedIn: true})
      })
    }
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
              this.authenticateUser() ?
              <Workout {...props}
                currentUser={this.state.currentUser}
                />:
              <Home {...props}
                setLoggedInUser={this.setLoggedInUser}
                userLoggedIn={this.state.userLoggedIn}
              />
            )}
          />
          <Route
            exact
            path='/exercise'
            render={props => (
              this.authenticateUser() ?
              <Exercise {...props}
                currentUser={this.state.currentUser}
                />:
              <Home {...props}
                setLoggedInUser={this.setLoggedInUser}
                userLoggedIn={this.state.userLoggedIn}
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
                /> :
              <Home {...props}
                setLoggedInUser={this.setLoggedInUser}
                userLoggedIn={this.state.userLoggedIn}
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
                setLoggedInUser={this.setLoggedInUser}
                /> :
              <Home {...props}
                setLoggedInUser={this.setLoggedInUser}
                userLoggedIn={this.state.userLoggedIn}
              />
            )}
          />
          <Route
            path='/about'
            render={props => (
              <AboutPage {...props}
                />
            )}
          />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;



//BELOW USED FOR INITIAL SEED.
// instead of calling the API everytime someone wanted to do an exercise I did one big initial fetch to the API
// and saved those 199 approved exercises to the backend.
// if any new exercises get added they can simply be added through the rails console

//   fetch("https://workout-tracker-backend.herokuapp.com/api/v1/all_exercises/index")
//   .then(resp => resp.json())
//   .then(data => {
//     data.results.map(exercise => {
//        this.createNewImportedExercise(exercise)
//     })
//   })
// }
//
// createNewImportedExercise = (data) => {
//   const body ={
//       "imported_id": data.id,
//       "description": data.description,
//       "name": data.name,
//       "category": data.category,
//       "muscles": data.muscles,
//       "equipment": data.equipment
//     }
//   fetch('https://workout-tracker-backend.herokuapp.com/api/v1/imported_exercises', {
//     method: "POST",
//     headers: {
//       "accept": "application/json",
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(body)
//   }).then(resp => resp.json())
//   .then(console.log)
// }
