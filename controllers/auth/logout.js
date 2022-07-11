const {User} = require('../../models/index')

const logout = async (req, res, next) => {
    const {_id} = req.user
    
    if(!_id){
      res.status(401).json({message: "Not authorized"})
    }

  await User.findByIdAndUpdate(_id, {token: null});
  res.status(204).json({message:"No Content"})
}

module.exports =  logout
