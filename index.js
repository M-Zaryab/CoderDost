require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const server = express();
const path = require("path");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

//db connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
  console.log("database connected");
}
//Schema

//bodyParser
server.use(cors());
server.use(express.json());
// server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
server.use("/products", productRouter.router);
server.use("/users", userRouter.router);
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, process.env.PUBLIC_DIR, "index.html"));
});

server.listen(process.env.PORT, () => {
  console.log("server started on port", `http://localhost:${process.env.PORT}`);
});
