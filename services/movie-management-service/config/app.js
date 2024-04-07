const express = require("express");
const app = express();
const PORT = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Movies");
});

app.listen(PORT, () => {
  console.log("Movie management service is running on port: " + PORT);
});
