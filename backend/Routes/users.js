const {postUsers , login} = require('../Controllers/users')
const express = require('express')
const router = express.Router()


router.post('/signup' , postUsers)
router.post('/login' , login)


module.exports = router