const express = require("express");
const app = express();
const PORT = 8001;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Booking");
  });

app.listen(PORT, () => {
  console.log("Booking service is running on port: " + PORT);
});
