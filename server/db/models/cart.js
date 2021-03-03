const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  //1 - items
  // 2 - subtotal
  // Natalie’s cupcake frosting lecture
  // ability to edit:(product)
  // routes:
  // 1 - add (+)
  // 2 - remove (-)
  // instances/model method ??
  // homework to do - comment left by Myra here.

  //perhaps a method for subtotal
  subTotal: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0
  }
})

module.exports = Cart
