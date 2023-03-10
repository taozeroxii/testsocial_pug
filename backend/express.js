const path = require('path')
const express = require('express')

const app = express()

app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')

app.use('/public', express.static(path.join(__dirname, '../public')))
app.use(express.urlencoded({ extended: false }))

require('./useRouters')(app)

app.get('/test', (req, res) => {
  res.end('test')
})

module.exports = app
