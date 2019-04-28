const workoutFinder = (userId) => {
  const body = {
    user_id: userId
  }
  let workouts;
  fetch("http://localhost:3000/api/v1/all_exercises/userWorkouts", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
  .then(resp => resp.json)
  .then(results => {
    workouts = results
  })
}

export {workoutFinder}


// get all workouts
// filter through them to just find current users
// display these workouts in the search results
// then filter them as parameters change
