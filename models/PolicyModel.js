const mongoose = require("mongoose");

const PolicySchema = new mongoose.Schema(
  {
    UserId: {
      type: String,
      ref: "User",
      required: true,
    },

    policy_number: {
      type: String,
      required: true,
    },

    policy_mode: {
      type: String,
      required: true,
    },
    policy_type: {
      type: String,
      required: true,
    },
    premium_amount: {
      type: Number,
      required: true,
    },
    policy_start_date: {
      type: Date,
      trim: true,
    },
    policy_end_date: {
      type: Date,
      trim: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Policy", PolicySchema);
