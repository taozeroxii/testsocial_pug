module.exports = (app) => {
  app.use('/', require('../routers/index'))
  app.use('/auth', require('../routers/auth'))
  app.use('/profile', require('../routers/profile'))
}
