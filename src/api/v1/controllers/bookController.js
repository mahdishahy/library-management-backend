const path = require("path");
const checkBook = require(path.resolve("src/api/v1/validators/bookValidator"));
const Book = require(path.resolve("src/api/v1/models/Book"));

const createBook = async (req, res) => {
  const validationResult = checkBook(req.body);
  if (validationResult !== true) {
    return res.status(422).json(validationResult);
  }
  const {
    title,
    author,
    publisher,
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
      copies_available,
      total_copies,
      language,
      publication_date,
      category,
      description,
      image_url,
      free: true,
    });
    res.status(201).json({ message: "کتاب ثبت شد", user: newBook });
  } catch (error) {
    res.status(500).json({ message: "خطا در سرور", error: error.message });
  }
};

module.exports = { createBook };
