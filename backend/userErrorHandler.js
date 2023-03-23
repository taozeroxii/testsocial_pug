module.exports = (err, req, res, next) => {
  req.flash('error', err.message || 'พบปััญหาบางอย่างไม่คาดคิด')
  res.redirect('back')
}
