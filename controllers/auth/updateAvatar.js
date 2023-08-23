const path = require("path");
// const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../utils");

const avatarsDir = path.join(__dirname, "..", "..", "public", "avatars");

// const supportedMime = [
//   "image/png",
//   "image/jpeg",
//   "image/jpg",
//   "image/bmp",
//   "image/tiff",
//   "image/gif",
// ];

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  try {
    const image = await Jimp.read(tempUpload);
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    image.resize(250, 250);
    image.quality(75);
    image.writeAsync(resultUpload);
  } catch {
    throw HttpError(500, "Not supported mime-type");
  }

  // const originalMime = image._originalMime;
  // const findMime = supportedMime.find(originalMime);
  // if (!findMime) {
  //   throw HttpError(500, "Not supported mime-type");
  // }

  // await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(201).json({ avatarURL });
};

module.exports = { updateAvatar: ctrlWrapper(updateAvatar) };
