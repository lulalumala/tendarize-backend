const express = require('express')
const { registerUser , loginUser} = require('../controllers/user')

const router = express.Router()

router.post('/new',registerUser)

router.post('/login', loginUser)

module.exports=router