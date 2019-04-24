import React, {Component} from 'react';
import './scripts/App.css';
import Home from './components/Home'
import Navbar from './components/Navbar'
import Signup from './components/Signup'

class App extends Component {
  constructor(props){
    super()
    this.state={
      measurementUnits: "metric",
      currentUser: {}
    }
  }

  setUnits = (measurementUnits) =>{
    this.setState({measurementUnits})
  }

  setLoggedInUser = (currentUser) =>{
    this.setState({currentUser})
  }

  render(){
      return (
        <>
          <Navbar />
          <Home />
          <Signup
            setUnits={this.setUnits}
            setLoggedInUser={this.setLoggedInUser}/>
        </>
    );
  }
}

export default App;
