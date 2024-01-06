const authService = require("../services/auth.service");
const { sendVerificationEmail } = require("../utils/email.util");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let { message, newUser } = await authService.registerUser(
      name,
      email,
      password
    );
    if (newUser) {
      await sendVerificationEmail(newUser);
    }
    res.json({
      message,
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let { message, token, existingUser } = await authService.loginUser(
      email,
      password
    );
    if (token && existingUser) {
      res.json({ message, data: { existingUser, token } });
    } else {
      res.status(400).json({ message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyEmail = async (req, res) => {
  const { userId, token } = req.params;
  try {
    const response = await authService.verifyEmail(userId, token);
    res.redirect(
      `/api/auth/verified?status=${response?.status}&message=${response?.message}`
    );
  } catch (error) {
    console.error(error.message);
    res.redirect(`/api/auth/verified?status=error&message=${error.message}`);
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { message, data } = await authService.getUserDetails(req.body.id);
    res.json({ message, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const { message } = await authService.updateUserDetails(
      req.params.id,
      req.body,
      (req.query.filterType = "")
    );
    res.json({ message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  getUserDetails,
  updateUserDetails,
};
