const env = require("dotenv").config();
const express = require("express");
const route = require("./routes/route");
const dbConnect = require("./db/dbConnect");

const app = express();

app.use(express.json());
const port = process.env.PORT;
dbConnect();

app.use("/", route);

app.listen(port, function () {
  console.log(`Server running on ${port}`);
});
