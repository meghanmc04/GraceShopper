import axios from 'axios'

//ACTION TYPES:
const GOT_PRODUCT = 'GOT_PRODUCT'

//ACTION CREATOR:
const gotProduct = product => ({
  type: GOT_PRODUCT,
  product
})

//THUNK:
export const getProduct = productId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch(gotProduct(data))
  } catch (err) {
    console.error(err)
  }
}

const initialState = {}

//REDUCER:
export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_PRODUCT:
      return action.product
    default:
      return state
  }
}
