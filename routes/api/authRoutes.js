const express = require("express");
const { joiValidation, ctrlWrapper, auth } = require("../../middlewares");
const { joiSchemaRegister, joiSchemaLogin } = require("../../models");
const { authCtrl } = require("../../controllers");
const { refreshTokensSchema } = require("../../models/user");

const router = express.Router();

router.post(
  "/users/signup",
  joiValidation(joiSchemaRegister),
  ctrlWrapper(authCtrl.registration)
);

router.post(
  "/users/login",
  joiValidation(joiSchemaLogin),
  ctrlWrapper(authCtrl.login)
);

router.get(
  "/users/logout", 
  auth, 
  ctrlWrapper(authCtrl.logout)
);

router.post(
  "/users/refresh",
  joiValidation(refreshTokensSchema),
  ctrlWrapper(authCtrl.refreshTokens)
);

module.exports = router;
