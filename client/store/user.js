import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
// const UPDATE_USER_INFO = 'UPDATE_USER_INFO'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
// const updateUserInfo = user => ({type: UPDATE_USER_INFO, user})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    console.log('thunk me test')
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

// export const addUserInfo = info => {
//   return async dispatch => {
//     try {
//       console.log('user info thunk, info', info)
//       const {data: updatedUser} = await axios.patch(`/auth/me`, info)
//       console.log('user info thunk,', updatedUser)
//       dispatch(updateUserInfo(updatedUser))
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    // case UPDATE_USER_INFO:
    //   return {
    //     ...state,
    //     name: action.user.name,
    //     address: action.user.address,
    //     phone: action.user.phone
    //   }
    default:
      return state
  }
}
