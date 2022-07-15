const express = require("express");
const { joiValidation, ctrlWrapper, auth } = require("../../middlewares");
const { usersCtrl } = require("../../controllers");

const router = express.Router();

router.put("/", ctrlWrapper(usersCtrl.updateUserParameters));

module.exports = router;