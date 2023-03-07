const express = require('express')
const { registerUser , loginUser, updateProfile} = require('../controllers/user')

const router = express.Router()

router.post('/new',registerUser)

router.post('/login', loginUser)

router.patch('/update', updateProfile)

module.exports=router