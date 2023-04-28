const mongoose = require("mongoose");

const AgentSchema = new mongoose.Schema(
  {
    agent: {
      type: String,
      required: true,
      trim: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Agent", AgentSchema);
