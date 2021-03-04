const router = require('express').Router()
const {Cart, CartProducts} = require('../db/models')
module.exports = router

// GET /api/cart/:id
router.get('/:id', async (req, res, next) => {
  try {
    const currentCart = await Cart.findByPk(req.params.id)
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
    if (await currentCart.containsProduct(Number(req.body.id))) {
      const productInCart = await CartProducts.findOne({
        where: {
          cartId: currentCart.id,
          productId: req.body.id
        }
      })
      productInCart.quantity += 1
      await productInCart.save()
    } else {
      await currentCart.addProduct(req.body.id)
    }
    await currentCart.save()
    res.send(currentCart)
  } catch (error) {
    console.log('error in the PUT /api/cart/:id route', error)
    next(error)
  }
})

// PUT /api/cart/checkout/:id
router.put('/checkout/:id', async (req, res, next) => {
  try {
    const currentCart = await Cart.findByPk(req.params.id)
  } catch (error) {
    console.log('error in the PUT /api/cart/checkout/:id route', error)
    next(error)
  }
})
