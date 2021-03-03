const Sequelize = require('sequelize')
const db = require('../db')

const CartProducts = db.define('cartProducts', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

// add function to increment quantity

module.exports = CartProducts
