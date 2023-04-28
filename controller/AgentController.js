const {
  checkInputsPresent,
  isValid,
} = require("../checkValidDetails/checkValidDetails");
const AgentModel = require("../models/AgentModel");

const CreateAgent = async function (req, res) {
  try {
    if (!checkInputsPresent(req.body))
      return res.status(400).send({ status: false, message: "Enter details" });

    let { agent } = req.body;

    if (!isValid(agent))
      return res
        .status(400)
        .send({ status: false, message: "Agent is required" });

    let data = await AgentModel.create(req.body);

    return res
      .status(201)
      .send({ status: true, Message: "Successful", data: data });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { CreateAgent };
