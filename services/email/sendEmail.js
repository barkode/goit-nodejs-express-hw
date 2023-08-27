const nodemailer = require("nodemailer");
require("dotenv").config();

const {
  EMAIL_HOST,
  EMAIL_HOST_PORT,
  EMAIL_HOST_USER,
  EMAIL_HOST_PASSWORD,
  EMAIL_HOST_SECURE_STATUS,
  EMAIL_FROM_SEND,
} = process.env;

const config = {
  host: EMAIL_HOST,
  port: EMAIL_HOST_PORT,
  secure: EMAIL_HOST_SECURE_STATUS,
  auth: {
    user: EMAIL_HOST_USER,
    pass: EMAIL_HOST_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = async (data) => {
  const email = { ...data, from: EMAIL_FROM_SEND };
  await transporter.sendMail(email);
  return true;
};

module.exports = sendEmail;
