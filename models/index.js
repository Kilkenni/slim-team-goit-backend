const { User, joiSchemaRegister, joiSchemaLogin } = require("./user");
const { Product, joiSchemaProductGet } = require("./product");
const {
  Diary,
  joiSchemaProductAdd,
  joiSchemaProductDelete,
} = require("./diary");

module.exports = {
  User,
  joiSchemaRegister,
  joiSchemaLogin,
  Product,
  joiSchemaProductGet,
  Diary,
  joiSchemaProductAdd,
  joiSchemaProductDelete,
};
