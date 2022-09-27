const Joi = require('@hapi/joi');
//AddVisiteValidation Validation
const AddVisiteValidation = (data) => {
  const schema = Joi.object({
    Date_Visite: Joi.string().required(),
    id_client: Joi.string().required(),
    id_agent: Joi.string().required(),
    id_bien: Joi.string().required(),
    confirm: Joi.boolean().required(),
    Visited: Joi.boolean().required(),
  });
  return schema.validate(data);
};

//update pointage Validation
const upDateVisiteValidation = (data) => {
  const schema = Joi.object({
    _id: Joi.required(),
    Date_Visite: Joi.string().required(),
    id_client: Joi.string().required(),
    id_agent: Joi.string().required(),
    id_bien: Joi.string().required(),
    confirm: Joi.boolean().required(),
    Visited: Joi.boolean().required(),
    __v: Joi.number(),

  });
  return schema.validate(data);
};

module.exports.upDateVisiteValidation = upDateVisiteValidation;

module.exports.AddVisiteValidation = AddVisiteValidation;
