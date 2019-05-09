import React from 'react'
import ReactCardFlip from 'react-card-flip';
import {WorkoutCardFront} from '../helpers/cards.js'
import {WorkoutCardBack} from '../helpers/cards.js'
import {findWorkoutsExercises} from '../helpers/helpers.js'
import {deleteWorkout} from '../helpers/helpers.js'
import Swal from 'sweetalert2'

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
      if( exercises.length > 0){
        exercises.forEach(exercise => {
          this.setState({
            exercises: [...this.state.exercises, exercise]
          })
        })
      }
    })
    .then(result => {
      if(this.state.exercises === ''){
      deleteWorkout(this.props.workout.id)
      }
    })
  }

  deleteWorkout = () => {
    Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
    }).then(({value}) => {
      if(value === true){
        deleteWorkout(this.props.workout.id)
        this.props.deleteWorkout(this.props.workout)
      }
    })
  }

  renderCard = () => {
    if(this.state.exercises){
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
