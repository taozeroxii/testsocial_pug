const path = require('path')
const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const useShowflash = require('./useShowFlash')
const userErrorHandler = require('./userErrorHandler')
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
app.use('/public', express.static(path.join(__dirname, '../public')))
app.use(flash())
app.use(useShowflash)

require('./useRouters')(app)

app.get('/', (req, res) => {
  res.end('test')
})

app.use(userErrorHandler)

module.exports = app
