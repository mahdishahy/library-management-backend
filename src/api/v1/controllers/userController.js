const path = require("path");
const checkUser = require(path.resolve("src/api/v1/Validators/userValidator"));
const User = require(path.resolve("src/api/v1/models/User"));
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const createUser = async (req, res) => {
  const validationResult = checkUser(req.body);
  if (validationResult !== true) {
    return res.status(422).json(validationResult);
  }
  const { full_name, email, password } = req.body;
  try {
    const newUser = await User.create({
      full_name,
      email,
      password: await bcrypt.hash(password, saltRounds),
      address: null,
      phone_number: null,
      membership: false,
      role: "USER",
    });
    res.status(201).json({ message: "کاربر ثبت شد", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "خطا در سرور", error: error.message });
  }
};

const removeUser = async (req, res) => {
  const id = req.params.id;
  const validationResult = mongoose.Types.ObjectId.isValid(id);
  if (!validationResult) {
    return res.status(422).json({ message: "ایدی اشتباه می‌باشد" });
  }
  const removedUser = await User.findByIdAndDelete(id);
  if (!removedUser) {
    return res.status(404).json({ message: "کاربر پیدا نشد!" });
  }
  res.status(200).json({ message: "کاربر با موفقیت حذف شد", removedUser });
};

module.exports = { createUser, removeUser };
