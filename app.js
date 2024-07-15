const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, console.log(`Server running on PORT: ${PORT}`));
