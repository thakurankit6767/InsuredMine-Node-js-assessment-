const mongoose = require("mongoose");

const isValidNo = (no) => {
  return /^[1-9]\d{2,5}$/.test(no);
};
const isValidObjectId = (objectId) => {
  return mongoose.Types.ObjectId.isValid(objectId);
};

const checkInputsPresent = (value) => {
  return Object.keys(value).length > 0;
};

const isValid = function (value) {
  if (typeof value === "undefined" || typeof value === null) return false;
  if (typeof value === "string" && value.trim().length == 0) return false;
  return true;
};

const isValidName = function (name) {
  return /^[a-zA-Z\s]{2,20}$/.test(name.trim());
};

const validateEmail = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim());
};

const isValidMobile = (phone) => {
  return /^[6-9]\d{9}$/.test(phone);
};

const isValidzip = (zip) => {
  return /^[1-9]\d{5}$/.test(zip);
};

module.exports = {
  checkInputsPresent,
  isValid,
  isValidName,
  validateEmail,
  isValidMobile,
  isValidzip,
  isValidNo,
  isValidObjectId,
};
