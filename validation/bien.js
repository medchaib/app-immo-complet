const Joi = require('@hapi/joi');
//Add Bien Validation
const AddBienValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    created_by: Joi.string().required(),
    localisation: Joi.string().required(),
    prix: Joi.number().required(),
    categorie: Joi.string().required(),
    type: Joi.string().required(),
    confirm: Joi.boolean().required(),
    Proprietere: Joi.string().required(),
    telPropritere: Joi.required(),
    numchambre: Joi.number().required(),

  });
  return schema.validate(data);
};

//Update Bien Validation
const UpdateBienValidation = (data) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().min(3).required(),
    created_by: Joi.string().required(),
    localisation: Joi.string().required(),
    prix: Joi.number().required(),
    categorie: Joi.string().required(),
    type: Joi.string().required(),
    confirm: Joi.boolean().required(),
    Proprietere: Joi.string().required(),
    createdAt: Joi.string(),
    telPropritere: Joi.required(),
    numchambre: Joi.number().required(),
    __v: Joi.number(),
  });
  return schema.validate(data);
};
module.exports.AddBienValidation = AddBienValidation;
module.exports.UpdateBienValidation = UpdateBienValidation;
