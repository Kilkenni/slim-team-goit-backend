const express = require("express");
const { ctrlWrapper, auth } = require("../../middlewares");
const { productsCtrl } = require("../../controllers");

const router = express.Router();

router.get(
  "/",
  ctrlWrapper(productsCtrl.getCaloriesAndNotAllowedProducts)
);

// router.put("/user/:bloodType", auth, ctrlWrapper(productsCtrl));

router.get("/:searchQuery", auth, ctrlWrapper(productsCtrl.getProduct));

module.exports = router;
