import React from 'react'

const AboutPage = (props) => {
  return (
    <div className='container'>
      <h2> How to use the app </h2>
      <p>
        Once logged in a user is given the option to start a new workout, log a one off exercise or search through exercises and workouts they have previously completed.
      </p>
      <p>
        When creating a new workout, a user can select from a collection of 200 different exercises, to add to their own workout. <br />
        After completing an exercise for the first time, any time a user selects the same exercise again they will be shown suggested weights and reps to help guide them in their future workouts.
      </p>
      <p>
        If a user doesn't want to log a full workout, they can just log a one off exercise and it will still be saved for their next workout.
      </p>

      <p>
        If a user wishes to repeat a workout, they can simply go to the search page, find their favorite workout and click 'Do it again'. All exercises previously completed will show up, with the suggested rep scheme for each, as well as the option to add any new exercises.
      </p>

    <h2> About the app </h2>
    <p>
      I initially made this app as a final project for a Software Engineering course at
      <a href="https://flatironschool.com/" target= 'blank' ><span className='flatiron_link'>Flatiron School</span></a> in Seattle.
      I built the app using Ruby/Rails for the back-end and React for the front end.
    </p>
    <p>
      If you would like to see the code used, both the back and front ends are stored in public repo's on Github and use the MIT licence.
    </p>

    <div className='center'>
      <p>
        <a href='https://github.com/ScottDenton/workout-tracker-back-end' target= 'blank'><span className='ruby_link'> Rails Back End</span></a>

        <a href='https://github.com/ScottDenton/workout-tracker-front-end' target= 'blank'><span className='react_link'> React Front End </span></a>
      </p>
    </div>

    <p>
      If you have any questions about the app, have found any bugs or issues, or if you have any suggestions on features to add, feel free to contact me<a href="mailto:scott.denton.sde@gmail.com?Subject=Workout%20Tracker" target="_top"><span className='flatiron_link'>here</span></a>.
    </p>

  </div>
  )
}

export default AboutPage
