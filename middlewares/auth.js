const { JWT_ACCESS_SECRET } = require("../helpers/env");
const { User, Session } = require("../models");
const jwt = require("jsonwebtoken");
const { createError } = require("../helpers/errors");

const auth = async (req, res, next) => {
  const authorizationHeader = req.get("Authorization");

  if (authorizationHeader) {
    const accessToken = authorizationHeader.replace("Bearer ", "");

    try {
      const payload = jwt.verify(accessToken, JWT_ACCESS_SECRET);

      const user = await User.findById(payload.uid);

      const session = await Session.findById(payload.sid);

      if (!user || !session) {
        throw createError(401, "Invalid user or session");
      }

      req.user = user;
      req.session = session;

      next();
    } catch (err) {
      next(err);
    }
  } else next( createError(403, "No token provided") );
};

module.exports = auth;
