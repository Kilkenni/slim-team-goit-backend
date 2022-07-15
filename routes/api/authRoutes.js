const express = require("express");
const { joiValidation, ctrlWrapper, auth } = require("../../middlewares");
const { joiSchemaRegister, joiSchemaLogin } = require("../../models");
const { authCtrl } = require("../../controllers");
const { refreshTokensSchema } = require("../../models/user");

const router = express.Router();

router.post(
  "/signup",
  joiValidation(joiSchemaRegister),
  ctrlWrapper(authCtrl.registration)
);

router.post(
  "/login",
  joiValidation(joiSchemaLogin),
  ctrlWrapper(authCtrl.login)
);

router.post("/logout", auth, ctrlWrapper(authCtrl.logout));

router.post(
  "/refresh",
  joiValidation(refreshTokensSchema),
  ctrlWrapper(authCtrl.refreshTokens)
);

module.exports = router;
