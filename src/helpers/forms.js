import React, {Component} from 'react'
import AutoComplete from '../components/AutoComplete'
import AutoCompleteItems from './AutoCompleteItems';

export const NewExerciseForm = (props) => {
    return <form onSubmit={props.onSubmit}>
      {props.isExercise ? <div>
      <label> Date </label>
      <input type='date' name='date'
        onChange={props.onChange}/>
        </div>
        : <p></p>}
      <label> Exercise </label>
      <AutoComplete
        suggestions={AutoCompleteItems} retrieveUserInput={props.retrieveUserInput} />
      <label> Weight </label>
      <input type='number'
        placeholder="Weight" name="weight"  onChange={props.onChange}/>
      <label> Reps </label>
      <input type='number'
        placeholder="Reps" name="reps" onChange={props.onChange}/>
      <label> Sets </label>
      <input type='number'
        placeholder="Sets" name="sets" onChange={props.onChange}/>
      <label> Notes </label>
      <textarea type='text'
        placeholder="Enter Notes" name="notes" onChange={props.onChange}/>
      <input type='submit' value='Save' />
    </form>
  }

  export const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
      <input type='text' name='username'
        value={props.username}
        placeholder="Username" onChange={props.handleChange}
      />
      <input type='password' name='password'
        value={props.password}
        placeholder="Password" onChange={props.handleChange} />
      <input type="submit" value="Login" />
    </form>
  }

  export const SearchForm = (props) => {
    return <form>
      <label> Search by: </label>
      <select onChange={props.handleCriteriaChange}>
        <option value='workout'> Workout </option>
        <option value = 'exercise'> Execise </option>
      </select>
      {props.nameSearch}
      <label> Date From: </label>
      <input type='date' name='date'
        value={props.date}
        onChange={props.handleChange}/>
    </form>
  }
