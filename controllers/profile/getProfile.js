const Users = require('../../models/Users')

module.exports = async (req, res) => {
  const user = await Users.findOne({ username: req.params.username })
  if (!user) {
    throw new Error('ไม่พบชื่อผู้ใช้งาน')
  }
  res.render('profile', { user })
}
