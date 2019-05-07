import React from 'react'
import {getDescription} from '../helpers/helpers'
import ReactCardFlip from 'react-card-flip';
import {ExerciseCardFront} from '../helpers/cards.js'
import {ExerciseCardBack} from '../helpers/cards.js'

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
