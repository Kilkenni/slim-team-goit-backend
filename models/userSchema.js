const {Schema,  model, SchemaTypes} = require('mongoose');
const Joi = require('joi');
const { v4 } = require('uuid');

const schemaRegister = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  token: Joi.string(),
  verify: Joi.boolean(),
  verificationToken: Joi.string(),
})

const schemaLogin = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

const schema = new Schema(  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
    owner: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
      },
    verify: {
        type: Boolean,
        default: false,
      },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
        default: function () {return v4()}
      },
      
  }, {timestamps: true})

const User = model('user', schema)

module.exports = {
    User, 
    schemaRegister,
    schemaLogin,
};
