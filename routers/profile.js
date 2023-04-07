const router = require('express').Router()
const authOnly = require('../middleware/authOnly')

router.get('/edit', authOnly, require('../controllers/profile/getEdit'))
router.put('/', authOnly, require('../controllers/profile/updateProfile'))

module.exports = router
