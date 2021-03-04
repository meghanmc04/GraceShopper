const router = require('express').Router()
const {Cart, CartProducts, Product} = require('../db/models')
module.exports = router

// GET /api/cart/:id
router.get('/:id', async (req, res, next) => {
  try {
    // update to eager load products!!!
    const currentCart = await Cart.findByPk(req.params.id, {
      include: Product
    })
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
    currentCart.active = false
    await currentCart.save()
    res.send(currentCart)
  } catch (error) {
    console.log('error in the PUT /api/cart/checkout/:id route', error)
    next(error)
  }
})

// Path to delete indiviual items? Should I make new routes for CartProducts or just include them all here?
// PUT /api/cart/removeItem/:id
router.put('/removeItem/:id', async (req, res, next) => {
  try {
    const itemToRemove = await CartProducts.findByPk(req.body.id)
    if (!itemToRemove) {
      res.status(404).send('not found')
    } else if (itemToRemove.quantity > 1) {
      itemToRemove.quantity -= 1
      await itemToRemove.save()
    } else {
      itemToRemove.destroy()
    }
    const currentCart = await Cart.findByPk(req.params.id, {
      include: Product
    })
    await currentCart.save()
    res.send(currentCart)
  } catch (error) {
    console.log('Error in the PUT /api/cart/removeItem/:id route', error)
    next(error)
  }
})
