import React from 'react'
import AutoComplete from '../components/AutoComplete'
import AutoCompleteItems from './AutoCompleteItems';

export const NewExerciseForm = (props) => {
    return (
    <form
      className='form'
      onSubmit={props.onSubmit}>
      {props.isExercise ?
      <div>
        <div className="form_item">
          <label> Date: </label>
          <input type='date' name='date'
            onChange={props.onChange}/>
        </div>
      </div>
        : <p></p>}
      <div className="form_item">
        <label> Exercise: </label>
        <AutoComplete
          suggestions={AutoCompleteItems} retrieveUserInput={props.retrieveUserInput} />
      </div>
      <div className="form_item">
        <label> Weight: </label>
      <input type='number'
        placeholder="Weight" name="weight"  onChange={props.onChange}/>
      </div>
      <div className="form_item">
        <label> Reps: </label>
      <input type='number'
        placeholder="Reps" name="reps" onChange={props.onChange}/>
      </div>
      <div className="form_item">
        <label> Sets: </label>
      <input type='number'
        placeholder="Sets" name="sets" onChange={props.onChange}/>
      </div>
      <div className="form_item">
        <label> Notes: </label>
        <textarea type='text'
          placeholder="Enter Notes" name="notes" onChange={props.onChange}/>
      </div>
      <div className="form_item">
        <input className="button small blue" type='submit' value='Save' />
      </div>
    </form>
    )
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
    return <form className='search_form'>
      <div className="form_item">
        <label> Search by: </label>
        <select onChange={props.handleCriteriaChange}>
          <option value='workout'> Workout </option>
          <option value = 'exercise'> Execise </option>
        </select>
      </div>
      <div className="form_item">
        {props.nameSearch}
      </div>
      <div className="form_item">
        <label> Date From: </label>
        <input type='date' name='date'
          value={props.date}
          onChange={props.handleChange}/>
      </div>
    </form>
  }
