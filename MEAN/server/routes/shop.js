const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop");

router.get("/cart", shopController.getCart);
router.post("/cart", shopController.PostCart);
router.delete("/cart-delete-item/:id", shopController.postCartDeleteProduct);

module.exports = router;
