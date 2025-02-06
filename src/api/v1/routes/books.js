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

booksRouter.get('/count', bookController.countBooks)

booksRouter
  .route("/:id")
  .get(bookController.getOne)
  .delete(bookController.removeBook).put(bookController.updateBook)
module.exports = booksRouter;
