const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  size: {
    type: Sequelize.ENUM,
    values: ['small', 'medium', 'large']
  },
  color: {
    type: Sequelize.ENUM,
    values: [
      'red',
      'green',
      'yellow',
      'pink',
      'white',
      'black',
      'blue light wash',
      'blue dark wash',
      'floral'
    ]
  },
  cut: {
    type: Sequelize.ENUM,
    values: ['skinny', 'bootcut', 'straight', 'highrise', 'flare', 'ripped']
  },
  price: { // any extra validations we can add?
    type: Sequelize.DECIMAL(10, 2)
  },
  quantity: { // any extra validations we can add?
    type: Sequelize.INTEGER
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://cdn.pixabay.com/photo/2014/05/21/14/54/feet-349687_1280.jpg'
  }
})

module.exports = Product
