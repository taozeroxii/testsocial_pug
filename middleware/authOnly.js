module.exports = (req, res, next) => {
  if (!req.user) {
    req.flash('error', 'กรุณาเข้าสู่ระบบก่อนดำเนินการใดๆ')
    return res.redirect('/')
  }
  next()
}
