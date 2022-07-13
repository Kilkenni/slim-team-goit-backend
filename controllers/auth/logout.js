const { User, SessionModel } = require("../../models");

const logout = async (req, res) => {
  const currentSession = req.session;
  const user = req.user;

  if (!user._id || !currentSession) {
    res.status(401).json({ message: "Not authorized" });
  } 
  await SessionModel.deleteOne({ _id: currentSession._id });
  await User.findByIdAndUpdate(user._id, { token: null });

  return res.status(204).end();

};

module.exports = logout;
