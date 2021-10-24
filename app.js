const express = require("express");
var app = express();
require("dotenv").config();
const morgan = require("morgan");
const http = require("http");
require("dotenv").config();
require("./database/mongodb");
var bodyParser = require("body-parser");
const port = process.env.SERVER_PORT;
app.use(morgan("tiny"));

app.use("/api/health", async (req, res) => {
  res.status(200).send("Ok API HEALTH");
});
app.use("/health", async (req, res) => {
  res.status(200).send("Ok");
});
app.use(bodyParser({ limit: "50mb" }));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));
require("./routes")(app);
app.set("port", port);
var server = http.createServer(app);

server.listen(port);
