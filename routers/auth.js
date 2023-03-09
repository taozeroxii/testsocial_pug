const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('test')
})
router.get('/login', require('../controllers/auth/getLogin'))

module.exports = router
