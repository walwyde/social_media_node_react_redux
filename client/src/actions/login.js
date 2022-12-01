import { login_success, login_fail } from './types'
import { setAlert } from './setAlert'
import axios from 'axios'
import { loadUser } from './register'


export const login = ( email, password) => async dispatch => {
  const options = {
    headers: {
    'Content-Type': 'application/json;charset=UTF-8'
    },
  }

  const body = JSON.stringify({email, password})

  try {
    const res = await axios.post('/api/auth', body, options)
     const errors = res.data.errors
     console.log(res.data)

     if(errors) return dispatch({
      type: login_fail
     })

    dispatch({
      type: login_success,
      payload: {
        token: res.data
      }
    })
    dispatch(loadUser())
    dispatch(setAlert('You Have Been Logged In', 'success'))
  } catch (err) {
    const errors = err.response.data.errors
    console.log(errors)
    if(errors){
    dispatch(setAlert(errors.msg, 'danger'))
    }

    dispatch({
      type: login_fail,
    })
  }
}