const {
  checkInputsPresent,
  isValid,
} = require("../checkValidDetails/checkValidDetails");
const LOBModel = require("../models/LOBModel");

const CreateLOB = async function (req, res) {
  try {
    if (!checkInputsPresent(req.body))
      return res.status(400).send({ status: false, message: "Enter details" });

    let { category_name } = req.body;

    if (!isValid(category_name))
      return res
        .status(400)
        .send({ status: false, message: "Category name  is required" });

    let data = await LOBModel.create(req.body);

    return res
      .status(201)
      .send({ status: true, Message: "Successful", data: data });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { CreateLOB };
