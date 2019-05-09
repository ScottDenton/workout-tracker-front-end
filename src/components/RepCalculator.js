import React, {Component} from 'react'
import {findExerciseId} from '../helpers/exerciseIdFinder'
import {findExerciseById} from '../helpers/helpers.js'
import {findUsersExercises} from '../helpers/helpers'
import {checkUnits} from '../helpers/helpers'

class RepCalculator extends Component {
  // rep calculator taken from https://strengthlevel.com/one-rep-max-calculator
  constructor(props){
    super(props)
    this.state = {
      exercise: this.props.exercise,
      retrievedExercise: this.props.retrievedExercise,
      oneRepMax: 100,
      usersExercises: ''
    }
  }

  componentDidMount(){
    this.fetchExercise()
    findUsersExercises({user_id: localStorage.getItem("user_id")})
    .then(usersExercises => {
      this.setState({usersExercises})
    })
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      exercise: nextProps.exercise
    }, this.fetchExercise);
  }


  fetchExercise = () => {
    const exerciseId = findExerciseId(this.state.exercise)
    const body = {imported_exercise_id: exerciseId}
    findExerciseById(body)
    .then(exercise => {
      if(exercise.status === 500) {
        this.setState({ retrievedExercise: ''})
      } else {
        this.setState({
          retrievedExercise: exercise
        }, this.calculateOneRepMax)
      }
    })
 }

 // Bryzcki formula = weight * (36 / 37-reps)
  calculateOneRepMax =() => {
    const{weight, reps} = this.state.retrievedExercise
    const oneRepMax = weight * (36/ (37-reps))
    this.setState({oneRepMax})
  }
  renderTable = () => {
   const repCalculation= this.state.oneRepMax
   const weightUnits = checkUnits(this.state.retrievedExercise)
   const oneRepCalc= `${Math.floor(repCalculation)}  ${weightUnits}`
   const twoRepCalc= `${Math.floor(repCalculation *.97)}  ${weightUnits}`
   const threeRepCalc= `${Math.floor(repCalculation *.94)}  ${weightUnits}`
   const fourRepCalc= `${Math.floor(repCalculation *.92)}  ${weightUnits}`
   const fiveRepCalc= `${Math.floor(repCalculation *.89)}  ${weightUnits}`
   const sixRepCalc= `${Math.floor(repCalculation *.86)}  ${weightUnits}`
   const sevenRepCalc= `${Math.floor(repCalculation *.83)}  ${weightUnits}`
   const eightRepCalc= `${Math.floor(repCalculation *.81)}  ${weightUnits}`
   const nineRepCalc= `${Math.floor(repCalculation *.78)}  ${weightUnits}`
   const tenRepCalc= `${Math.floor(repCalculation *.75)}  ${weightUnits}`

   const dateToShow = this.state.retrievedExercise !== '' ? this.state.retrievedExercise.date : this.state.retrievedExercise.date

   return(<div>
     <h3 className="center"> {this.state.exercise} </h3>
     <p className="center"> Based on workout from {dateToShow} where you completed {this.state.retrievedExercise.reps} reps of {this.state.retrievedExercise.weight}{weightUnits} </p>
     <div className = "table_center">
       <table className='center_table'>
         <tbody>
           <tr>
             <th> Reps </th>
             <th> Weight </th>
           </tr>
           <tr>
             <th> 1 RM </th>
             <th> {oneRepCalc} </th>
           </tr>
           <tr>
             <th> 2 RM </th>
             <th> {twoRepCalc} </th>
           </tr>
           <tr>
             <th> 3 RM</th>
             <th> {threeRepCalc} </th>
           </tr>
           <tr>
             <th> 4 RM</th>
             <th> {fourRepCalc} </th>
           </tr>
           <tr>
             <th> 5 RM</th>
             <th> {fiveRepCalc} </th>
           </tr>
           <tr>
             <th> 6 RM</th>
             <th> {sixRepCalc} </th>
           </tr>
           <tr>
             <th> 7 RM</th>
             <th> {sevenRepCalc} </th>
           </tr>
           <tr>
             <th> 8 RM</th>
             <th> {eightRepCalc} </th>
           </tr>
           <tr>
             <th> 9 RM</th>
             <th> {nineRepCalc} </th>
           </tr>
           <tr>
             <th> 10 RM</th>
             <th> {tenRepCalc} </th>
           </tr>
         </tbody>
       </table>
     </div>
   </div>)
 }

 renderNotes = () => {
   return (<div className='center'>
     <p> Notes: {this.state.retrievedExercise.notes}</p>
   </div>)
 }

 hasUserDoneExercise = () =>{
   return this.state.retrievedExercise.user_id === Number(localStorage.getItem("user_id"))
 }

  render(){
    const tableToRender =  this.hasUserDoneExercise() ? this.renderTable() :
      <h3> You have not saved any results for this exercise yet </h3>
    const notesToRender = this.hasUserDoneExercise()  ? this.renderNotes() : <h5> </h5>

    return<div>
        {tableToRender}
        {notesToRender}
      </div>
  }
}

export default RepCalculator;
