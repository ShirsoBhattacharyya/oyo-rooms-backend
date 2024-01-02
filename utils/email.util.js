const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { v4 } = require("uuid");
const { hashString } = require("./password.util.js");
const Verification = require("../models/email-verification.model.js");
const PasswordReset = require("../models/reset-password.model.js");

dotenv.config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

const sendVerificationEmail = async (user, res) => {
  const { _id, email, name } = user;
  const token = _id + v4();
  const link = process.env.APP_URL + "auth/" + _id + "/verify/" + token;

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "(no-reply) OYO: Verify your email to login to your account",
    html: `<div
    style='font-family: Arial, sans-serif; font-size: 16px; color: #333; background-color: #f7f7f7; padding: 20px; border-radius: 5px;'>
    <hr>
    <h4>Hi ${name},</h4>
    <p>
        Please verify your email address so we can know that it's really you.
        <br>
        Note: This is not the original email address of OYO. Please refrain from sharing any sensitive information. This is a cloned project built for educational purposes only by Shirso Bhattacharyya.
        Contact shirso369@gmail.com for further queries.
    <p>This link <b>expires in 1 hour</b></p>
    <br>
    <a href=${link}
        style="color: #fff; padding: 14px; text-decoration: none; background-color: #ff5a5f;  border-radius: 8px; font-size: 18px;">Verify
        Email Address</a>
    </p>
    <div style="padding-top: 20px;font-size: 16px;">
        <p>Best Regards,</p>
        <p>OYO Operations Team.</p>
    </div>
</div>`,
  };

  try {
    const hashedToken = await hashString(token);

    const newVerifiedEmail = await Verification.create({
      userId: _id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    if (newVerifiedEmail) {
      await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error:", error);
            reject(error);
          } else {
            console.log("Email sent:", info.response);
            resolve(info?.response);
          }
        });
      });
      res.json({
        success: "PENDING",
        message:
          "Verification email has been sent to your account. Check your email for further instructions.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const resetPasswordLink = async (user, res) => {
  const { _id, email } = user;

  const token = _id + v4();
  const link = process.env.APP_URL + "auth/reset-password/" + token;

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "(no-reply) OYO: Reset your Password",
    html: `<p style="font-family: Arial, sans-serif; font-size: 16px; color: #333; background-color: #f7f7f7; padding: 20px; border-radius: 5px;">
         Password reset link. Please click the link below to reset password.
        <br>
        <p style="font-size: 18px;"><b>This link expires in 10 minutes</b></p>
         <br>
        <a href=${link} style="color: #fff; padding: 10px; text-decoration: none; background-color: #ff5a5f;  border-radius: 8px; font-size: 18px; ">Reset Password</a>.
    </p>`,
  };

  try {
    const hashedToken = await hashString(token);

    const resetEmail = await PasswordReset.create({
      userId: _id,
      email: email,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 600000,
    });

    if (resetEmail) {
      transporter
        .sendMail(mailOptions)
        .then(() => {
          res.status(201).send({
            success: "PENDING",
            message: "Reset Password Link has been sent to your account.",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({ message: "Something went wrong" });
        });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

const confirmationEmail = async (booking) => {
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: booking?.userDetails?.email,
    subject: "(no-reply) OYO: Booking Confirmation",
    html: `<div
    style='font-family: Arial, sans-serif; font-size: 16px; color: #333; background-color: #f7f7f7; padding: 20px; border-radius: 5px;'>
    <hr>
    <h4>Hi ${booking?.userDetails?.name},</h4>
    <p>
        You have successfully completed your booking at ${booking?.hotelName}.
        <p>The Booking Details are as follows:</p>
        <br>
        <p>Booking ID: BID${booking?._id},</p>
        <p>Hotel name: ${booking?.hotelName},</p>
        <p>City: ${booking?.hotelCity},</p>
        <p>Region: ${booking?.hotelLocation},</p>
        <p>Name: ${booking?.userDetails?.name},</p>
        <p>Email: ${booking?.userDetails?.email},</p>
        <p>Phone: ${booking?.userDetails?.phone},</p>
        <p>No of Rooms: ${booking?.roomCount},</p>
        <p>No of Guests: ${booking?.guestCount},</p>
        <p>Amount to pay: ₹${booking?.price},</p>
        <br>
        Note: This is not the original email address of OYO. Please refrain from sharing any sensitive information. This is a cloned project built for educational purposes only by Shirso Bhattacharyya.
        Contact shirso369@gmail.com for further queries.
    <br>
    </p>
    <div style="padding-top: 20px;font-size: 16px;">
        <p>Best Regards,</p>
        <p>OYO Operations Team.</p>
    </div>
</div>`,
  };
  try {
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error:", error);
          reject(error);
        } else {
          console.log("Email sent:", info?.response);
          resolve(info?.response);
        }
      });
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  sendVerificationEmail,
  resetPasswordLink,
  confirmationEmail,
};
