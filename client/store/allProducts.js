import axios from 'axios'

//action type
const GET_ALLPRODUCTS = 'GET_ALLPRODUCTS'

//action creator
const gotAllProducts = products => ({
  type: GET_ALLPRODUCTS,
  products
})

//thunk
// export const fetchAllProducts = () => {
//   return async (dispatch) => {
//     try {
//       const {data} = await axios.get('/api/products')
//       dispatch(gotAllProducts(data))
//     } catch (err) {
//       console.log('oh nos, something went wrong!')
//     }
//   }
// }

const allProducts = []

//reducer
export default function allProductsReducer(state = allProducts, action) {
  switch (action.type) {
    case GET_ALLPRODUCTS:
      return [...state, action.products]

    default:
      return state
  }
}
