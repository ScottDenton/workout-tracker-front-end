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
      userLoggedIn: false
    }
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
