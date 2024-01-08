const User = require("../models/auth.model");
const Verification = require("../models/email-verification.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const util = require("util");
const dotenv = require("dotenv");
const { validatePassword, compareString } = require("../utils/password.util");

dotenv.config();

const jwtSignAsync = util.promisify(jwt.sign);

const registerUser = async (name, email, password) => {
  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return { message: "This email is already in use." };
    }
    if (!validatePassword(password)) {
      return {
        message:
          "Password must contain capital letters, special characters, small letters, and numbers, and should be at least seven characters long.",
      };
    }
    const bcryptSalt = bcrypt.genSaltSync(10);
    const newUser = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    return {
      message:
        "Account created successfully. Verification email has been sent to your account. Check your email for further instructions.",
      newUser,
    };
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const loginUser = async (email, password) => {
  const jwtSecret = process.env.JWT_SECRET;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const passwordCheck = bcrypt.compareSync(
        password,
        existingUser?.password
      );
      if (passwordCheck) {
        const token = await jwtSignAsync(
          {
            email: existingUser?.email,
            id: existingUser?._id,
          },
          jwtSecret,
          {
            expiresIn: "1h",
          }
        );
        return { message: "Login Successful.", token, existingUser };
      } else {
        return { message: "Incorrect Password. Please try again." };
      }
    } else {
      return { message: "User doesn't exist. Please create an account first." };
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const verifyEmail = async (userId, token) => {
  try {
    const result = await Verification.findOne({ userId });
    if (result) {
      const { expiresAt, token: hashedToken } = result;
      // Token has expired
      if (expiresAt < Date.now()) {
        await Verification.findOneAndDelete({ userId });
        await User.findOneAndDelete({ _id: userId });
        throw new Error("Verification token has expired.");
      } else {
        // Token is valid
        const isMatch = await compareString(token, hashedToken);
        if (isMatch) {
          await User.findOneAndUpdate({ _id: userId }, { verified: true });
          await Verification.findOneAndDelete({ userId });
          return { status: "success", message: "Email verified successfully" };
        } else {
          // Token is invalid
          throw new Error("Verification failed or link is invalid");
        }
      }
    } else {
      throw new Error("Invalid verification link. Try again later.");
    }
  } catch (error) {
    console.error(error);
    return { status: "error", message: error.message };
  }
};

const getUserDetails = async (id) => {
  try {
    const response = await User.findOne({ _id: id });
    return { status: 200, message: "Success", data: response };
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const updateUserDetails = async (id, updatedUser, filterType) => {
  try {
    let response;
    if (filterType === "UPDATE_PASSWORD") {
      const userDetails = await User.findOne({ _id: id });
      const passwordCheck = bcrypt.compareSync(
        updatedUser?.oldPassword,
        userDetails?.password
      );
      if (passwordCheck) {
        const newPassword = updatedUser?.newPassword;
        const bcryptSalt = bcrypt.genSaltSync(10);
        await User.findOneAndUpdate(
          { _id: id },
          { password: bcrypt.hashSync(newPassword, bcryptSalt) }
        );
        response = await User.findOne({ _id: id });
        return {
          status: 200,
          message: "Password updated successfully.",
          data: response,
        };
      } else {
        return {
          status: 400,
          message: "Incorrect Password. Please try again.",
        };
      }
    } else {
      await User.findOneAndUpdate({ _id: id }, updatedUser);
      response = await User.findById(id);
      return {
        status: 200,
        message: "User updated successfully.",
        data: response,
      };
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  getUserDetails,
  updateUserDetails,
};
