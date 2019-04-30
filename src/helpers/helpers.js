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

// import {setDate} from '../helpers/helpers.js'

// const date = setDate()
// this.setState({date});
