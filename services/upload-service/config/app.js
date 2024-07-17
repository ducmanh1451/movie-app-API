require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = 8004;
const app = express();
const route = require("./../src/routes/index");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use("/api/v1", route);

app.use((err, req, res, next) => {
  // handleError(err, req, res);
});

app.listen(PORT, () => {
  console.log("Upload service is running on port: " + PORT);
});