const { SessionModel, User } = require("../../models");
const { 
    JWT_ACCESS_SECRET, 
    JWT_ACCESS_EXPIRE_TIME, 
    JWT_REFRESH_SECRET, 
    JWT_REFRESH_EXPIRE_TIME, 
  } = require("../../helpers/env");
  const jwt = require("jsonwebtoken");
const { createError } = require("../../helpers/errors");

const refreshTokens = async (req, res) => {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader) {
      const activeSession = await SessionModel.findById(req.body.sid);

      if (!activeSession) {
        throw createError(404, "Invalid session");
      }

      const reqRefreshToken = authorizationHeader.replace("Bearer ", "");
      
      try {
        const payload = jwt.verify(reqRefreshToken, JWT_REFRESH_SECRET);

        const user = await User.findById(payload.uid);
        const session = await SessionModel.findById(payload.sid);
  
        if (!user) {
          throw createError(404, "Invalid user");
        }
  
        if (!session) {
          throw createError(404, "Invalid session");
        }
  
        await SessionModel.findByIdAndDelete(payload.sid);
        const newSession = await SessionModel.create({
          uid: user._id,
        });
  
        const newAccessToken = jwt.sign(
          { uid: user._id, sid: newSession._id },
              JWT_ACCESS_SECRET,
          {expiresIn: JWT_ACCESS_EXPIRE_TIME}
        );
  
        const newRefreshToken = jwt.sign(
          { uid: user._id, sid: newSession._id },
              JWT_REFRESH_SECRET,
          { expiresIn: JWT_REFRESH_EXPIRE_TIME }
        );
        return res.json({
          status: "Success",
          code: 200,
          data: {
              newAccessToken, 
              newRefreshToken, 
              newSid: newSession._id}
          });
        
      } catch (err) {
        await SessionModel.findByIdAndDelete(req.body.sid);
        throw createError(401, "Unauthorized");
      }
    
    } else throw createError(40, "No token provided");
  };
  
  module.exports = refreshTokens;