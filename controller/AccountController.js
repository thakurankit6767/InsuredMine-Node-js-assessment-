const {
  checkInputsPresent,
  isValid,
  isValidObjectId,
  isValidNo,
} = require("../checkValidDetails/checkValidDetails");
const AccountModel = require("../models/AccountModel");

const CreateAccount = async function (req, res) {
  try {
    if (!checkInputsPresent(req.body))
      return res.status(400).send({ status: false, message: "Enter details" });

    let { UserId, account_name, producer, premium_amount } = req.body;

    if (!isValid(UserId))
      return res
        .status(400)
        .send({ status: false, message: "userId is required" });

    if (!isValidObjectId(UserId))
      return res.status(400).send({ status: false, message: "Invalid userId" });
    if (!isValid(account_name))
      return res
        .status(400)
        .send({ status: false, message: "Account name is required" });

    if (!isValid(producer))
      return res
        .status(400)
        .send({ status: false, message: "Producer is required" });

    if (!isValid(premium_amount))
      return res
        .status(400)
        .send({ status: false, message: "Premium amount is required" });

    if (!isValidNo(premium_amount))
      return res
        .status(400)
        .send({ status: false, message: "Enter a Valid Premium Amount" });

    let userdata = await AccountModel.create(req.body);

    return res
      .status(201)
      .send({ status: true, Message: "Successful", data: userdata });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const AccountUpdate = async function (req, res) {
  try {
    let id = req.query.id;

    let { account_name, producer, premium_amount } = req.body;

    if (!isValidObjectId(id))
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid ID" });

    if (account_name || account_name === "") {
      if (!isValid(account_name))
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

    let update = await AccountModel.findByIdAndUpdate(
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

const AccountGet = async function (req, res) {
  try {
    let id = req.query.id;

    if (!isValidObjectId(id))
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid  UserId" });

    let get = await AccountModel.findById({ _id: id });
    if (!get) {
      return res.status(404).send({ status: true, message: "Not Found" });
    }
    return res.status(200).send({ status: true, message: "Done", data: get });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const deleteAccount = async function (req, res) {
  try {
    let AccountId = req.query.Id;
    if (!mongoose.Types.ObjectId.isValid(AccountId)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid Account ID" });
    }

    let Account = await AccountModel.findOneAndUpdate(
      { _id: AccountId, isDeleted: false },
      { isDeleted: true, deletedAt: new Date() }
    );
    if (Account) {
      return res
        .status(200)
        .send({ status: true, message: "Account deleted successfuly" });
    } else {
      return res
        .status(404)
        .send({ status: false, message: "Account not found" });
    }
  } catch (err) {
    res.status(500).send({ message: "Error", error: err.message });
  }
};
module.exports = { CreateAccount, AccountUpdate, AccountGet, deleteAccount };
