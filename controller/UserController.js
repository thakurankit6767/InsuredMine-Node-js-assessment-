const UserModel = require("../models/UserModel");
const moment = require("moment");

const {
  checkInputsPresent,
  isValidObjectId,
  isValid,
  isValidName,
  isValidMobile,
  validateEmail,
  isValidzip,
} = require("../checkValidDetails/checkValidDetails");

const Createuser = async function (req, res) {
  try {
    if (!checkInputsPresent(req.body))
      return res.status(400).send({ status: false, message: "Enter details" });

    let { firstname, email, phone, dob, address, state, city, zip } = req.body;

    if (!isValid(firstname))
      return res
        .status(400)
        .send({ status: false, message: "Name is required" });

    if (!isValidName(firstname))
      return res
        .status(400)
        .send({ status: false, message: "Enter Valid Name" });

    if (!isValid(email))
      return res
        .status(400)
        .send({ status: false, message: "Email is required" });

    if (!validateEmail(email))
      return res
        .status(400)
        .send({ status: false, message: "Enter Valid Email" });

    const mail = await UserModel.findOne({ email: email });

    if (mail)
      return res
        .status(400)
        .send({ status: false, message: "Email is already exist" });

    if (!isValid(phone))
      return res
        .status(400)
        .send({ status: false, message: "Phone Number is required" });

    const mobile = await UserModel.findOne({ phone: phone });

    if (mobile)
      return res
        .status(400)
        .send({ status: false, message: "Phone No. is already exist" });

    if (!isValidMobile(phone))
      return res
        .status(400)
        .send({ status: false, message: "Enter a Valid Phone Number" });

    if (!isValid(dob))
      return res
        .status(400)
        .send({ status: false, message: "Date of birth is required" });

    let date = moment(dob);

    if (date > Date.now()) {
      return res.status(400).send({
        status: false,
        message: "Please provide valid date of birth ",
      });
    }

    if (!isValid(address))
      return res
        .status(400)
        .send({ status: false, message: "Adress Number is required" });

    if (!isValid(state))
      return res
        .status(400)
        .send({ status: false, message: "Atate is required" });

    if (!isValidName(state))
      return res
        .status(400)
        .send({ status: false, message: "Enter a Valid State" });

    if (!isValid(city))
      return res
        .status(400)
        .send({ status: false, message: "City Number is required" });

    if (!isValidName(city))
      return res
        .status(400)
        .send({ status: false, message: "Enter a Valid City" });

    if (!isValid(zip))
      return res
        .status(400)
        .send({ status: false, message: "Zip is required" });

    if (!isValidzip(zip))
      return res
        .status(400)
        .send({ status: false, message: "Enter a Valid zip" });

    let userdata = await UserModel.create(req.body);

    return res
      .status(201)
      .send({ status: true, Message: "Successful", data: userdata });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const UserUpdate = async function (req, res) {
  try {
    let id = req.params.id;

    let { firstname, email, phone, dob, address, state, city, zip } = req.body;

    if (!isValidObjectId(id))
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid ID" });

    if (firstname || firstname === "") {
      if (!isValid(firstname))
        return res
          .status(400)
          .send({ status: false, message: "firstname should be Required" });

      if (!isValidName(firstname))
        return res
          .status(400)
          .send({ status: false, message: "Enter Valid Name" });
    }

    if (email || email === "") {
      if (!isValid(email))
        return res
          .status(400)
          .send({ status: false, message: "email is required" });

      if (!validateEmail(email))
        return res
          .status(400)
          .send({ status: false, message: "Enter Valid Email" });
    }

    if (phone || phone === "") {
      if (!isValid(phone))
        return res
          .status(400)
          .send({ status: false, message: "Phone Number is required" });

      if (!isValidMobile(phone))
        return res
          .status(400)
          .send({ status: false, message: "Enter a Valid Phone Number" });
    }
    let date = moment(dob);
    if (dob || dob === "") {
      if (!isValid(dob))
        return res
          .status(400)
          .send({ status: false, message: "DOB is required" });

      if (date > Date.now()) {
        return res.status(400).send({
          status: false,
          message: "please provide valid date of birth ",
        });
      }
    }
    if (address || address === "") {
      if (!isValid(address))
        return res
          .status(400)
          .send({ status: false, message: "address is required" });
    }

    if (state || state == "") {
      if (!isValid(state))
        return res
          .status(400)
          .send({ status: false, message: "State is required" });

      if (!isValidName(state))
        return res
          .status(400)
          .send({ status: false, message: "Enter a Valid State" });
    }

    if (city || city == "") {
      if (!isValid(city))
        return res
          .status(400)
          .send({ status: false, message: "City is required" });

      if (!isValidName(city))
        return res
          .status(400)
          .send({ status: false, message: "Enter a Valid City" });
    }

    if (zip || zip == "") {
      if (!isValid(zip))
        return res
          .status(400)
          .send({ status: false, message: "Zip is required" });

      if (!isValidzip(zip))
        return res
          .status(400)
          .send({ status: false, message: "Enter a Valid Zip" });
    }
    let update = await UserModel.findByIdAndUpdate(
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

const UserGet = async function (req, res) {
  try {
    let id = req.params.id;

    if (!isValidObjectId(id))
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid UserId" });

    let get = await UserModel.findById({ _id: id });
    if (!get) {
      return res.status(404).send({ status: true, message: "Not Found" });
    }
    return res.status(200).send({ status: true, message: "Done", data: get });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const deleteUser = async function (req, res) {
  try {
    let UserId = req.params.Id;
    if (!isValidObjectId(UserId)) {
      return res.status(400).send({ status: false, message: "Invalid User" });
    }

    let customer = await UserModel.findOneAndUpdate(
      { _id: UserId, isDeleted: false },
      { isDeleted: true, deletedAt: new Date() }
    );
    if (customer) {
      return res
        .status(200)
        .send({ status: true, message: "User deleted successfuly" });
    } else {
      return res.status(404).send({ status: false, message: "User not found" });
    }
  } catch (err) {
    res.status(500).send({ message: "Error", error: err.message });
  }
};
module.exports = { Createuser, UserUpdate, UserGet, deleteUser };
