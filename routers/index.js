const router = require('express').Router()

router.get('/', require('../controllers/index/getIndex'))

module.exports = router
