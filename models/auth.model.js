const { Schema, model } = require("mongoose");

const AuthSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required."],
    },
    phone: {
      type: Number,
      unique: true
    },
    password: { type: String, required: [true, "Password is required."] },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const AuthModel = model("User", AuthSchema);

module.exports = AuthModel;
