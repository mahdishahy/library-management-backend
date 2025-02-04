const express = require("express");
const { default: mongoose } = require("mongoose");
const { stringify } = require("querystring");

const bookSchema = express.Schema(
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
    free: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      maxLength: 2000,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxLength: 64,
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
