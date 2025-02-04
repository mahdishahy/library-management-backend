const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 125,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 5,
      maxLength: 256,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    address: {
      street: { type: String, default: null },
      city: { type: String, default: null },
      state: { type: String, default: null },
      zip: { type: String, default: null },
    },
    phone_number: {
      type: String,
      default: null,
      unique: true,
      sparse: true,
    },
    membership: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true, strict: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
