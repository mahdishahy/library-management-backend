const express = require("express");
const path = require("path");
const bookController = require(path.resolve(
  "src/api/v1/controllers/bookController"
));

const booksRouter = express.Router();

booksRouter
  .route("/")
  .get(bookController.getAll)
  .post(bookController.createBook);

booksRouter
  .route("/:id")
  .get(bookController.getOne)
  .delete(bookController.removeBook);
module.exports = booksRouter;
