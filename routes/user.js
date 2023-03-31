const express = require('express')

const { registerUser , loginUser, updateProfile, advertise, updateAddress, updateCompany, allTenders} = require('../controllers/user')

const router = express.Router()

router.post('/new',registerUser)

router.post('/login', loginUser)

router.patch('/update/address', updateAddress)

router.patch('/update/company', updateCompany)

router.post('/tender/add', advertise)

router.get('/tenders', allTenders)

module.exports=router