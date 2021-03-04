const Sequelize = require('sequelize')
const db = require('../db')
const {CartProducts} = require('./cartProducts')

const Cart = db.define('cart', {
  subTotal: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

Cart.beforeSave(async cart => {
  const items = await cart.getProducts({include: CartProducts})
  let total = 0
  items.forEach(item => {
    total += +item.price * item.cartProducts.quantity
  })
  cart.subTotal = parseFloat(total).toFixed(2)
  return cart
})

Cart.prototype.containsProduct = async function(productId) {
  let answer = false
  const productsInCart = await this.getProducts()
  productsInCart.forEach(product => {
    if (product.id === productId) {
      answer = true
    }
  })
  return answer
}

// Cart.prototype.calculateSubTotal = async function () {
//   const items = await this.getProducts()
//   let total = 0.0
//   items.forEach((item) => {
//     console.log(parseFloat(item.price).toFixed(2))
//     total += Number(item.price)
//   })
//   this.subTotal = total
//   return this
// }

module.exports = Cart
