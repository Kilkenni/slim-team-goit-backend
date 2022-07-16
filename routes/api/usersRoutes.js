const express = require("express");
const { joiValidation, ctrlWrapper, auth } = require("../../middlewares");
const { joiUserParamsSchema } = require("../../models");
const { usersCtrl } = require("../../controllers");

const router = express.Router();

router.put(
  "/",
  auth,
  joiValidation(joiUserParamsSchema),
  ctrlWrapper(usersCtrl.updateUserParameters)
);

module.exports = router;
