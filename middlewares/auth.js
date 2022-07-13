const { JWT_ACCESS_SECRET } = require("../helpers/env");
const { User, SessionModel } = require("../models");
const jwt = require("jsonwebtoken");

const auth  = async (req, res, next) => {
  const authorizationHeader = req.get("Authorization");

  if (authorizationHeader) {
    const accessToken = authorizationHeader.replace("Bearer ", "");

    try {
      const payload = jwt.verify(accessToken, JWT_ACCESS_SECRET);

      const user = await User.findById(payload.uid);

      const session = await SessionModel.findById(payload.sid);

      if (!user) {
        return res.status(404).send({ message: "Invalid user" });
      }
  
      if (!session) {
        return res.status(404).send({ message: "Invalid session" });
      }

      req.user = user;
      req.session = session;
  
      next();
    } catch (err) {
      return res.json(err)
    }
    next();
  } else return res.status(400).send({ message: "No token provided" });
};

module.exports = auth;
