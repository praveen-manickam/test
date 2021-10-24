const { verifyToken } = require("../auth/helper");
const { addCarts, getCart, updateCart, deleteCart } = require("../controllers/carts");
const router = require("express").Router();

router.post("/", verifyToken, addCarts);
router.get("/", verifyToken, getCart);
router.put("/:cartId", verifyToken, updateCart);
router.delete("/:cartId", verifyToken, deleteCart);


module.exports = router;
