const { ctrlWrapper } = require("../../utils");

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({ email: email, subscription: subscription });
};

module.exports = { getCurrent: ctrlWrapper(getCurrent) };
