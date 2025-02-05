const express = require("express");
const path = require("path");
const userController = require(path.resolve(
  "src/api/v1/controllers/userController"
));

const usersRouter = express.Router();

usersRouter.post("/register", userController.createUser);
usersRouter.get("/", userController.getAll);
usersRouter
  .route("/:id")
  .get(userController.getOne)
  .delete(userController.removeUser);

module.exports = usersRouter;
