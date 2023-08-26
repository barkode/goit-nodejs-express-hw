const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const { User } = require("../../models/user");
const { HttpError, ctrlWrapper, sendEmail } = require("../../utils");

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already exist.");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(
    email,
    { s: "250", r: "g", d: "robohash" },
    false
  );
  const verificationToken = uuidv4();
  console.log(verificationToken);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a
        target="_blank"
        href="${BASE_URL}/api/auth/verify/${verificationToken}">
        Click here to verify your email.
      </a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({ user: { email: newUser.email, name: newUser.name } });
};

module.exports = { register: ctrlWrapper(register) };
