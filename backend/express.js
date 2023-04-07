const path = require('path')
const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const useGlobalData = require('./useGlobalData')
const userErrorHandler = require('./userErrorHandler')
const useRedisConnect = require('./useRadisConnect')
const methodOverride = require('method-override')
const passport = require('passport')
const app = express()
const isProd = require('../utils/isProds')
const ms = require('ms')
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')

const sessionOptions = {
  store: useRedisConnect(session),
  secret: process.env.SECRET_KEY,
  cookie: {
    httpOnly: true,
    secure: isProd,
    maxAge: ms('7d')
  },
  rolling: true,
  saveUninitialized: false,
  resave: false
}

app.use(express.urlencoded({ extended: false }))
app.use(session(sessionOptions))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(useGlobalData)
app.use(methodOverride('_method'))
app.use('/public', express.static(path.join(__dirname, '../public')))

require('./useRouters')(app)

app.use(userErrorHandler)

module.exports = app
