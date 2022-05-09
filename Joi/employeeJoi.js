const Joi = require("joi");

const SchemaEmployee = Joi.object({
  firstname: Joi.string().max(50).required(),
  lastname: Joi.string().max(50).required(),
  email: Joi.string().email().max(250).required(),
  phone: Joi.string().max(20),
  address: Joi.string().max(200),
  city: Joi.string().max(50),
  zip: Joi.string().max(10),
  nombre_d_enfants___12_ans_: Joi.number().max(10),
  jobtitle: Joi.string().max(50).required(),
  company: Joi.string().max(50).required(),
  interet: Joi.string().max(10).required(),
});

function validEmployee(req, res, next) {
  const validation = SchemaEmployee.validate(req.hubspot);

  if (validation.error) {
    return res.status(400).json({
      message: "Error 400",
      description: validation.error.details[0].message,
    });
  }

  next();
}

module.exports = validEmployee;
