const { resendVerifyEmail } = require("./resendVerifyEmail");
const { verifyEmail } = require("./verifyEmail");
const sendEmail = require("./sendEmail.js");

module.exports = {
  resendVerifyEmail,
  verifyEmail,
  sendEmail,
};
