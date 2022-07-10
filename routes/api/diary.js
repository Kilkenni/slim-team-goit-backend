const express = require("express");
const { joiValidation, ctrlWrapper } = require("../../middlewares");
const { diaryCtrl } = require("../../controllers");

const router = express.Router();

// ! Додати миддлвару з авторизації
router.get("/:date", ctrlWrapper(diaryCtrl.getDiaryOnDate));

module.exports = router;
