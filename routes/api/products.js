const express = require("express");
const { joiValidation, ctrlWrapper } = require("../../middlewares");
const { calculateCalories } = require("../../controllers");

const router = express.Router();

// ! Додати миддлвару з авторизації
router.get("/:bloodType", ctrlWrapper(calculateCalories.getCaloriesAndNotAllowedProducts));

router.put("/user/:bloodType", ctrlWrapper(calculateCalories.getCaloriesAndNotAllowedProducts));

module.exports = router;