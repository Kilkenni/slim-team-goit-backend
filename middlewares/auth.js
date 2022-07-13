const { JWT_ACCESS_SECRET } = require("../helpers/env");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authenticateUser = async (token) => {
  try {
    const payload = jwt.verify(token, JWT_ACCESS_SECRET);
    return await User.findById(payload._id);
  } catch (error) {
    return null;
  }
};

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    res.status(401).json({ message: "Not authorized" });
  }

  const user = await authenticateUser(token);

  if (!user || !user.token) {
    res.status(401).json({ message: "Not authorized" });
  }
  req.user = user;
  next();
};

module.exports = auth;
