import axios from 'axios'

//ACTION TYPE
const ADD_CHECKOUT_INFO = 'ADD_CHECKOUT_INFO'

//ACTION CREATOR
const addCheckoutInfo = user => ({
  type: ADD_CHECKOUT_INFO,
  user
})

//THUNK CREATOR
export const sendUserInfo = info => async dispatch => {
  try {
    const {updatedUser} = await axios.patch(`api/users/${info.id}`, info)
    dispatch(addCheckoutInfo(updatedUser))
  } catch (err) {
    console.error(err)
  }
}

const initialState = {}

//REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHECKOUT_INFO:
      return {
        ...state,
        name: action.user.name,
        delivery: action.user.delivery,
        phone: action.user.phone
      }
    default:
      return state
  }
}
