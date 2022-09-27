const Joi = require('@hapi/joi');
//Register validation
const RegisterValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().min(8).required().email(),
    address: Joi.string().min(8).required(),
    role: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().min(8).required(),
    createdAt :Joi.string().required(),
  });
  return schema.validate(data);
};
//update validation
const UpdateValidation = (data) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    address: Joi.string().min(8).required(),
    username: Joi.string().required(),
    email: Joi.string().min(6).required().email(),
  });
  return schema.validate(data);
};
//update password validation
const UpdatePasswordValidation = (data) => {
  const schema = Joi.object({
    Npassword: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
//LoginValidation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
module.exports.RegisterValidation = RegisterValidation;
module.exports.loginValidation = loginValidation;
module.exports.UpdateValidation = UpdateValidation;
module.exports.UpdatePasswordValidation = UpdatePasswordValidation;
