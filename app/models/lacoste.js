"use strict";
var mongoose = require("mongoose");

var lacosteSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId },
    ip: { type: String },
    existing: { type: String },
    token: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lacoste", lacosteSchema);
