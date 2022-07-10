const { Schema, model } = require("mongoose");
const Joi = require("joi");

const productSchema = Schema({
  _id: { type: Schema.Types.ObjectId, ref: "products" },
  title: {
    type: String,
  },
  weight: {
    type: Number,
    default: 100,
  },
  calories: {
    type: Number,
    default: 100,
  },
});

const diarySchema = Schema({
  productList: [productSchema],
  date: {
    type: String,
    require: [true, "Date is required"],
  },
  caloriesReceived: {
    type: Number,
    default: 0,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

const joiSchemaProductAdd = Joi.object({
  productId: Joi.string().required(),
  weight: Joi.number().required(),
  date: Joi.string().required(),
  title: Joi.string(),
  calories: Joi.number(),
});

const joiSchemaProductDelete = Joi.object({
  productId: Joi.string().required(),
  date: Joi.string().required(),
  owner: Joi.string(),
});

const Diary = model("diary", diarySchema);

module.exports = { Diary, joiSchemaProductAdd, joiSchemaProductDelete };