const path = require("path");
const validator = require(path.resolve("src/api/v1/Validators/bookValidator"));
const Book = require(path.resolve("src/api/v1/models/Book"));
const mongoose = require("mongoose");

exports.createBook = async (req, res) => {
  const validationResult = validator.checkBook(req.body);
  if (validationResult !== true) {
    return res.status(422).json(validationResult);
  }
  const {
    title,
    author,
    publisher,
    pages,
    copies_available,
    total_copies,
    language,
    publication_date,
    category,
    description = null,
    image_url = null,
  } = req.body;
  try {
    const newBook = await Book.create({
      title,
      author,
      publisher,
      pages,
      copies_available,
      total_copies,
      language,
      publication_date,
      category,
      description,
      image_url,
      free: true,
    });
    res.status(201).json({ message: "کتاب ثبت شد", book: newBook });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "خطا در سرور", error: error.message });
  }
};

exports.removeBook = async (req, res) => {
  try {
    const id = req.params.id;
    const validationResult = mongoose.Types.ObjectId.isValid(id);
    if (!validationResult) {
      return res.status(422).json({ message: "ایدی اشتباه می‌باشد" });
    }
    const removedBook = await Book.findByIdAndDelete(id);
    if (!removedBook) {
      return res.status(404).json({ message: "کتاب پیدا نشد!" });
    }
    res.status(200).json({ message: "کتاب با موفقیت حذف شد", removedBook });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "خطا در سرور", error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const books = await Book.find();
    if (!books.length) {
      return res.status(404).json({ message: "هیج کتابی یافت نشد" });
    }
    res.json({ books });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "خطا در سرور", error: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const validationResult = mongoose.Types.ObjectId.isValid(id);
    if (!validationResult) {
      return res.status(422).json({ message: "ایدی اشتباه می‌باشد" });
    }
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "کتاب پیدا نشد" });
    }
    res.json({ book });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "خطا در سرور", error: error.message });
  }
};

exports.countBooks = async (req, res) => {
  try {
    const count = await Book.countDocuments();
    res.status(200).json({ totalBooks: count });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "خطا در سرور", error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    const idValidationResult = mongoose.Types.ObjectId.isValid(id);
    if (!idValidationResult) {
      return res.status(422).json({ message: "ایدی اشتباه می‌باشد" });
    }

    const fieldsToValidate = Object.keys(req.body).reduce((acc, key) => {
      if (validator.bookSchemaValidation[key]) {
        acc[key] = validator.bookSchemaValidation[key];
      }
      return acc;
    }, {});

    const checkPartial = validator.v.compile(fieldsToValidate);
    const validationErrors = checkPartial(req.body);
    if (validationErrors !== true) {
      return res
        .status(422)
        .json({ message: "خطای اعتبارسنجی", errors: validationErrors });
    }

    const book = await Book.findByIdAndUpdate(id, req.body, { new: true });

    if (!book) {
      return res.status(404).json({ message: "کتاب پیدا نشد" });
    }
    res.status(200).json({ message: "کتاب با موفقیت به‌روزرسانی شد", book });
  } catch (error) {
    res.status(500).json({ message: "خطا در سرور", error: error.message });
  }
};
