const getCurrentUser = async (req, res) => {
  const user = req.user;
  console.log(user);

  res.json({
    status: "OK",
    code: 200,
    message: `'${user.name}' user data`,
    data: user,
  });
};

module.exports = getCurrentUser;
