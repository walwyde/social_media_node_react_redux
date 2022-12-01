import { v4 as uuidv4 } from 'uuid'
import { set_alert, remove_alert } from './types'

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuidv4()

  dispatch({
    type: set_alert,
    payload: { msg, alertType, id}
  })

  setTimeout(() => dispatch({ type: remove_alert, payload: id}), 5000)
}