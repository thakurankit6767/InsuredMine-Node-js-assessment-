const mongoose = require("mongoose");

const CarrierSchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: true,
    },

    UserId: {
      type: String,
      ref: "User",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Carrier", CarrierSchema);
