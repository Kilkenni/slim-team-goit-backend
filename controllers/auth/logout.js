const { createError } = require("../../helpers/errors");
const { User } = require("../../models");

const logout = async (req, res) => {
    const {_id} = req.user
    
    if(!_id){
      throw createError(401, "Not authorized")
    }

  await User.findByIdAndUpdate(_id, {token: null});
  
  res
    .status(204)
    .json({
      status: "No Content",
      code: 204,
      message: "Logout was successfully completed",
    })
    .end();
}


// const { Session } = require("../../models");

// const logout = async (req, res) => {
//   const currentSession = req.session;

//   await Session.deleteOne({ _id: currentSession._id });

//   res
//     .status(204)
//     .json({
//       status: "No Content",
//       code: 204,
//       message: "Logout was successfully completed",
//     })
//     .end();
// };

module.exports = logout;
