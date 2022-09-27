const Joi = require('@hapi/joi');
//Add pointage Validation
const AddPointageValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
  });
  return schema.validate(data);
};

//update pointage Validation
const updatePointageValidation = (data) => {
  const schema = Joi.object({
    id_user: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports.updatePointageValidation = updatePointageValidation;

module.exports.AddPointageValidation = AddPointageValidation;
