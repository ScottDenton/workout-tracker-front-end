import React, {Component} from 'react'
import {findExerciseId} from '../helpers/exerciseIdFinder'

class RepCalculator extends Component {
  // rep calculator taken from https://strengthlevel.com/one-rep-max-calculator
  constructor(props){
    super(props)
    this.state = {
      exercise: this.props.exercise,
      retrievedExercise: this.props.retrievedExercise,
      oneRepMax: 100
    }
  }

  componentDidMount(){
    this.fetchExercise()
  }

  componentWillReceiveProps(nextProps) {
    // checking if props have changed is no longer needed as it stops re rendering the calculator when someone saves a new exercise
      this.setState({
        exercise: nextProps.exercise
      }, this.fetchExercise);

  }

  fetchExercise = () => {
    const exerciseId = findExerciseId(this.state.exercise)
    const body = {imported_id: exerciseId}

    fetch("http://localhost:3000/api/v1/all_exercises/find", {
      method: "POST",
      headers: {
      "accept": "application/json",
      "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then(resp => resp.json())
    .then(exercise => {
      if(exercise.status === 500) {
        this.setState({
        retrievedExercise: ''})
      } else {
        this.setState({
          retrievedExercise: exercise
        }, this.calculateOneRepMax)
      }
    })
 }

calculateOneRepMax =() => {
  //Using Bryzcki formula for calculation
  // formula = weight * (36 / 37-reps)
    const{weight, reps} = this.state.retrievedExercise
    const oneRepMax = weight * (36/ (37-reps))
    this.setState({oneRepMax})
}
 renderTable = () => {
   const repCalculation= this.state.oneRepMax
   const weightUnits = "kgs"
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

   return(
     <div>
     <h3> {this.state.exercise} </h3>
     <p> Based on workout from {this.state.retrievedExercise.date} </p>
       <table>
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
   )
 }

  render(){
    const tableToRender = this.state.retrievedExercise !== '' ? this.renderTable() : <h1> Select an exercise </h1>

    return(<div>
      {tableToRender}
      </div>
    )
  }
}


export default RepCalculator;
