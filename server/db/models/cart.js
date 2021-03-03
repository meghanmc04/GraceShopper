const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  //perhaps a method for subtotal
  subTotal: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0
  }
})

Cart.beforeSave(async cart => {
  console.log('BEFORE UPDATE', cart)
  const items = await cart.getProducts()
  let total = 0.0
  items.forEach(item => {
    console.log('PRICE', item.price)
    total += +item.price
  })
  cart.subTotal = parseFloat(total).toFixed(2)
  return cart
})

// Cart.prototype.calculateSubTotal = async function () {
//   const items = await this.getProducts()
//   let total = 0.0
//   items.forEach((item) => {
//     console.log(parseFloat(item.price).toFixed(2))
//     total += +item.price
//   })
//   this.subTotal = parseFloat(total).toFixed(2)
//   return this
// }

module.exports = Cart
