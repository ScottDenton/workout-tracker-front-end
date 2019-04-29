import React, {Component} from 'react'
import RepCalculator from './RepCalculator';

class ExerciseShow extends Component {
  constructor(props){
    super(props)
    this.state={
      exercise: '',
      date: '',
      weight: '',
      reps: '',
      sets: '',
      notes: ''
    }
  }


  componentDidMount(){
    if(this.props.location.state){
    this.setState({
      exercise: this.props.location.state.exercise
    })}
  }

  renderRepCalculator = () => {
     if(this.state.exercise !== '') {
      return <RepCalculator
      exercise={this.state.exercise.name}
      retrievedExercise={this.state.exercise} />
    }
  }

  render () {
    return(<div>
      {this.renderRepCalculator()}
      </div>
    )
  }
}

export default ExerciseShow;
