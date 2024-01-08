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
      res.json({
        status: 200,
        message: message,
        data: newUser,
      });
    } else {
      res.json({ status: 400, message: message });
    }
  } catch (error) {
    res.json({ status: 500, message: error.message });
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
      res.json({
        status: 200,
        message: message,
        data: { existingUser, token },
      });
    } else {
      res.json({ status: 400, message: message });
    }
  } catch (error) {
    res.json({ status: 500, message: error.message });
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
    const { status, message, data } = await authService.getUserDetails(req.body.id);
    res.json({ status, message, data });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const { status, message, data } = await authService.updateUserDetails(
      req.params.id,
      req.body,
      req.query.filterType
    );
    res.json({ status, message, data });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  getUserDetails,
  updateUserDetails,
};
