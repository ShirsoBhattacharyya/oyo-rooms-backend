const { Schema, model } = require("mongoose");

const VerificationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  token: { type: String, required: true },
  createdAt: { type: Date },
  expiresAt: { type: Date },
});

const VerificationModel = model("Verification", VerificationSchema);

module.exports = VerificationModel;
