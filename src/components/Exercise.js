import React, {Component} from 'react'
import AutoComplete from './AutoComplete'
import AutoCompleteItems from '../helpers/AutoCompleteItems';
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
    alert('made it to the save')
    const exercise = document.querySelector("[name=exercise]").value
    this.setState({exercise}, this.saveExercise(e))
  }

  saveExercise = (e) => {
    const {date, weight, reps, sets, notes} = this.state
    const body ={
      user_id: localStorage.getItem("user_id"),
      name: this.state.exercise,
      imported_id: findExerciseId(this.state.exercise),
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
      <h4> Add new Exercise </h4>
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
      return <RepCalculator
      exercise={this.state.exercise}
      retrievedExercise={this.state.retrievedExercise} />
    }
  }


  render () {
    return(
      <div>
        {this.renderNewExerciseForm()}
        {this.renderRepCalculator()}
      </div>


    )

  }
}

export default Exercise;
