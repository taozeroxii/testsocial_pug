module.exports = (err, req, res, next) => {
  req.flash('error', err.message || 'พบปัญหาบางอย่างไม่คาดคิด')
  if (err?.code?.includes('PUG')) {
    res.send(err)
  } else {
    res.redirect('back')
  }
}
