require("dotenv").config();
const express = require("express");
// var cors = require("cors");
const cors = require("cors");
const PORT = 8000;
const app = express();
const route = require("./../src/routes/index");
const bodyParser = require("body-parser");
// const handleError = require("../common/error");
const connect = require("./database");

// call cron jobs
const { updateMovieTypeCron } = require("../cron-jobs/update-movie-type");

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use("/api/v1", route);

// crons
updateMovieTypeCron();

app.use((err, req, res, next) => {
  // handleError(err, req, res);
});

connect();

app.listen(PORT, () => {
  console.log("Movie management service is running on port: " + PORT);
});
