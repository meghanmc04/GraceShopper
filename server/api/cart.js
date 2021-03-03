const router = require('express').Router()
const {Cart} = require('../db/models')
module.exports = router

// GET /api/cart/
router.get('/', async (req, res, next) => {
  try {
    const currentCart = await Cart.findByPk('1')
    await currentCart.save()
    res.send(currentCart)
  } catch (err) {
    next(err)
  }
})

// PUT /api/cart/:id
router.put('/:id', async (req, res, next) => {
  try {
    const currentCart = await Cart.findByPk(req.params.id)
    await currentCart.addProduct(4)
    const updatedCart = await currentCart.save()
    console.log('CURRENT CART', updatedCart)
    res.send(updatedCart)
  } catch (err) {
    console.log('error in the put /api/cart/:id route', err)
  }
})
