const express = require('express')
const {joiValidation, ctrlWrapper, auth} =  require('../../middlewares/index')
const { schemaRegister, schemaLogin} = require('../../models/index')
const { registration, login, logout} = require('../../controllers/auth')

const router = express.Router()

router.post('/users/signup', joiValidation(schemaRegister), ctrlWrapper(registration));

router.post('/users/login', joiValidation(schemaLogin), ctrlWrapper(login));

router.get('/users/logout', auth, ctrlWrapper(logout));

module.exports = router
