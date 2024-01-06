const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connect } = require("./config/database.config");
const routes = require("./routes");

const server = express();
const PORT = process.env.PORT || 8080;

server.use(express.json());
server.use(
  cors({
    origin: ["https://oyo-clone-shirso.netlify.app", "http://127.0.0.1:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
server.use(cookieParser());

server.get("/api", (req, res) => {
  res.json("Welcome to OYO Clone APIs made by Shirso Bhattacharyya.");
});

server.use("/api", routes);

server.listen(PORT, async () => {
  await connect();
  console.log(`Server started at port ${PORT}`);
});
