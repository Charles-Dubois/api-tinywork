const Joi = require("joi");

const SchemaCompany = Joi.object({
  firstname: Joi.string().max(50).required(),
  lastname: Joi.string().max(50).required(),
  jobtitle: Joi.string().max(50).required(),
  company: Joi.string().max(50),
  email: Joi.string().email().max(250).required(),
  phone: Joi.string().max(20),
  address: Joi.string().max(200),
  city: Joi.string().max(50),
  zip: Joi.string().max(10),
  numemployees: Joi.string().max(20),
  industry: Joi.string().max(150),
  interet: Joi.string().max(10).required(),
});

function validCompany(req, res, next) {
  const validation = SchemaCompany.validate(req.hubspot);

  if (validation.error) {
    return res.status(400).json({
      message: "Error 400",
      description: validation.error.details[0].message,
    });
  }

  next();
}

module.exports = validCompany;
