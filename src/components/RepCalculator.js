import React, {Component} from 'react'

class RepCalculator extends Component {
  // rep calculator taken from https://strengthlevel.com/one-rep-max-calculator

  render(){
    //take previous workout, find the reps and weight and take it to a 1 rep max
    const repCalculation= 100
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
      <table>
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
      </table>
    )
  }
}


export default RepCalculator;
