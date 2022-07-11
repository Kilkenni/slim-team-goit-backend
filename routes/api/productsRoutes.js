const express = require("express");
const { ctrlWrapper, auth } = require("../../middlewares");
const { productsCtrl } = require("../../controllers");

const router = express.Router();

router.get("/:searchQuery", auth, ctrlWrapper(productsCtrl.getProduct));

module.exports = router;