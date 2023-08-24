const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../utils");

const avatarsDir = path.join(__dirname, "..", "..", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  try {
    const image = await Jimp.read(tempUpload);
    image.resize(250, 250);
    image.quality(75);
    image.writeAsync(tempUpload);
  } catch {
    throw HttpError(500, "Not supported mime-type");
  }
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  const avatarURL = path.join("avatars", filename);
  await fs.rename(tempUpload, resultUpload);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ avatarURL });
};

module.exports = { updateAvatar: ctrlWrapper(updateAvatar) };
