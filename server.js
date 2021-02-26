const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
require("dotenv").config();

const PORT = 8080;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
console.log(process.env.MongoDB_PORT);

mongoose.connect(process.env.MONGODB_URI || process.env.MongoDB_PORT, {
  useNewUrlParser: true,
  useFindAndModify: false,
});

// all routes
app.use(require("./routes/api.js"));
app.use(require("./routes/html.js"));

app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}`);
});
