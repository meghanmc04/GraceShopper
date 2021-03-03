const {STRING} = require('sequelize')
const Sequelize = require('sequelize')
const db = require('../db')

const CartProducts = db.define('cartProducts', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = CartProducts
