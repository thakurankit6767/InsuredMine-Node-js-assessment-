const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_CONNECT,{useNewUrlParser: true,})
    .then(() => console.log("db connected"))
    .catch((err) => console.log("db connection error"));
};

module.exports = dbConnect;
