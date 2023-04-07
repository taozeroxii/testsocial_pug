const validateRegister = require('../validates/validateRegister')
const guestOnly = require('../middleware/guestOnly')
const authOnly = require('../middleware/authOnly')
const router = require('express').Router()

router.get('/login', guestOnly, require('../controllers/auth/getLogin'))
router.get('/register', guestOnly, require('../controllers/auth/getRegister'))

router.post('/login', guestOnly, require('../controllers/auth/postLogin'))
router.post('/register', guestOnly, validateRegister, require('../controllers/auth/postRegister'))

router.get('/logout', authOnly, require('../controllers/auth/getLogout'))

module.exports = router
