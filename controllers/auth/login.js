const { User, SessionModel } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { 
  JWT_ACCESS_SECRET, 
  JWT_ACCESS_EXPIRE_TIME, 
  JWT_REFRESH_SECRET, 
  JWT_REFRESH_EXPIRE_TIME, 
} = require("../../helpers/env");

const login = async (req, res, _next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isValid = await bcrypt.compare(password, user.password);

  if (!user || !isValid) {
    res.status(401).json({ message: "Email or password is wrong" });
  }

  const newSession = await SessionModel.create({
    uid: user._id,
  });

  const accessToken = jwt.sign(
    { uid: user._id, sid: newSession._id },
      JWT_ACCESS_SECRET,
    { expiresIn: JWT_ACCESS_EXPIRE_TIME }
  );

  const refreshToken = jwt.sign(
    { uid: user._id, sid: newSession._id },
      JWT_REFRESH_SECRET,
    { expiresIn: JWT_REFRESH_EXPIRE_TIME }
  );
      return res.status(200).send({
        accessToken,
        refreshToken,
        sid: newSession._id,
        data: {
          email: user.email,
          name: user.name,
          id: user._id,
        },
      })
};

module.exports = login;
