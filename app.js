const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
connectDB();

app.listen(PORT, console.log(`Server running on PORT: ${PORT}`));
