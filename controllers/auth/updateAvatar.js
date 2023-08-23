const path = require("path");
// const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../../models/user");
const { ctrlWrapper } = require("../../utils");

const avatarsDir = path.join(__dirname, "..", "..", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  console.log(tempUpload);
  console.log(originalname);

  const image = await Jimp.read(tempUpload);
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  image.resize(250, 250);
  image.writeAsync(resultUpload);

  // await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(201).json({ avatarURL });
};

module.exports = { updateAvatar: ctrlWrapper(updateAvatar) };
