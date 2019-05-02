
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

export const checkUnits = (user) => {
  return user.units === 'metric' ? "kgs" : "lbs"
}

export const createNewUser = (body) => {
  return fetch("http://localhost:3000/api/v1/users",{
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then(resp => resp.json())
}

export const editUser = (id, body) => {
  return fetch(`http://localhost:3000/api/v1/users/${id}`, {
  method: "PATCH",
  headers: {
    "accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(body)
})
.then(resp => resp.json())
}

export const postNewExercise = (body) => {
  return fetch("http://localhost:3000/api/v1/exercise", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(resp => resp.json())
}

export const postNewWorkoutExercise = (body) => {
  return fetch("http://localhost:3000/api/v1/workout_exercises", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(resp => resp.json())
}

export const postNewWorkout = (body) => {
  return fetch("http://localhost:3000/api/v1/workouts", {
  method: "POST",
  headers: {
    "accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(body)})
  .then(resp => resp.json())
}
export const deleteWorkout = (id) => {
  return fetch(`http://localhost:3000//api/v1/workouts/${id}`, {
  method: "DELETE"
  })
}

export const createSession = (body) => {
  return fetch('http://localhost:3000/api/v1/sessions/create', {
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
  return fetch("http://localhost:3000/api/v1/all_exercises/find", {
    method: "POST",
    headers: {
    "accept": "application/json",
    "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
  .then(resp => resp.json())
}

export const findUsersWorkouts =(body) => {
  return fetch("http://localhost:3000/api/v1/all_exercises/userWorkouts", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
  .then(resp => resp.json())
}

export const findUsersExercises = (body) => {
  return fetch("http://localhost:3000/api/v1/all_exercises/userExercises", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
  .then(resp => resp.json())
}

export const findWorkoutsExercises = (body) => {
  return fetch("http://localhost:3000/api/v1/all_exercises/exercisesByWorkout", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
  .then(resp => resp.json())
}

export const getDescription = (body) => {
  return fetch("http://localhost:3000/api/v1/exercise/getDescription",{
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then(resp => resp.json())
}

export const getImageUrl = (body) => {
  return fetch("http://localhost:3000/api/v1/exercise/getImageUrl",{
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then(resp => resp.json())
}
