const Users = require('../../modules/Users')
const validateRegister = require('../../validates/validateRegister')

module.exports = [
  validateRegister,
  async (req, res) => {
    const user = await Users.create(req.body)
    req.flash('success', `คุณได้สมัครสมาชิกบัญชีของ : ${user.email} เสร็จสิ้น`)
    res.redirect('/auth/login')
  }
]
