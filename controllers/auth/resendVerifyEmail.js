const { User } = require("../../models/user");
const { HttpError, ctrlWrapper, sendEmail } = require("../../utils");
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = User.findOne({ email });

  console.log(email);

  if (!user) {
    throw HttpError(401, "Email not found");
  }
  if (user.verify) {
    throw HttpError(401, "Email already verified");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a
        target="_blank"
        href="${BASE_URL}/api/auth/verify/${user.verificationToken}">
        Click here to verify your email.
      </a>`,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({ message: "Verify email send success" });
};

module.exports = { resendVerifyEmail: ctrlWrapper(resendVerifyEmail) };
