const dotenv = require("dotenv").config();
const PORT = 3000;
const express = require("express");
const morgan = require("morgan");
const cors = require("cors")

const client = require("./db/client");

const server = express();

server.use(morgan("dev"));
server.use(express.json());

const apiRouter = require("./api");
server.use("/api", apiRouter);
server.get("*", (req, res) => {
  res.status(404).send({
    error: "404 - not found",
    message: "No route found for the requested path",
  });
});
client.connect();
server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
