require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = 8002;
const app = express();
const route = require("./../src/routes/index");
const bodyParser = require("body-parser");
const connect = require("./database");

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use("/api/v1", route);

app.use((err, req, res, next) => {
  // handleError(err, req, res);
});

connect();

app.listen(PORT, () => {
  console.log("Auth service is running on port: " + PORT);
});
