const passport = require('passport')
const validateLogin = require('../../validates/validateLogin')

module.exports = [
  validateLogin,
  (req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err) {
        return next(err)
      }
      req.login(user, (err) => {
        if (err) {
          return next(err)
        }
        req.flash('success', 'คุณได้เข้าสู่ระบบเสร็จสิ้น')
        res.redirect('/')
      })
    })(req, res, next)
  }
]
