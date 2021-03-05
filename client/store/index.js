import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import singleProductReducer from './singleProduct'
import allProductsReducer from './allProducts'
import userInfoReducer from './userInfo'

const reducer = combineReducers({
  user,
  singleProduct: singleProductReducer,
  allProducts: allProductsReducer,
  userInfo: userInfoReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
