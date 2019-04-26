import React, {Component} from 'react';
import './scripts/App.css';
import './scripts/AutoComplete.css';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Workout from './components/Workout';
import Exercise from './components/Exercise';
import RepCalculator from './components/RepCalculator';
import AutoComplete from './components/AutoComplete';
import AutoCompleteItems from './helpers/AutoCompleteItems';

class App extends Component {
  constructor(props){
    super()
    this.state={
      measurementUnits: "metric",
      currentUser: {},
      userLoggedIn: false,
      allExercises: []
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
        this.setState({currentUser})
      })

    }
  }

  createNewImportedExercise = (data) => {
    const body ={
        "imported_id": data.id,
        "description": data.description,
        "name": data.name,
        "category": data.category,
        "muscles": data.muscles,
        "equipment": data.equipment
      }
    fetch("http://localhost:3000/api/v1/imported_exercises", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then(resp => resp.json())
  }

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

  render(){
      return (
        <>
          <Navbar
            signOut={this.signOut}
            currentUser={this.state.currentUser}/>
          <Home
            setLoggedInUser={this.setLoggedInUser}
            userLoggedIn={this.state.userLoggedIn}/>
        </>
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
