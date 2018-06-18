const express = require('express')
const router = express.Router()
const User = require('../controllers/user')
const Grade = require('../controllers/grade')
const Filter = require('../controllers/filter')

router.post('/login', User.login)
router.get('/user', Filter.login, User.info)
router.post('/password', Filter.login, User.password)
router.get('/grade/passing', Filter.login, Grade.passing)
router.get('/grade/failing', Filter.login, Grade.failing)
router.get('/logout', User.logout)

module.exports = router
