const { Contact } = require("../../models/contact");
const { ctrlWrapper } = require("../../utils");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

module.exports = { getAll: ctrlWrapper(getAll) };
