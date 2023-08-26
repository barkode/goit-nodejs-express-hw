const express = require("express");
const {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers/auth");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

// signup
router.post("/register", validateBody(schemas.registerSchema), register);

router.get("/verify:verificationToken", verifyEmail);

router.post("/verify", validateBody(schemas.verifySchema), resendVerifyEmail);

// signin
router.post("/login", validateBody(schemas.loginSchema), login);

router.get("/current", authenticate, getCurrent);

// logout

router.post("/logout", authenticate, logout);

// change avatar

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
