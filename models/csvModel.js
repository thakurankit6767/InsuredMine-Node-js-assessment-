var mongoose = require("mongoose");

var csvSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  zip: {
    type: String,
  },
  email: {
    type: String,
  },
  dob: {
    type: String,
  },
  userType: {
    type: String,
  },
  account_name: {
    type: String,
  },
  producer: {
    type: String,
  },
  premium_amount_written: {
    type: String,
  },
  premium_amount: {
    type: String,
  },
  category_name: {
    type: String,
  },
  company_name: {
    type: String,
  },
  policy_number: {
    type: String,
  },
  policy_mode: {
    type: String,
  },
  policy_type: {
    type: String,
  },
  premium_amount: {
    type: String,
  },
  policy_start_date: {
    type: String,
  },
  policy_end_date: {
    type: String,
  },
});

module.exports = mongoose.model("Csv", csvSchema);
