const mongoose = require("mongoose");

const LOBSchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LOB", LOBSchema);
