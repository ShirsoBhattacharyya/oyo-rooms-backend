const express = require("express");
const path = require("path");
const authController = require("../controllers/auth.controller");
const validateToken = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/:userId/verify/:token", authController.verifyEmail);
router.get("/verified", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "email-verified.html"));
});
router.get("/user", validateToken, authController.getUserDetails);
router.put("/user/:id", authController.updateUserDetails);
// router.post("/request/reset-password", authController.requestPasswordReset);
// router.get("/reset-password/:userId/:token", authController.resetPassword);
// router.post("/reset-password", authController.changePassword);

// router.get("/reset-password", (req, res) => {
//   res.sendFile(path.join(__dirname, "../views", "password-reset.html"));
// });

module.exports = router;
