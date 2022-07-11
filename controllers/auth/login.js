const {User} = require('../../models/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require("../../helpers/env")

const login = async (req, res, _next) => {
    const {email, password} = req.body
    const user =  await User.findOne({email});
    const isValid = await bcrypt.compare(password, user.password)
    
   if(!user || !isValid){
    res.status(401).json({"message":"Email or password is wrong"})
  }
   const payload = {
    _id: user._id,
  }

  const token =  jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"})
  await User.findByIdAndUpdate(user._id, {token})
  res.json({token})
}

module.exports = login
