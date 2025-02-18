const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 256,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 128,
      trim: true,
    },
    pages: {
      type: Number,
      required: true,
      min: 1,
    },
    publisher: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 128,
      trim: true,
    },
    copies_available: {
      type: Number,
      required: true,
      min: 0,
    },
    total_copies: {
      type: Number,
      required: true,
      min: 1,
    },
    language: {
      type: String,
      required: true,
      enum: ["English", "Persian", "French", "German", "Spanish"],
      trim: true,
    },
    publication_date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxLength: 64,
    },
    free: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      maxLength: 2000,
    },
    image_url: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, strict: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
