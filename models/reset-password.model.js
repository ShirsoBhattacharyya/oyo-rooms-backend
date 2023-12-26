const { Schema, model } = require("mongoose");

const PasswordResetSchema = Schema({
  userId: { type: String, unique: true },
  email: { type: String, unique: true },
  token: { type: String },
  createdAt: { type: Date },
  expiresAt: { type: Date },
});

const PasswordResetModel = model("PasswordReset", PasswordResetSchema);

module.exports = PasswordResetModel;
