const Joi = require('@hapi/joi');
//Add rendez-vous Validation
const AddrendezvousValidation = (data) => {
  const schema = Joi.object({
    id_client: Joi.string().required(),
    id_Bien: Joi.string().required(),
    dateRDV: Joi.string().required(),
    affected : Joi.required(),
  });
  return schema.validate(data);
};

//update pointage Validation
const updaterendezvousValidation = (data) => {
  const schema = Joi.object({
    id_client: Joi.string().required(),
    id_Bien: Joi.string().required(),
    _id: Joi.required(),
    dateRDV: Joi.string().required(),
    affected : Joi.required(),
  });
  return schema.validate(data);
};

module.exports.updaterendezvousValidation = updaterendezvousValidation;

module.exports.AddrendezvousValidation = AddrendezvousValidation;
