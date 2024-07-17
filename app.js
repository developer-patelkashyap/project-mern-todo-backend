// core dependencies
const express = require("express");
require("dotenv").config();
const morgan = require("morgan");

// server instance
const app = express();

// env variable
const PORT = process.env.PORT || 9000;

app.use(express.json());

// DB connection
const connectDB = require("./config/db");

connectDB();

// middleware
const authMiddleware = require("./middlewares/auth");

app.use(morgan("combined"));

// routes
const userRouter = require("./routes/User");
const todoRouter = require("./routes/Todo");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", authMiddleware, todoRouter);

app.listen(PORT, console.log(`Server running on PORT: ${PORT}`));
