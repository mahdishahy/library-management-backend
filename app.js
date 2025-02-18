require("dotenv").config();
const express = require("express");
const path = require("path");
const { connect } = require(path.resolve("src/api/v1/config/database"));
const usersRouter = require(path.resolve("src/api/v1/routes/users"));
const booksRouter = require(path.resolve("src/api/v1/routes/books"));
const cors = require("cors");
const helmet = require("helmet");

const app = express();
connect();
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/api/v1/users", usersRouter);

app.use("/api/v1/books", booksRouter);

app.use((req, res, next) => {
  return res.status(404).json({
    error: {
      type: "Not Found",
      message: "404 test msg",
    },
  });
});

app.listen(3000, () => {
  console.log("Server running on the port 3000");
});
