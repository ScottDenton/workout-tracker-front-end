import React from 'react'
import ReactCardFlip from 'react-card-flip';
import {WorkoutCardFront} from '../helpers/cards.js'
import {WorkoutCardBack} from '../helpers/cards.js'
import {findWorkoutsExercises} from '../helpers/helpers.js'
import {deleteWorkout} from '../helpers/helpers.js'


class WorkoutCard extends React.Component {
  constructor(props){
    super(props)
    this.state={
      isFlipped: false,
      exercises: ''
    }
  }

componentDidMount(){
  const body = {id: this.props.workout.id}
  findWorkoutsExercises(body)
  .then(exercises => {
    exercises.map(exercise => {
      this.setState({
        exercises: [...this.state.exercises, exercise]
      })
    })
  })
}

deleteWorkout = () => {
   if (window.confirm("Are you sure")){
     deleteWorkout(this.props.workout.id)
     this.props.deleteWorkout(this.props.workout)
   }
}

  renderCard = () => {
    return(
      <ReactCardFlip
          isFlipped={this.state.isFlipped}
          flipDirection="horizontal">
        <WorkoutCardFront key='front'
          handleClick={this.handleClick}
          workout={this.props.workout}
          exercises={this.state.exercises}
          deleteWorkout={this.deleteWorkout}
          />
        <WorkoutCardBack key='back'/>
      </ReactCardFlip>
    )
  }

  render () {
    return(
      <div>
      {this.renderCard()}
      </div>
    )
  }
}

export default WorkoutCard;
