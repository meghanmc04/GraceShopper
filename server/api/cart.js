const router = require('express').Router()
const {Cart, CartProducts, Product} = require('../db/models')
module.exports = router

// GET /api/cart/:id
router.get('/:id', async (req, res, next) => {
  try {
    const currentCart = await Cart.findByPk(req.params.id, {
      include: Product
    })
    await currentCart.save()
    res.send(currentCart)
  } catch (err) {
    next(err)
  }
})

// POST /api/cart/
// Write route to create new cart
// somehow this needs to be linked to a user.
// First check to see if user has any active carts
router.post('/', async (req, res, next) => {
  try {
    const newCart = await Cart.create(req.body)
    console.log(newCart)
    res.send(newCart)
  } catch (error) {
    console.log('Error in the POST /api/cart route', error)
    next(error)
  }
})

// PUT /api/cart/:id
// I feel like I can rewrite this to be more concise...
router.put('/:id', async (req, res, next) => {
  try {
    const currentCart = await Cart.findByPk(req.params.id, {include: Product})
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
    const updatedCart = await Cart.findByPk(req.params.id, {include: Product})
    await updatedCart.save()
    res.send(updatedCart)
  } catch (error) {
    console.log('error in the PUT /api/cart/:id route', error)
    next(error)
  }
})

// PUT /api/cart/checkout/:id

// Need to add functionality to deduct from the product "inventory" when someone purchases an item
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
