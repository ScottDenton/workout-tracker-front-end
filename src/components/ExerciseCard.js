import React from 'react'
import {getDescription} from '../helpers/helpers'
import {getImageUrl} from '../helpers/helpers'

class ExerciseCard extends React.Component {
  constructor(props){
    super(props)
    this.state={
      description: '',
      url: ' '
    }
  }

  componentDidMount(){
    getDescription({id: this.props.exercise.id})
    .then(result => {
      this.setState({description: result.description})
    }, this.getUrl())
  }

  getUrl = () => {
     getImageUrl({id: this.props.exercise.imported_exercise_id})
    .then(response => {
      this.setState({url: response.image})
    })
  }

  render () {
    return(
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{this.props.exercise.name}</h4>
          <img className="card-image" src={this.state.url} />
          <h5 className="card-subtitle">Date: {this.props.exercise.date}</h5>
          <h5 className="card-subtitle">Exercise Description: </h5>
          <p className="card-text card-description"> {this.state.description}</p>
          <h5 className="card-subtitle">Results: </h5>
          <p className="card-text">
            Weight: {this.props.exercise.weight} kgs,
             Reps: {this.props.exercise.reps},
             Sets: {this.props.exercise.sets}
          </p>
          <p className="card-text">Notes: {this.props.exercise.notes}</p>
        </div>
      </div>
    )

  }
}

export default ExerciseCard;
