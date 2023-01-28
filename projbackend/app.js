const express = require("express");

const port = 8000;
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to MERN BootCamp");
});

app.listen(port, () => {
  console.log(`Hello ${port} is up and running`);
});
