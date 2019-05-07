const base_url = 'https://workout-tracker-backend.herokuapp.com/api/v1'

export const setDate = () => {
  const today = new Date();
  const year = today.getFullYear()
  const month = (today.getMonth() + 1) < 10 ?
    `0${today.getMonth() + 1}` :  today.getMonth() +1
  const day = today.getDate() < 10 ?
    `0${today.getDate()}` : today.getDate()
  const date = `${year}-${month}-${day}`
return date
}

export const checkUnits = (exercise) => {
  return exercise.units === 'metric' ? "kgs" : "lbs"
}
//works
export const createNewUser = (body) => {
  return fetch(`${base_url}/users`,{
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then(resp => resp.json())
}

//works
export const editUser = (id, body) => {
  return fetch(`${base_url}/users/${id}`, {
  method: "PATCH",
  headers: {
    "accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(body)
})
.then(resp => resp.json())
}

// broken
export const postNewExercise = (body) => {
  return fetch(`${base_url}/exercise`, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(resp => resp.json())
}
// broken
export const postNewWorkoutExercise = (body) => {
  return fetch(`${base_url}/workout_exercises`, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(resp => resp.json())
}

//works
export const postNewWorkout = (body) => {
  return fetch(`${base_url}/workouts`, {
  method: "POST",
  headers: {
    "accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(body)})
  .then(resp => resp.json())
}

//works
export const deleteWorkout = (id) => {
  return fetch(`${base_url}/workouts/${id}`, {
  method: "DELETE"
  })
}

//works
export const createSession = (body) => {
  return fetch(`${base_url}/sessions/create`, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
  .then(resp => resp.json())
}

export const findExerciseById = (body) => {
  return fetch(`${base_url}/all_exercises/find`, {
    method: "POST",
    headers: {
    "accept": "application/json",
    "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
  .then(resp => resp.json())
}

//works
export const findUsersWorkouts =(body) => {
  return fetch(`${base_url}/all_exercises/userWorkouts`, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
  .then(resp => resp.json())
}

//broken
export const findUsersExercises = (body) => {
  return fetch(`${base_url}/all_exercises/userExercises`, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
  .then(resp => resp.json())
}

//broken
export const findWorkoutsExercises = (body) => {
  return fetch(`${base_url}/all_exercises/exercisesByWorkout`, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
  .then(resp => resp.json())
}

//broken
export const getDescription = (body) => {
  return fetch(`${base_url}/exercise/getDescription`,{
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then(resp => resp.json())
}
