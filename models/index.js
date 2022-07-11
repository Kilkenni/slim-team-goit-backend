const { User, schemaRegister, schemaLogin } = require("./user");
const { Product, joiSchemaProductGet } = require("./product");
const {
  Diary,
  joiSchemaProductAdd,
  joiSchemaProductDelete,
} = require("./diary");

module.exports = {
  User,
  schemaRegister, 
  schemaLogin,
  Product,
  joiSchemaProductGet,
  Diary,
  joiSchemaProductAdd,
  joiSchemaProductDelete,
};

