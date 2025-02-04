const express = require("express");
const path = require("path");
const bookController = require(path.resolve(
  "src/api/v1/controllers/bookController"
));

const booksRouter = express.Router();

booksRouter.post("/", bookController.createBook);

module.exports = booksRouter;
