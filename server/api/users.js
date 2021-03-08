const router = require('express').Router()
const {User} = require('../db/models')
const adminMiddleware = require('./adminMiddleware')
module.exports = router

router.get('/', adminMiddleware, async (req, res, next) => {
  try {
    // if (!req.user || req.user.userStatus !== 'admin') return res.sendStatus(401)
    //^^Show teammates
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
