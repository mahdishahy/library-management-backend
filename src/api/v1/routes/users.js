const express = require('express');
const path = require('path');
const userController = require(path.resolve(
  "src/api/v1/controllers/userController"
));

const usersRouter = express.Router()


usersRouter.post("/register", userController.createUser);
usersRouter.delete("/:id", userController.removeUser);
usersRouter.get('/:id', userController.getOne)
module.exports = usersRouter