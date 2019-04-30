import React from 'react'
import {getDescription} from '../helpers/helpers'

class ExerciseCard extends React.Component {
  constructor(props){
    super(props)
    this.state={
      description: ''
    }
  }

  componentDidMount(){
    getDescription({id: this.props.exercise.id})
    .then(result => {
      this.setState({description: result.description})
    })
  }

  render () {
    return(
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">{this.props.exercise.name}</h4>
          <h4 class="card-subtitle">Date: {this.props.exercise.date}</h4>
          <h4 class="card-subtitle">Exercise Description: </h4>
          <p class="card-text card-description"> {this.state.description}</p>
          <h4 class="card-subtitle">Results: </h4>
          <p class="card-text">
            Weight: {this.props.exercise.weight}
            Reps: {this.props.exercise.reps}
            Sets: {this.props.exercise.sets}
          </p>
          <p class="card-text">Notes: {this.props.exercise.notes}</p>
        </div>
      </div>
    )

  }
}

export default ExerciseCard;
