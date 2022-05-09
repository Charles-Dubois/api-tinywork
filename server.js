// dependencies
require("dotenv").config({ path: "./config.env" });
const express = require("express"),
  cors = require("cors"),
  app = express(),
  PORT = process.env.PORT || 8000,
  sendContentRouter = require("./routers/sendContent");

// middlewares
app.use(cors());
app.use(express.json());

// routers
app.use("/dataform", sendContentRouter);

// path
app.get("/", (_req, res) => {
  res.send("API tinywork");
});
// catch not found
app.get("*", (_req, res) => {
  res.status(404).send("Error 404");
});

app.listen(PORT, () => {
  console.log("Listen on port " + PORT);
});
