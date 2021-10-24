const Carts = require("../models/carts");
const Users = require("../models/users");
const { v4: uuidv4 } = require("uuid");
const statusCodes = require("../config/statusCodes");

const addCarts = async (req, res) => {
  let { userId } = req.user;
  let { items } = req.body;
  if (!items.length) {
    return res
      .status(statusCodes.HTTP_BAD_REQUEST)
      .json({ success: false, message: "Items must not be empty" });
  }
  try {
    const userData = await Users.findOne({ userId });
    await Carts.create({
      userObjId: userData._id,
      userId,
      items,
      cartId: uuidv4(),
      cartDateTime: new Date(),
    });
    res
      .status(statusCodes.HTTP_CREATED)
      .json({ success: true, message: statusCodes.SUCCESSFULLY_ADDED });
  } catch (error) {
    res
      .status(statusCodes.HTTP_BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

const getCart = async (req, res) => {
  let { userId } = req.user;
  try {
    const cartData = await Carts.findOne({ userId }).populate({
      path: "userObjId",
      select: "-profilePicture",
    });
    res.status(statusCodes.HTTP_OK).json({ success: true, data: cartData });
  } catch (error) {
    res
      .status(statusCodes.HTTP_BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  let { userId } = req.user;
  let { cartId } = req.params;
  let { items } = req.body;
  try {
    await Carts.findOneAndUpdate({ userId, cartId }, { items });
    res
      .status(statusCodes.HTTP_OK)
      .json({ success: true, message: statusCodes.SUCCESSFULLY_UPDATED });
  } catch (error) {
    res
      .status(statusCodes.HTTP_BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

const deleteCart = async (req, res) => {
  let { userId } = req.user;
  let { cartId } = req.params;
  try {
    await Carts.deleteOne({ userId, cartId });
    res.status(statusCodes.HTTP_OK).json({ success: true, message: "DELETED" });
  } catch (error) {
    res
      .status(statusCodes.HTTP_BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

module.exports = {
  addCarts,
  getCart,
  updateCart,
  deleteCart,
};
