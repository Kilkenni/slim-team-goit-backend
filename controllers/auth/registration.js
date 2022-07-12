const { User } = require("../../models");
const bcrypt = require("bcryptjs");

const registration = async (req, res, _next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user) {
    res.status(409).json({ message: "Email in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const registerUser = await User.create({
    ...req.body,
    password: hashedPassword,
  });
  res.status(201).json(registerUser);
};

module.exports = registration;
