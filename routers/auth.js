const validateRegister = require('../validates/validateRegister')
const guestOnly = require('../middleware/guestOnly')

const router = require('express').Router()
router.use(guestOnly)

router.get('/login', require('../controllers/auth/getLogin'))
router.get('/register', require('../controllers/auth/getRegister'))

router.post('/login', require('../controllers/auth/postLogin'))
router.post(
  '/register',
  validateRegister,
  require('../controllers/auth/postRegister')
)

module.exports = router
