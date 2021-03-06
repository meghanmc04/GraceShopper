const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  size: {
    type: Sequelize.ENUM,
    values: ['small', 'medium', 'large'],
    allowNull: false
  },
  color: {
    type: Sequelize.ENUM,
    allowNull: false,
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
    allowNull: false,
    values: ['skinny', 'bootcut', 'straight', 'highrise', 'flare', 'ripped']
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://cdn.pixabay.com/photo/2014/05/21/14/54/feet-349687_1280.jpg'
  }
})

module.exports = Product
