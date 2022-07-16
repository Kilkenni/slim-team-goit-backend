const { Session } = require("../../models");

const logout = async (req, res) => {
  const currentSession = req.session;

  await Session.deleteOne({ _id: currentSession._id });

  res
    .status(204)
    .json({
      status: "No Content",
      code: 204,
    })
    .end();
};

module.exports = logout;
