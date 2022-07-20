const { JWT_ACCESS_SECRET } = require("../helpers/env");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { createError } = require("../helpers/errors");

const authenticateUser = async (token) => {
  try {
      const payload = jwt.verify(token, JWT_ACCESS_SECRET)
      return await User.findById(payload._id)
  } catch (error) {
      return null
  }
  }
  
  const auth = async (req, _, next) => {
      const {authorization =""} = req.headers;
      const [bearer, token] = authorization.split(' ')
  
      if(bearer !== 'Bearer' || !token){
        throw createError(401, "Not authorized")
      }
  
      const user = await authenticateUser(token)
  
      if(!user || !user.token){
        throw createError(401, "Not authorized")
      }
      req.user = user
      next()
  }

// const {  Session } = require("../models");

// const auth = async (req, res, next) => {
//   const authorizationHeader = req.get("Authorization");

//   if (authorizationHeader) {
//     const accessToken = authorizationHeader.replace("Bearer ", "");

//     try {
//       const payload = jwt.verify(accessToken, JWT_ACCESS_SECRET);

//       const user = await User.findById(payload.uid);

//       const session = await Session.findById(payload.sid);

//       if (!user || !session) {
//         throw createError(401, "Invalid user or session");
//       }

//       req.user = user;
//       req.session = session;

//       next();
//     } catch (err) {
//       next(err);
//     }
//   } else next(createError(403, "No token provided"));
// };

module.exports = auth;
