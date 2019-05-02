import React, {Component} from 'react'
import {findExerciseId} from '../helpers/exerciseIdFinder'
import {postNewExercise} from '../helpers/helpers'
import {NewExerciseForm} from '../helpers/forms.js'
import RepCalculator from './RepCalculator';

class Exercise extends Component {
  constructor(props){
    super(props)
    this.state={
      name: '',
      exercise: '',
      date: '',
      showDate: true,
      weight: '',
      reps: '',
      sets: '',
      notes: ' ',
      retrievedExercise: ''
    }
  }

  handleChange =(e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

//passed into autocomple component to retrieve the users choice
  retrieveUserInput = (exercise) => {
    this.setState({exercise})
  }

// retrieves the selected workout name/id from autocomplete component, saves it to state then completes fetch only when that is done.
  addExercise = (e) => {
    e.preventDefault();
    const exercise = document.querySelector("[name=exercise]").value
    this.setState({exercise}, this.saveExercise(e))
  }

  saveExercise = (e) => {
    const {date, weight, reps, sets, notes} = this.state
    const body ={
      user_id: localStorage.getItem("user_id"),
      name: this.state.exercise,
      imported_exercise_id: findExerciseId(this.state.exercise),
      date, weight, reps, sets, notes
    }
    postNewExercise(body)
    .then(retrievedExercise => {
      this.setState({retrievedExercise})
    })
    e.target.reset();
  }

  renderNewExerciseForm = () => {
    return (<div>
      <h2 className="center"> Save a New Exercise </h2>
      <NewExerciseForm
        onSubmit={this.addExercise}
        onChange={this.handleChange}
        retrieveUserInput={this.retrieveUserInput}
        isExercise={this.state.showDate}/>
    </div>
    )
  }

  renderRepCalculator = () => {
     if(this.state.exercise !== '') {
      return <div className='container'>
      <RepCalculator
      exercise={this.state.exercise}
      retrievedExercise={this.state.retrievedExercise}
      currentUser={this.props.currentUser}
       />
    </div>
  } else {
    return <div className="centered_text">
      <span>Select an exercise you've done before to see a suggested rep/weight scheme
      </span>
    </div>
    }
  }


  render () {
    return(
      <div className="container grid">
        {this.renderNewExerciseForm()}
        {this.renderRepCalculator()}
      </div>


    )

  }
}

export default Exercise;
