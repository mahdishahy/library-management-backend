require("dotenv").config();
const express = require("express");
const path = require("path");
const { connect } = require(path.resolve("src/api/v1/config/database"));
const usersRouter = require(path.resolve("src/api/v1/routes/users"));
const booksRouter = require(path.resolve("src/api/v1/routes/books"));


const app = express();
connect();
app.use(express.json());

app.use("/api/v1/users", usersRouter);

app.use('/api/v1/books', booksRouter)

app.listen(3000, () => {
  console.log("Server running on the port 3000");
});
