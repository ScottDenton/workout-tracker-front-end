import React, {Component} from 'react';
import './scripts/App.css';
import './scripts/AutoComplete.css';

import Home from './components/Home';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Workout from './components/Workout';
import AutoComplete from './components/AutoComplete';
import AutoCompleteItems from './helpers/AutoCompleteItems';

class App extends Component {
  constructor(props){
    super()
    this.state={
      measurementUnits: "metric",
      currentUser: {},
      userLoggedIn: false,
      allExerciseNames: []
    }
  }

//BELOW USED FOR INITIAL SEED. ONLY KEEPING
  // componentDidMount(){
  //   fetch("http://localhost:3000/api/v1/imported_exercises")
  //   .then(resp => resp.json())
  //   .then( data => {
  //     data.map(exercise => {
  //
  //        // this.createNewImportedExercise(exercise)
  //     })
  //
  //   }
  //   )
  // }

// to fetch entire list of exercises for autocomplete list
  // this.setState({
  //         allExerciseNames: [...this.state.allExerciseNames, exercise.name]
  //       })

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
    .then(console.log)
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
      userLoggedIn: false
    })
  }



  render(){
      return (
        <>
          <Navbar userLoggedIn={this.state.userLoggedIn}
            signOut={this.signOut}/>
          <Workout />
        </>
    );
  }
}

export default App;


// <Home />
// <AutoComplete suggestions={AutoCompleteItems}/>
// <Signup
//   setUnits={this.setUnits}
//   setLoggedInUser={this.setLoggedInUser}/>
