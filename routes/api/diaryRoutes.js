const express = require("express");
const { joiValidation, ctrlWrapper, auth } = require("../../middlewares");
const { diaryCtrl } = require("../../controllers");

const router = express.Router();

router.get("/:date", auth, ctrlWrapper(diaryCtrl.getDiaryOnDate));

module.exports = router;
