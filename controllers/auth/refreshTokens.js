const { SessionModel, User } = require("../../models");
const { 
    JWT_ACCESS_SECRET, 
    JWT_ACCESS_EXPIRE_TIME, 
    JWT_REFRESH_SECRET, 
    JWT_REFRESH_EXPIRE_TIME, 
  } = require("../../helpers/env");
  const jwt = require("jsonwebtoken");

const refreshTokens = async (req, res) => {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader) {
      const activeSession = await SessionModel.findById(req.body.sid);

      if (!activeSession) {
        return res.status(404).send({ message: "Invalid session" });
      }

      const reqRefreshToken = authorizationHeader.replace("Bearer ", "");
      const payload = jwt.verify(reqRefreshToken, JWT_REFRESH_SECRET);
      if(!payload){
        await SessionModel.findByIdAndDelete(req.body.sid);
        return res.status(401).send({ message: "Unauthorized" });
      }
      const user = await User.findById(payload.uid);
      const session = await SessionModel.findById(payload.sid);

      if (!user) {
        return res.status(404).send({ message: "Invalid user" });
      }

      if (!session) {
        return res.status(404).send({ message: "Invalid session" });
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
      return res
        .status(200)
        .send({ newAccessToken, newRefreshToken, newSid: newSession._id });
    }
    return res.status(400).send({ message: "No token provided" });
  };
  
  module.exports = refreshTokens;