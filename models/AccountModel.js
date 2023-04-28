const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema(
  {
    UserId: {
      type: String,
      ref: "User",
      required: true,
    },

    account_name: {
      type: String,
      required: true,
      trim: true,
    },

    producer: {
      type: String,
      required: true,
    },

    premium_amount_written: {
      type: String,
    },

    premium_amount: {
      type: Number,
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", AccountSchema);
