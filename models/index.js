const { User, joiSchemaAddUser, joiSchemaLoginUser } = require("./user");
const { Product, joiSchemaProductGet } = require("./product");
const {
  Diary,
  joiSchemaProductAdd,
  joiSchemaProductDelete,
} = require("./diary");

module.exports = {
  User,
  joiSchemaAddUser,
  joiSchemaLoginUser,
  Product,
  joiSchemaProductGet,
  Diary,
  joiSchemaProductAdd,
  joiSchemaProductDelete,
};
