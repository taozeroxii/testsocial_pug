module.exports = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err)
    }
    req.flash('success', 'คุณได้ออกจากระบบเสร็จสิ้น')
    res.redirect('/')
  })
}
