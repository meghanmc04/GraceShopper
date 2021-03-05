import React from 'react'
import {connect} from 'react-redux'
import {
  getCart,
  getCartWithItemRemoved,
  getCartWithItemAdded
} from '../store/cart'

// get userId from state through mapStateToProps and update thunk to incorporate userId
class Cart extends React.Component {
  constructor() {
    super()
    this.addAnotherToCart = this.addAnotherToCart.bind(this)
    this.removeOneFromCart = this.removeOneFromCart.bind(this)
  }
  componentDidMount() {
    // hardcoding cartId for now until updated with userId from props/ route
    this.props.getCart(1)
  }
  addAnotherToCart(cartId, productId) {
    this.props.getCartWithItemAdded(cartId, productId)
  }
  removeOneFromCart(cartId, productId) {
    this.props.getCartWithItemRemoved(cartId, productId)
  }

  render() {
    console.log('PROPS', this.props)
    const products = this.props.cart.products
    console.log('PRODUCTS', products)
    const cart = this.props.cart
    return (
      <div>
        <h1>Cart Contents: </h1>
        {products
          ? products.map(product => (
              <li key={product.id}>
                {product.cut} {product.color} {product.size} <b>Price: </b>
                {product.price} <b>Quantity in Cart: </b>
                {product.cartProducts.quantity}
                <button
                  type="button"
                  onClick={() => this.addAnotherToCart(cart.id, product.id)}
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => this.removeOneFromCart(cart.id, product.id)}
                >
                  -
                </button>
              </li>
            ))
          : 'Oh no! Your cart is empty. Time to go shopping!!'}
        <h3>Subtotal: {this.props.cart.subTotal}</h3>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

// Update this to userId once route has been updated!
const mapDispatchToProps = dispatch => ({
  getCart: cartId => dispatch(getCart(cartId)),
  getCartWithItemRemoved: (cartId, productId) =>
    dispatch(getCartWithItemRemoved(cartId, productId)),
  getCartWithItemAdded: (cartId, productId) =>
    dispatch(getCartWithItemAdded(cartId, productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
