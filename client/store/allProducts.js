import axios from 'axios'

//action type
const GOT_ALLPRODUCTS = 'GOT_ALLPRODUCTS'

//action creator
const gotAllProducts = products => ({
  type: GOT_ALLPRODUCTS,
  products
})

//thunk
export const getAllProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(gotAllProducts(data))
    } catch (err) {
      console.log('oh nos, something went wrong!')
    }
  }
}

const initialState = []

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALLPRODUCTS:
      return action.products

    default:
      return state
  }
}
