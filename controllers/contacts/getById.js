const Contact = require("../../models");
const { HttpError, ctrlWrapper } = require("../../utils");

const getById = async (req, res) => {
  const { contactId } = req.params;
  // const result = await Contact.findOne({ _id: contactId });
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = { getById: ctrlWrapper(getById) };
