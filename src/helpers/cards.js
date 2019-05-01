import React from 'react'
import RepCalculator from '../components/RepCalculator';
import { Link } from "react-router-dom";



export const ExerciseCardFront = (props) =>{
  return (
    <div className="card" onClick={props.handleClick}>
      <div className="card-body">
        <h4 className="card-title">{props.exercise.name}</h4>
        <h5 className="card-subtitle">Date: {props.exercise.date}</h5>
        <h5 className="card-subtitle">Exercise Description: </h5>
        <p className="card-text card-description"> {props.description}</p>
        <h5 className="card-subtitle">Results: </h5>
        <p className="card-text">
          Weight: {props.exercise.weight} kgs,
           Reps: {props.exercise.reps},
           Sets: {props.exercise.sets}
        </p>
        <p className="card-text">Notes: {props.exercise.notes}</p>
      </div>
    </div>
  )
}

export const ExerciseCardBack = (props) => {
  return (
    <div className="card" onClick={props.handleClick}>
      <RepCalculator
      exercise={props.exercise.name}
      retrievedExercise={props.exercise} />
    </div>
  )
}

export const WorkoutCardFront = (props) => {
  const exerciseList= props.exercises !== '' ? props.exercises.map(exercise => <p> {exercise.name}</p>) : <p>No exercises listed for this workout</p>
  return (
    <div className="card" onClick={props.handleClick}>
      <div className="card-body">
        <h4 className="card-title">
          {props.workout.name}
        </h4>
        <h5 className="card-subtitle">
          Date: {props.workout.date}
        </h5>
        <h5 className="card-subtitle">
          Exercises Completed
        </h5>
          {exerciseList}
          <Link to={{
            pathname: `/workout/${props.workout.id}`,
            state: {workout: props.workout}
          }}>
        <button className="button small blue">
          Do it again
        </button>
      </Link>
      </div>
    </div>
  )
}

export const WorkoutCardBack = (props) => {
  return (
    <div className="card" onClick={props.handleClick}>
      <div>
        back of workout card
      </div>
    </div>
  )
}