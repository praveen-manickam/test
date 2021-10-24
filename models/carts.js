const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const cart = new mongoose.Schema(
  {
    cartId: {
      type: String,
      required: true,
    },
    userObjId: {
      type: Schema.ObjectId,
      ref: "user",
    },
    userId: {
      type: String,
      required: true,
    },
    cartDateTime: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cart", cart);
