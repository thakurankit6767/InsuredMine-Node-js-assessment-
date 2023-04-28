const {
  checkInputsPresent,
  isValid,
} = require("../checkValidDetails/checkValidDetails");
const CarrierModel = require("../models/CarrierModel");

const CreateCarrier = async function (req, res) {
  try {
    if (!checkInputsPresent(req.body))
      return res.status(400).send({ status: false, message: "Enter details" });

    let { company_name } = req.body;

    if (!isValid(company_name))
      return res
        .status(400)
        .send({ status: false, message: "Company name  is required" });

    let data = await CarrierModel.create(req.body);

    return res
      .status(201)
      .send({ status: true, Message: "Successful", data: data });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { CreateCarrier };
