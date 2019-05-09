import React from 'react'
import {getDescription} from '../helpers/helpers'
import ReactCardFlip from 'react-card-flip';
import {ExerciseCardFront} from '../helpers/cards.js'
import {ExerciseCardBack} from '../helpers/cards.js'
import {deleteExercise} from '../helpers/helpers.js'
import Swal from 'sweetalert2'

class ExerciseCard extends React.Component {
  constructor(props){
    super(props)
    this.state={
      description: '',
      isFlipped: false
    }
  }

  componentDidMount(){
    getDescription({id: this.props.exercise.id})
    .then(result => {
      this.setState({description: result.description})
    })
  }

  handleClick = () => {
    this.setState({isFlipped: !this.state.isFlipped})
  }

  deleteExercise = () => {
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
        deleteExercise(this.props.exercise.id)
        this.props.deleteExercise(this.props.exercise)
      }
    })
  }

  renderCard = () => {
    return(
      <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
        <ExerciseCardFront key='front' handleClick={this.handleClick}
        exercise={this.props.exercise}
        description={this.state.description}
        />
        <ExerciseCardBack key='back' handleClick={this.handleClick}
        exercise={this.props.exercise}
        description={this.state.description}
        deleteExercise={this.deleteExercise}
        />
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

export default ExerciseCard;
