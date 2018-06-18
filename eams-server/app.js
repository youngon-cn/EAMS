var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var session = require('express-session')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: 'youngon',
  resave: true,
  saveUninitialized: true,
  name: 'eams',
  cookie: { maxAge: 30 * 60 * 1000 }
}))

app.use('/request', require('./routes/index'))

module.exports = app
