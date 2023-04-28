var multer = require("multer");
var csv = require("csvtojson");

const Csv = require("../models/csvModel");

const insertToDB = async function (req, res) {
  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded!" });
  }
  const jsonArrray = await csv().fromFile(req.file.path);
  Csv.insertMany(jsonArrray)
    .then(function () {
      res.status(200).send({ message: "Successfully Uploaded!" });
    })
    .catch(function (err) {
      res.status(500).send({ message: err });
    });
};

module.exports = { insertToDB };
