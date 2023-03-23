const path = require('path')
const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const useGlobalData = require('./useGlobalData')
const userErrorHandler = require('./userErrorHandler')
const passport = require('passport')
const app = express()
const isProd = require('../utils/isProds')
const ms = require('ms')
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')

const sessionOptions = {
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
app.use('/public', express.static(path.join(__dirname, '../public')))

require('./useRouters')(app)

app.use(userErrorHandler)

module.exports = app
