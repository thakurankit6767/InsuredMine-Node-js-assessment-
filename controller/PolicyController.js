const {
  checkInputsPresent,
  isValid,
  isValidObjectId,
  isValidNo,
} = require("../checkValidDetails/checkValidDetails");
const PolicyModel = require("../models/PolicyModel");

const CreatePolicy = async function (req, res) {
  try {
    if (!checkInputsPresent(req.body))
      return res.status(400).send({ status: false, message: "Enter details" });

    let {
      UserId,
      policy_number,
      policy_mode,
      policy_type,
      premium_amount,
      policy_start_date,
      policy_end_date,
    } = req.body;

    if (!isValid(UserId))
      return res
        .status(400)
        .send({ status: false, message: "userId is required" });

    if (!isValidObjectId(UserId))
      return res.status(400).send({ status: false, message: "Invalid userId" });

    if (!isValid(policy_number))
      return res
        .status(400)
        .send({ status: false, message: "policy number is required" });

    if (!isValid(policy_mode))
      return res
        .status(400)
        .send({ status: false, message: "policy mode is required" });

    if (!isValid(policy_type))
      return res
        .status(400)
        .send({ status: false, message: "policy type is required" });

    if (!isValid(premium_amount))
      return res
        .status(400)
        .send({ status: false, message: "Premium Amount is required" });

    if (!isValidNo(premium_amount))
      return res
        .status(400)
        .send({ status: false, message: "Enter a Valid Premium Amount" });

    if (!isValid(policy_start_date))
      return res
        .status(400)
        .send({ status: false, message: "policy start date is required" });

    if (!isValid(policy_end_date))
      return res
        .status(400)
        .send({ status: false, message: "policy end date is required" });

    let userdata = await PolicyModel.create(req.body);

    return res
      .status(201)
      .send({ status: true, Message: "Successful", data: userdata });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const PolicyUpdate = async function (req, res) {
  try {
    let id = req.params.id;

    let {
      policy_number,
      policy_mode,
      policy_type,
      premium_amount,
      policy_start_date,
      policy_end_date,
    } = req.body;

    if (!isValidObjectId(id))
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid ID" });

    if (policy_number || policy_number === "") {
      if (!isValid(policy_number))
        return res
          .status(400)
          .send({ status: false, message: "Account Name should be Required" });
    }

    if (producer || producer === "") {
      if (!isValid(producer))
        return res
          .status(400)
          .send({ status: false, message: "Producer is required" });
    }

    if (premium_amount || premium_amount === "") {
      if (!isValid(premium_amount))
        return res
          .status(400)
          .send({ status: false, message: "Premium amount is required" });

      if (!isValidNo(premium_amount))
        return res
          .status(400)
          .send({ status: false, message: "Enter a Valid Premium Amount" });
    }

    let update = await PolicyModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    res
      .status(200)
      .send({ status: true, message: "Successfully Update", data: update });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const PolicyGet = async function (req, res) {
  try {
    let id = req.params.id;

    if (!isValidObjectId(id))
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid  UserId" });

    let get = await PolicyModel.findById({ _id: id });

    if (!get) {
      return res.status(404).send({ status: true, message: "Not Found" });
    }
    return res.status(200).send({ status: true, message: "Done", data: get });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const deletePolicy = async function (req, res) {
  try {
    let Id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(Id)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid Policy  ID" });
    }

    let Policy = await PolicyModel.findOneAndUpdate(
      { _id: Id, isDeleted: false },
      { isDeleted: true, deletedAt: new Date() }
    );
    if (Policy) {
      return res
        .status(200)
        .send({ status: true, message: "Policy deleted successfuly" });
    } else {
      return res
        .status(404)
        .send({ status: false, message: "Policy  not found" });
    }
  } catch (err) {
    res.status(500).send({ message: "Error", error: err.message });
  }
};
module.exports = { CreatePolicy, PolicyUpdate, PolicyGet, deletePolicy };
