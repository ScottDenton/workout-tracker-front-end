import React from 'react'


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

export const ExerciseCardBack = (props) =>{
  return (
    <div className="card" onClick={props.handleClick}>
      <div className="card-body">
        <h4 className="card-title">Calculator</h4>
        <h5 className="card-subtitle">Date: {props.exercise.date}</h5>
        <h5 className="card-subtitle">Exercise Description: </h5>
        <p className="card-text card-description"> {props.description}</p>
        <h5 className="card-subtitle">Results: </h5>
        <p className="card-text">
          Weight: {props.exercise.weight} kgs,
           Reps: {props.exercise.reps},
           Sets: {props.exercise.sets}
        </p>
        <p className="card-text">Notes: Calculator</p>
      </div>
    </div>
  )
}
