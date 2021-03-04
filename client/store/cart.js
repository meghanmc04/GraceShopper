import axios from 'axios'

// ACTION TYPES
const GOT_CART = 'GOT_CART'

// ACTIONS CREATORS
export const gotCart = cart => ({
  type: GOT_CART,
  cart
})

// We will need to find a way to get the cartId. We will probably want to look it up by user and find the user's active cart? Maybe have a variable on state somewhere to point to the active cart id?

// THUNKS
export const getCart = cartId => {
  return async dispatch => {
    try {
      const {data: cart} = await axios.get(`/api/cart/${cartId}`)
      dispatch(gotCart(cart))
    } catch (error) {
      console.log('Error in the getcart thunk', error)
    }
  }
}

// INITIAL STATE
const intialState = {}

// REDUCER
function cartReducer(state = intialState, action) {
  switch (action.type) {
    case GOT_CART:
      return action.cart
    default:
      return state
  }
}

export default cartReducer
